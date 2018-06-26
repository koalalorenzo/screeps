var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

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
        Game.spawns['Darlene'].spawnCreep([WORK,CARRY,MOVE], newName,
            {memory: {role: 'harvester'}});
    }

    if(upgraders.length < 3) {
        var newName = 'Upgrader' + Game.time;
        Game.spawns['Darlene'].spawnCreep([WORK,CARRY,MOVE], newName,
            {memory: {role: 'upgrader'}});
    }

    if(builders.length < 8) {
        var newName = 'Builder' + Game.time;
        Game.spawns['Darlene'].spawnCreep([WORK,CARRY,MOVE], newName,
            {memory: {role: 'builder'}});
    }

    // if(builders.length > 10) {
    //     var newName = 'Builder' + Game.time;
    //     Game.spawns['Darlene'].spawnCreep([WORK,CARRY,MOVE], newName,
    //         {memory: {role: 'builder'}});
    // }


    if(Game.spawns['Darlene'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Darlene'].spawning.name];
        Game.spawns['Darlene'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Darlene'].pos.x + 1,
            Game.spawns['Darlene'].pos.y,
            {align: 'left', opacity: 0.8});
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];

        switch (creep.memory.role) {
          case 'harvester':
            roleHarvester.run(creep);
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
