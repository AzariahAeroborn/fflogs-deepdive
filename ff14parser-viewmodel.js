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
};

ko.applyBindings(new parserViewModel());
