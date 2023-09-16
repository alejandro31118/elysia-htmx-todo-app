import { Elysia, t } from 'elysia'
import { html } from '@elysiajs/html'
import * as elements from 'typed-html'
import { Html } from './ui-components/html'
import { Todo } from './types'
import { TodoList } from './ui-components/todo-list'
import { TodoItem } from './ui-components/todo-item'
import { migrate } from 'drizzle-orm/bun-sqlite/migrator'
import { db } from './db/config'
import { todos } from './db/schema'
import { eq } from 'drizzle-orm'

migrate(db, { migrationsFolder: 'src/db/migrations' })

const dbData: Todo[] = [
  { id: 1, title: 'Do something', completed: false },
  { id: 2, title: 'Go to the supermarket', description: 'Buy things', completed: true },
]

let lasTodotId = 2

const paramIdSchema = {
  params: t.Object({
    id: t.Numeric()
  })
}

const bodySchema = {
  body: t.Object({
    title: t.String(),
    description: t.String()
  })
}

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
  .get('/todos', async () => {
    const data = await db.select()
      .from(todos)
      .all()

    return <TodoList todos={data} />
  })
  .post('/todos/complete/:id', async ({ params }) => {
    const oldTodo = db.select()
      .from(todos)
      .where(eq(todos.id, params.id))
      .get()

    if (oldTodo) {
      const updatedTodo = await db.update(todos)
        .set({ completed: !oldTodo.completed })
        .where(eq(todos.id, params.id))
        .returning()
        .get()

      return <TodoItem todo={updatedTodo} />
    }
  }, paramIdSchema)
  .delete('/todos/:id', async ({ params }) => {
    await db.delete(todos)
      .where(eq(todos.id, params.id))
      .run()
  }, paramIdSchema)
  .post('/todos', ({ body }) => {
    // Insert returning get is buggy so that's why I'm using all()[0]
    const newTodo = db.insert(todos)
      .values(body)
      .returning()
      .all()[0]

    return <TodoItem todo={newTodo} />
  }, bodySchema)
  .listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
