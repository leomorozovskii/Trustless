"use client"
import { PGlite } from '@electric-sql/pglite';
import { drizzle } from 'drizzle-orm/pglite';

// Postgres (persisted database to indexedDB)
const client = new PGlite("idb://my-pgdata");
export const db = drizzle(client);
