import * as fs from "fs";
import db from "./database.js";

const script = fs.readFileSync("database/development-script.sql", "utf8");

const seedScript = fs.readFileSync("database/seed.sql", "utf8");
db().exec(script);

db().exec(seedScript);
