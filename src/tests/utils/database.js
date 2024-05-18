import * as fs from "fs";
import db from "../../../database/database";

async function InitializeTestDb() {
  const seed = fs.readFileSync("src/tests/utils/seed-test.sql", "utf8");
  db().exec(seed);
}
export default InitializeTestDb;
