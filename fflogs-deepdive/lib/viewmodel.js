var parserViewModel = function(){
    var model = this;

    model.apiKey = ko.observable();
    model.characterName = ko.observable();
    model.selectedWorld = ko.observable();
    model.apiResponse = ko.observable();

    model.characterSearch = function(){
        var baseURL = "https://www.fflogs.com/v1/parses/character/";
        var world = model.selectedWorld();
        var character = model.characterName();
        var apiKey = model.apiKey();

        var xhr = new XMLHttpRequest;
        xhr.onreadystatechange = function() {
            if ( this.readyState == 4 && this.status == 200 ) {
                model.apiResponse = this.responseText;
            }
        };
        xhr.open("GET", baseURL + character + "/" + world.world + "/" + world.region + "?api_key=" + apiKey, true);
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