const resource = require('resource.finder');
const roleUpgrader = require('role.upgrader');
const roles = require('roles');

module.exports = {
    spawn: function(roomSpawn){
        return roles.run(roomSpawn, 'harvester', 4, [WORK, CARRY, MOVE, MOVE]);
    },

    /** @param {Creep} creep **/
    run: function(creep) {
        const emptyStructures = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                    structure.energy < structure.energyCapacity;
            }
        });
        if(emptyStructures.length == 0) {
            return roleUpgrader.run(creep)
        }

        if(creep.carry.energy < creep.carryCapacity) {
            const source = resource.getSource(creep, 2);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }

            return null
        } 

        if(creep.transfer(emptyStructures[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(emptyStructures[0], {visualizePathStyle: {stroke: '#ffffff'}});
        }
    }
};
