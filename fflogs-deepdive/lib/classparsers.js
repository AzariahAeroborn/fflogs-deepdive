var classParsers = classParsers || {};

classParsers.defParser = class defParser {
    constructor() {
        this.eventParsers = class e extends eventParsers{};
    }

    static get rangedPhysicalRoleSkills() {
        return [
            { name: "Second Wind", healpotency: 500, isGCD: false, multitarget: false, cooldown: 120, cast: 0 },
            { name: "Foot Graze", potency: 0, isGCD: false, multitarget: false, cooldown: 30, cast: 0, debuff: "Bind", debuffProcRate: 1 },
            { name: "Leg Graze", potency: 0, isGCD: false, multitarget: false, cooldown: 30, cast: 0, debuff: "Heavy", debuffProcRate: 1 },
            { name: "Peloton", potency: 0, isGCD: false, multitarget: true, cooldown: 5, cast: 0 },
            { name: "Invigorate", potency: 0, tprecovery: 400, target: "self", isGCD: false, multitarget: false, cooldown: 120, cast: 0 },
            { name: "Tactician", potency: 0, isGCD: false, multitarget: true, cooldown: 180, cast: 0, enmitymultiplied: 0.5, buff: "Tactician", buffProcRate: 1 },
            { name: "Refresh", potency: 0, isGCD: false, multitarget: true, cooldown: 180, cast: 0, enmitymultiplied: 0.5, buff: "Refresh", buffProcRate: 1 },
            { name: "Head Graze", potency: 0, isGCD: false, multitarget: false, cooldown: 30, cast: 0, debuff: "Silence", debuffProcRate: 1 },
            { name: "Arm Graze", potency: 0, isGCD: false, multitarget: false, cooldown: 30, cast: 0, debuff: "Stun", debuffProcRate: 1 },
            { name: "Palisade", potency: 0, isGCD: false, multitarget: false, cooldown: 150, cast: 0, buff: "Palisade", buffProcRate: 1 }
        ];
    }

    static get rangedMagicalRoleSkills() {
        return [
            { name: "Addle", potency: 0, isGCD: false, multitarget: false, cooldown: 90, cast: 0, debuff: "Addle", debuffProcRate: 1 },
            { name: "Break", potency: 50, isGCD: true, multitarget: false, cooldown: null, cast: 2.5, debuff: "Heavy", debuffProcRate: 1 },
            { name: "Drain", potency: 80, isGCD: true, multitarget: false, cooldown: null, cast: 2.5 },
            { name: "Diversion", potency: 0, isGCD: false, multitarget: false, cooldown: 120, cast: 0 },
            { name: "Lucid Dreaming", potency: 0, isGCD: false, multitarget: false, cooldown: 120, cast: 0, enmitymultiplied: 0.5},
            { name: "Swiftcast", potency: 0, isGCD: false, multitarget: false, cooldown: 60, cast: 0 },
            { name: "Mana Shift", potency: 0, isGCD: false, multitarget: false, cooldown: 120, cast: 0 },
            { name: "Apocatastasis", potency: 0, isGCD: false, multitarget: false, cooldown: 90, cast: 0, buff: "Apocatastatis", buffProcRate: 1 },
            { name: "Surecast", potency: 0, isGCD: false, multitarget: false, cooldown: 30, cast: 0, buff: "Surecast", buffProcRate: 1 },
            { name: "Erase", potency: 0, isGCD: false, multitarget: false, cooldown: 90, cast: 0 }
        ];
    }

    static get meleeRoleSkills() {
        return [
            { name: "Second Wind", healpotency: 500, isGCD: false, multitarget: false, cooldown: 120, cast: 0 },
            { name: "Arm's Length", potency: 0, isGCD: false, multitarget: false, cooldown: 60, cast: 0 },
            { name: "Leg Sweep", potency: 0, isGCD: false, multitarget: false, cooldown: 40, cast: 0, debuff: "Stun", debuffProcRate: 1 },
            { name: "Diversion", potency: 0, isGCD: false, multitarget: false, cooldown: 120, cast: 0, buff: "Diversion", buffProcRate: 1 },
            { name: "Invigorate", potency: 0, isGCD: false, multitarget: false, tprecovery: 400, cooldown: 120, cast: 0 },
            { name: "Bloodbath", potency: 0, isGCD: false, multitarget: false, cooldown: 90, cast: 0, buff: "Bloodbath", buffProcRate: 1 },
            { name: "Goad", potency: 0, isGCD: false, multitarget: false, cooldown: 180, cast: 0, buff: "Goad", buffProcRate: 1 },
            { name: "Feint", potency: 0, isGCD: false, multitarget: false, cooldown: 120, cast: 0, debuff: "Feint", debuffProcRate: 1 },
            { name: "Crutch", potency: 0, isGCD: false, multitarget: false, cooldown: 90, cast: 0 },
            { name: "True North", potency: 0, isGCD: false, multitarget: false, cooldown: 150, cast: 0, buff: "True North", buffProcRate: 1 }
        ];
    }

    static get healerRoleSkills() {
        return [
            { name: "Cleric Stance", potency: 0, isGCD: false, multitarget: false, cooldown: 90, cast: 0, buff: "Cleric Stance", buffProcRate: 1 },
            { name: "Break", potency: 50, isGCD: true, multitarget: false, cooldown: null, cast: 2.5, debuff: "Heavy", debuffProcRate: 1 },
            { name: "Protect", healpotency: 0, isGCD: true, multitarget: true, cooldown: null, cast: 3, buff: "Protect", buffProcRate: 1 },
            { name: "Esuna", healpotency: 0, isGCD: true, multitarget: false, cooldown: null, cast: 1 },
            { name: "Lucid Dreaming", potency: 0, isGCD: false, multitarget: false, cooldown: 120, cast: 0, enmitymultiplied: 0.5, buff: "Lucid Dreaming", buffProcRate: 1 },
            { name: "Swiftcast", potency: 0, isGCD: false, multitarget: false, cooldown: 60, cast: 0, buff: "Swiftcast", buffProcRate: 1 },
            { name: "Eye for an Eye", potency: 0, isGCD: false, multitarget: false, cooldown: 180, cast: 0, buff: "Eye for an Eye", buffProcRate: 1 },
            { name: "Largesse", potency: 0, isGCD: false, multitarget: false, cooldown: 90, cast: 0, buff: "Largesse", buffProcRate: 1 },
            { name: "Surecast", potency: 0, isGCD: false, multitarget: false, cooldown: 30, cast: 0, buff: "Surecast", buffProcRate: 1 },
            { name: "Rescue", potency: 0, isGCD: false, multitarget: false, cooldown: 150, cast: 0 }
        ];
    }

    static get tankRoleSkills() {
        return [
            { name: "Rampart", potency: 0, isGCD: false, multitarget: false, cooldown: 90, cast: 0, buff: "Rampart", buffProcRate: 1 },
            { name: "Low Blow", potency: 0, isGCD: false, multitarget: false, cooldown: 25, cast: 0, debuff: "Stun", debuffProcRate: 1 },
            { name: "Provoke", potency: 0, isGCD: false, multitarget: false, cooldown: 40, cast: 0 },
            { name: "Convalescence", potency: 0, isGCD: false, multitarget: false, cooldown: 120, cast: 0, buff: "Convalescence", buffProcRate: 1 },
            { name: "Anticipation", potency: 0, isGCD: false, multitarget: false, cooldown: 60, cast: 0, buff: "Anticipation", buffProcRate: 1 },
            { name: "Reprisal", potency: 0, isGCD: false, multitarget: false, cooldown: 60, cast: 0, debuff: "Reprisal", debuffProcRate: 1 },
            { name: "Awareness", potency: 0, isGCD: false, multitarget: false, cooldown: 120, cast: 0, buff: "Awareness", buffProcRate: 1 },
            { name: "Interject", potency: 0, isGCD: false, multitarget: false, cooldown: 30, cast: 0, debuff: "Silence", debuffProcRate: 1 },
            { name: "Ultimatum", potency: 0, isGCD: false, multitarget: true, cooldown: 90, cast: 0 },
            { name: "Shirk", potency: 0, isGCD: false, multitarget: false, cooldown: 120, cast: 0 }
        ];
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
                if (e.type === "begincast" || e.type === "cast" ) {
                    continue;
                }
            }
            if ( this.eventParsers.__proto__.hasOwnProperty(e.type) ) { curAction = this.eventParsers[e.type](e,curAction,actions); }
            else { console.log("Unhandled event of type " + e.type); }
        }
        // After processing all events in log, add current usage information to stack (if any)
        if ( curAction !== null ) { actions.push(curAction); }

        return actions;
    }

    aggregateActions(actions) {
        // return an empty object if the name property of the classParser is empty, or if the actions parameter is empty - nothing to do
        if ( !this.hasOwnProperty("name") ) { return {} }
        if ( actions.length === 0 ) { return {} }

        let aggActions = {};
        // collect aggregations for job skills
        if ( this.hasOwnProperty("skills") && this.skills.length > 0 ) {
            aggActions.skills = [];
            let curSkill;

            // Aggregate skill usage information per skill
            this.skills.forEach(function (skill) {
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
                let usages = actions.filter(function (obj) {
                    return obj.ability.name === skill.name;
                });

                curSkill.count = usages.length;
                usages.forEach(function (u) {
                    if (u.hasOwnProperty("damage")) {
                        curSkill.hits += u.damage.length;
                        u.damage.forEach(function (hit) {
                            if (hit.criticalhit) {
                                if (hit.directhit) curSkill.critdhits++;
                                else curSkill.crits++;
                            } else {
                                if (hit.directhit) curSkill.dhits++;
                            }
                            curSkill.damage += hit.amount;
                        });
                    }

                    if (u.hasOwnProperty("heal")) {
                        curSkill.hits += u.heal.length;
                        u.heal.forEach(function (hit) {
                            curSkill.heal += hit.amount;
                            curSkill.absorb += hit.absorbed;
                            curSkill.overheal += hit.overheal;
                            if (hit.criticalhit) curSkill.crits++;
                        });
                    }
                });

                if ( curSkill.hits > 0 ) {
                    curSkill.critPct = (Math.floor(curSkill.crits / curSkill.hits * 10000) / 100).toFixed(2) + "%";
                    curSkill.dhitPct = (Math.floor(curSkill.dhits / curSkill.hits * 10000) / 100).toFixed(2) + "%";
                    curSkill.critdhitPct = (Math.floor(curSkill.critdhits / curSkill.hits * 10000) / 100).toFixed(2) + "%";
                } else {
                    curSkill.critPct = "";
                    curSkill.dhitPct = "";
                    curSkill.critdhitPct = "";
                }

                aggActions.skills.push(curSkill);
            });
        }

        return(aggActions);
    }

    aggregateGCD(skills) {
        // No actions, return early -- nothing to do
        if ( skills.length === 0 ) { return []; }
        let gcds = [],
            intervals = [],
            minGCD,
            skillList = this.skills;

        skills.forEach(function(curSkill){
            // determine if current skill is a GCD
            let skill = skillList.filter(function(obj){
                return obj.isGCD === true && obj.name === curSkill.ability.name;
            });
            // No matching GCD skills found, continue to next action
            if (skill.length === 0) return;

            gcds.push({begincast: curSkill.begincast, endcast: curSkill.endcast, name: curSkill.ability.name});
        });

        if ( gcds.length > 0 ) {
            for ( let i = 1; i < gcds.length; i++) {
                intervals.push({
                    interval: gcds[i].begincast - gcds[i - 1].begincast,
                    casttime: gcds[i - 1].endcast - gcds[i - 1].begincast,
                    actiontimestamp: gcds[i].begincast
                });
            }
            minGCD = intervals.reduce(function (prev, curr, currentIndex) {
                // First check will be currentIndex = 1, check second value of array against first
                // We want to always take the 2nd interval value in this case, to disregard the initial cast to keep
                //    pre-pull timing issues from artificially deflating the minGCD guess
                if ( currentIndex <= 1 ) { return curr }

                return prev.interval < curr.interval ? prev : curr;
            });
        }

        return { "gcds": gcds, "intervals": intervals, "min": minGCD.interval, "thresholds": this.calculateGCDThresholds(intervals,minGCD.interval) }
    }

    calculateGCDThresholds(intervals,minGCD) {
        let thresholds = [
            // Initialize minimum GCD to 0 for classes that have speed effects - will set to minGCD after processing events to prepare display values
            { min: 0, max: Math.floor(1.03*minGCD), count: 0 },
            { min: Math.floor(1.03*minGCD), max: Math.floor(1.10*minGCD), count: 0 },
            { min: Math.floor(1.10*minGCD), max: Math.floor(1.25*minGCD), count: 0 },
            { min: Math.floor(1.25*minGCD), max: Math.floor(1.5*minGCD), count: 0 },
            { min: Math.floor(1.5*minGCD), max: null, count: 0 }
        ];

        thresholds.forEach(function(thresh) {
            thresh.count = intervals.filter(function (obj) {
                return (obj.interval > thresh.min && (thresh.max === null || obj.interval < thresh.max));
            }).length;

            // Reset initial minimum threshold value to calculated minGCD
            if ( thresh.min === 0 ) { thresh.min = minGCD }

            // Calculate display range for thresholds, round to 2 decimal places
            thresh.display = (thresh.min / 1000).toFixed(2).toString();
            thresh.display += (thresh.max === null) ? "+" : " - " + (thresh.max / 1000).toFixed(2).toString();
        });

        thresholds[0].min = minGCD;

        return thresholds;
    }
};

classParsers.Astrologian = class Astrologian extends classParsers.defParser {
    constructor() {
        super();
        let self = this;
        self.name = "Astrologian";
        self.skills = [
            { name: "Malefic III", potency: 220, isGCD: true, multitarget: false, cooldown: null, cast: 2.5 },
            { name: "Benefic", healpotency: 400, isGCD: true, multitarget: false, cooldown: null, cast: 2, buff: "Enhanced Benefic", buffProcRate: 0.15 },
            { name: "Combust II", potency: 0, isGCD: true, multitarget: false, cooldown: null, cast: 0, dot: "Combust II", dotProcRate: 1 },
            { name: "Lightspeed", potency: 0, isGCD: false, multitarget: false, cooldown: 150, cast: 0, buff: "Lightspeed", buffProcRate: 1 },
            { name: "Helios", healpotency: 300, isGCD: true, multitarget: true, cooldown: null, cast: 2.5 },
            { name: "Ascend", potency: 0, isGCD: true, multitarget: false, cooldown: null, cast: 8 },
            { name: "Essential Dignity", healpotency: 400, isGCD: false, multitarget: false, cooldown: 40, cast: 0 },
            { name: "Benefic II", healpotency: 650, isGCD: true, multitarget: false, cooldown: null, cast: 2 },
            { name: "Draw", potency: 0, isGCD: false, multitarget: false, cooldown: 30, cast: 0 },
            { name: "Undraw", potency: 0, isGCD: false, multitarget: false, cooldown: 3, cast: 0 },
            { name: "Aspected Benefic", healpotency: 200, isGCD: true, multitarget: false, cooldown: null, cast: 0 },
            { name: "Royal Road", potency: 0, isGCD: false, multitarget: false, cooldown: 15, cast: 0 },
            { name: "Empty Road", potency: 0, isGCD: false, multitarget: false, cooldown: 3, cast: 0 },
            { name: "Spread", potency: 0, isGCD: false, multitarget: false, cooldown: 30, cast: 0 },
            { name: "Undraw Spread", potency: 0, isGCD: false, multitarget: false, cooldown: 3, cast: 0 },
            { name: "Aspected Helios", healpotency: 200, isGCD: true, multitarget: true, cooldown: null, cast: 3 },
            { name: "Redraw", potency: 0, isGCD: false, multitarget: false, cooldown: 30, cast: 0 },
            { name: "Synastry", potency: 0, isGCD: false, multitarget: false, cooldown: 90, cast: 0 },
            { name: "Gravity", potency: 200, isGCD: true, multitarget: true, falloffratio: 0.1, falloffmax: 0.5, cooldown: null, cast: 3 },
            { name: "Time Dilation", potency: 0, isGCD: false, multitarget: false, cooldown: 90, cast: 0 },
            { name: "Collective Unconsious", potency: 0, isGCD: false, multitarget: false, cooldown: 90, cast: 0 },
            { name: "Celestial Opposition", potency: 0, isGCD: false, multitarget: false, cooldown: 120, cast: 0 },
            { name: "Earthly Star", healpotency: 720, isGCD: false, multitarget: false, cooldown: 60, cast: 0 },
            { name: "Minor Arcana", potency: 0, isGCD: false, multitarget: false, cooldown: 5, cast: 0 },
            { name: "Sleeve Draw", potency: 0, isGCD: false, multitarget: false, cooldown: 120, cast: 0 },
            { name: "Lord of Crowns", potency: 300, isGCD: false, multitarget: false, cooldown: 5, cast: 0 },
            { name: "Lady of Crowns", healpotency: 500, isGCD: false, multitarget: false, cooldown: 5, cast: 0 }
        ];
        self.skills.concat(classParsers.defParser.healerRoleSkills);
        self.dots = [
            { name: "Combust II", potency: 50, duration: 30 }
        ];
        self.buffs = [
            {
                name: "The Balance",
                affects: "party",
                duration: 30,
                consumed: false,
                damage: 1.1
            },
            {
                name: "The Bole",
                affects: "party",
                duration: 30,
                consumed: false,
                damagereceived: 0.8
            },
            {
                name: "The Arrow",
                affects: "party",
                duration: 30,
                consumed: false,
                actionspeed: 1.1
            },
            {
                name: "The Spear",
                affects: "party",
                duration: 30,
                consumed: false,
                criticalhit: 1.1
            },
            {
                name: "The Ewer",
                affects: "party",
                duration: 15,
                consumed: false,
                mprecovery: 50
            },
            {
                name: "The Spire",
                affects: "party",
                duration: 15,
                consumed: false,
                tprecovery: 50
            },
            {
                name: "Cleric Stance",
                affects: "self",
                duration: 15,
                consumed: false,
                damage: 1.05
            },
            {
                name: "Protect",
                affects: "party",
                duration: 1800,
                consumed: false,
                damagereceived: 0.95
            },
            {
                name: "Lucid Dreaming",
                affects: "self",
                duration: 21,
                consumed: false,
                mprecovery: 80
            },
            {
                name: "Eye for an Eye",
                affects: "partyother",
                duration: 20,
                consumed: false
            },
            {
                name: "Largesse",
                affects: "self",
                duration: 20,
                consumed: false,
                healing: 1.2
            },
            {
                name: "Surecast",
                affects: "self",
                duration: 5,
                consumed: false
            }
        ];
        self.debuffs = [];
        self.stances = [
            { name: "Diurnal Sect", active: [] },
            { name: "Nocturnal Sect", active: [] }
        ];
        self.currentStance = null;

        this.eventParsers = class astrologianEventParsers extends eventparsers {}
    }
};

classParsers.Bard = class Bard extends classParsers.defParser {
    constructor() {
        super();
        let self = this;
        self.name = "Bard";
        self.skills = [
            { name: "Heavy Shot", potency: 150, isGCD: true, multitarget: false, cooldown: null, cast: 0, buff: "Straighter Shot",buffProcRate: 0.20 },
            { name: "Straight Shot", potency: 140, isGCD: true, multitarget: false, cooldown: null, cast: 0, buff: "Straight Shot", buffProcRate: 1 },
            { name: "Raging Strikes", potency: 0, isGCD: false, multitarget: false, cooldown: 80, cast: 0, buff: "Raging Strikes", buffProcRate: 1 },
            { name: "Caustic Bite", potency: 120, isGCD: true, multitarget: false, cooldown: null, cast: 0, dot: "Caustic Bite", dotProcRate: 1 },
            { name: "Misery's End", potency: 190, isGCD: false, multitarget: false, cooldown: 12, cast: 0, enemyHealthBelow: 0.20 },
            { name: "Bloodletter", potency: 130, isGCD: false, multitarget: false, cooldown: 15, cast: 0, sharedCooldown: "Rain of Death" },
            { name: "Repelling Shot", potency: 0, isGCD: false, multitarget: false, cooldown: 30, cast: 0 },
            { name: "Quick Nock", potency: 110, isGCD: true, multitarget: true, cooldown: null, cast: 0 },
            { name: "Stormbite", potency: 120, isGCD: true, multitarget: false, cooldown: null, cast: 0, dot: "Stormbite", dotProcRate: 1 },
            { name: "Mage's Ballad", potency: 100, isGCD: false, multitarget: false, cooldown: 80, cast: 0 },
            { name: "Foe Requiem", potency: 0, isGCD: true, multitarget: false, cooldown: 180, cast: 1.5, debuff: "Foe Requiem", debuffProcRate: 1 },
            { name: "Barrage", potency: 0, isGCD: false, multitarget: false, cooldown: 80, cast: 0, buff: "Barrage", buffProcRate: 1 },
            { name: "Army's Paeon", potency: 100, isGCD: false, multitarget: false, cooldown: 80, cast: 0 },
            { name: "Rain of Death", potency: 100, isGCD: false, multitarget: true, cooldown: 15, cast: 0, sharedCooldown: "Bloodletter" },
            { name: "Battle Voice", potency: 0, isGCD: false, multitarget: false, cooldown: 180, cast: 0, buff: "Battle Voice", buffProcRate: 1 },
            { name: "The Wanderer's Minuet", potency: 100, isGCD: false, multitarget: false, cooldown: 80, cast: 0 },
            { name: "Pitch Perfect", potency: 420, isGCD: false, multitarget: false, cooldown: 15, cast: 0 },
            { name: "Empyreal Arrow", potency: 100, isGCD: false, multitarget: false, cooldown: 80, cast: 0 },
            { name: "Iron Jaws", potency: 100, isGCD: true, multitarget: false, cooldown: null, cast: 0 },
            { name: "The Warden's Paean", potency: 0, isGCD: false, multitarget: false, cooldown: 45, cast: 0 },
            { name: "Sidewinder", potency: 100, isGCD: false, multitarget: false, cooldown: 60, cast: 0, combopotency: 160, combodots: ["Caustic Bite", "Stormbite"] },
            { name: "Troubador", potency: 0, isGCD: false, multitarget: false, cooldown: 180, cast: 0, buff: "Troubadour", buffProcRate: 1 },
            { name: "Nature's Minne", potency: 0, isGCD: false, multitarget: false, cooldown: 45, cast: 0, buff: "Nature's Minne", buffProcRate: 1 },
            { name: "Refulgent Arrow", potency: 300, isGCD: true, multitarget: false, cooldown: null, cast: 0, requiredBuff: "Straighter Shot" }
        ];
        self.skills.concat(classParsers.defParser.rangedPhysicalRoleSkills);
        self.dots = [
            {name: "Caustic Bite", potency: 45, duration: 30},
            {name: "Stormbite", potency: 55, duration: 30}
        ];
        self.buffs = [
            {
                name: "Straighter Shot",
                affects: "self",
                duration: 10,
                consumed: true,
                expected: {
                    logic: "and",
                    skills: [
                        {name: "Refulgent Arrow", "quantity": 1, "comparison": "="}
                    ]
                },
                incorrect: {
                    logic: "or",
                    skills: [
                        {name: "Straight Shot", "quantity": 1, "comparison": ">="},
                        {name: "Heavy Shot", "quantity": 1, "comparison": ">="}
                    ]
                }
            },
            {
                name: "Straight Shot",
                affects: "self",
                duration: 30,
                criticalhit: 1.10,
                consumed: false
            },
            {
                name: "Raging Strikes",
                affects: "self",
                duration: 20,
                damage: 1.10,
                consumed: false,
                expected: {
                    logic: "and",
                    skills: [
                        {name: "Barrage", "quantity": 1, "comparison": "="},
                        {name: "Iron Jaws", "quantity": 1, "comparison": "="}
                    ]
                }
            },
            {
                name: "Barrage",
                affects: "self",
                duration: 10,
                damage: 3,
                consumed: true,
                expected: {
                    logic: "or",
                    skills: [
                        {name: "Refulgent Arrow", "quantity": 1, "comparison": "="},
                        {name: "Empyreal Arrow", "quantity": 1, "comparison": "="}
                    ]
                }
            },
            {
                name: "Battle Voice",
                affects: "party",
                duration: 20,
                directhit: 1.15,
                consumed: false
            },
            {
                name: "Troubadour",
                affects: "party",
                duration: 30,
                consumed: false
            },
            {
                name: "Nature's Minne",
                affects: target,
                duration: 15,
                healingreceived: 1.2,
                consumed: false
            },
            {
                name: "Palisade",
                affects: target,
                duration: 10,
                damage: 0.8,
                consumed: false
            }
        ];
        self.debuffs = [
            {
                name: "Foe's Requiem",
                affects: "enemyparty",
                duration: 30,
                damage: 1.03
            }
        ];
        self.stances = [
            {
                name: "Mage's Ballad",
                active: []
            },
            {
                name: "Army's Paeon",
                active: []
            },
            {
                name: "The Wanderer's Minuet",
                active: []
            }
        ];
        self.currentStance = null;

        this.eventParsers = class bardEventParsers extends eventParsers {
            static cast(e, curAction, actions) {
                curAction = super.cast(e, curAction, actions);
                let stanceSkill = self.stances.filter(function (obj) {
                    return obj.name === e.ability.name;
                });
                if (stanceSkill.length > 0) {
                    if (self.currentStance !== null) {
                        let stance = self.stances.filter(function(obj){
                            return obj.name === self.currentStance;
                        });

                        let stanceActivation = stance[0].active.pop();
                        stanceActivation.endtime = Math.min(e.timestamp,stanceActivation.endtime);
                        stance[0].active.push(stanceActivation);
                    }
                    self.currentStance = e.ability.name;
                    let stance = self.stances.filter(function(obj) {
                        return obj.name === e.ability.name;
                    });
                    // Default stance length 30 seconds
                    stance[0].active.push({begintime: e.timestamp, endtime: e.timestamp + 30000});
                }
                return curAction;
            }
        }
    }

    aggregateGCD(skills) {
        let gcdSummary = super.aggregateGCD(skills),
            stanceList = this.stances;

        // override minGCD calculation to exclude casts under Army's Paeon, which reduces GCD by variable amounts
        let minGCD = gcdSummary.intervals.reduce(function (prev,curr,currentIndex){
            // First check will be currentIndex = 1, check second value of array against first
            // We want to always take the 2nd interval value in this case, to disregard the initial cast to keep
            //    pre-pull timing issues from artificially deflating the minGCD guess
            if ( currentIndex <= 1 ) { return curr }

            let activePaeon = stanceList.filter(function(obj){
                if ( obj.name === "Army's Paeon" ) {
                    return obj.active.filter(function(activeStance){
                        // Copy values from stance active time to avoid manipulating stance duration information on the actual object
                        let begintime = activeStance.begintime,
                            // If the effects of a song expire or are replaced, they may persist until the next server tick, up to 3 seconds later.
                            //   Fudge our exclusions to avoid having GCD estimation too low because of a GCD at the end of a Paeon.
                            endtime = activeStance.endtime + 3000;

                        return ( begintime < curr.actiontimestamp && curr.actiontimestamp < endtime );
                    }).length > 0
                }
            });

            // If Army's Paeon was active during time of current action, do not compare the GCD interval of this action to the current minimum
            if ( activePaeon.length > 0 ) return prev;
            return prev.interval < curr.interval ? prev : curr;
        });

        gcdSummary.min = minGCD.interval;

        // re-run GCD Threshold calculation with new minimum GCD
        gcdSummary.thresholds = this.calculateGCDThresholds(gcdSummary.intervals,minGCD.interval);

        return gcdSummary;
    }
};

classParsers.BlackMage = class BlackMage extends classParsers.defParser {
    constructor() {
        super();
        let self = this;
        self.name = "BlackMage";
        self.skills = [
            { name: "Blizzard", potency: 180, isGCD: true, multitarget: false, cooldown: null, cast: 2.5 },
            { name: "Fire", potency: 180, isGCD: true, multitarget: false, cooldown: null, cast: 2.5, buff: "Firestarter", buffProcRate: 0.4 },
            { name: "Transpose", potency: 0, isGCD: false, multitarget: false, cooldown: 8, cast: 0 },
            { name: "Thunder III", potency: 70, isGCD: true, multitarget: false, cooldown: null, cast: 2.5, dot: "Thunder III", dotProcRate: 1 },
            { name: "Sleep", potency: 0, isGCD: true, multitarget: true, cooldown: null, cast: 2.5, debuff: "Sleep", debuffProcRate: 1 },
            { name: "Blizzard II", potency: 50, isGCD: true, multitarget: true, cooldown: null, cast: 2, debuff: "Bind", debuffProcRate: 1 },
            { name: "Scathe", potency: 200, isGCD: true, multitarget: false, cooldown: null, cast: 0 },
            { name: "Fire II", potency: 80, isGCD: true, multitarget: true, cooldown: null, cast: 3 },
            { name: "Thunder IV", potency: 50, isGCD: true, multitarget: true, cooldown: null, cast: 3, dot: "Thunder IV", dotProcRate: 1 },
            { name: "Manaward", potency: 0, isGCD: false, multitarget: false, cooldown: 120, cast: 0 },
            { name: "Convert", potency: 0, isGCD: false, multitarget: false, cooldown: 180, cast: 0 },
            { name: "Fire III", potency: 240, isGCD: true, multitarget: false, cooldown: null, cast: 3.5 },
            { name: "Freeze", potency: 100, isGCD: true, multitarget: true, cooldown: null, cast: 3, debuff: "Bind", debuffProcRate: 1 },
            { name: "Blizzard III", potency: 240, isGCD: true, multitarget: false, cooldown: null, cast: 3.5 },
            { name: "Aetherial Manipulation", potency: 0, isGCD: false, multitarget: false, cooldown: 10, cast: 0 },
            { name: "Flare", potency: 260, isGCD: true, multitarget: true, falloffratio: 0.15, falloffmax: 0.7, cooldown: null, cast: 4 },
            { name: "Ley Lines", potency: 0, isGCD: false, multitarget: false, cooldown: 90, cast: 0 },
            { name: "Sharpcast", potency: 0, isGCD: false, multitarget: false, cooldown: 60, cast: 0, buff: "Sharpcast", buffProcRate: 1 },
            { name: "Fire", potency: 180, isGCD: true, multitarget: false, cooldown: null, cast: 2.5 },
            { name: "Enochian", potency: 0, isGCD: false, multitarget: false, cooldown: 30, cast: 0 },
            { name: "Blizzard IV", potency: 260, isGCD: true, multitarget: false, cooldown: null, cast: 2.8 },
            { name: "Fire IV", potency: 280, isGCD: true, multitarget: false, cooldown: null, cast: 2.8 },
            { name: "Between the Lines", potency: 0, isGCD: true, multitarget: false, cooldown: null, cast: 0 },
            { name: "Triplecast", potency: 0, isGCD: true, multitarget: false, cooldown: 60, cast: 0 },
            { name: "Foul", potency: 650, isGCD: true, multitarget: true, falloffratio: 0.1, falloffmax: 0.5, cooldown: null, cast: 2.5 }
        ];
        self.skills.concat(classParsers.defParser.rangedMagicalRoleSkills);
        self.dots = [
            { name: "Thunder III", potency: 40, duration: 24 },
            { name: "Thunder IV", potency: 30, duration: 18 }
        ];
        self.buffs = [
            {
                name: "Firestarter",
                affects: "self",
                duration: 18,
                consumed: true,
                expected: {
                    logic: "and",
                    skills: [
                        { name: "Fire III", quantity: 1, comparison: "=" }
                    ]
                }
            },
            {
                name: "Apocatastatis",
                affects: "partyother",
                duration: 10,
                consumed: false,
                magicdamagerecieved: 0.8
            },
            {
                name: "Diversion",
                affects: "self",
                duration: 30,
                consumed: false,
                enmityrate: 0.1
            },
            {
                name: "Lucid Dreaming",
                affects: "self",
                duration: 21,
                consumed: false,
                mprecovery: 80
            },
            {
                name: "Surecast",
                affects: "self",
                duration: 5,
                consumed: false
            },
            {
                name: "Sharpcast",
                affects: "self",
                duration: 15,
                consumed: true,
                expected: {
                    logic: "or",
                    skills: [
                        { name: "Fire I", quantity: 1, comparison: "=" },
                        { name: "Thunder III", quantity: 1, comparison: "=" },
                        { name: "Thunder IV", quantity: 1, comparison: "=" }
                    ]
                }
            },
            {
                name: "Thundercloud",
                affects: "self",
                duration: 18,
                consumed: true,
                expected: {
                    logic: "or",
                    skills: [
                        { name: "Thunder III", quantity: 1, comparison: "=" },
                        { name: "Thunder IV", quantity: 1, comparison: "=" }
                    ]
                }
            }
        ];
        self.debuffs = [
            {
                name: "Sleep",
                affects: "enemy",
                duration: 30,
                damageremoves: true,
                actionspeed: 0
            },
            {
                name: "Bind",
                affects: "enemy",
                duration: 8,
                damageremoves: true,
                movementspeed: 0
            },
            {
                name: "Addle",
                affects: "enemy",
                duration: 10,
                damageremoves: false,
                magicdamage: 0.9
            },
            {
                name: "Heavy",
                affects: "enemy",
                duration: 20,
                damageremoves: false,
                movementspeed: 0.8
            }
        ];
        self.stances = [
            { name: "Enochian", active: [] },
            { name: "Umbral Ice", active: [] },
            { name: "Astral Fire", active: [] }
        ];
        self.currentStance = null;

        this.eventParsers = class blackMageEventParsers extends eventParsers {}
    }
};

classParsers.DarkKnight = class DarkKnight extends classParsers.defParser {
    constructor() {
        super();
        let self = this;
        self.name = "DarkKnight";
        self.skills = [
            { name: "Hard Slash", potency: 150, isGCD: true, multitarget: false, cooldown: null, cast: 0 },
            { name: "Spinning Slash", potency: 100, combopotency: 120, comboskill: "Hard Slash", enmity: 5.25, isGCD: true, multitarget: false, cooldown: null, cast: 0 },
            { name: "Unleash", potency: 50, enmity: 20.6, isGCD: true, multitarget: true, cooldown: null, cast: 0 },
            { name: "Syphon Strike", potency: 100, combopotency: 150, comboskill: "Hard Slash", darkarts: 140, isGCD: true, multitarget: false, cooldown: null, cast: 0 },
            { name: "Unmend", potency: 150, enmity: 5, isGCD: true, multitarget: false, cooldown: null, cast: 0, buff: "Enhanced Unleash", buffProcRate: 0.3 },
            { name: "Blood Weapon", potency: 0, isGCD: false, multitarget: false, cooldown: 40, cast: 0, buff: "Blood Weapon", buffProcRate: 1 },
            { name: "Power Slash", potency: 100, combopotency: 200, comboskill: "Spinning Slash", enmity: 5.5, isGCD: true, multitarget: false, cooldown: null, cast: 0 },
            { name: "Grit", potency: 0, isGCD: true, multitarget: false, cooldown: null, cast: 0 },
            { name: "Darkside", potency: 0, isGCD: false, multitarget: false, cooldown: 5, cast: 0, buff: "Darkside", buffProcRate: 1 },
            { name: "Blood Price", potency: 0, isGCD: true, multitarget: false, cooldown: 40, cast: 0, buff: "Blood Price", buffProcRate: 1 },
            { name: "Souleater", potency: 100, combopotency: 200, comboskill: "Syphon Strike", darkarts: 140, isGCD: true, multitarget: false, cooldown: null, cast: 0 },
            { name: "Dark Passenger", potency: 100, darkarts: 140, isGCD: false, multitarget: true, cooldown: 30, cast: 0 },
            { name: "Dark Mind", potency: 0, darkarts: 0, isGCD: false, multitarget: false, cooldown: 60, cast: 0, buff: "Dark Mind", buffProcRate: 1 },
            { name: "Dark Arts", potency: 0, isGCD: false, multitarget: false, cooldown: 2, cast: 0, buff: "Dark Arts", buffProcRate: 1 },
            { name: "Shadow Wall", potency: 0, isGCD: false, multitarget: false, cooldown: 180, cast: 0, buff: "Shadow Wall", buffProcRate: 1 },
            { name: "Living Dead", potency: 0, isGCD: true, multitarget: false, cooldown: null, cast: 0, buff: "Living Dead", buffProcRate: 1 },
            { name: "Salted Earth", potency: 0, isGCD: false, multitarget: true, cooldown: 45, cast: 0, dot: "Salted Earth", dotProcRate: 1 },
            { name: "Plunge", potency: 200, isGCD: false, multitarget: false, cooldown: 30, cast: 0 },
            { name: "Abyssal Drain", potency: 120, enmity: 5, darkarts: 0, isGCD: true, multitarget: true, cooldown: null, cast: 0 },
            { name: "Sole Survivor", potency: 0, isGCD: false, multitarget: false, cooldown: 120, cast: 0, debuff: "Another Victim", debuffProcRate: 1 },
            { name: "Carve and Spit", potency: 100, darkarts: 350, isGCD: false, multitarget: false, cooldown: 60, cast: 0 },
            { name: "Delirium", potency: 0, isGCD: false, multitarget: false, cooldown: 80, cast: 0 },
            { name: "Quietus", potency: 160, darkarts: 50, isGCD: true, multitarget: true, cooldown: null, cast: 0 },
            { name: "Bloodspiller", potency: 400, darkarts: 140, isGCD: true, multitarget: false, cooldown: null, cast: 0 },
            { name: "The Blackest Night", potency: 0, isGCD: false, multitarget: false, cooldown: 15, cast: 0, buff: "The Blackest Night", buffProcRate: 1 },
        ];
        self.skills.concat(classParsers.defParser.tankRoleSkills);
        self.dots = [
            { name: "Salted Earth", potency: 75, duration: 21, groundarea: true }
        ];
        self.buffs = [
            {
                name: "Enhanced Unleash",
                affects: "self",
                duration: 15,
                consumed: true,
                expected: {
                    logic: "and",
                    skills: [
                        { name: "Unleash", quantity: 1, comparison: "=" }
                    ]
                }
            },
            {
                name: "Blood Weapon",
                affects: "self",
                duration: 15,
                consumed: false,
                actionspeed: 1.1
            },
            {
                name: "Darkside",
                affects: "self",
                duration: null,
                consumed: false,
                damage: 1.2
            },
            {
                name: "Blood Price",
                affects: "self",
                duration: 15,
                consumed: false,
                required: {
                    stance: "Grit"
                }
            },
            {
                name: "Dark Mind",
                affects: "self",
                duration: 10,
                consumed: false,
                magicdamagerecieved: 0.85,
                darkarts: 0.7
            },
            {
                name: "Dark Arts",
                affects: "self",
                duration: 10,
                consumed: true
            },
            {
                name: "Shadow Wall",
                affects: "self",
                duration: 10,
                consumed: false,
                damagereceived: 0.7
            },
            {
                name: "Living Dead",
                affects: "self",
                duration: 10,
                consumed: true,
                invulnerability: 1,
                debuff: "Walking Dead",
                debuffProcRate: "consumed"
            },
            {
                name: "The Blackest Night",
                affects: "party",
                duration: 7,
                consumed: true,
                absorbself: 0.2,
                absorbother: 0.1
            },
            {
                name: "Rampart",
                affects: "self",
                duration: 20,
                consumed: false,
                damagereceived: 0.8
            },
            {
                name: "Convalescence",
                affects: "self",
                duration: 20,
                consumed: false,
                healingreceived: 1.2
            },
            {
                name: "Anticipation",
                affects: "self",
                duration: 20,
                consumed: false,
                parry: 1.3
            },
            {
                name: "Awareness",
                affects: "self",
                duration: 25,
                consumed: false,
                criticalreceived: 0
            }
        ];
        self.debuffs = [
            {
                name: "Another Victim",
                affects: "enemy",
                duration: 15,
                damageremoves: false
            },
            {
                name: "Stun",
                affects: "enemy",
                duration: 5,
                damageremoves: false,
                actionspeed: 0
            },
            {
                name: "Reprisal",
                affects: "enemy",
                duration: 5,
                damageremoves: false,
                damage: 0.9
            },
            {
                name: "Silence",
                affects: "enemy",
                duration: 1,
                damageremoves: false,
                spellspeed: 0
            },
            {
                name: "Walking Dead",
                affects: "self",
                duration: 10,
                expireeffect: "Death"
            }
        ];
        self.stances = [
            { name: "Grit", active: [] }
        ];
        self.currentStance = null;

        this.eventParsers = class darkKnightEventParsers extends eventParsers {}
    }
};

classParsers.Dragoon = class Dragoon extends classParsers.defParser {
    constructor() {
        super();
        let self = this;
        self.name = "Dragoon";
        self.skills = [
            {
                name: "True Thrust",
                potency: 160,
                isGCD: true,
                multitarget: false,
                cooldown: null,
                cast: 0
            },
            {
                name: "Vorpal Thrust",
                potency: 100,
                combo: { action: "True Thrust", potency: 150},
                isGCD: true,
                multitarget: false,
                cooldown: null,
                cast: 0
            },
            {
                name: "Impulse Drive",
                potency: 200,
                isGCD: true,
                multitarget: false,
                cooldown: null,
                cast: 0
            },
            {
                name: "Heavy Thrust",
                potency: 150,
                positional: {position: "flank", potency: 40},
                isGCD: true,
                multitarget: false,
                cooldown: null,
                cast: 0,
                buff: {
                    name: "Heavy Thrust",
                    procRate: 1,
                    target: "self",
                    duration: 30,
                    consumed: false,
                    damage: 1.1
                },
            },
            {
                name: "Piercing Talon",
                potency: 120,
                isGCD: true,
                multitarget: false,
                cooldown: null,
                cast: 0
            },
            {
                name: "Life Surge",
                potency: 0,
                isGCD: false,
                multitarget: false,
                cooldown: 50,
                cast: 0,
                buff: {
                    name: "Life Surge",
                    procRate: 1,
                    target: "self",
                    duration: 10,
                    consumed: true,
                    expected: {
                        logic: "and",
                        skills: [
                            { name: "Full Thrust", quantity: 1, comparison: "=" }
                        ]
                    }
                }
            },
            {
                name: "Full Thrust",
                potency: 100,
                combo: { action: "Vorpal Thrust", potency: 350 },
                isGCD: true,
                multitarget: false,
                cooldown: null,
                cast: 0
            },
            {
                name: "Blood for Blood",
                potency: 0,
                isGCD: false,
                multitarget: false,
                cooldown: 80,
                cast: 0,
                buff: {
                    name: "Blood for Blood",
                    procRate: 1,
                    target: "self",
                    duration: 20,
                    consumed: false,
                    damage: 1.15,
                    damagereceived: 1.1
                }
            },
            {
                name: "Jump",
                potency: 260,
                combo: {stance: "Blood of the Dragon", potency: 78},
                isGCD: false,
                multitarget: false,
                cooldown: 30,
                cast: 0,
                buff: {
                    name: "Dive Ready",
                    affects: "self",
                    duration: 15,
                    consumed: true,
                    expected: {
                        logic: "and",
                        skills: [
                            {name: "Mirage Dive", quantity: 1, comparison: "="}
                        ]
                    }
                }
            },
            {
                name: "Elusive Jump",
                potency: 0,
                isGCD: false,
                multitarget: false,
                cooldown: 30,
                cast: 0,
                enmitymultiplied: 0.5
            },
            {
                name: "Disembowel",
                potency: 100,
                combo: {action: "Impulse Drive", potency: 140},
                isGCD: true,
                multitarget: false,
                cooldown: null,
                cast: 0,
                debuff: {
                    name: "Piercing Resistance Down",
                    procRate: 1,
                    target: "enemy",
                    duration: 30,
                    damageremoves: false,
                    piercingdamagerecieved: 1.05
                }
            },
            {
                name: "Doom Spike",
                potency: 140,
                isGCD: true,
                multitarget: true,
                cooldown: null,
                cast: 0
            },
            {
                name: "Spineshatter Dive",
                potency: 210,
                combo: {stance: "Blood of the Dragon", potency: 78},
                isGCD: false,
                multitarget: false,
                cooldown: 60,
                cast: 0,
                buff: {
                    name: "Dive Ready",
                    procRate: 1,
                    target: "self",
                    duration: 15,
                    consumed: true,
                    expected: {
                        logic: "and",
                        skills: [
                            {name: "Mirage Dive", quantity: 1, comparison: "="}
                        ]
                    }
                },
                debuff: {
                    name: "Stun",
                    procRate: 1,
                    target: "enemy",
                    duration: 2,
                    damageremoves: false,
                    actionspeed: 0
                },
            },
            {
                name: "Chaos Thrust",
                potency: 100,
                positional: { position: "rear", potency: 40 },
                combo: { action: "Disembowel", potency: 140 },
                isGCD: true,
                multitarget: false,
                cooldown: null,
                cast: 0,
                dot: {
                    name: "Chaos Thrust",
                    procRate: 1,
                    potency: 35,
                    duration: 30
                }
            },
            {
                name: "Dragonfire Dive",
                potency: 320,
                isGCD: false,
                multitarget: true,
                cooldown: 120,
                cast: 0
            },
            {
                name: "Battle Litany",
                potency: 0,
                isGCD: false,
                multitarget: true,
                cooldown: 180,
                cast: 0,
                buff: {
                    name: "Battle Litany",
                    procRate: 1,
                    target: "party",
                    duration: 20,
                    consumed: false,
                    criticalhitadd: 0.15
                }
            },
            {
                name: "Blood of the Dragon",
                potency: 0,
                isGCD: true,
                multitarget: false,
                cooldown: 30,
                cast: 0,
                stance: "Blood of the Dragon"
            },
            {
                name: "Fang and Claw",
                potency: 260,
                positional: { position: "flank", potency: 40 },
                isGCD: true,
                multitarget: false,
                cooldown: null,
                cast: 0
            },
            {
                name: "Wheeling Thrust",
                potency: 260,
                positional: { position: "rear", potency: 40 },
                isGCD: true,
                multitarget: false,
                cooldown: null,
                cast: 0
            },
            {
                name: "Geirskogul",
                potency: 230,
                isGCD: false,
                multitarget: true,
                cooldown: 30,
                cast: 0
            },
            {
                name: "Sonic Thrust",
                potency: 100,
                combo: { action: "Doom Spike", potency: 80 },
                isGCD: true,
                multitarget: false,
                cooldown: null,
                cast: 0
            },
            {
                name: "Dragon Sight",
                potency: 0,
                isGCD: false,
                multitarget: true,
                cooldown: 120,
                cast: 0,
                buff: {
                    name: "Dragon Sight",
                    procRate: 1,
                    target: "party",
                    duration: 20,
                    consumed: false,
                    damageself: 1.1,
                    damageother: 1.05
                }
            },
            {
                name: "Mirage Dive",
                potency: 210,
                isGCD: false,
                multitarget: false,
                cooldown: 1,
                cast: 0,
                requiredBuff: "Dive Ready"
            },
            {
                name: "Nastrond",
                potency: 330,
                isGCD: false,
                multitarget: false,
                cooldown: 10,
                cast: 0,
                requiredStance: "Life of the Dragon"
            },
        ];
        self.skills.concat(classParsers.defParser.meleeRoleSkills);
        self.stances = [
            { name: "Blood of the Dragon", active: [] },
            { name: "Life of the Dragon", active: [] }
        ];
        self.currentStance = null;

        this.eventParsers = class dragoonEventParsers extends eventParsers {}
    }
};

classParsers.Machinist = class Machinist extends classParsers.defParser {
    constructor() {
        super();
        let self = this;
        self.name = "Machinist";
        self.skills = [
            { name: "Split Shot", potency: 160, ammopotency: 25, heatpotency: 30, isGCD: true, multitarget: false, cooldown: null, cast: 0 },
            { name: "Slug Shot", potency: 100, ammopotency: 25, combopotency: 100, comboskill: "Split Shot", heatpotency: 30, isGCD: true, multitarget: false, cooldown: null, cast: 0 },
            { name: "Reload", potency: 0, isGCD: false, multitarget: false, cooldown: 30, cast: 0 },
            { name: "Heartbreak", potency: 240, isGCD: false, multitarget: false, cooldown: 30, cast: 0, enemyHealthBelow: 0.2 },
            { name: "Reassemble", potency: 0, isGCD: false, multitarget: false, cooldown: 60, cast: 0, buff: "Reassemble", buffProcRate: 1 },
            { name: "Blank", potency: 0, isGCD: false, multitarget: false, cooldown: 30, cast: 0 },
            { name: "Spread Shot", potency: 80, ammopotency: 25, isGCD: true, multitarget: true, cooldown: null, cast: 0 },
            { name: "Quick Reload", potency: 0, isGCD: false, multitarget: false, cooldown: 15, cast: 0 },
            { name: "Hot Shot", potency: 120, ammopotency: 25, isGCD: true, multitarget: false, cooldown: null, cast: 0, buff: "Hot Shot", buffProcRate: 1 },
            { name: "Rapid Fire", potency: 0, isGCD: false, multitarget: false, cooldown: 60, cast: 0, buff: "Rapid Fire", buffProcRate: 1 },
            { name: "Clean Shot", potency: 100, ammopotency: 25, combopotency: 140, comboskill: "Slug Shot", heatpotency: 30, isGCD: true, multitarget: false, cooldown: null, cast: 0 },
            { name: "Wildfire", potency: 0, isGCD: false, multitarget: false, cooldown: 60, cast: 0, debuff: "Wildfire", debuffProcRate: 1 },
            { name: "Rook Autoturret", potency: 0, isGCD: false, multitarget: false, cooldown: 10, cast: 0, summonPet: "Rook Autoturret" },
            { name: "Bishop Autoturret", potency: 0, isGCD: false, multitarget: false, cooldown: 10, cast: 0, summonPet: "Bishop Autoturret" },
            { name: "Gauss Barrel", potency: 0, isGCD: false, multitarget: false, cooldown: 2, cast: 0, stance: "Gauss Barrel" },
            { name: "Remove Barrel", potency: 0, isGCD: false, multitarget: false, cooldown: 10, cast: 0 },
            { name: "Gauss Round", potency: 200, isGCD: false, multitarget: false, cooldown: 15, cast: 0 },
            { name: "Dismantle", potency: 0, isGCD: false, multitarget: false, cooldown: 60, cast: 0, debuff: "Dismantle", debuffProcRate: 1 },
            { name: "Hypercharge", potency: 0, isGCD: false, multitarget: false, cooldown: 120, cast: 0, buff: "Hypercharge", buffProcRate: 1 },
            { name: "Ricochet", potency: 300, isGCD: false, multitarget: true, falloffratio: 0.1, falloffmax: 0.5, cooldown: null, cast: 0 },
            { name: "Cooldown", potency: 150, ammopotency: 25, heatpotency: 80, isGCD: true, multitarget: false, cooldown: null, cast: 0 },
            { name: "Barrel Stabilizer", potency: 0, isGCD: false, multitarget: false, cooldown: 60, cast: 0 },
            { name: "Rook Overdrive", potency: 0, isGCD: false, multitarget: false, cooldown: 120, cast: 0 },
            { name: "Bishop Overdrive", potency: 0, isGCD: true, multitarget: false, cooldown: 120, cast: 0 },
            { name: "Flamethrower", potency: 60, isGCD: true, multitarget: true, cooldown: 60, cast: 0 }
        ];
        self.skills.concat(classParsers.defParser.rangedPhysicalRoleSkills);
        self.dots = [];
        self.buffs = [];
        self.debuffs = [];
        self.stances = [];
        self.currentStance = null;

        this.eventParsers = class machinistEventParsers extends eventParsers {}
    }
};

classParsers.Monk = class Monk extends classParsers.defParser {
    constructor() {
        super();
        let self = this;
        self.name = "Monk";
        self.skills = [
            {
                name: "Bootshine",
                potency: 140,
                positional: { position: "rear", criticalhitrate: 1 },
                isGCD: true,
                multitarget: false,
                cooldown: null,
                cast: 0
            },
            {
                name: "True Strike",
                potency: 140,
                positional: { position: "rear", potency: 40 },
                isGCD: true,
                multitarget: false,
                cooldown: null,
                cast: 0
            },
            {
                name: "Snap Punch",
                potency: 130,
                positional: { position: "flank", potency: 40 },
                isGCD: true,
                multitarget: false,
                cooldown: null,
                cast: 0,
                stance: "Greased Lightning"
            },
            {
                name: "Internal Release",
                potency: 0,
                isGCD: false,
                multitarget: false,
                cooldown: 60,
                cast: 0,
                buff: {
                    name: "Internal Release",
                    duration: 15,
                    criticalhitadd: 0.3,
                    target: "self"
                }
            },
            {
                name: "Fists of Earth",
                potency: 0,
                isGCD: false,
                multitarget: false,
                cooldown: 3,
                cast: 0,
                stance: "Fists of Earth"
            },
            {
                name: "Twin Snakes",
                potency: 100,
                positional: { position: "flank", potency: 30 },
                isGCD: true,
                multitarget: false,
                cooldown: null,
                cast: 0,
                buff: {
                    name: "Twin Snakes",
                    duration: 15,
                    damage: 1.1,
                    target: "self"
                }
            },
            {
                name: "Arm of the Destroyer",
                potency: 50,
                isGCD: true,
                multitarget: true,
                cooldown: null,
                cast: 0
            },
            {
                name: "Demolish",
                potency: 30,
                positional: { position: "rear", potency: 40 },
                isGCD: true,
                multitarget: false,
                cooldown: null,
                cast: 0,
                dot: {
                    name: "Demolish",
                    duration: 18,
                    potency: 50
                },
                stance: "Greased Lightning"
            },
            {
                name: "Rockbreaker",
                potency: 130,
                isGCD: true,
                multitarget: true,
                cooldown: null,
                cast: 0,
                stance: "Greased Lightning"
            },
            {
                name: "Fists of Wind",
                potency: 0,
                isGCD: false,
                multitarget: false,
                cooldown: 3,
                cast: 0,
                stance: "Fists of Wind"
            },
            {
                name: "Shoulder Tackle",
                potency: 100,
                isGCD: false,
                multitarget: false,
                cooldown: 30,
                cast: 0
            },
            {
                name: "Steel Peak",
                potency: 150,
                isGCD: false,
                multitarget: false,
                cooldown: 40,
                cast: 0
            },
            {
                name: "Fists of Fire",
                potency: 0,
                isGCD: false,
                multitarget: false,
                cooldown: 0,
                cast: 0,
                stance: "Fists of Fire"
            },
            {
                name: "Mantra",
                potency: 0,
                isGCD: false,
                multitarget: true,
                cooldown: 90,
                cast: 0,
                buff: {
                    name: "Mantra",
                    duration: 15,
                    healingreceived: 1.2,
                    target: "party"
                }
            },
            {
                name: "One Ilm Punch",
                potency: 120,
                isGCD: true,
                multitarget: false,
                cooldown: null,
                cast: 0
            },
            {
                name: "Howling Fist",
                potency: 210,
                isGCD: false,
                multitarget: true,
                cooldown: 60,
                cast: 0
            },
            {
                name: "Perfect Balance",
                potency: 0,
                isGCD: false,
                multitarget: false,
                cooldown: 60,
                cast: 0,
                buff: {
                    name: "Perfect Balance",
                    duration: 10,
                    target: "self"
                }
            },
            {
                name: "Dragon Kick",
                potency: 100,
                positional: { position: "flank", potency: 40 },
                isGCD: true,
                multitarget: false,
                cooldown: null,
                cast: 0,
                debuff: {
                    name: "Blunt Resistance Down",
                    duration: 15,
                    bluntdamagerecieved: 1.1,
                    target: "enemy"
                }
            },
            {
                name: "Form Shift",
                potency: 0,
                isGCD: true,
                multitarget: false,
                cooldown: null,
                cast: 0
            },
            {
                name: "Meditation",
                potency: 0,
                isGCD: true,
                multitarget: false,
                cooldown: null,
                cast: 0
            },
            {
                name: "The Forbidden Chakra",
                potency: 250,
                isGCD: false,
                multitarget: false,
                cooldown: 5,
                cast: 0
            },
            {
                name: "Elixir Field",
                potency: 220,
                isGCD: false,
                multitarget: true,
                cooldown: 30,
                cast: 0
            },
            {
                name: "Purification",
                potency: 0,
                tprecovery: 300,
                target: "self",
                isGCD: false,
                multitarget: false,
                cooldown: 120,
                cast: 0
            },
            {
                name: "Tornado Kick",
                potency: 330,
                isGCD: false,
                multitarget: false,
                cooldown: 10,
                cast: 0
            },
            {
                name: "Riddle of Earth",
                potency: 0,
                isGCD: false,
                multitarget: false,
                cooldown: 60,
                cast: 0,
                buff: {
                    name: "Earth's Reply",
                    damagereceived: 0.9,
                    duration: 30,
                    target: "self"
                },
                stance: "Fists of Earth"
            },
            {
                name: "Earth Tackle",
                potency: 100,
                isGCD: false,
                multitarget: false,
                cooldown: 30,
                cast: 0,
                requiredStance: "Fists of Earth",
                debuff: {
                    name: "Stun",
                    duration: 2,
                    actionspeed: 0,
                    target: "enemy"
                }
            },
            {
                name: "Wind Tackle",
                potency: 65,
                isGCD: false,
                multitarget: false,
                cooldown: 30,
                cast: 0,
                requiredStance: "Fists of Wind",
                debuff: {
                    name: "Stun",
                    duration: 2,
                    actionspeed: 0,
                    target: "enemy"
                },
                buff: {
                    name: "Riddle of Wind",
                    duration: 10,
                    target: "self"
                }
            },
            {
                name: "Riddle of Wind",
                potency: 65,
                isGCD: false,
                multitarget: false,
                cooldown: null,
                cast: 0,
                requiredBuff: "Riddle of Wind",
                stance: "Greased Lightning"
            },
            {
                name: "Riddle of Fire",
                potency: 0,
                isGCD: false,
                multitarget: false,
                cooldown: 90,
                cast: 0,
                buff: {
                    name: "Riddle of Fire",
                    duration: 20,
                    target: "self",
                    damage: 1.3,
                    speedadd: -0.15
                },
                stance: "Fists of Fire"
            },
            {
                name: "Brotherhood",
                potency: 0,
                isGCD: false,
                multitarget: false,
                cooldown: 90,
                cast: 0,
                buff: {
                    name: "Brotherhood",
                    duration: 15,
                    target: "party",
                    physicaldamage: 1.05
                }
            }
        ];
        self.skills.concat(classParsers.defParser.meleeRoleSkills);
        self.stances = [];
        self.currentStance = null;

        this.eventParsers = class machinistEventParsers extends eventParsers {}
    }
};

classParsers.Ninja = class Ninja extends classParsers.defParser {
    constructor() {
        super();
        let self = this;
        self.name = "Ninja";
        self.skills = [
            {
                name: "Spinning Edge",
                potency: 150,
                isGCD: true,
                multitarget: false,
                cooldown: null,
                cast: 0
            },
            {
                name: "Shade Shift",
                potency: 0,
                isGCD: false,
                multitarget: false,
                cooldown: 120,
                cast: 0,
                buff: {
                    name: "Shade Shift",
                    duration: 20,
                    target: "self",
                    maxhealthabsorb: 0.2
                }
            },
            {
                name: "Gust Slash",
                potency: 100,
                combo: { action: "Spinning Edge", potency: 100 },
                isGCD: true,
                multitarget: false,
                cooldown: null,
                cast: 0
            },
            {
                name: "Hide",
                potency: 0,
                isGCD: false,
                multitarget: false,
                cooldown: 20,
                cast: 0,
                buff: {
                    name: "Hidden",
                    target: "self"
                }
            },
            {
                name: "Assassinate",
                potency: 200,
                isGCD: false,
                multitarget: false,
                cooldown: 40,
                cast: 0,
                enemyHealthBelow: 0.2
            },
            {
                name: "Throwing Dagger",
                potency: 120,
                isGCD: true,
                multitarget: false,
                cooldown: null,
                cast: 0
            },
            {
                name: "Mug",
                potency: 140,
                isGCD: false,
                multitarget: false,
                cooldown: 90,
                cast: 0
            },
            {
                name: "Trick Attack",
                potency: 240,
                positional: { position: "rear", potency: 160, debuffProcRate: 1 },
                isGCD: false,
                multitarget: false,
                cooldown: 60,
                cast: 0,
                debuff: {
                    name: "Vulnerability Up",
                    procRate: 0,
                    target: "enemy",
                    duration: 10,
                    damagereceived: 1.1
                }
            },
            {
                name: "Aeolian Edge",
                potency: 100,
                positional: { position: "rear", potency: 60 },
                combo: { action: "Gust Slash", potency: 180 },
                isGCD: true,
                multitarget: false,
                cooldown: null,
                cast: 0
            },
            {
                name: "Jugulate",
                potency: 80,
                isGCD: false,
                multitarget: false,
                cooldown: 30,
                cast: 0,
                debuff: {
                    name: "Silence",
                    duration: 1,
                    castspeed: 0,
                    target: "enemy"
                }
            },
            {
                name: "Shadow Fang",
                potency: 100,
                combo: { action: "Gust Slash", potency: 100, dotProcRate: 1, debuffProcRate: 1 },
                isGCD: true,
                multitarget: false,
                cooldown: null,
                cast: 0,
                dot: {
                    name: "Shadow Fang",
                    procRate: 0,
                    duration: 21,
                    potency: 40
                },
                debuff: {
                    name: "Slashing Resistance Down",
                    procRate: 0,
                    duration: 21,
                    slashingdamagerecieved: 1.1,
                    target: "enemy"
                }
            },
            {
                name: "Shukuchi",
                potency: 0,
                isGCD: false,
                multitarget: false,
                cooldown: 60,
                cast: 0
            },
            {
                name: "Death Blossom",
                potency: 110,
                isGCD: true,
                multitarget: true,
                cooldown: null,
                cast: 0
            },
            {
                name: "Kassatsu",
                potency: 0,
                isGCD: false,
                multitarget: false,
                cooldown: 120,
                cast: 0,
                buff: {
                    name: "Kassatsu",
                    procRate: 1,
                    consumed: true,
                    duration: 15,
                    ninjitsucriticalrate: 1,
                    expected: {
                        logic: "or",
                        skills: [
                            { name: "Fuma Shuriken", quantity: 1, comparison: "=" },
                            { name: "Katon", quantity: 1, comparison: "=" },
                            { name: "Raiton", quantity: 1, comparison: "=" },
                            { name: "Hyoton", quantity: 1, comparison: "=" },
                            { name: "Huton", quantity: 1, comparison: "=" },
                            { name: "Doton", quantity: 1, comparison: "=" },
                            { name: "Suiton", quantity: 1, comparison: "=" }
                        ]
                    },
                    incorrect: {
                        logic: "and",
                        skills: [
                            { name: "Rabbit Medium", quantity: 1, comparison: ">=" }
                        ]
                    }
                }
            },
            {
                name: "Smoke Screen",
                potency: 0,
                isGCD: false,
                multitarget: false,
                cooldown: 180,
                cast: 0,
                buff: {
                    name: "Smoke Screen",
                    procRate: 1,
                    consumed: false,
                    duration: 20,
                    enmityrate: 0.5,
                }
            },
            {
                name: "Armor Crush",
                potency: 100,
                positional: { postion: "flank", potency: 60 },
                combo: { action: "Gust Slash", potency: 140 },
                isGCD: true,
                multitarget: false,
                cooldown: null,
                cast: 0
            },
            {
                name: "Shadewalker",
                potency: 0,
                isGCD: false,
                multitarget: false,
                cooldown: 120,
                cast: 0,
                buff: {
                    name: "Silhouette",
                    procRate: 1,
                    consumed: false,
                    duration: 15
                }
            },
            {
                name: "Duality",
                potency: 0,
                isGCD: false,
                multitarget: false,
                cooldown: 90,
                cast: 0,
                buff: {
                    name: "Duality",
                    procRate: 1,
                    consumed: true,
                    duration: 10,
                    target: "self",
                    skillhits: 2,
                    expected: {
                        logic: "and",
                        skills: [
                            { name: "Aeolian Edge", quantity: 1, comparison: "=" }
                        ]
                    }
                }
            },
            {
                name: "Dream Within a Dream",
                potency: 450,
                isGCD: false,
                multitarget: false,
                cooldown: 60,
                cast: 0
            },
            {
                name: "Hellfrog Medium",
                potency: 400,
                isGCD: false,
                multitarget: true,
                cooldown: 0,
                cast: 0,
                resourcecost: 80
            },
            {
                name: "Bhavacakra",
                potency: 600,
                isGCD: false,
                multitarget: false,
                cooldown: 50,
                cast: 0,
                resourcecost: 80
            },
            {
                name: "Ten Chi Jin",
                potency: 0,
                isGCD: false,
                multitarget: false,
                cooldown: 100,
                cast: 0,
                resourcecost: 80,
                buff: {
                    name: "Ten Chi Jin",
                    procRate: 1,
                    consumed: true,
                    duration: 10,
                    target: "self",
                    skilldamage: 2,
                    expected: {
                        logic: "or",
                        skills: [
                            { name: "Fuma Shuriken", quantity: 1, comparison: "=" },
                            { name: "Katon", quantity: 1, comparison: "=" },
                            { name: "Raiton", quantity: 1, comparison: "=" },
                            { name: "Hyoton", quantity: 1, comparison: "=" },
                            { name: "Huton", quantity: 1, comparison: "=" },
                            { name: "Doton", quantity: 1, comparison: "=" },
                            { name: "Suiton", quantity: 1, comparison: "=" }
                        ]
                    }
                }
            }
        ];
        self.skills.concat(classParsers.defParser.meleeRoleSkills);
        self.stances = [];
        self.currentStance = null;

        this.eventParsers = class ninjaEventParsers extends eventParsers {}
    }
};

classParsers.Paladin = class Paladin extends classParsers.defParser {
    constructor() {
        super();
        let self = this;
        self.name = "Paladin";
        self.skills = [];
        self.skills.concat(classParsers.defParser.tankRoleSkills);
        self.dots = [];
        self.buffs = [];
        self.debuffs = [];
        self.stances = [];
        self.currentStance = null;

        this.eventParsers = class paladinEventParsers extends eventParsers {}
    }
};

classParsers.RedMage = class RedMage extends classParsers.defParser {
    constructor() {
        super();
        let self = this;
        self.name = "RedMage";
        self.skills = [];
        self.skills.concat(classParsers.defParser.rangedMagicalRoleSkills);
        self.dots = [];
        self.buffs = [];
        self.debuffs = [];
        self.stances = [];
        self.currentStance = null;

        this.eventParsers = class redMageEventParsers extends eventParsers {}
    }
};

classParsers.Samurai = class Samurai extends classParsers.defParser {
    constructor() {
        super();
        let self = this;
        self.name = "Samurai";
        self.skills = [];
        self.skills.concat(classParsers.defParser.meleeRoleSkills);
        self.dots = [];
        self.buffs = [];
        self.debuffs = [];
        self.stances = [];
        self.currentStance = null;

        this.eventParsers = class monkEventParsers extends eventParsers {}
    }
};

classParsers.Scholar = class Scholar extends classParsers.defParser {
    constructor() {
        super();
        let self = this;
        self.name = "Scholar";
        self.skills = [];
        self.skills.concat(classParsers.defParser.healerRoleSkills);
        self.dots = [];
        self.buffs = [];
        self.debuffs = [];
        self.stances = [];
        self.currentStance = null;

        this.eventParsers = class scholarEventParsers extends eventParsers {}
    }
};

classParsers.Summoner = class Summoner extends classParsers.defParser {
    constructor() {
        super();
        let self = this;
        self.name = "Summoner";
        self.skills = [];
        self.skills.concat(classParsers.defParser.rangedMagicalRoleSkills);
        self.dots = [];
        self.buffs = [];
        self.debuffs = [];
        self.stances = [];
        self.currentStance = null;

        this.eventParsers = class summonerEventParsers extends eventParsers {}
    }
};

classParsers.Warrior = class Warrior extends classParsers.defParser {
    constructor() {
        super();
        let self = this;
        self.name = "Warrior";
        self.skills = [];
        self.skills.concat(classParsers.defParser.tankRoleSkills);
        self.dots = [];
        self.buffs = [];
        self.debuffs = [];
        self.stances = [];
        self.currentStance = null;

        this.eventParsers = class warriorEventParsers extends eventParsers {}
    }
};

classParsers.WhiteMage = class WhiteMage extends classParsers.defParser {
    constructor() {
        super();
        let self = this;
        self.name = "WhiteMage";
        self.skills = [];
        self.skills.concat(classParsers.defParser.healerRoleSkills);
        self.dots = [];
        self.buffs = [];
        self.debuffs = [];
        self.stances = [];
        self.currentStance = null;

        this.eventParsers = class whiteMageEventParsers extends eventParsers {}
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

class eventParsers {
    static begincast(e, curAction, actions) {
        actions.push(curAction);
        return new fightAction(e);
    }

    static cast(e, curAction, actions) {
        if (curAction.begincast > 0 && curAction.endcast == null) {
            // Cast event for a channeled skill that is currently being processed
            curAction.endcast = e.timestamp;
            return curAction;
        } else {
            actions.push(curAction);
            return new fightAction(e);
        }
    }

    static damage(e, curAction, actions) {
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

    static heal(e, curAction, actions) {
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

    static applydebuff(e, curAction, actions) {
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

    static removedebuff(e, curAction, actions) {
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

    static applybuff(e, curAction, actions) {
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

    static removebuff(e, curAction, actions) {
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

    static refreshdebuff(e, curAction, actions) {
        // TODO: implement handling for refreshdebuff
        return curAction;
    };

    static refreshbuff(e, curAction, actions) {
        // TODO: implement handling for refreshbuff
        return curAction;
    };
}
