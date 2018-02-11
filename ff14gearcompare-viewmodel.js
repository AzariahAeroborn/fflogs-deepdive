/**
 * Created by nengelberth on 7/12/2017.
 */
var parserViewModel = function() {
    var model = this;

    model.classList = ko.observableArray([
        {class: "PLD", displayName: "Paladin", offHand: true, mainStat: "strength", speedStat: "skillspeed", roleStat: "tenacity", weaponDamageMod: 100 }
        ,{class: "WAR", displayName: "Warrior", offHand: false, mainStat: "strength", speedStat: "skillspeed", roleStat: "tenacity", weaponDamageMod: 105 }
        ,{class: "DRK", displayName: "Dark Knight", offHand: false, mainStat: "strength", speedStat: "skillspeed", roleStat: "tenacity", weaponDamageMod: 105 }
        ,{class: "WHM", displayName: "White Mage", offHand: false, mainStat: "mind", speedStat: "spellspeed", roleStat: "piety", weaponDamageMod: 115 }
        ,{class: "SCH", displayName: "Scholar", offHand: false, mainStat: "mind", speedStat: "spellspeed", roleStat: "piety", weaponDamageMod: 115 }
        ,{class: "AST", displayName: "Astrologian", offHand: false, mainStat: "mind", speedStat: "spellspeed", roleStat: "piety", weaponDamageMod: 115 }
        ,{class: "BRD", displayName: "Bard", offHand: false, mainStat: "dexterity", speedStat: "skillspeed", roleStat: null, weaponDamageMod: 115 }
        ,{class: "MCH", displayName: "Machinist", offHand: false, mainStat: "dexterity", speedStat: "skillspeed", roleStat: null, weaponDamageMod: 115 }
        ,{class: "NIN", displayName: "Ninja", offHand: false, mainStat: "dexterity", speedStat: "skillspeed", roleStat: null, weaponDamageMod: 110 }
        ,{class: "MNK", displayName: "Monk", offHand: false, mainStat: "strength", speedStat: "skillspeed", roleStat: null, weaponDamageMod: 110 }
        ,{class: "SAM", displayName: "Samurai", offHand: false, mainStat: "strength", speedStat: "skillspeed", roleStat: null, weaponDamageMod: 112 }
        ,{class: "DRG", displayName: "Dragoon", offHand: false, mainStat: "strength", speedStat: "skillspeed", roleStat: null, weaponDamageMod: 115 }
        ,{class: "BLM", displayName: "Black Mage", offHand: false, mainStat: "intelligence", speedStat: "spellspeed", roleStat: null, weaponDamageMod: 115 }
        ,{class: "SMN", displayName: "Summoner", offHand: false, mainStat: "intelligence", speedStat: "spellspeed", roleStat: null, weaponDamageMod: 115 }
        ,{class: "RDM", displayName: "Red Mage", offHand: false, mainStat: "intelligence", speedStat: "spellspeed", roleStat: null, weaponDamageMod: 115 }
    ]);
    model.selectedClass = ko.observable();
    model.selectedClass.mainStatName = ko.computed(function() {
        var mainStat = ko.utils.arrayFilter(model.statNames(), function(stat){
            return stat.stat === model.selectedClass().mainStat;
        });
        return mainStat.name;
    });
    model.selectedClass.roleStatName = ko.computed(function() {
        if ( model.selectedClass().roleStat === null )
        { return "" }
        else
        {
            var roleStat = ko.utils.arrayFilter(model.statNames(), function(stat){
                return stat.stat === model.selectedClass().roleStat;
            });
            return roleStat.name;
        }
    });
    model.statNames = ko.observableArray([
        {stat: "strength", name: "Strength", type: "mainStat"}
        ,{stat: "mind", name: "Mind", type: "mainStat"}
        ,{stat: "dexterity", name: "Dexterity", type: "mainStat"}
        ,{stat: "intelligence", name: "Intelligence", type: "mainStat"}
        ,{stat: "criticalhit", name: "Critical Hit", type: "generalStat"}
        ,{stat: "directhit", name: "Direct Hit", type: "generalStat"}
        ,{stat: "determination", name: "Determination", type: "generalStat"}
        ,{stat: "skillspeed", name: "Skill Speed", type: "speedStat"}
        ,{stat: "spellspeed", name: "Spell Speed", type: "speedStat"}
        ,{stat: "tenacity", name: "Tenacity", type: "roleStat"}
        ,{stat: "piety", name: "Piety", type: "roleStat"}
    ]);

    model.weaponDamage = ko.observable(0);
    model.mainStat = ko.observable(0);
    model.criticalHit = ko.observable(0);
    model.directHit = ko.observable(0);
    model.determination = ko.observable(0);
    model.speedStat = ko.observable(0);
    model.roleStat = ko.observable(0);

    model.damage = ko.computed(function() {
        // calculate base damage of a 100 potency attack
        var baseDamage = Math.floor(model.effectiveWeaponDamage() * model.mainStatDamage());
        baseDamage = Math.floor(baseDamage * model.determinationDamage());
        baseDamage = Math.floor(baseDamage * model.roleStatDamage());
        var damage =
        // Normal hit rate * base damage
        ( 1 - model.criticalHitRate() - model.directHitRate() + model.criticalHitRate() * model.directHitRate() ) * baseDamage +
        // Critical hit rate * critical damage (exclude critical + direct hits)
        ( model.criticalHitRate() * ( 1 - model.directHitRate() ) ) * baseDamage * model.criticalHitDamage() +
        // Direct hit rate * direct hit damage (exclude critical + direct hits)
        ( model.directHitRate() * ( 1 - model.criticalHitRate() ) ) * baseDamage * model.directHitDamage() +
        // Critical+Direct Hit rate * critical damage * direct hit damage
        ( model.criticalHitRate() * model.directHitRate() ) * baseDamage * model.criticalHitDamage() * model.directHitDamage();
        return damage;
    });
    model.effectiveWeaponDamage = ko.computed(function() {
        return model.WeaponDamage() + Math.floor(292 + model.SelectedClass().weaponDamageMod / 1000);
    });
    model.mainStatDamage = ko.computed(function() {
        // include 3% party bonus to main stat
        var mainStat = Math.floor(model.mainStat() * 1.03);
        return ( 100 + Math.floor( (mainStat - 292) * 1000 / 2336 ) ) / 100;
    });
    model.criticalHitRate = ko.computed(function() {
       return Math.floor( 1000 + Math.floor(200 * (model.criticalHit() - 364) / 2170 + 50) ) / 1000;
    });
    model.criticalHitDamage = ko.computed(function() {
       return Math.floor( 1000 + Math.floor(200 * (model.criticalHit() - 364) / 2170 + 400 ) ) / 1000;
    });
    model.directHitRate = ko.computed(function() {
       return Math.floor( 1000 + Math.floor(550 * (model.directHit() - 364) / 2170) ) / 1000;
    });
    model.directHitDamage = ko.observable(1.25);
    model.determinationDamage = ko.computed(function() {
       return Math.floor( 1000 + Math.floor(130 * (model.determination() - 292) / 2170) ) / 1000;
    });
    model.roleStatDamage = ko.computed(function() {
       if ( model.selectedClass().roleStat === "tenacity" ) {
           return Math.floor(1000 + Math.floor(100 * (model.roleStat() - 364) / 2170)) / 1000;
       } else {
           return 1;
       }
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
            return item.class === model.selectedClass();
        });
    });

};

ko.applyBindings(new parserViewModel());
