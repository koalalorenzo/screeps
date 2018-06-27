module.exports = {
  setup: function(spawner, role, min, parts, memory){
    const list = this.list(role);

    if(list.length < min) {
      this.spawn(spawner, role, parts, memory);
    }
  },

  spawn: function(spawner, role, parts){
    const newName = role + '_' + (Math.floor(Math.random() * 65534) + 1);
    const opts = {
      memory: {role: role, ...memory}
    }
    spawner.spawnCreep(parts, newName, opts)
  },

  list: function(role){
    return _.filter(Game.creeps, (creep) => creep.memory.role == role)
  }
};
