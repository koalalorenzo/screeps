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
        if(!toBuild.length) {
            return roleUpgrader.run(creep)
        }

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if(creep.memory.building) {
            creep.say('harvest');
            let source = resource.getSource(creep, 2);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }else{
            creep.say('build');
            if(creep.build(toBuild[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(toBuild[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
};
