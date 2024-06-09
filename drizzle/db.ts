import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import 'dotenv/config';
import * as schema from './schemas/index';

const url =
    process.env.NODE_ENV === 'test'
        ? process.env.TESTDATABASEURL
        : process.env.DATABASEURL;

export const connection = new Database(url, { timeout: 10_000 });

export const db = drizzle(connection, { schema });
