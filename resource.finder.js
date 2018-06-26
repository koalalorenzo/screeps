var resource = {
  getSource: function(creep, split){
    var sources = creep.room.find(FIND_SOURCES);
    if(sources.length == 1) { return sources[0] };

    var creepMagicNumber = creep.name.match(/\d+$/)[0];

    if (creepMagicNumber % split == 0){
      return sources[0]
    }else {
      return sources[1]
    }
  }

}
module.exports = resource;
