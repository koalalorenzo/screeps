module.exports = {
  getSource: function(creep, split){
    const sources = creep.room.find(FIND_SOURCES);
    if(sources.length == 1) return sources[0];

    const creepMagicNumber = creep.name.match(/\d+$/)[0];
    if (creepMagicNumber % split == 0){
      return sources[0]
    }else {
      return sources[1]
    }
  },


  getStructuresToRepair: function(creep, split){
    let toRepair = creep.room.find(FIND_STRUCTURES, {
      filter: function(structure){
          return (
              structure.structureType == STRUCTURE_ROAD ||
              structure.structureType == STRUCTURE_TOWER
          )&& structure.hits < structure.hitsMax;
      }
    })
    if(toRepair.length == 1) return toRepair[0];

    const creepMagicNumber = creep.name.match(/\d+$/)[0];
    if (creepMagicNumber % split == 0){
      return toRepair[0]
    }else {
      return toRepair[1]
    }
  }
};
