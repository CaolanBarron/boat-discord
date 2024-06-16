import db from '../../database/database.js';
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
        // set the skill XP to be XP++
        const stmt = db().prepare(
            'UPDATE player_skills SET xp = ? WHERE player_id = ? AND skill_key = ?'
        );

        stmt.run(skillXp + points, playerId, skillKey);
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
}

export default new SkillService();
