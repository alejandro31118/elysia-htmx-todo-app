import { Elysia } from 'elysia'
import { html } from '@elysiajs/html'
import { cookie } from '@elysiajs/cookie'
import { jwt } from '@elysiajs/jwt'
import { Html } from '$/ui-components/html'
import { migrate } from 'drizzle-orm/bun-sqlite/migrator'
import { db } from '$/db/config'
import * as elements from 'typed-html'
import { addTodosGroupToApp } from '$/routes/todos'

migrate(db, { migrationsFolder: 'src/db/migrations' })

export const app = new Elysia()
  .use(html())
  .use(cookie())
  .use(jwt({ name: 'jwt', secret: 'VerySecretString' }))

export type ElysiaApp = typeof app

addTodosGroupToApp(app)

app.get('/', ({ html }) => html(
  <Html>
    <body
      class='min-h-screen w-screen bg-zinc-900 text-white'
      hx-get='/todos'
      hx-trigger='load'
      hx-swap='innerHTML'
    />
  </Html>
))

app.listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
