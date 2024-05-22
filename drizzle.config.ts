import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './app/db/schema/otc.ts',
  out: './drizzle',
  dialect: 'postgresql', // 'postgresql' | 'mysql' | 'sqlite',
  dbCredentials: {
    url: "idb://my-pgdata",
  }
});