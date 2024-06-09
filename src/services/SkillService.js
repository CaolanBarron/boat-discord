import db from '../../database/database.js';

class SkillService {
    increaseXP(playerId, skillKey) {
        // Get current skill XP
        const skill = db()
            .prepare(
                'SELECT * FROM player_skills WHERE player_id = ? AND skill_key = ?'
            )
            .get(playerId, skillKey);
        // set the skill XP to be XP++
        const stmt = db().prepare(
            'UPDATE player_skills SET xp = ? WHERE player_id = ? AND skill_key = ?'
        );

        stmt.run(skill.xp + 1, playerId, skillKey);
    }
}

export default new SkillService();
