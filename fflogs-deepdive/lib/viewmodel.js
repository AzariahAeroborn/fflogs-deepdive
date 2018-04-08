let parserViewModel = function(){
    let model = this;

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
        let baseURL = "https://www.fflogs.com/v1/parses/character/";
        let world = model.selectedWorld();
        let character = model.characterName();
        let apiKey = model.apiKey();

        let xhr = new XMLHttpRequest;
        xhr.onreadystatechange = function() {
            if ( this.readyState === 4 && this.status === 200 ) {
                // clear fights array - prevent adding fights over and over on re-search
                model.fightlist.removeAll();

                let apiResponse = JSON.parse(this.responseText);
                let searchResults = {};
                searchResults.character = character;
                searchResults.bossList = [];
                apiResponse.forEach(function(boss){
                    let bossData = {
                        name: boss.name,
                        clears: []
                    };
                    boss.specs.forEach(function(spec){
                        spec.data.forEach(function(clear){
                            let clearMinutes = Math.floor(clear.duration / 60000);
                            let clearSeconds = ((clear.duration % 60000) / 1000).toFixed(0);
                            let clearDate = new Date(clear.start_time);

                            let clearData = {
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
        let baseURL = "https://www.fflogs.com/v1/report/fights/";
        let reportid = clear.reportid;
        let fight = clear.fight;
        let apiKey = model.apiKey();

        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if ( this.readyState === 4 && this.status === 200 ) {
                let apiResponse = JSON.parse(this.responseText);
                let clearDate = new Date(apiResponse.start);

                let fightdata = {
                    fightlink: "#fight-" + reportid + "-" + fight,
                    fightid: "fight-" + reportid + "-" + fight,
                    date: clearDate.toLocaleDateString('en-US',{month: 'short', day: 'numeric'})
                };

                let f = apiResponse.fights.filter(function(obj){
                    return obj.id === fight;
                });

                fightdata.start = f[0].start_time;
                fightdata.name = f[0].name;

                fightdata.displayname = fightdata.name + " - " + fightdata.date;

                fightdata.friendlies = apiResponse.friendlies.filter(function(obj){
                   let isfound = obj.fights.filter(function(o){
                       return o.id === fight;
                   });
                   return isfound.length > 0;
                });
                fightdata.friendlyPets = apiResponse.friendlyPets.filter(function(obj){
                    let isfound = obj.fights.filter(function(o){
                        return o.id === fight;
                    });
                    return isfound.length > 0;
                });
                fightdata.enemies = apiResponse.enemies.filter(function(obj){
                    let isfound = obj.fights.filter(function(o){
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
        let baseURL = "https://www.fflogs.com/v1/report/events/";
        let apiKey = model.apiKey();
        fightdata.events = [];
        let duration = endtime - starttime;

        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                let apiResponse = JSON.parse(this.responseText);
                fightdata.events = fightdata.events.concat(apiResponse.events);

                if ( apiResponse.nextPageTimestamp < endtime ) {
                    starttime = apiResponse.nextPageTimestamp;
                    $("#progressbar").progressbar( "option", "value", Math.floor((1 - (endtime - apiResponse.nextPageTimestamp) / duration) * 100) );
                    xhr.open("GET", baseURL + reportid + "?api_key=" + apiKey + "&start=" + starttime + "&end=" + endtime, true);
                    xhr.send();
                } else {
                    $("#progressmodal").dialog( "close" );
                    model.parseFight(fightdata);
                }
            }
        };
        $("#progressbar").progressbar( "option", "value", 0 );
        $("#progressmodal").dialog( "open" );
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
            let selected = fightdata.friendlies.filter(function(f){
                return f.id === newValue;
            });
            if ( selected.length > 0 ) {
                console.log(selected[0].parsedActions);
                console.log(selected[0].jobParser);
                console.log(selected[0].jobActions);
                console.log(selected[0].gcdSummary);
            }
        });
        fightdata.selectedFriendlySkills = ko.computed(function(){
           let selected = fightdata.friendlies.filter(function(f){
               return f.id === fightdata.selectedFriendly();
           });
           if ( selected.length > 0 ) {
               let retval = {};
               retval.display = selected[0].name;
               retval.damage = [];
               if ( selected[0].hasOwnProperty("jobActions") && selected[0].jobActions.hasOwnProperty("skills") && selected[0].jobActions.skills.length > 0 ) {
                   retval.damage.push({
                       gcd: selected[0].jobActions.skills.filter(function (obj) {
                           return obj.isGCD && obj.count > 0;
                       }).sort(function(a,b){ return b.count > a.count }),
                       ogcd: selected[0].jobActions.skills.filter(function (obj) {
                           return !obj.isGCD && obj.count > 0;
                       }).sort(function(a,b){ return b.count > a.count }),
                       minGCD: null,
                       thresholds: []
                   });
               }
               if ( selected[0].hasOwnProperty("gcdSummary") && selected[0].gcdSummary.hasOwnProperty("thresholds") && selected[0].gcdSummary.thresholds.length > 0 ) {
                   retval.damage[0].minGCD = (selected[0].gcdSummary.min / 1000).toFixed(2) + "s";
                   retval.damage[0].thresholds = selected[0].gcdSummary.thresholds;
               }
               return retval;
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

        let defaultFriendly = fightdata.friendlies.filter(function(obj){
            return obj.name === model.characterName();
        });
        if ( defaultFriendly.length > 0 ) {
            fightdata.selectedFriendly(defaultFriendly[0].id);
        }

        model.fights.push(fightdata);
    };
    let parseActorEvents = function(actor,fightdata) {
        let id = actor.id;
        let events = fightdata.events.filter(function (obj) {
            return obj.sourceID === id;
        });

        if (classParsers.hasOwnProperty(actor.type)) { actor.jobParser = new classParsers[actor.type](); }
        else { actor.jobParser = new classParsers["defParser"](); }

        actor.events = events;
        actor.parsedActions = actor.jobParser.parseActions($.extend(true, [], events));
        actor.jobActions = actor.jobParser.aggregateActions(actor.parsedActions);
        if ( actor.jobActions.hasOwnProperty("skills") ) { actor.gcdSummary = actor.jobParser.aggregateGCD(actor.parsedActions); }
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