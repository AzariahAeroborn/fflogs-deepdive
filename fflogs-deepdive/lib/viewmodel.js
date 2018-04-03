var parserViewModel = function(){
    var model = this;

    model.apiKey = ko.observable();
    model.characterName = ko.observable();
    model.selectedWorld = ko.observable();
    model.fightlist = ko.observableArray();
    model.fightlist.subscribe(function() {
        setTimeout(function() {
            $("#tabs").tabs("refresh").tabs("option", "active", 0);
        }, 0);
    });
    model.fights = ko.observableArray();
    model.fights.subscribe(function() {
        setTimeout(function() {
            $("#tabs").tabs("refresh").tabs("option", "active", -1);
        }, 0);
    });

    model.characterSearch = function(){
        var baseURL = "https://www.fflogs.com/v1/parses/character/";
        var world = model.selectedWorld();
        var character = model.characterName();
        var apiKey = model.apiKey();

        var xhr = new XMLHttpRequest;
        xhr.onreadystatechange = function() {
            if ( this.readyState === 4 && this.status === 200 ) {
                // clear fights array - prevent adding fights over and over on re-search
                model.fightlist.removeAll();

                var apiResponse = JSON.parse(this.responseText);
                var searchResults = {};
                searchResults.character = character;
                searchResults.bossList = [];
                apiResponse.forEach(function(boss){
                    var bossData = {
                        name: boss.name,
                        clears: []
                    };
                    boss.specs.forEach(function(spec){
                        spec.data.forEach(function(clear){
                            var clearMinutes = Math.floor(clear.duration / 60000);
                            var clearSeconds = ((clear.duration % 60000) / 1000).toFixed(0);
                            var clearDate = new Date(clear.start_time);

                            var clearData = {
                                characterid: clear.character_id,
                                class: spec.spec,
                                date: clearDate.toLocaleDateString('en-US',{month: 'short', day: 'numeric', year: 'numeric'}),
                                dps: clear.persecondamount,
                                patch: clear.ilvl,
                                duration: clearMinutes + ":" + (clearSeconds < 10 ? "0" : "") + clearSeconds,
                                guild: clear.guild,
                                percentile: (Math.floor(clear.percent * 10) / 10).toFixed(1),
                                historyPercentile: (Math.floor(clear.historical_percent * 10) / 10).toFixed(1),
                                reportid: clear.report_code,
                                fight: clear.report_fight
                            };
                            bossData.clears.push(clearData);
                        });
                    });
                    searchResults.bossList.push(bossData);
                });
                model.fightlist.push(searchResults);
            }
        };
        xhr.open("GET", baseURL + character + "/" + world.world + "/" + world.region + "?api_key=" + apiKey, true);
        xhr.send();
    };

    model.getFight = function(clear) {
        // Get report information
        var baseURL = "https://www.fflogs.com/v1/report/fights/";
        var reportid = clear.reportid;
        var fight = clear.fight;
        var apiKey = model.apiKey();

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if ( this.readyState === 4 && this.status === 200 ) {
                var apiResponse = JSON.parse(this.responseText);
                var clearDate = new Date(apiResponse.start);

                var fightdata = {
                    fightlink: "#fight-" + reportid,
                    fightid: "fight-" + reportid,
                    date: clearDate.toLocaleDateString('en-US',{month: 'short', day: 'numeric'})
                };

                var f = apiResponse.fights.filter(function(obj){
                    return obj.id === fight;
                });

                fightdata.start = f[0].start_time;
                fightdata.name = f[0].name;

                fightdata.displayname = fightdata.name + " - " + fightdata.date;

                fightdata.friendlies = apiResponse.friendlies.filter(function(obj){
                   var isfound = obj.fights.filter(function(o){
                       return o.id === fight;
                   });
                   return isfound.length > 0;
                });
                fightdata.friendlyPets = apiResponse.friendlyPets.filter(function(obj){
                    var isfound = obj.fights.filter(function(o){
                        return o.id === fight;
                    });
                    return isfound.length > 0;
                });
                fightdata.enemies = apiResponse.enemies.filter(function(obj){
                    var isfound = obj.fights.filter(function(o){
                        return o.id === fight;
                    });
                    return isfound.length > 0;
                });
                model.getFightEvents(reportid,f[0].start_time,f[0].end_time,fightdata);
            }
        };
        xhr.open("GET", baseURL + reportid + "?api_key=" + apiKey, true);
        xhr.send();
    };
    model.getFightEvents = function(reportid, starttime, endtime, fightdata) {
        var baseURL = "https://www.fflogs.com/v1/report/events/";
        var apiKey = model.apiKey();
        fightdata.events = [];

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                var apiResponse = JSON.parse(this.responseText);
                fightdata.events = fightdata.events.concat(apiResponse.events);

                if ( apiResponse.nextPageTimestamp < endtime ) {
                    starttime = apiResponse.nextPageTimestamp;
                    xhr.open("GET", baseURL + reportid + "?api_key=" + apiKey + "&start=" + starttime + "&end=" + endtime, true);
                    xhr.send();
                } else {
                    model.parseFight(fightdata);
                }
            }
        };
        xhr.open("GET", baseURL + reportid + "?api_key=" + apiKey + "&start=" + starttime + "&end=" + endtime, true);
        xhr.send();
    };
    model.parseFight = function(fightdata) {
        fightdata.friendlies.forEach(function(actor){
            parseActorEvents(actor,fightdata);
        });
        fightdata.friendlyPets.forEach(function(actor){
            parseActorEvents(actor,fightdata);
        });
        fightdata.enemies.forEach(function(actor){
            parseActorEvents(actor,fightdata);
        });
        fightdata.selectedFriendly = ko.observable();
        fightdata.selectedClassParser = ko.observable({name:"",skills:[]});
        fightdata.selectedFriendly.subscribe(function(newValue){
            var selected = fightdata.friendlies.filter(function(f){
                return f.id === newValue;
            });
            if ( selected.length > 0 ) {
                var currentClass = "";
                if ( fightdata.selectedClassParser().hasOwnProperty("type") ) { currentClass = fightdata.selectedClassParser().type; }

                if ( selected[0].type === currentClass ) { fightdata.selectedClassParser.notifySubscribers(); }
                else { getClassParser(selected[0].type,fightdata); }
            }
        });
        fightdata.selectedFriendlySkills = ko.computed(function(){
           var classParser = fightdata.selectedClassParser();
           var selected = fightdata.friendlies.filter(function(f){
               return f.id === fightdata.selectedFriendly();
           });
           if ( selected.length > 0 ) {
               var selectedFriendly = selected[0];
               if ( classParser.class === selectedFriendly.type ) {
                   parseClassEvents(classParser,selectedFriendly);
                   console.log(classParser);
                   console.log(selectedFriendly.skills);
                   return {
                       display: null,
                       damage: [{
                           gcd: classParser.skills.filter(function(obj){ return obj.isGCD && obj.damage > 0 }).sort(function(a,b){return b.damage - a.damage}),
                           ogcd: classParser.skills.filter(function(obj){ return !obj.isGCD && obj.damage > 0 }).sort(function(a,b){return b.damage - a.damage})
                       }]
                   }
               } else {
                   return {
                       display: "Loading class information...",
                       damage: []
                   }
               }
           } else {
               return {
                   display: "",
                   damage: []
               };
           }
        }).extend({ rateLimit: 100 });
        fightdata.removeFight = function(fight){
            model.fights.remove(fight);
        };

        var defaultFriendly = fightdata.friendlies.filter(function(obj){
            return obj.name === model.characterName();
        });
        if ( defaultFriendly.length > 0 ) {
            fightdata.selectedFriendly(defaultFriendly[0].id);
        }

        model.fights.push(fightdata);
    };
    var parseActorEvents = function(actor,fightdata){
        var id = actor.id;
        var events = fightdata.events.filter(function(obj){
            return obj.sourceID === id;
        });
        var skills = {};
        events.forEach(function(event){
            if ( event.hasOwnProperty("ability") ) {
                if (event.ability.hasOwnProperty("name")) {
                    var ability = event.ability.name;
                    if (typeof(skills[ability]) === "undefined") {
                        skills[ability] = [event];
                    } else {
                        skills[ability].push(event);
                    }
                }
            }
        });

        actor.skills = skills;
        actor.events = events;
    };
    var getClassParser = function(className,fightdata){
        var classURL = "lib/classes/" + className + ".json";

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                fightdata.selectedClassParser(JSON.parse(this.responseText));
            }
        };
        xhr.open("GET", classURL, true);
        xhr.send();
    };
    var parseClassEvents = function(classParser,agent){
        // Loaded parser matches the class of the selected friendly
        classParser.skills.forEach(function(curSkill){
            curSkill.usages = [];

            // make a copy of the skills used by the specified agent, to allow for re-use on change back to this agent or other methods
            var agentEvents = $.extend(true,[],agent.skills[curSkill.name]);

            // Exit loop without further processing if no array found for skill name
            if ( agentEvents === undefined ) { return; }
            if ( agentEvents.constructor !== Array ) { return; }

            var curUsage = null;
            while ( curEvent = agentEvents.shift() ) {
                if ( curEvent.type === "cast" ) {
                    // Cast type usages indicate start of a new skill usage, all damage or buff/debuff info for previous one is complete
                    // Push previous usage onto the stack of skill usages (curUsage will be null for the first occurrence of this skill, nothing to push onto stack)
                    if ( curUsage !== null ) { curSkill.usages.push(curUsage); }
                    curUsage = curEvent;
                } else {
                    // The first occurrence of a skill might occur without a "cast" event, due to pre-casting before the pull
                    // If so, synthesize a cast event from the skill information
                    if ( curUsage === null ) {
                        curUsage = {
                            ability: curEvent.ability,
                            sourceID: curEvent.sourceID,
                            sourceIsFriendly: curEvent.sourceIsFriendly,
                            targetID: curEvent.targetID,
                            targetIsFriendly: curEvent.targetIsFriendly,
                            timestamp: curEvent.timestamp,
                            type: "cast"
                        };
                        if ( curEvent.targetIsFriendly === "false" ) {
                            curUsage.targetInstance = curEvent.targetInstance;
                        }
                    }
                    switch ( curEvent.type ) {
                        case "damage":
                            if ( curEvent.hasOwnProperty("tick") ) {
                                // damage of type "tick" is simulated DOT damage
                            } else {
                                // direct damage from use of a skill

                                // create array if no previous damage events for this cast (allow for multiple hits per cast - multitarget or effects like Barrage)
                                if ( !curUsage.hasOwnProperty("damage") ) { curUsage.damage = []; }

                                // push this damage event onto array
                                curUsage.damage.push({
                                    amount: curEvent.amount,
                                    absorbed: curEvent.absorbed,
                                    criticalhit: ( curEvent.hitType === 2 ),
                                    directhit: ( curEvent.multistrike === true ),
                                    debugMultiplier: curEvent.debugMultiplier,
                                    sourceResources: curEvent.sourceResources,
                                    targetResources: curEvent.targetResources,
                                    timestamp: curEvent.timestamp
                                });
                            }
                            break;
                        case "heal":
                            if ( curEvent.hasOwnProperty("tick") ) {
                                // damage of type "tick" is simulated heal over time
                            } else {
                                // direct heal from use of a skill

                                // create array if no previous heal events for this cast (allow for multiple hits per cast - multitarget)
                                if ( !curUsage.hasOwnProperty("heal") ) { curUsage.heal = []; }

                                // push this heal event onto array
                                curUsage.heal.push({
                                    amount: curEvent.amount,
                                    overheal: curEvent.overheal,
                                    criticalhit: ( curEvent.hitType === 2 ),
                                    sourceResources: curEvent.sourceResources,
                                    targetResources: curEvent.targetResources,
                                    timestamp: curEvent.timestamp
                                });
                            }
                            break;
                        case "applydebuff":
                            if ( !curUsage.hasOwnProperty("debuffs") ) {
                                curUsage.debuffs = [];
                            }
                            var debuffed = curUsage.debuffs.filter(function(obj){
                                return obj.targetID === curEvent.targetID;
                            });
                            if ( debuffed.length > 0 ) {
                                debuffed[0].targetInstances.push(curEvent.targetInstance);
                            } else {
                                curUsage.debuffs.push({
                                    targetID: curEvent.targetID,
                                    targetInstances: [curEvent.targetInstance],
                                    starttime: curEvent.timestamp
                                })
                            }
                            break;
                        case "removedebuff":
                            if ( !curUsage.hasOwnProperty("debuffs") ) {
                                console.log("removedebuff event occurred outside of a cast event");
                            } else {
                                var debuffed = curUsage.debuffs.filter(function(obj){
                                    return obj.targetID === curEvent.targetID;
                                });
                                if ( debuffed.length > 0 ) {
                                    debuffed[0].endtime = curEvent.timestamp;
                                } else {
                                    console.log("removedebuff event occurred without a matching target for the debuff")
                                }
                            }
                            break;
                        case "applybuff":
                            if ( !curUsage.hasOwnProperty("buffs") ) {
                                curUsage.buffs = [];
                            }
                            var buffed = curUsage.buffs.filter(function(obj){
                                return obj.targetID === curEvent.targetID;
                            });
                            if ( buffed.length > 0 ) {
                                buffed[0].targetInstances.push(curEvent.targetInstance);
                            } else {
                                curUsage.buffs.push({
                                    targetID: curEvent.targetID,
                                    targetInstances: [curEvent.targetInstance],
                                    starttime: curEvent.timestamp
                                })
                            }
                            break;
                        case "removebuff":
                            if ( !curUsage.hasOwnProperty("buffs") ) {
                                console.log("removebuff event occurred outside of a cast event");
                            } else {
                                var buffed = curUsage.buffs.filter(function(obj){
                                    return obj.targetID === curEvent.targetID;
                                });
                                if ( buffed.length > 0 ) {
                                    buffed[0].endtime = curEvent.timestamp;
                                } else {
                                    console.log("removebuff event occurred without a matching target for the buff")
                                }
                            }
                            break;
                        case "refreshdebuff":
                            // TODO: implement handling for refreshdebuff
                            break;
                        case "refreshbuff":
                            // TODO: implement handling for refreshdebuff
                            break;
                        case "begincast":
                            // TODO: implement handling for begincast (channeled skills)
                            break;
                        default:
                            console.log("unhandled event of type " + curEvent.type);
                            break;
                    }
                }
            }
            // After processing all events in log, add current usage information to stack (if any)
            if ( curUsage !== null ) { curSkill.usages.push(curUsage); }

            // Aggregate information about usages
            curSkill.count = curSkill.usages.length;
            curSkill.hits = 0;
            curSkill.criticalhits = 0;
            curSkill.directhits = 0;
            curSkill.criticaldirecthits = 0;
            curSkill.damage = 0;
            curSkill.heal = 0;
            curSkill.overheal = 0;
            curSkill.usages.forEach(function(curUsage){
                if ( curUsage.hasOwnProperty("damage") ) {
                    curSkill.hits += curUsage.damage.length;
                    curUsage.damage.forEach(function(curHit){
                        curSkill.damage += curHit.amount;
                        if ( curHit.criticalhit && curHit.directhit ) {
                            curSkill.criticaldirecthits++;
                        }
                        else {
                            if ( curHit.criticalhit ) {
                                curSkill.criticalhits++;
                            }
                            if ( curHit.directhit ) {
                                curSkill.directhits++;
                            }
                        }
                    });
                }

                if ( curUsage.hasOwnProperty("heal") ) {
                    curSkill.hits += curUsage.heal.length;
                    curUsage.heal.forEach(function(curHit){
                        curSkill.heal += curHit.amount;
                        curSkill.overheal += curHit.overheal;
                        if ( curHit.criticalhit ) {
                            curSkill.criticalhits++;
                        }
                    });
                }
            });
            curSkill.critPct = (Math.floor(curSkill.criticalhits / curSkill.hits * 10000) / 100).toFixed(2) + "%";
            curSkill.dhitPct = (Math.floor(curSkill.directhits / curSkill.hits * 10000) / 100).toFixed(2) + "%";
            curSkill.critdhitPct = (Math.floor(curSkill.criticaldirecthits / curSkill.hits * 10000) / 100).toFixed(2) + "%";
        });
    };

    model.worlds = ko.observableArray([
        {world: "Adamantoise", region: "NA"}
        ,{world: "Balmung", region: "NA"}
        ,{world: "Cactuar", region: "NA"}
        ,{world: "Coeurl", region: "NA"}
        ,{world: "Faerie", region: "NA"}
        ,{world: "Gilgamesh", region: "NA"}
        ,{world: "Goblin", region: "NA"}
        ,{world: "Jenova", region: "NA"}
        ,{world: "Mateus", region: "NA"}
        ,{world: "Midgardsormr", region: "NA"}
        ,{world: "Adamantoise", region: "NA"}
        ,{world: "Sargatanas", region: "NA"}
        ,{world: "Siren", region: "NA"}
        ,{world: "Zalera", region: "NA"}
        ,{world: "Behemoth", region: "NA"}
        ,{world: "Brynhildr", region: "NA"}
        ,{world: "Diabolos", region: "NA"}
        ,{world: "Excalibur", region: "NA"}
        ,{world: "Exodus", region: "NA"}
        ,{world: "Famfrit", region: "NA"}
        ,{world: "Hyperion", region: "NA"}
        ,{world: "Lamia", region: "NA"}
        ,{world: "Leviathan", region: "NA"}
        ,{world: "Marlboro", region: "NA"}
        ,{world: "Ultros", region: "NA"}
        ,{world: "Cerberus", region: "EU"}
        ,{world: "Lich", region: "EU"}
        ,{world: "Louisoix", region: "EU"}
        ,{world: "Moogle", region: "EU"}
        ,{world: "Odin", region: "EU"}
        ,{world: "Omega", region: "EU"}
        ,{world: "Phoenix", region: "EU"}
        ,{world: "Ragnarok", region: "EU"}
        ,{world: "Shiva", region: "EU"}
        ,{world: "Zodiark", region: "EU"}
        ,{world: "Aegis", region: "JP"}
        ,{world: "Atomos", region: "JP"}
        ,{world: "Carbuncle", region: "JP"}
        ,{world: "Garuda", region: "JP"}
        ,{world: "Gungnir", region: "JP"}
        ,{world: "Kujata", region: "JP"}
        ,{world: "Ramuh", region: "JP"}
        ,{world: "Tonberry", region: "JP"}
        ,{world: "Typhon", region: "JP"}
        ,{world: "Unicorn", region: "JP"}
        ,{world: "Alexander", region: "JP"}
        ,{world: "Bahamut", region: "JP"}
        ,{world: "Durandal", region: "JP"}
        ,{world: "Fenrir", region: "JP"}
        ,{world: "Ifrit", region: "JP"}
        ,{world: "Ridill", region: "JP"}
        ,{world: "Tiamat", region: "JP"}
        ,{world: "Ultima", region: "JP"}
        ,{world: "Valefor", region: "JP"}
        ,{world: "Yojimbo", region: "JP"}
        ,{world: "Zeromus", region: "JP"}
        ,{world: "Anima", region: "JP"}
        ,{world: "Asura", region: "JP"}
        ,{world: "Belias", region: "JP"}
        ,{world: "Chocobo", region: "JP"}
        ,{world: "Hades", region: "JP"}
        ,{world: "Ixion", region: "JP"}
        ,{world: "Mandragora", region: "JP"}
        ,{world: "Masamune", region: "JP"}
        ,{world: "Pandaemonium", region: "JP"}
        ,{world: "Shinryu", region: "JP"}
        ,{world: "Titan", region: "JP"}
    ]);
};

ko.applyBindings(new parserViewModel());