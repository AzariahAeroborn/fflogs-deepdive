/**
 * Created by nengelberth on 7/12/2017.
 */
var parserViewModel = function() {
    var model = this;

    var job = function(job, displayName, offHand, mainStat, speedStat, roleStat, weaponDamageMod) {
        this.job = job;
        this.displayName = displayName;
        this.offHand = offHand;
        this.mainStat = mainStat;
        this.speedStat = speedStat;
        this.roleStat = roleStat;
        this.weaponDamageMod = weaponDamageMod;
    };

    model.jobList = ko.observableArray([
        new job("PLD","Paladin",true,"strength","skillspeed","tenacity",100)
        ,new job("WAR","Warrior",false,"strength","skillspeed","tenacity",105)
        ,new job("DRK","Dark Knight",false,"strength","skillspeed","tenacity",105)
        ,new job("WHM","White Mage",false,"mind","spellspeed","piety",115)
        ,new job("SCH","Scholar",false,"mind","spellspeed","piety",115)
        ,new job("AST","Astrologian",false,"mind","spellspeed","piety",115)
        ,new job("BRD","Bard",false,"dexterity","skillspeed",null,115)
        ,new job("MCH","Machinist",false,"dexterity","skillspeed",null,115)
        ,new job("NIN","Ninja",false,"dexterity","skillspeed",null,110)
        ,new job("MNK","Monk",false,"strength","skillspeed",null,110)
        ,new job("SAM","Samurai",false,"strength","skillspeed",null,112)
        ,new job("DRG","Dragoon",false,"strength","skillspeed",null,115)
        ,new job("BLM","Black Mage",false,"intelligence","spellspeed",null,115)
        ,new job("SMN","Summoner",false,"intelligence","spellspeed",null,115)
        ,new job("RDM","Red Mage",false,"intelligence","spellspeed",null,115)
    ]);
    model.statNames = ko.observableArray([
        {stat: "strength", name: "Strength", type: "mainStat"}
        ,{stat: "mind", name: "Mind", type: "mainStat"}
        ,{stat: "dexterity", name: "Dexterity", type: "mainStat"}
        ,{stat: "intelligence", name: "Intelligence", type: "mainStat"}
        ,{stat: "criticalhit", name: "Critical Hit", type: "generalStat"}
        ,{stat: "directhit", name: "Direct Hit", type: "generalStat"}
        ,{stat: "determination", name: "Determination", type: "generalStat"}
        ,{stat: "vitality", name: "Vitality", type: "generalStat"}
        ,{stat: "skillspeed", name: "Skill Speed", type: "speedStat"}
        ,{stat: "spellspeed", name: "Spell Speed", type: "speedStat"}
        ,{stat: "tenacity", name: "Tenacity", type: "roleStat"}
        ,{stat: "piety", name: "Piety", type: "roleStat"}
    ]);
    model.foodList = ko.observableArray([
        {name: "Crimson Cider", stats: [{stat: "criticalhit", increase: 0.05, max: 88},{stat: "directhit", increase: 0.03, max: 46},{stat: "vitality", increase: 0.05, max: 98}] }
       ,{name: "Dzo Steak", stats: [{stat: "tenacity", increase: 0.05, max: 88},{stat: "determination", increase: 0.03, max: 45},{stat: "vitality", increase: 0.05, max: 98}] }
       ,{name: "Futo-maki Roll", stats: [{stat: "directhit", increase: 0.05, max: 88},{stat: "determination", increase: 0.03, max: 45},{stat: "vitality", increase: 0.05, max: 98}] }
       ,{name: "Oden", stats: [{stat: "spellspeed", increase: 0.05, max: 88},{stat: "determination", increase: 0.03, max: 45},{stat: "vitality", increase: 0.05, max: 98}] }
       ,{name: "Sauteed Green Leeks", stats: [{stat: "skillspeed", increase: 0.05, max: 88},{stat: "determination", increase: 0.03, max: 45},{stat: "vitality", increase: 0.05, max: 98}] }
       ,{name: "Tako-yaki", stats: [{stat: "determination", increase: 0.05, max: 85},{stat: "criticalhit", increase: 0.03, max: 46},{stat: "vitality", increase: 0.05, max: 98}] }
       ,{name: "Tofu Pancakes", stats: [{stat: "piety", increase: 0.05, max: 85},{stat: "determination", increase: 0.03, max: 45},{stat: "vitality", increase: 0.05, max: 98}] }
    ]);
    model.selectedJob = ko.observable();
    model.mainStatName = ko.computed(function() {
        // early return if no class selected yet
        if ( model.selectedJob() === null || model.selectedJob() === undefined ) { return "" }

        var mainStat = ko.utils.arrayFirst(model.statNames(), function(stat){
            return stat.stat === model.selectedJob().mainStat;
        });
        return mainStat.name;
    });
    model.speedStatName = ko.computed(function() {
        // early return if no class selected yet
        if ( model.selectedJob() === null || model.selectedJob() === undefined ) { return "" }

        var speedStat = ko.utils.arrayFirst(model.statNames(), function(stat){
            return stat.stat === model.selectedJob().speedStat;
        });
        return speedStat.name;
    });
    model.roleStatName = ko.computed(function() {
        // early return if no class selected yet, or if class does not have a specified roleStat
        if ( model.selectedJob() === null || model.selectedJob() === undefined ) { return null }
        if ( model.selectedJob().roleStat === null ) { return null }

        var roleStat = ko.utils.arrayFirst(model.statNames(), function(stat){
            return stat.stat === model.selectedJob().roleStat;
        });
        return roleStat.name;
    });

    model.weaponDamage = ko.observable(0);
    model.mainStat = ko.observable(292);
    model.criticalHit = ko.observable(364);
    model.directHit = ko.observable(364);
    model.determination = ko.observable(292);
    model.speedStat = ko.observable(364);
    model.roleStat = ko.observable(364);

    function effectiveWeaponDamage(weaponDamage,weaponDamageMod) {
        return Number(weaponDamage) + Math.floor(292 * weaponDamageMod / 1000);
    }
    function mainStatDamage(mainStat) {
        // include 3% party bonus to main stat
        mainStat = Math.floor(mainStat * 1.03);
        return ( 100 + Math.floor( (mainStat - 292) * 1000 / 2336 ) ) / 100;
    }
    function criticalHitRate(criticalHit) {
       return Math.floor(200 * (criticalHit - 364) / 2170 + 50) / 1000;
    }
    function criticalHitDamage(criticalHit) {
        return ( 1000 + Math.floor(200 * (criticalHit - 364) / 2170 + 400 ) ) / 1000;
    }
    function directHitRate(directHit) {
        return Math.floor(550 * (directHit - 364) / 2170) / 1000;
    }
    function directHitDamage() { return 1.25 }
    function determinationDamage(determination) {
        return ( 1000 + Math.floor(130 * (determination - 292) / 2170) ) / 1000;
    }
    function speedDamage(speedStat) {
        return 1000 / ( 1000 - Math.floor(130 * (speedStat - 364) / 2170) );
    }
    function roleStatDamage(roleStatName,roleStat) {
        if ( roleStatName === "tenacity" ) {
            return Math.floor(1000 + Math.floor(100 * (roleStat - 364) / 2170)) / 1000;
        }
        // Default multiplier of 1 - for either when no class is selected, or classes that don't get tenacity damage modifier
        return 1;
    }
    function hitDamage(weaponDamage, weaponDamageMod, mainStat, criticalHit, directHit, determination, roleStatName, roleStat) {
        var _criticalHitRate = criticalHitRate(criticalHit);
        var _criticalHitDamage = criticalHitDamage(criticalHit);
        var _directHitRate = directHitRate(directHit);
        var _directHitDamage = directHitDamage();

        // calculate base damage of a 100 potency attack
        var baseDamage = Math.floor(100 * effectiveWeaponDamage(weaponDamage,weaponDamageMod) * mainStatDamage(mainStat));
        baseDamage = Math.floor(baseDamage * determinationDamage(determination));
        baseDamage = Math.floor(baseDamage * roleStatDamage(roleStatName,roleStat) / 100);
        var damage =
            // Normal hit rate * base damage
            ( 1 - _criticalHitRate - _directHitRate + _criticalHitRate * _directHitRate ) * baseDamage +
            // Critical hit rate * critical damage (exclude critical + direct hits)
            ( _criticalHitRate * ( 1 - _directHitRate ) ) * baseDamage * _criticalHitDamage +
            // Direct hit rate * direct hit damage (exclude critical + direct hits)
            ( _directHitRate * ( 1 - _criticalHitRate ) ) * baseDamage * _directHitDamage +
            // Critical+Direct Hit rate * critical damage * direct hit damage
            ( _criticalHitRate * _directHitRate ) * baseDamage * _criticalHitDamage * _directHitDamage;
        return Math.floor(10*damage)/10;
    }
    function dotDamage(weaponDamage, weaponDamageMod, mainStat, criticalHit, directHit, determination, speedStat, roleStatName, roleStat) {
        var _criticalHitRate = criticalHitRate(criticalHit);
        var _criticalHitDamage = criticalHitDamage(criticalHit);
        var _directHitRate = directHitRate(directHit);
        var _directHitDamage = directHitDamage();

        // calculate base damage of a 100 potency attack
        var baseDamage = Math.floor(100 * effectiveWeaponDamage(weaponDamage,weaponDamageMod) * mainStatDamage(mainStat));
        baseDamage = Math.floor(baseDamage * determinationDamage(determination) * speedDamage(speedStat) );
        baseDamage = Math.floor(baseDamage * roleStatDamage(roleStatName,roleStat) / 100);
        var damage =
            // Normal hit rate * base damage
            ( 1 - _criticalHitRate - _directHitRate + _criticalHitRate * _directHitRate ) * baseDamage +
            // Critical hit rate * critical damage (exclude critical + direct hits)
            ( _criticalHitRate * ( 1 - _directHitRate ) ) * baseDamage * _criticalHitDamage +
            // Direct hit rate * direct hit damage (exclude critical + direct hits)
            ( _directHitRate * ( 1 - _criticalHitRate ) ) * baseDamage * _directHitDamage +
            // Critical+Direct Hit rate * critical damage * direct hit damage
            ( _criticalHitRate * _directHitRate ) * baseDamage * _criticalHitDamage * _directHitDamage;
        return Math.floor(10*damage)/10;
    }

    model.criticalHitRateDisplay = ko.computed(function() {
        return Math.floor(criticalHitRate(model.criticalHit())*1000)/10 + "%";
    });
    model.criticalHitDamageDisplay = ko.computed(function() {
        return "+" + Math.floor( (criticalHitDamage(model.criticalHit()) - 1)*1000)/10 + "%";
    });
    model.directHitRateDisplay = ko.computed(function() {
        return Math.floor( directHitRate(model.directHit())*1000)/10 + "%";
    });
    model.directHitDamageDisplay = ko.computed(function() {
        return "+" + Math.floor( (directHitDamage() - 1)*1000)/10 + "%";
    });
    model.determinationDamageDisplay = ko.computed(function() {
        return "+" + Math.floor( (determinationDamage(model.determination()) - 1)*1000)/10 + "%";
    });
    model.speedDamageDisplay = ko.computed(function() {
        return "+" + Math.floor( (speedDamage(model.speedStat()) - 1)*1000)/10 + "%";
    });
    model.roleStatDamageDisplay = ko.computed(function() {
        if ( model.selectedJob() ) {
            if ( model.selectedJob().roleStat === "tenacity" ) {
                return "+" + Math.floor( (roleStatDamage("tenacity",model.roleStat()) - 1)*1000)/10 + "%";
            }
        }
        // Return an empty string if no selected job, or if the selected job doesn't have Tenacity as its role skill
        // No role stat damage effect except for Tenacity
        return "";
    });

    model.hitDamage = ko.computed(function() {
        // Default to 100 for weaponDamageMod if no job is selected (safety for initialization)
        var weaponDamageMod = 100;
        if ( model.selectedJob() ) { weaponDamageMod = model.selectedJob().weaponDamageMod }
        // Default to empty string for roleStatName if no job is selected (safety for initialization)
        var roleStatName = "";
        if ( model.selectedJob() ) { roleStatName = model.selectedJob().roleStat }

        return hitDamage(
            model.weaponDamage(),
            weaponDamageMod,
            model.mainStat(),
            model.criticalHit(),
            model.directHit(),
            model.determination(),
            roleStatName,
            model.roleStat()
        );
    });
    model.dotDamage = ko.computed(function() {
        // Default to 100 for weaponDamageMod if no job is selected (safety for initialization)
        var weaponDamageMod = 100;
        if ( model.selectedJob() ) { weaponDamageMod = model.selectedJob().weaponDamageMod }
        // Default to empty string for roleStatName if no job is selected (safety for initialization)
        var roleStatName = "";
        if ( model.selectedJob() ) { roleStatName = model.selectedJob().roleStat }

        return dotDamage(
            model.weaponDamage(),
            weaponDamageMod,
            model.mainStat(),
            model.criticalHit(),
            model.directHit(),
            model.determination(),
            model.speedStat(),
            roleStatName,
            model.roleStat()
        );
    });
    model.foodEffects = ko.computed(function() {
        // early return if no class selected yet
        if ( model.selectedJob() === null || model.selectedJob() === undefined ) { return null }

        // filter to only food that is effective for class (remove tenacity/piety except for classes that use that role stat, remove food with "wrong" speed stat)
        var food = ko.utils.arrayFilter(model.foodList(), function(food){
           var returnVal = true;
           ko.utils.arrayForEach(food.stats, function(foodstat){
               var statDetails = ko.utils.arrayFirst(model.statNames(), function(statinfo){
                   return statinfo.stat === foodstat.stat;
               });
               switch ( statDetails.type ) {
                   case "speedStat":
                       // eliminate this food if it's for the wrong speed stat
                       if ( model.selectedJob().speedStat !== foodstat.stat ) { returnVal = false }
                       break;
                   case "roleStat":
                       // eliminate this food if it's for a role stat the selected class does not use
                       if ( model.selectedJob().roleStat !== foodstat.stat ) { returnVal = false }
                       break;
                   case "generalStat":
                   default:
                       // do nothing - continue with current returnVal flag
                       break;
               }
           });
           return returnVal;
        });

        ko.utils.arrayForEach(food, function(curFood){
            curFood.criticalHitEffect = ko.computed(function(){
               var foodEffect = ko.utils.arrayFirst(curFood.stats, function(stat){
                   return stat.stat === "criticalhit";
               });
               if ( foodEffect ) {
                   return Math.min(Math.floor(model.criticalHit() * foodEffect.increase),foodEffect.max);
               } else {
                   return "";
               }
            });
            curFood.directHitEffect = ko.computed(function(){
                var foodEffect = ko.utils.arrayFirst(curFood.stats, function(stat){
                    return stat.stat === "directhit";
                });
                if ( foodEffect ) {
                    return Math.min(Math.floor(model.directHit() * foodEffect.increase),foodEffect.max);
                } else {
                    return "";
                }
            });
            curFood.determinationEffect = ko.computed(function(){
                var foodEffect = ko.utils.arrayFirst(curFood.stats, function(stat){
                    return stat.stat === "determination";
                });
                if ( foodEffect ) {
                    return Math.min(Math.floor(model.determination() * foodEffect.increase),foodEffect.max);
                } else {
                    return "";
                }
            });
            curFood.speedEffect = ko.computed(function(){
                // early return if no class selected yet
                if ( model.selectedJob() === null || model.selectedJob() === undefined ) { return null }

                var foodEffect = ko.utils.arrayFirst(curFood.stats, function(stat){
                    return stat.stat === model.selectedJob().speedStat;
                });
                if ( foodEffect ) {
                    return Math.min(Math.floor(model.speedStat() * foodEffect.increase),foodEffect.max);
                } else {
                    return "";
                }
            });
            curFood.roleEffect = ko.computed(function(){
                // early return if no class selected yet
                if ( model.selectedJob() === null || model.selectedJob() === undefined ) { return null }

                var foodEffect = ko.utils.arrayFirst(curFood.stats, function(stat){
                    return stat.stat === model.selectedJob().roleStat;
                });
                if ( foodEffect ) {
                    return Math.min(Math.floor(model.roleStat() * foodEffect.increase),foodEffect.max);
                } else {
                    return "";
                }
            });
            curFood.hitDamage = ko.computed(function() {
                // Default to 100 for weaponDamageMod if no job is selected (safety for initialization)
                var weaponDamageMod = 100;
                if ( model.selectedJob() ) { weaponDamageMod = model.selectedJob().weaponDamageMod }
                // Default to empty string for roleStatName if no job is selected (safety for initialization)
                var roleStatName = "";
                if ( model.selectedJob() ) { roleStatName = model.selectedJob().roleStat }

                return hitDamage(
                    model.weaponDamage(),
                    weaponDamageMod,
                    model.mainStat(),
                    model.criticalHit() + curFood.criticalHitEffect(),
                    model.directHit() + curFood.directHitEffect(),
                    model.determination() + curFood.determinationEffect(),
                    roleStatName,
                    model.roleStat() + curFood.roleEffect()
                );
            });
            curFood.hitDamageEffect = ko.computed(function() {
                var change = curFood.hitDamage() / model.hitDamage();
                if ( change < 0 ) { return "-" + Math.Floor(change*1000)/10 + "%" }
                else { return "+" + Math.Floor(change*1000)/10 + "%" }
            });
            curFood.dotDamage = ko.computed(function() {
                // Default to 100 for weaponDamageMod if no job is selected (safety for initialization)
                var weaponDamageMod = 100;
                if ( model.selectedJob() ) { weaponDamageMod = model.selectedJob().weaponDamageMod }
                // Default to empty string for roleStatName if no job is selected (safety for initialization)
                var roleStatName = "";
                if ( model.selectedJob() ) { roleStatName = model.selectedJob().roleStat }

                return dotDamage(
                    model.weaponDamage(),
                    weaponDamageMod,
                    model.mainStat(),
                    model.criticalHit() + curFood.criticalHitEffect(),
                    model.directHit() + curFood.directHitEffect(),
                    model.determination() + curFood.determinationEffect(),
                    model.speedStat() + curFood.speedEffect(),
                    roleStatName,
                    model.roleStat() + curFood.roleEffect()
                );
            });
            curFood.dotDamageEffect = ko.computed(function() {
                var change = curFood.dotDamage() / model.dotDamage();
                if ( change < 0 ) { return "-" + Math.Floor(change*1000)/10 + "%" }
                else { return "+" + Math.Floor(change*1000)/10 + "%" }
            });
        });

        return food;
    });

    model.GearOptions = ko.observableArray([
        {class: "Paladin"
        ,stats: ["Strength", "Direct Hit", "Critical Hit", "Determination", "Skill Speed", "Vitality", "Tenacity"]
        ,weapon: [
                {
                    name: "Nightsteel Sword"
                   ,level: 350
                   ,damage: 101
                   ,stats: [{name: "strength", value: 225}
                        , {name: "directhit", value: null}
                        , {name: "criticalhit", value: null}
                        , {name: "determination", value: 204}
                        , {name: "skillspeed", value: 143}
                        , {name: "vitality", value: 241}
                        , {name: "tenacity", value: null}
                    ]
                   ,selected: ko.observable(true)
                }
               ,{
                    name: "Byakko's Stone Sword"
                   ,level: 355
                   ,damage: 101
                   ,stats: [{name: "strength", value: 231}
                        , {name: "directhit", value: null}
                        , {name: "criticalhit", value: 146}
                        , {name: "determination", value: null}
                        , {name: "skillspeed", value: 209}
                        , {name: "vitality", value: 249}
                        , {name: "tenacity", value: null}
                    ]
                    ,selected: ko.observable(false)
                }
                ,{
                    name: "Homura"
                    ,level: 360
                    ,damage: 102
                    ,stats: [{name: "strength", value: 236}
                        , {name: "directhit", value: null}
                        , {name: "criticalhit", value: 213}
                        , {name: "determination", value: null}
                        , {name: "skillspeed", value: null}
                        , {name: "vitality", value: 256}
                        , {name: "tenacity", value: 149}
                    ]
                    ,selected: ko.observable(false)
                }
                ,{
                    name: "Homura Kai"
                    ,level: 370
                    ,damage: 104
                    ,stats: [{name: "strength", value: 248}
                        , {name: "directhit", value: null}
                        , {name: "criticalhit", value: 222}
                        , {name: "determination", value: null}
                        , {name: "skillspeed", value: null}
                        , {name: "vitality", value: 271}
                        , {name: "tenacity", value: 156}
                    ]
                    ,selected: ko.observable(false)
                }
                ,{
                    name: "Diamond Sword"
                    ,level: 375
                    ,damage: 104
                    ,stats: [{name: "strength", value: 254}
                        , {name: "directhit", value: null}
                        , {name: "criticalhit", value: 159}
                        , {name: "determination", value: 227}
                        , {name: "skillspeed", value: null}
                        , {name: "vitality", value: 279}
                        , {name: "tenacity", value: null}
                    ]
                    ,selected: ko.observable(false)
                }
        ]
        }
    ]);
    model.selectedClassGear = ko.computed(function() {
        return ko.utils.arrayFilter(model.GearOptions(), function(item){
            return item.class === model.selectedJob();
        });
    });

};

ko.applyBindings(new parserViewModel());
