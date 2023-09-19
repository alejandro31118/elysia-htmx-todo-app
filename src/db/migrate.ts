import { migrate } from "drizzle-orm/bun-sqlite/migrator"
import { db } from "./config"

async function main() {
  console.log('Migration started')
  await migrate(db, { migrationsFolder: 'src/db/migrations' })
  console.log('Migration ended')
  process.exit(0)
}

main().catch(err => { console.log(err); process.exit(0)})
