const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roles = require('roles');


module.exports.loop = function () {
    const roomSpawn = Game.spawns['Darlene'];
    for(let name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
    
    roles.run(roomSpawn, 'harvester', 1);
    roles.run(roomSpawn, 'upgrader', 4);
    roles.run(roomSpawn, 'builder', 4);

    if(roomSpawn.spawning) {
        const spawningCreep = Game.creeps[ roomSpawn.spawning.name];
         roomSpawn.room.visual.text(
            '🛠️' + spawningCreep.memory.role,
             roomSpawn.pos.x + 1,
             roomSpawn.pos.y,
            {align: 'left', opacity: 0.8});
    }

    for(let name in Game.creeps) {
        const creep = Game.creeps[name];

        if( roomSpawn.energy <  roomSpawn.energyCapacity) {
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
