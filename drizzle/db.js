"use strict";
exports.__esModule = true;
exports.db = exports.connection = void 0;
var better_sqlite3_1 = require("drizzle-orm/better-sqlite3");
var better_sqlite3_2 = require("better-sqlite3");
require("dotenv/config");
var schema = require("./schemas/index");
var url = process.env.NODE_ENV === 'test'
    ? process.env.TESTDATABASEURL
    : process.env.DATABASEURL;
exports.connection = new better_sqlite3_2["default"](url, { timeout: 10000 });
exports.db = (0, better_sqlite3_1.drizzle)(exports.connection, { schema: schema });
