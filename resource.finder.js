module.exports = {
  getSource: function(creep, split){
    const sources = creep.room.find(FIND_SOURCES);
    if(sources === undefined || sources.length == 0) return []
    if(sources.length == 1) return sources[0];

    const creepMagicNumber = creep.name.match(/\d+$/)[0];
    if (creepMagicNumber % split == 0){
      return sources[0]
    }else {
      return sources[1]
    }
  },

  getStorageOrSource: function(creep, split){
    const storages = creep.room.find(FIND_STRUCTURES, {
      filter: (s) => s.structureType == STRUCTURE_STORAGE && s.store[RESOURCE_ENERGY] > 0
    });

    if(storages === undefined || storages.length == 0) return this.getSource(creep, split);
    if(storages.length == 1) return storages[0];

    const creepMagicNumber = creep.name.match(/\d+$/)[0];
    if (creepMagicNumber % split == 0){
      return storages[0]
    }else {
      return storages[1]
    }
  },

  getStructuresToRepair: function(creep, split){
    let toRepair = creep.room.find(FIND_STRUCTURES, {
      filter: (structure) => (
          structure.structureType == STRUCTURE_ROAD ||
          structure.structureType == STRUCTURE_TOWER
        ) && structure.hits < structure.hitsMax
    })
    if(toRepair === undefined) return [];
    if(toRepair.length == 1) return toRepair[0];

    const creepMagicNumber = creep.name.match(/\d+$/)[0];
    if (creepMagicNumber % split == 0){
      return toRepair[0]
    }else {
      return toRepair[1]
    }
  }
};
