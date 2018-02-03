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
            {name: "Nightsteel Sword", level: 350, damage: 101, strength: 225, vitality: 241, determination: 204, skillspeed: 143}
            ,{name: "Byakko's Stone Sword", level: 355, damage: 101, strength: 231, vitality: 249, skillspeed: 209, criticalhit: 146}
            ,{name: "Homura", level: 360, damage: 102, strength: 236, vitality: 256, criticalhit: 213, tenacity: 149}
            ,{name: "Homura Kai", level: 370, damage: 104, strength: 248, vitality: 271, criticalhit: 222, tenacity: 156}
            ,{name: "Diamond Sword", level: 375, damage: 104, strength: 254, vitality: 279, determination: 227, criticalhit: 159}
        ]
        }
    ]);
    model.selectedClassGear = ko.computed(function() {
        return ko.utils.arrayFilter(model.GearOptions(), function(gear){
            return gear.class == model.SelectedClass();
        })
    });
};

ko.applyBindings(new parserViewModel());
