const roles = require('roles');
const resource = require('resource.finder');
const roleUpgrader = require('role.upgrader');

module.exports = {
  initMemory: function(creep){
    if(creep.memory.building === undefined){
      creep.memory.building = false;
    }
  },

  /** @param {Creep} creep **/
  run: function(creep) {
    this.initMemory(creep);

    // Run only if we have targets, otherwise be a upgrader
    let toBuild = creep.room.find(FIND_CONSTRUCTION_SITES);
    let toRepair = resource.getStructuresToRepair(creep);

    if(toBuild.length == 0 && toRepair === null) {
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
        if(creep.repair(toRepair) == ERR_NOT_IN_RANGE) {
          creep.moveTo(toRepair, {visualizePathStyle: {stroke: '#ffffff'}});
        }
      }
    }else{
      roles.getEnergy(creep);
    }
  }
};
