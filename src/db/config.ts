import { Database } from 'bun:sqlite'
import { drizzle } from 'drizzle-orm/bun-sqlite'

const sqlite = new Database('src/db/database.sqlite')

export const db = drizzle(sqlite)
