module.exports = {
  getSource: function(creep, split){
    const sources = creep.room.find(FIND_SOURCES);
    if(sources.length == 1) { return sources[0] }

    const creepMagicNumber = creep.name.match(/\d+$/)[0];

    if (creepMagicNumber % split == 0){
      return sources[0]
    }else {
      return sources[1]
    }
  }
};
