import { Colors, EmbedBuilder } from 'discord.js';
import db from '../../database/database.js';
import BotService from './BotService.js';
import EffectService from './EffectService.js';

class SkillService {
    constructor() {
        this.baseXP = 5;
    }

    async getSkillXP(playerId, skillKey) {
        const skillXP = db()
            .prepare(
                'SELECT * FROM player_skills WHERE player_id = ? AND skill_key = ?'
            )
            .get(playerId, skillKey);
        return skillXP.xp;
    }

    async addXP(playerId, skillKey, points) {
        // Get current skill XP
        const skillXp = await this.getSkillXP(playerId, skillKey);
        const currentLevel = await this.getCurrentLevel(skillXp);

        const modifiedByEffectPoints =
            points +
            (await EffectService.getXPModifierByEffect(skillKey, playerId));

        // Check if the amount of xp added will get to the next level
        const xpToNextLevel =
            (await this.experienceForNextLevel(currentLevel)) - skillXp;
        if (modifiedByEffectPoints >= xpToNextLevel) {
            await this.announceLevelUp(playerId, skillKey, currentLevel + 1);
        }

        // set the skill XP to be XP++
        const stmt = db().prepare(
            'UPDATE player_skills SET xp = ? WHERE player_id = ? AND skill_key = ?'
        );

        stmt.run(skillXp + modifiedByEffectPoints, playerId, skillKey);
    }

    async addRandomXP(playerId, skillKey, range) {
        const randomAmount = Math.floor(Math.random() * range);
        await this.addXP(playerId, skillKey, randomAmount);
    }

    async getCurrentLevel(skillXp) {
        return Math.floor(Math.sqrt(skillXp / this.baseXP)) + 1;
    }

    // Returns the amount of experience required to progress from the current level to the next
    async experienceForNextLevel(currentLevel) {
        return this.baseXP * currentLevel ** 2;
    }

    async announceLevelUp(playerId, skillKey, nextLevel) {
        const player = db()
            .prepare(`SELECT * FROM player WHERE id = ?`)
            .get(playerId);

        const foghorn = await BotService.getChannelByName(
            player.boat_id,
            process.env.NOTICHANNEL
        );
        let message;
        switch (skillKey) {
            case 'FISH':
                message = `${player.name}'s fishing skill has increased to ${nextLevel}`;
                break;
            case 'SAIL':
                message = `${player.name}'s sailing skill has increased to ${nextLevel}`;
                break;
            case 'RESEARCH':
                message = `${player.name}'s research skill has increased to ${nextLevel}`;
                break;
            case 'CARTOGRAPHY':
                message = `${player.name}'s cartography skill has increased to ${nextLevel}`;
                break;
            case 'REPAIR':
                message = `${player.name}'s repair skill has increased to ${nextLevel}`;
                break;
            default:
                throw new Error('Key does not exist');
        }
        const embed = new EmbedBuilder()
            .setColor(Colors.Gold)
            .setTitle('Level up')
            .setDescription(message);
        foghorn.send({ embeds: [embed] });
    }
    async getRandomSkill() {
        const skills = db().prepare('SELECT * FROM skill').all();
        return skills[Math.floor(Math.random() * skills.length)].key;
    }

    async getAllSkills() {
        const skills = db().prepare('SELECT * FROM skill').all();
        return skills.map((skill) => skill.key);
    }
}

export default new SkillService();
