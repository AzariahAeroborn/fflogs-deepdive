/**
 * Created by nengelberth on 7/12/2017.
 */
var parserViewModel = function() {
    var model = this;

    model.classList = ko.observableArray([
        "Paladin"
        ,"Warrior"
        ,"Dark Knight"
        ,"White Mage"
        ,"Scholar"
        ,"Astrologian"
        ,"Bard"
        ,"Machinist"
        ,"Monk"
        ,"Ninja"
        ,"Dragoon"
        ,"Samurai"
        ,"Black Mage"
        ,"Summoner"
        ,"Red Mage"
    ]);
    model.selectedClass = ko.observable();

    model.GearOptions = ko.observableArray([
        {class: "Paladin"
        ,stats: ["Strength", "Direct Hit", "Critical Hit", "Determination", "Skill Speed", "Vitality", "Tenacity"]
        ,statproperties: ["strength", "directhit", "criticalhit", "determination", "skillspeed", "vitality", "tenacity"]
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
                }
        ]
        }
    ]);
    model.selectedClassGear = ko.computed(function() {
        var filtered = ko.utils.arrayFilter(model.GearOptions(), function(item){
            return item.class == model.selectedClass();
        })

        return filtered
    });

    ko.bindingHandlers.displayStats = {
        init: function(element, valueAccessor, allBindings) {
            var itemStats = valueAccessor();
            var itemStatsUnwrapped = ko.unwrap(itemstats);
            var statsArray = allBindings.get('statsarray');

            var child = ko.virtualElements.firstChild(elem),
                childElems
            ko.utils.arrayForEach(statsArray, function(stat){
                output.push(itemStatsUnwrapped[stat]);
            });

            return output;
        },
        update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {

        }
    }
};

ko.applyBindings(new parserViewModel());
