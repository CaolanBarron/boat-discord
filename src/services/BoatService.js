import Database from "better-sqlite3";
const db = new Database(process.env.DATABASEURL);

class BoatService {
  create(guildID) {
    try {
      if (!guildID) throw Error("No Guild ID????");
      const createStmt = db.prepare(
        "INSERT INTO boat(id, condition, speed, x_coord, y_coord) VALUES(?, ?, ?, ?, ?)",
      );

      createStmt.run(guildID, 10, 5, 0.0, 0.0);
    } catch (error) {
      console.error(error);
    }
  }

  sail() {}
}
export default new BoatService();
