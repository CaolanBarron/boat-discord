import Database from "better-sqlite3";
const db = new Database(process.env.DATABASEURL);

class ActivityService {
  fish(interaction) {
    const stmt = db.prepare(
      "DELETE FROM active_tags WHERE player_relation = ? AND key = ?",
    );
    stmt.run(interaction.player.id, "FISH");
    interaction.channel.send(`<@${interaction.user.id}> Fishing complete!`);
  }

  map(interaction) {
    const stmt = db.prepare(
      "DELETE FROM active_tags WHERE player_relation = ? AND key = ?",
    );
    stmt.run(interaction.player.id, "CARTOGRAPHY");
    interaction.channel.send(`<@${interaction.user.id}> Mapping complete!`);
  }

  repair(interaction) {
    const stmt = db.prepare(
      "DELETE FROM active_tags WHERE player_relation = ? AND key = ?",
    );
    stmt.run(interaction.player.id, "REPAIR");
    interaction.channel.send(`<@${interaction.user.id}> Repairing complete!`);
  }

  research(interaction) {
    const stmt = db.prepare(
      "DELETE FROM active_tags WHERE player_relation = ? AND key = ?",
    );
    stmt.run(interaction.player.id, "RESEARCH");
    interaction.channel.send(`<@${interaction.user.id}> Research complete!`);
  }

  sailing(interaction) {
    const stmt = db.prepare(
      "DELETE FROM active_tags WHERE player_relation = ? AND key = ?",
    );
    stmt.run(interaction.player.id, "SAILING");
    interaction.channel.send(`<@${interaction.user.id}> Sailing complete!`);
  }
}

export default new ActivityService();
