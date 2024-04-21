import Database from "better-sqlite3";
const db = new Database(process.env.DATABASEURL);

class SkillService {
  increaseXP(playerId, skillKey) {
    // Get current skill XP
    const skill = db
      .prepare(
        "SELECT * FROM player_skills WHERE player_id = ? AND skill_key = ?"
      )
      .get(playerId, skillKey);
    // set the skill XP to be XP++
    const stmt = db.prepare(
      "UPDATE player_skills SET xp = ? WHERE player_id = ? AND skill_key = ?"
    );

    stmt.run(skill.xp + 1, playerId, skillKey);
  }
}

export default new SkillService();
