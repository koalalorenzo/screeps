const resource = require('resource.finder');
const roleUpgrader = require('role.upgrader');
const roles = require('roles');

module.exports = {
    spawn: function(roomSpawn){
        return roles.run(roomSpawn, 'builder', 4, [WORK, WORK, CARRY, MOVE, MOVE, MOVE]);
    },
    
    /** @param {Creep} creep **/
    run: function(creep) {
        // Run only if we have targets, otherwise be a upgrader
        let toBuild = creep.room.find(FIND_CONSTRUCTION_SITES);
        if(!toBuild) {
            return roleUpgrader.run(creep)
        }

        if(creep.carry.energy == 0) {
            creep.say('harvest');
            let source = resource.getSource(creep, 2);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }

            return null
        }

        if(creep.carry.energy == creep.carryCapacity) {
            creep.say('build');
            if(creep.build(toBuild) == ERR_NOT_IN_RANGE) {
                creep.moveTo(toBuild, {visualizePathStyle: {stroke: '#ffffff'}});
            }

            return null
        }
    }
};
