import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    dialect: 'sqlite',
    schema: './drizzle/schemas/*.ts',
    out: './drizzle/migrations/',
    url: './database/database-development.db',
    dbCredentials: { url: './database/database-development.db' },
    introspect: { casing: 'casing' },
});
