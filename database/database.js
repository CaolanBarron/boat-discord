import Database from 'better-sqlite3';
import 'dotenv/config';

const url =
    process.env.NODE_ENV === 'test'
        ? process.env.TESTDATABASEURL
        : process.env.DATABASEURL;

const db = () => new Database(url, { timeout: 10_000 });

export default db;
