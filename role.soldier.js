const roles = require('roles');

module.exports = {
    spawn: function(roomSpawn){
        return roles.run(roomSpawn, 'soldier', 2, [TOUGH, ATTACK, ATTACK, MOVE, MOVE, MOVE]);
    },

    /** @param {Creep} creep **/
    run: function(creep) {
        let targets = creep.room.find(FIND_HOSTILE_CREEPS);
        if(targets.length) {
            if(creep.attack(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        }
    }
};
