import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/better-sqlite3/driver';
import Database from 'better-sqlite3';
import * as schema from '../output/schemas/index.js';
import { seedDB } from '../output/seed.js';

export default async function testEnvSetup() {
    // Apply all migrations to database

    const url =
        process.env.NODE_ENV === 'test'
            ? process.env.TESTDATABASEURL
            : process.env.DATABASEURL;

    const connection = new Database(url, { timeout: 10_000 });

    const db = drizzle(connection, { schema });

    await migrate(db, {
        migrationsFolder: './drizzle/migrations',
    });
    //
    // Delete all rows from all tables
    const tableNamesQueried = await db.all(
        sql`select tbl_name from sqlite_master where type = 'table'`,
    );

    const tableNames = tableNamesQueried
        .map((i) => {
            return i.tbl_name;
        })
        .filter((i) => {
            return i !== '__drizzle_migrations';
        });

    connection.prepare('PRAGMA foreign_keys = OFF');

    for (const tableName of tableNames) {
        connection.prepare(`DELETE FROM ${tableName}`).run();
    }

    connection.prepare('PRAGMA foreign_keys = ON');

    // Seed database here???
    // Seeds should probably be applied for each test suite

    await seedDB();

    await connection.close();
}
