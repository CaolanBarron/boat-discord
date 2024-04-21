import Database from "better-sqlite3";
const db = new Database(process.env.DATABASEURL);

class FlavourService {
  getFlavor(content, characterName) {
    try {
      String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{([0-9]+)}/g, function (match, index) {
          return typeof args[index] == "undefined" ? match : args[index];
        });
      };

      const stmt = db.prepare("SELECT * FROM flavor").all();

      const randomFlavor = Math.floor(Math.random() * stmt.length);

      return stmt[randomFlavor].content.format(content, characterName);
    } catch (error) {
      console.error(error);
    }
  }
  environmentFlavor() {}
}

export default new FlavourService();
