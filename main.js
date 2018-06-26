var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

var spawn = Game.spawns['Darlene'];

module.exports.loop = function () {

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');

    if(harvesters.length < 3) {
        var newName = 'Harvester' + Game.time;
        spawn.spawnCreep([WORK,CARRY,MOVE], newName,
            {memory: {role: 'harvester'}});
    }

    if(upgraders.length < 3) {
        var newName = 'Upgrader' + Game.time;
        spawn.spawnCreep([WORK,CARRY,MOVE], newName,
            {memory: {role: 'upgrader'}});
    }

    if(builders.length < 8) {
        var newName = 'Builder' + Game.time;
        spawn.spawnCreep([WORK,CARRY,MOVE], newName,
            {memory: {role: 'builder'}});
    }

    // if(builders.length > 10) {
    //     var newName = 'Builder' + Game.time;
    //     spawn.spawnCreep([WORK,CARRY,MOVE], newName,
    //         {memory: {role: 'builder'}});
    // }


    if(spawn.spawning) {
        var spawningCreep = Game.creeps[spawn.spawning.name];
        spawn.room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            spawn.pos.x + 1,
            spawn.pos.y,
            {align: 'left', opacity: 0.8});
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];

        switch (creep.memory.role) {
          case 'harvester':
            if(spawn.energy > spawn.energyCapacity) {
              roleHarvester.run(creep);
            }else{
              roleBuilder.run(creep);
            }
            break;
          case 'upgrader':
            roleUpgrader.run(creep);
            break;
          case 'builder':
            roleBuilder.run(creep);
            break;
          default:
            roleHarvester.run(creep);
        }
    }
}
