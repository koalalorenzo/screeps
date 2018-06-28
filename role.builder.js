const resource = require('resource.finder');
const roleUpgrader = require('role.upgrader');

module.exports = {
    initMemory: function(creep){
        if(creep.memory.building === undefined){
            creep.memory.building = false
        }
    },

    /** @param {Creep} creep **/
    run: function(creep) {
        this.initMemory(creep)

        // Run only if we have targets, otherwise be a upgrader
        let toBuild = creep.room.find(FIND_CONSTRUCTION_SITES);
        let toRepair = creep.room.find(FIND_STRUCTURES, {
            filter: function(object){
                return object.hits < object.hitsMax;
            }
        })

        console.log(toRepair)

        if(!toBuild.length || !toRepair.length) {
            return roleUpgrader.run(creep)
        }

        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
        }

        if(creep.memory.building) {
            // Check if we have anything to build
            if(toBuild.length){
                if(creep.build(toBuild[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(toBuild[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            // otherwise check for repairs
            }else{
                if(creep.repair(toRepair[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(toRepair[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }else{
            let source = resource.getSource(creep, 2);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
};
