const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roles = require('roles');

const spawn = Game.spawns['Darlene'];

module.exports.loop = function () {
    for(let name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
    
    roles.run('harvester', 1);
    roles.run('upgrader', 4);
    roles.run('builder', 4);

    if(spawn.spawning) {
        const spawningCreep = Game.creeps[spawn.spawning.name];
        spawn.room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            spawn.pos.x + 1,
            spawn.pos.y,
            {align: 'left', opacity: 0.8});
    }

    for(let name in Game.creeps) {
        const creep = Game.creeps[name];

        if(spawn.energy < spawn.energyCapacity) {
          roleHarvester.run(creep);
          continue;
        }

        switch (creep.memory.role) {
          case 'upgrader':
            roleUpgrader.run(creep);
            break;
          case 'builder':
            if(creep.room.find(FIND_))
            
            roleBuilder.run(creep);
            break;
          default:
            roleHarvester.run(creep);
        }
    }
}
