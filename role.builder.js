const resource = require('resource.finder');
const roleUpgrader = require('role.upgrader');

module.exports = {
    /** @param {Creep} creep **/
    run: function(creep) {
        // Run only if we have targets, otherwise be a upgrader
        let toBuild = creep.room.find(FIND_CONSTRUCTION_SITES);
        if(!toBuild.length) {
            return roleUpgrader.run(creep)
        }

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
        }

        if(creep.memory.building) {
            let source = resource.getSource(creep, 2);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }else{
            if(creep.build(toBuild[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(toBuild[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
};
