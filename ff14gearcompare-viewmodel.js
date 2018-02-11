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

    model.effectiveWeaponDamage = ko.computed(function() {
        // Default to 100 for weaponDamageMod if no class is selected (safety for initialization)
        var weaponDamageMod = 100;
        if ( model.selectedJob() ) { weaponDamageMod = model.selectedJob().weaponDamageMod }

        return Number(model.weaponDamage()) + Math.floor(292 * weaponDamageMod / 1000);
    });
    model.mainStatDamage = ko.computed(function() {
        // include 3% party bonus to main stat
        var mainStat = Math.floor(model.mainStat() * 1.03);
        return ( 100 + Math.floor( (mainStat - 292) * 1000 / 2336 ) ) / 100;
    });
    model.criticalHitRate = ko.computed(function() {
       return Math.floor(200 * (model.criticalHit() - 364) / 2170 + 50) / 1000;
    });
    model.criticalHitRateDisplay = ko.computed(function() {
        return Math.floor(model.criticalHitRate()*1000)/10 + "%";
    });
    model.criticalHitDamage = ko.computed(function() {
       return ( 1000 + Math.floor(200 * (model.criticalHit() - 364) / 2170 + 400 ) ) / 1000;
    });
    model.criticalHitDamageDisplay = ko.computed(function() {
        return "+" + Math.floor((model.criticalHitDamage() - 1)*1000)/10 + "%";
    });
    model.directHitRate = ko.computed(function() {
       return Math.floor(550 * (model.directHit() - 364) / 2170) / 1000;
    });
    model.directHitRateDisplay = ko.computed(function() {
        return Math.floor(model.directHitRate()*1000)/10 + "%";
    });
    model.directHitDamage = ko.observable(1.25);
    model.directHitDamageDisplay = ko.computed(function() {
        return "+" + Math.floor((model.directHitDamage() - 1)*1000)/10 + "%";
    });
    model.determinationDamage = ko.computed(function() {
       return ( 1000 + Math.floor(130 * (model.determination() - 292) / 2170) ) / 1000;
    });
    model.determinationDamageDisplay = ko.computed(function() {
        return "+" + Math.floor((model.determinationDamage() - 1)*1000)/10 + "%";
    });
    model.speedDamage = ko.computed(function() {
       return 1000 / ( 1000 - Math.floor(130 * (model.speedStat() - 364) / 2170) );
    });
    model.speedDamageDisplay = ko.computed(function() {
        return "+" + Math.floor((model.speedDamage() - 1)*1000)/10 + "%";
    });
    model.roleStatDamage = ko.computed(function() {
        // Default multiplier of 1 - for either when no class is selected, or classes that don't get tenacity damage modifier
        var roleStatDamage = 1;
        if ( model.selectedJob() ) {
            if ( model.selectedJob().roleStat === "tenacity" ) {
                roleStatDamage = Math.floor(1000 + Math.floor(100 * (model.roleStat() - 364) / 2170)) / 1000;
            }
        }
        return roleStatDamage;
    });
    model.roleStatDamageDisplay = ko.computed(function() {
        if ( model.selectedJob() ) {
            if ( model.selectedJob().roleStat === "tenacity" ) {
                return "+" + Math.floor((model.roleStatDamage() - 1)*1000)/10 + "%";
            }
        }
        // Return an empty string if no selected job, or if the selected job doesn't have Tenacity as its role skill
        // No role stat damage effect except for Tenacity
        return "";
    });

    model.hitDamage = ko.computed(function() {
        // calculate base damage of a 100 potency attack
        var baseDamage = Math.floor(100 * model.effectiveWeaponDamage() * model.mainStatDamage());
        baseDamage = Math.floor(baseDamage * model.determinationDamage());
        baseDamage = Math.floor(baseDamage * model.roleStatDamage() / 100);
        var damage =
            // Normal hit rate * base damage
            ( 1 - model.criticalHitRate() - model.directHitRate() + model.criticalHitRate() * model.directHitRate() ) * baseDamage +
            // Critical hit rate * critical damage (exclude critical + direct hits)
            ( model.criticalHitRate() * ( 1 - model.directHitRate() ) ) * baseDamage * model.criticalHitDamage() +
            // Direct hit rate * direct hit damage (exclude critical + direct hits)
            ( model.directHitRate() * ( 1 - model.criticalHitRate() ) ) * baseDamage * model.directHitDamage() +
            // Critical+Direct Hit rate * critical damage * direct hit damage
            ( model.criticalHitRate() * model.directHitRate() ) * baseDamage * model.criticalHitDamage() * model.directHitDamage();
        return Math.floor(10*damage)/10;
    });
    model.dotDamage = ko.computed(function() {
        // calculate base damage of a 100 potency attack
        var baseDamage = Math.floor(100 * model.effectiveWeaponDamage() * model.mainStatDamage());
        baseDamage = Math.floor(baseDamage * model.determinationDamage() * model.speedDamage() );
        baseDamage = Math.floor(baseDamage * model.roleStatDamage() / 100);
        var damage =
            // Normal hit rate * base damage
            ( 1 - model.criticalHitRate() - model.directHitRate() + model.criticalHitRate() * model.directHitRate() ) * baseDamage +
            // Critical hit rate * critical damage (exclude critical + direct hits)
            ( model.criticalHitRate() * ( 1 - model.directHitRate() ) ) * baseDamage * model.criticalHitDamage() +
            // Direct hit rate * direct hit damage (exclude critical + direct hits)
            ( model.directHitRate() * ( 1 - model.criticalHitRate() ) ) * baseDamage * model.directHitDamage() +
            // Critical+Direct Hit rate * critical damage * direct hit damage
            ( model.criticalHitRate() * model.directHitRate() ) * baseDamage * model.criticalHitDamage() * model.directHitDamage();
        return Math.floor(10*damage)/10;
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
        })

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
