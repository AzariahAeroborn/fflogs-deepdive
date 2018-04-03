var fightAction = function(e){
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
};