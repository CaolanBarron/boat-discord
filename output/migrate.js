import dotenvx from '@dotenvx/dotenvx';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { db, connection } from './db.js';
dotenvx.config();
// This will run migrations on the database, skipping the ones already applied
await migrate(db, { migrationsFolder: './drizzle/migrations' });
// Don't forget to close the connection, otherwise the script will hang
await connection.close();
