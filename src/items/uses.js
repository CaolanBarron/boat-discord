import EffectService from '../services/EffectService.js';
import PlayerService from '../services/PlayerService.js';
import SkillService from '../services/SkillService.js';

class Use {
    constructor(variable) {
        this.variable = variable;
    }
}

export class IncreaseXpPlayerRandomUse extends Use {
    async use(player) {
        const skillKey = await SkillService.getRandomSkill();
        await SkillService.addRandomXP(player.id, skillKey, this.variable);
    }
}

export class IncreaseXpPlayerAllUse extends Use {
    async use(player) {
        const allSkills = await SkillService.getAllSkills();
        // TODO: If many skills are upgraded at once discord may complain because of too many anouncements
        for (const skillKey of allSkills) {
            await SkillService.addRandomXP(player.id, skillKey, this.variable);
        }
    }
}

export class IncreaseXpBoatRandomUse extends Use {
    async use(player) {
        const players = await PlayerService.getAllPlayersByBoat(player.boat_id);
        const skillKey = await SkillService.getRandomSkill();

        for (const player of players) {
            await SkillService.addRandomXP(player.id, skillKey, this.variable);
        }
    }
}

export class IncreaseXpBoatAllUse extends Use {
    async use(player) {
        const players = await PlayerService.getAllPlayersByBoat(player.boat_id);
        const skillKeys = await SkillService.getAllSkills();

        for (const player of players) {
            for (const skillKey of skillKeys) {
                await SkillService.addRandomXP(
                    player.id,
                    skillKey,
                    this.variable
                );
            }
        }
    }
}

export class RepairAllUse extends Use {
    async use(player) {
        const debuffs = await EffectService.findBoatDebuffs(player.boat_id);
        for (const debuff of debuffs) {
            await EffectService.removeEffect(player.boat_id, debuff.id);
        }
    }
}

export class RepairOneUse extends Use {
    async use(player) {
        const debuffs = await EffectService.findBoatDebuffs(player.boat_id);
        const debuff = debuffs[Math.floor(Math.random() * debuffs.length)];
        await EffectService.removeEffect(player.boat_id, debuff.id);
    }
}

export class IncreaseSpeedUse extends Use {
    async use(player) {
        const speedEffects = await EffectService.getByKey('SAIL_TIME');
        const speedEffect = speedEffects.find((e) => e.type === 'BUFF');
        await EffectService.applyEffect(player.boat_id, speedEffect.id);
    }
}
