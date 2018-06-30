const resource = require('resource.finder');
// const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');

module.exports = {
    /** @param {Creep} creep **/
    run: function(creep) {
        const emptyStructures = creep.room.find(FIND_STRUCTURES, {
            filter: (s) => {
                if (s.structureType == STRUCTURE_STORAGE){
                  return s.store[RESOURCE_ENERGY] < s.storeCapacity;
                }

                return (
                    s.structureType == STRUCTURE_EXTENSION ||
                    s.structureType == STRUCTURE_SPAWN ||
                    s.structureType == STRUCTURE_TOWER
                ) && s.energy < s.energyCapacity;
            }
        });

        if(emptyStructures.length == 0) {
            return roleBuilder.run(creep)
        }

        if(creep.carry.energy < creep.carryCapacity) {
            const source = resource.getSource(creep, 2);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }else{
            if(creep.transfer(emptyStructures[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(emptyStructures[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
};
