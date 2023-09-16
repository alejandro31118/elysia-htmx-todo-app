import { Elysia } from 'elysia'
import { html } from '@elysiajs/html'
import { Html } from './ui-components'
import { migrate } from 'drizzle-orm/bun-sqlite/migrator'
import { db } from './db/config'
import { todosGroup } from './routes/todos'
import * as elements from 'typed-html'

migrate(db, { migrationsFolder: 'src/db/migrations' })

const app = new Elysia()
  .use(html())
  .get('/', ({ html }) => html(
    <Html>
      <body
        class='min-h-screen w-screen bg-zinc-900 text-white'
        hx-get='/todos'
        hx-trigger='load'
        hx-swap='innerHTML'
      />
    </Html>
  ))
  .use(todosGroup)
  .listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
