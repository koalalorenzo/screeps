module.exports = {
  run: function(role, min){
    let parts = [WORK,CARRY,MOVE];
    let list = this.list(role);

    if(list.length < min) {
      this.spawn(role, parts);
    }
  },

  spawn: function(role, parts){
    let newName = role + '_' + (Math.floor(Math.random() * 65534) + 1);
    spawn.spawnCreep(parts, newName,
        {memory: {role: role} })
  },

  list: function(role){
    return _.filter(Game.creeps, (creep) => creep.memory.role == role)
  }
};
