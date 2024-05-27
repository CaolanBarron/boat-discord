import db from "../../database/database.js";

class FlavourService {
  getPlayerFlavor(content, characterName) {
    try {
      String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{([0-9]+)}/g, function (match, index) {
          return typeof args[index] == "undefined" ? match : args[index];
        });
      };

      const stmt = db()
        .prepare("SELECT * FROM flavor WHERE subject = ?")
        .all("PLAYER");

      const randomFlavor = Math.floor(Math.random() * stmt.length);

      return stmt[randomFlavor].content.format(content, characterName);
    } catch (error) {
      console.error(error);
    }
  }
  getBoatFlavor() {
    try {
      const stmt = db()
        .prepare("SELECT * FROM flavor WHERE subject = ?")
        .all("BOAT");

      return stmt[Math.floor(Math.random() * stmt.length)];
    } catch (error) {
      console.error(error);
    }
  }
}

export default new FlavourService();
