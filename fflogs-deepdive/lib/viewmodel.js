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
                                job: spec.spec,
                                joblink: "lib/jobs/icons/" + spec.spec + ".png",
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
        fightdata.selectedFriendly.subscribe(function(newValue){
            var selected = fightdata.friendlies.filter(function(f){
                return f.id === newValue;
            });
            if ( selected.length > 0 ) {
                console.log(selected[0].parsedActions);
                console.log(selected[0].jobParser);
                console.log(selected[0].jobActions);
            }
        });
        fightdata.selectedFriendlySkills = ko.computed(function(){
           var selected = fightdata.friendlies.filter(function(f){
               return f.id === fightdata.selectedFriendly();
           });
           if ( selected.length > 0 ) {
               return {
                   display: selected[0].name,
                   damage: []
               };
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

        actor.jobParser = getJobParser(actor.type);
        actor.events = events;
        actor.parsedActions = parseActions(events);
        actor.jobActions = parseJobActions(actor.jobParser,actor.parsedActions);
    };
    var getJobParser = function(jobName){
        var jobURL = "lib/jobs/" + jobName + ".json";

        var xhr = new XMLHttpRequest();
        xhr.open("GET", jobURL, false);
        xhr.send();
        if ( xhr.status === 200 ) { return JSON.parse(xhr.responseText); }
        else { return {}; }
    };
    var parseActions = function(events){
        var parsedActions = [],
            processingAction = null;

        // Pull the first event off the stack - will always create a new fight event for this
        while ( e = events.shift() ) {
            if (processingAction === null) {
                processingAction = new fightAction(e);
                // Skip further processing if this first event is a begincast or cast event - avoid pushing a duplicate first action onto the parsedAction stack
                if (e.type === "begincast" || e.type === "cast") {
                    continue;
                }
            }
            switch (e.type) {
                case "begincast":
                    // Begincast type events indicate start of a new actionwith a cast time
                    // Push previous action onto the stack of actions and create a new action
                    parsedActions.push(processingAction);
                    processingAction = new fightAction(e);
                    break;
                case "cast":
                    // Cast type events may indicate start of a new skill, unless preceeded by a begincast event
                    // Push previous skill onto the stack of skills (processingEvent will be null for the first occurrence of a skill, nothing to push onto stack)
                    if (processingAction.begincast > 0 && processingAction.endcast == null) {
                        // Cast event for a channeled skill that is currently being processed
                        processingAction.endcast = e.timestamp;
                    } else {
                        parsedActions.push(processingAction);
                        processingAction = new fightAction(e);
                    }
                    break;
                case "damage":
                    if (e.hasOwnProperty("tick")) {
                        // damage of type "tick" is simulated DOT damage
                    } else {
                        // direct damage from use of a skill
                        if (!processingAction.hasOwnProperty("damage")) {
                            processingAction.damage = [];
                        }
                        // push this damage event onto array
                        processingAction.damage.push({
                            amount: e.amount,
                            absorbed: e.absorbed,
                            criticalhit: (e.hitType === 2),
                            directhit: (e.multistrike === true),
                            debugMultiplier: e.debugMultiplier,
                            sourceResources: e.sourceResources,
                            targetResources: e.targetResources,
                            timestamp: e.timestamp
                        });
                    }
                    break;
                case "heal":
                    if (e.hasOwnProperty("tick")) {
                        // damage of type "tick" is simulated heal over time
                    } else {
                        // direct heal from use of a skill
                        if (!processingAction.hasOwnProperty("heal")) {
                            processingAction.heal = [];
                        }
                        // push this heal event onto array
                        processingAction.heal.push({
                            amount: e.amount,
                            overheal: e.overheal,
                            criticalhit: (e.hitType === 2),
                            sourceResources: e.sourceResources,
                            targetResources: e.targetResources,
                            timestamp: e.timestamp
                        });
                    }
                    break;
                case "applydebuff":
                    if (!processingAction.hasOwnProperty("debuffs")) {
                        processingAction.debuffs = [];
                    }
                    debuffed = processingAction.debuffs.filter(function (obj) {
                        return obj.targetID === e.targetID;
                    });
                    if (debuffed.length > 0) {
                        debuffed[0].targetInstances.push(e.targetInstance);
                    } else {
                        processingAction.debuffs.push({
                            targetID: e.targetID,
                            targetInstances: [e.targetInstance],
                            starttime: e.timestamp
                        })
                    }
                    break;
                case "removedebuff":
                    if (!processingAction.hasOwnProperty("debuffs")) {
                        console.log("removedebuff event occurred outside of a cast event");
                    } else {
                        debuffed = processingAction.debuffs.filter(function (obj) {
                            return obj.targetID === e.targetID;
                        });
                        if (debuffed.length > 0) {
                            debuffed[0].endtime = e.timestamp;
                        } else {
                            console.log("removedebuff event occurred without a matching target for the debuff")
                        }
                    }
                    break;
                case "applybuff":
                    if (!processingAction.hasOwnProperty("buffs")) {
                        processingAction.buffs = [];
                    }
                    buffed = processingAction.buffs.filter(function (obj) {
                        return obj.targetID === e.targetID;
                    });
                    if (buffed.length > 0) {
                        buffed[0].targetInstances.push(e.targetInstance);
                    } else {
                        processingAction.buffs.push({
                            targetID: e.targetID,
                            targetInstances: [e.targetInstance],
                            starttime: e.timestamp
                        })
                    }
                    break;
                case "removebuff":
                    if (!processingAction.hasOwnProperty("buffs")) {
                        console.log("removebuff event occurred outside of a cast event");
                    } else {
                        var buffed = processingAction.buffs.filter(function (obj) {
                            return obj.targetID === e.targetID;
                        });
                        if (buffed.length > 0) {
                            buffed[0].endtime = e.timestamp;
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
                default:
                    console.log("unhandled event of type " + e.type);
                    break;
            }
        }
        // After processing all events in log, add current usage information to stack (if any)
        if ( processingAction !== null ) { parsedActions.push(processingAction); }

        return parsedActions;
    };
    var parseJobActions = function(jobParser,parsedActions) {
        // return an empty array without property if jobParser or parsedActions are empty - nothing to do
        if ( !jobParser.hasOwnProperty("class") ) { return [] }
        if ( parsedActions.length === 0 ) { return [] }

        var jobActions = {};
        // collect aggregations for job skills
        if ( jobParser.hasOwnProperty("skills") ) {
            jobActions.skills = [];
            var curSkill;

            jobParser.skills.forEach(function(skill){
                curSkill = $.extend(true, {
                    count: 0,
                    hits: 0,
                    crits: 0,
                    dhits: 0,
                    critdhits: 0,
                    damage: 0,
                    heal: 0,
                    overheal: 0,
                    absorb: 0
                }, skill);
                usages = parsedActions.filter(function(obj){
                    return obj.ability.name === skill.name;
                });

                curSkill.count = usages.length;
                usages.forEach(function(u){
                    if ( u.hasOwnProperty("damage") ) {
                        curSkill.hits += u.damage.length;
                        u.damage.forEach(function (hit) {
                            if (hit.criticalhit) {
                                if (hit.directhit) curSkill.critdhits++;
                                else curSkill.crits++;
                            } else {
                                if (hit.directhit) curSkill.dhits++;
                            }
                        });
                    }

                    if ( u.hasOwnProperty("heal") ) {
                        curSkill.hits += u.heal.length;
                        u.heal.forEach(function (hit) {
                            curSkill.heal += hit.amount;
                            curSkill.absorb += hit.absorbed;
                            curSkill.overheal += hit.overheal;
                            if (hit.criticalhit) curSkill.crits++;
                        });
                    }
                });

                curSkill.critPct = (Math.floor(curSkill.crits / curSkill.hits) * 10000 / 100).toFixed(2) + "%";
                curSkill.dhitPct = (Math.floor(curSkill.dhits / curSkill.hits) * 10000 / 100).toFixed(2) + "%";
                curSkill.critdhitPct = (Math.floor(curSkill.critdhits / curSkill.hits) * 10000 / 100).toFixed(2) + "%";

                jobActions.skills.push(curSkill);
            });
        }

        return jobActions;
    };
    var fightAction = function(e){
        this.ability = e.ability;
        this.sourceID = e.sourceID;
        this.sourceIsFriendly = e.sourceIsFriendly;
        this.targetID = e.targetID;
        this.targetIsFriendly = e.targetIsFriendly;
        if ( e.targetIsFriendly === false ) {
            this.targetInstance = [e.targetInstance];
        }
        this.begincast = e.timestamp;
        this.endcast = ( e.type === "begincast" ) ? null : e.timestamp;
        this.type = null;
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