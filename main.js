const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleSoldier = require('role.soldier');
const roles = require('roles');


module.exports.loop = function () {
    const roomSpawn = Game.spawns['Darlene'];
    const roomName = 'W29N54';

    // Cleanup dead creeps memory
    for(let name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }

    // Spawn few roles
    roles.setup(roomSpawn, 'harvester', 8, [WORK, CARRY, MOVE]);
    roles.setup(roomSpawn, 'upgrader', 4, [WORK, CARRY, MOVE, MOVE]);
    roles.setup(roomSpawn, 'builder', 6, [WORK, WORK, CARRY, MOVE, MOVE, MOVE]);
    roles.setup(roomSpawn, 'soldier', 2, [TOUGH, ATTACK, MOVE, MOVE]);

    if(roomSpawn.spawning) {
        const spawningCreep = Game.creeps[roomSpawn.spawning.name];
         roomSpawn.room.visual.text(
             spawningCreep.memory.role,
             roomSpawn.pos.x + 1,
             roomSpawn.pos.y,
            {align: 'left', opacity: 0.8});
    }

    // Run the roles
    for(let name in Game.creeps) {
        const creep = Game.creeps[name];

        switch (creep.memory.role) {
          case 'upgrader':
            roleUpgrader.run(creep);
            break;
          case 'builder':
            roleBuilder.run(creep);
            break;
          case 'soldier':
            roleSoldier.run(creep);
            break;
          default:
            roleHarvester.run(creep);
        }
    }

    const towers = Game.rooms[roomName].find(FIND_STRUCTURES, {filter: (s) => s.structureType == STRUCTURE_TOWER});
    for (let tower of towers) {
        let target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target != undefined) {
            tower.attack(target);
        }
    }

    // Some extra notifications:
    let hostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS)
    if(hostiles.length > 0) {
        Game.notify(`User ${hostiles[0].owner.username} spotted in room ${roomName}`);
    }
}
