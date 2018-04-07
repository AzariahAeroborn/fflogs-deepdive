var classParsers = classParsers || {};

classParsers.defParser = class defParser {
    constructor() {
        this.eventParsers = {};
        this.eventParsers.begincast = function(e,curAction,actions){
            actions.push(curAction);
            return new fightAction(e);
        };
        this.eventParsers.cast = function(e,curAction,actions){
            if ( curAction.begincast > 0 && curAction.endcast == null ) {
                // Cast event for a channeled skill that is currently being processed
                curAction.endcast = e.timestamp;
                return curAction;
            } else {
                actions.push(curAction);
                return new fightAction(e);
            }
        };
        this.eventParsers.damage = function(e,curAction,actions){
            if (e.hasOwnProperty("tick")) {
                // damage of type "tick" is simulated DOT damage
            } else {
                // direct damage from use of a skill
                if (!curAction.hasOwnProperty("damage")) {
                    curAction.damage = [];
                }
                // push this damage event onto array
                curAction.damage.push({
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
            return curAction;
        };
        this.eventParsers.heal = function(e,curAction,actions){
            if (e.hasOwnProperty("tick")) {
                // damage of type "tick" is simulated heal over time
            } else {
                // direct heal from use of a skill
                if (!curAction.hasOwnProperty("heal")) {
                    curAction.heal = [];
                }
                // push this heal event onto array
                curAction.heal.push({
                    amount: e.amount,
                    overheal: e.overheal,
                    criticalhit: (e.hitType === 2),
                    sourceResources: e.sourceResources,
                    targetResources: e.targetResources,
                    timestamp: e.timestamp
                });
            }
            return curAction;
        };
        this.eventParsers.applydebuff = function(e,curAction,actions){
            if (!curAction.hasOwnProperty("debuffs")) {
                curAction.debuffs = [];
            }
            let debuffed = curAction.debuffs.filter(function (obj) {
                return obj.targetID === e.targetID;
            });
            if (debuffed.length > 0) {
                debuffed[0].targetInstances.push(e.targetInstance);
            } else {
                curAction.debuffs.push({
                    targetID: e.targetID,
                    targetInstances: [e.targetInstance],
                    starttime: e.timestamp
                });
            }
            return curAction;
        };
        this.eventParsers.removedebuff = function(e,curAction,actions){
            if (!curAction.hasOwnProperty("debuffs")) {
                console.log("removedebuff event occurred outside of a cast event");
            } else {
                let debuffed = curAction.debuffs.filter(function (obj) {
                    return obj.targetID === e.targetID;
                });
                if (debuffed.length > 0) {
                    debuffed[0].endtime = e.timestamp;
                } else {
                    console.log("removedebuff event occurred without a matching target for the debuff")
                }
            }
            return curAction;
        };
        this.eventParsers.applybuff = function(e,curAction,actions){
            if (!curAction.hasOwnProperty("buffs")) {
                curAction.buffs = [];
            }
            let buffed = curAction.buffs.filter(function (obj) {
                return obj.targetID === e.targetID;
            });
            if (buffed.length > 0) {
                buffed[0].targetInstances.push(e.targetInstance);
            } else {
                curAction.buffs.push({
                    targetID: e.targetID,
                    targetInstances: [e.targetInstance],
                    starttime: e.timestamp
                })
            }
            return curAction;
        };
        this.eventParsers.removebuff = function(e,curAction,actions){
            if (!curAction.hasOwnProperty("buffs")) {
                console.log("removebuff event occurred outside of a cast event");
            } else {
                let buffed = curAction.buffs.filter(function (obj) {
                    return obj.targetID === e.targetID;
                });
                if (buffed.length > 0) {
                    buffed[0].endtime = e.timestamp;
                } else {
                    console.log("removebuff event occurred without a matching target for the buff")
                }
            }
            return curAction;
        };
        this.eventParsers.refreshdebuff = function(e,curAction,actions){
            // TODO: implement handling for refreshdebuff
            return curAction;
        };
        this.eventParsers.refreshbuff = function(e,curAction,actions){
            // TODO: implement handling for refreshbuff
            return curAction;
        };
    }

    parseActions(events) {
        let actions = [],
            curAction = null,
            e;

        // Pull the first event off the stack - will always create a new fight event for this
        while ( e = events.shift() ) {
            if (curAction === null) {
                curAction = new fightAction(e);
                // Skip further processing if this first event is a begincast or cast event - avoid pushing a duplicate first action onto the parsedAction stack
                if (e.type === "begincast" || e.type === "cast") {
                    continue;
                }
            }
            if ( this.eventParsers.hasOwnProperty(e.type) ) { curAction = this.eventParsers[e.type](e,curAction,actions); }
            else { console.log("Unhandled event of type " + e.type); }
        }
        // After processing all events in log, add current usage information to stack (if any)
        if ( curAction !== null ) { actions.push(curAction); }

        return actions;
    }
};

classParsers.Astrologian = class Astrologian extends classParsers.defParser {
    constructor() {
        super();
        this.name = "Astrologian";
        this.skills = [];
    }
};

classParsers.Bard = class Bard extends classParsers.defParser {
    constructor() {
        super();
        this.name = "Bard";
        this.skills = [
            {
                "name": "Heavy Shot",
                "potency": 150,
                "isGCD": true,
                "multitarget": false,
                "cooldown": null,
                "cast": 0,
                "buff": "Straighter Shot",
                "buffProcRate": 0.20
            },
            {
                "name": "Straight Shot",
                "potency": 140,
                "isGCD": true,
                "multitarget": false,
                "cooldown": null,
                "cast": 0,
                "buff": "Straight Shot",
                "buffProcRate": 1
            },
            {
                "name": "Raging Strikes",
                "potency": 0,
                "isGCD": false,
                "multitarget": false,
                "cooldown": 80,
                "cast": 0,
                "buff": "Raging Strikes",
                "buffProcRate": 1
            },
            {
                "name": "Caustic Bite",
                "potency": 120,
                "isGCD": true,
                "multitarget": false,
                "cooldown": null,
                "cast": 0,
                "dot": "Caustic Bite",
                "dotProcRate": 1
            },
            {
                "name": "Misery's End",
                "potency": 190,
                "isGCD": false,
                "multitarget": false,
                "cooldown": 12,
                "cast": 0,
                "enemyHealthBelow": 0.20
            },
            {
                "name": "Bloodletter",
                "potency": 130,
                "isGCD": false,
                "multitarget": false,
                "cooldown": 15,
                "cast": 0,
                "sharedCooldown": "Rain of Death"
            },
            {"name": "Repelling Shot", "potency": 0, "isGCD": false, "multitarget": false, "cooldown": 30, "cast": 0},
            {"name": "Quick Nock", "potency": 110, "isGCD": true, "multitarget": true, "cooldown": null, "cast": 0},
            {
                "name": "Stormbite",
                "potency": 120,
                "isGCD": true,
                "multitarget": false,
                "cooldown": null,
                "cast": 0,
                "dot": "Stormbite",
                "dotProcRate": 1
            },
            {"name": "Mage's Ballad", "potency": 100, "isGCD": false, "multitarget": false, "cooldown": 80, "cast": 0},
            {
                "name": "Foe Requiem",
                "potency": 0,
                "isGCD": true,
                "multitarget": false,
                "cooldown": 180,
                "cast": 1.5,
                "debuff": "Foe Requiem",
                "debuffProcRate": 1
            },
            {
                "name": "Barrage",
                "potency": 0,
                "isGCD": false,
                "multitarget": false,
                "cooldown": 80,
                "cast": 0,
                "buff": "Barrage",
                "buffProcRate": 1
            },
            {"name": "Army's Paeon", "potency": 100, "isGCD": false, "multitarget": false, "cooldown": 80, "cast": 0},
            {
                "name": "Rain of Death",
                "potency": 100,
                "isGCD": false,
                "multitarget": true,
                "cooldown": 15,
                "cast": 0,
                "sharedCooldown": "Bloodletter"
            },
            {
                "name": "Battle Voice",
                "potency": 0,
                "isGCD": false,
                "multitarget": false,
                "cooldown": 180,
                "cast": 0,
                "buff": "Battle Voice",
                "buffProcRate": 1
            },
            {
                "name": "the Wanderer's Minuet",
                "potency": 100,
                "isGCD": false,
                "multitarget": false,
                "cooldown": 80,
                "cast": 0
            },
            {"name": "Pitch Perfect", "potency": 420, "isGCD": false, "multitarget": false, "cooldown": 15, "cast": 0},
            {"name": "Empyreal Arrow", "potency": 100, "isGCD": false, "multitarget": false, "cooldown": 80, "cast": 0},
            {"name": "Iron Jaws", "potency": 100, "isGCD": true, "multitarget": false, "cooldown": null, "cast": 0},
            {
                "name": "The Warden's Paean",
                "potency": 0,
                "isGCD": false,
                "multitarget": false,
                "cooldown": 45,
                "cast": 0
            },
            {
                "name": "Sidewinder",
                "potency": 100,
                "isGCD": false,
                "multitarget": false,
                "cooldown": 60,
                "cast": 0,
                "comboPotency": 260,
                "comboDot": ["Caustic Bite", "Stormbite"]
            },
            {
                "name": "Troubador",
                "potency": 0,
                "isGCD": false,
                "multitarget": false,
                "cooldown": 180,
                "cast": 0,
                "buff": "Troubadour",
                "buffProcRate": 1
            },
            {
                "name": "Nature's Minne",
                "potency": 0,
                "isGCD": false,
                "multitarget": false,
                "cooldown": 45,
                "cast": 0,
                "buff": "Nature's Minne",
                "buffProcRate": 1
            },
            {
                "name": "Refulgent Arrow",
                "potency": 300,
                "isGCD": true,
                "multitarget": false,
                "cooldown": null,
                "cast": 0,
                "requiredBuff": "Straighter Shot"
            },
            {
                "name": "Second Wind",
                "healpotency": 500,
                "isGCD": false,
                "multitarget": false,
                "cooldown": 120,
                "cast": 0
            },
            {
                "name": "Invigorate",
                "tprecovery": 400,
                "target": "self",
                "isGCD": false,
                "multitarget": false,
                "cooldown": 120,
                "cast": 0
            },
            {
                "name": "Tactician",
                "tprecovery": 100,
                "target": "party",
                "isGCD": false,
                "multitarget": true,
                "cooldown": 180,
                "cast": 0,
                "enmitymultiplied": 0.5
            },
            {
                "name": "Refresh",
                "mprecovery": 6000,
                "target": "party",
                "isGCD": false,
                "multitarget": true,
                "cooldown": 180,
                "cast": 0,
                "enmitymultiplied": 0.5
            },
            {
                "name": "Palisade",
                "potency": 0,
                "isGCD": false,
                "multitarget": false,
                "cooldown": 150,
                "cast": 0,
                "buff": "Palisade",
                "buffProcRate": 1
            }
        ];
        this.dots = [
            {"name": "Caustic Bite", "potency": 45, "duration": 30},
            {"name": "Stormbite", "potency": 55, "duration": 30}
        ];
        this.buffs = [
            {
                "name": "Straighter Shot",
                "affects": "self",
                "duration": 10,
                "consumed": true,
                "expected": {
                    "logic": "and",
                    "skills": [
                        {"name": "Refulgent Arrow", "quantity": 1, "comparison": "="}
                    ]
                },
                "incorrect": {
                    "logic": "or",
                    "skills": [
                        {"name": "Straight Shot", "quantity": 1, "comparison": ">="},
                        {"name": "Heavy Shot", "quantity": 1, "comparison": ">="}
                    ]
                }
            },
            {
                "name": "Straight Shot",
                "affects": "self",
                "duration": 30,
                "criticalhit": 1.10,
                "consumed": false
            },
            {
                "name": "Raging Strikes",
                "affects": "self",
                "duration": 20,
                "damage": 1.10,
                "consumed": false,
                "expected": {
                    "logic": "and",
                    "skills": [
                        {"name": "Barrage", "quantity": 1, "comparison": "="},
                        {"name": "Iron Jaws", "quantity": 1, "comparison": "="}
                    ]
                }
            },
            {
                "name": "Barrage",
                "affects": "self",
                "duration": 10,
                "damage": 3,
                "consumed": true,
                "expected": {
                    "logic": "or",
                    "skills": [
                        {"name": "Refulgent Arrow", "quantity": 1, "comparison": "="},
                        {"name": "Empyreal Arrow", "quantity": 1, "comparison": "="}
                    ]
                }
            },
            {
                "name": "Battle Voice",
                "affects": "party",
                "duration": 20,
                "directhit": 1.15,
                "consumed": false
            },
            {
                "name": "Troubadour",
                "affects": "party",
                "duration": 30,
                "consumed": false
            },
            {
                "name": "Nature's Minne",
                "affects": "target",
                "duration": 15,
                "healing": 1.2,
                "consumed": false
            },
            {
                "name": "Palisade",
                "affects": "target",
                "duration": 10,
                "damage": 0.8,
                "consumed": false
            }
        ];
        this.debuffs = [
            {
                "name": "Foe's Requiem",
                "affects": "enemyparty",
                "duration": 30,
                "damage": 1.03
            }
        ];
    }
};

classParsers.BlackMage = class BlackMage extends classParsers.defParser {
    constructor() {
        super();
        this.name = "BlackMage";
        this.skills = [];
    }
};

classParsers.DarkKnight = class DarkKnight extends classParsers.defParser {
    constructor() {
        super();
        this.name = "DarkKnight";
        this.skills = [];
    }
};

classParsers.Dragoon = class Dragoon extends classParsers.defParser {
    constructor() {
        super();
        this.name = "Dragoon";
        this.skills = [];
    }
};

classParsers.Machinist = class Machinist extends classParsers.defParser {
    constructor() {
        super();
        this.name = "Machinist";
        this.skills = [];
    }
};

classParsers.Monk = class Monk extends classParsers.defParser {
    constructor() {
        super();
        this.name = "Monk";
        this.skills = [];
    }
};

classParsers.Ninja = class Ninja extends classParsers.defParser {
    constructor() {
        super();
        this.name = "Ninja";
        this.skills = [];
    }
};

classParsers.Paladin = class Paladin extends classParsers.defParser {
    constructor() {
        super();
        this.name = "Paladin";
        this.skills = [];
    }
};

classParsers.RedMage = class RedMage extends classParsers.defParser {
    constructor() {
        super();
        this.name = "RedMage";
        this.skills = [];
    }
};

classParsers.Samurai = class Samurai extends classParsers.defParser {
    constructor() {
        super();
        this.name = "Samurai";
        this.skills = [];
    }
};

classParsers.Scholar = class Scholar extends classParsers.defParser {
    constructor() {
        super();
        this.name = "Scholar";
        this.skills = [];
    }
};

classParsers.Summoner = class Summoner extends classParsers.defParser {
    constructor() {
        super();
        this.name = "Summoner";
        this.skills = [];
    }
};

classParsers.Warrior = class Warrior extends classParsers.defParser {
    constructor() {
        super();
        this.name = "Warrior";
        this.skills = [];
    }
};

classParsers.WhiteMage = class WhiteMage extends classParsers.defParser {
    constructor() {
        super();
        this.name = "WhiteMage";
        this.skills = [];
    }
};

class fightAction {
    constructor(e) {
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
    }
}

