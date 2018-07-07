const resource = require('resource.finder');

module.exports = {
  setup: function(spawner, role, min, parts){
    const list = this.list(role);

    if(list.length < min) {
      this.spawn(spawner, role, parts);
    }
  },

  spawn: function(spawner, role, parts){
    const newName = role + '_' + (Math.floor(Math.random() * 65534) + 1);
    spawner.spawnCreep(parts, newName, { memory: {role: role} })
  },

  list: function(role){
    return _.filter(Game.creeps, (creep) => creep.memory.role == role)
  },

  getEnergy: function(creep) {
    const source = resource.getStorageOrSource(creep);

    if(source.structureType == STRUCTURE_STORAGE) {
      if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
      }
    }else{
      if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
      }
    }
  }
};
