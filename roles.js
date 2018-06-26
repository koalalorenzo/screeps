module.exports = {
  run: function(spawner, role, min){
    const parts = [WORK,CARRY,MOVE];
    const list = this.list(role);

    if(list.length < min) {
      this.spawn(spawner, role, parts);
    }
  },

  spawn: function(spawner, role, parts){
    const newName = role + '_' + (Math.floor(Math.random() * 65534) + 1);
    spawner.spawnCreep(parts, newName, {memory: {role: role}})
  },

  list: function(role){
    return _.filter(Game.creeps, (creep) => creep.memory.role == role)
  }
};
