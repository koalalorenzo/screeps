module.exports = {
  getSomethingInRoom: function(creep, type, f){
    let objects = []
    if(f){
      objects = creep.room.find(type, {filter: f});
    }else{
      objects = creep.room.find(type);
    }
 
    if(objects === undefined || objects.length == 0){
      return null
    }
    if(objects.length == 1){
      return objects[0]
    }

    const creepMagicNumber = creep.name.match(/\d+$/)[0];
    if (creepMagicNumber % 2 == 0){
      return objects[0]
    }else {
      return objects[1]
    }
  },

  getSource: function(creep){
    return this.getSomethingInRoom(creep, FIND_SOURCES);
  },

  getStorageOrSource: function(creep){
    return this.getSomethingInRoom(creep, FIND_STRUCTURES, (s) => {
      return s.structureType == STRUCTURE_STORAGE && s.store[RESOURCE_ENERGY] > 0
    });
  },

  getStructuresToRepair: function(creep){
    return this.getSomethingInRoom(creep, FIND_STRUCTURES, (s) => {
      return s.hits < s.hitsMax
    });
  }
};
