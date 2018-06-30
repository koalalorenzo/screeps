module.exports = {
  /** @param {Creep} creep **/
  run: function(creep) {
    let targets = creep.room.find(FIND_HOSTILE_CREEPS);
    if(targets.length) {
      if(creep.attack(targets[0]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0]);
      }
    }else{
      if(Game.flags['soldiers']){
          creep.moveTo(Game.flags['soldiers'])
      }
    }
  }
};
