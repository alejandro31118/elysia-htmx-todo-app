import { Elysia, t } from 'elysia'
import { html } from '@elysiajs/html'
import * as elements from 'typed-html'
import { Html } from './ui-components/html'
import { Todo } from './types'
import { TodoList } from './ui-components/todo-list'
import { TodoItem } from './ui-components/todo-item'
import { migrate } from 'drizzle-orm/bun-sqlite/migrator'
import { db } from './db/config'

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
  .get('/todos', () => <TodoList todos={dbData} />)
  .post('/todos/complete/:id', ({ params }) => {
    const todo = dbData.find(todo => todo.id === params.id)
    if (todo) {
      todo.completed = !todo.completed
      return <TodoItem todo={todo} />
    }
  }, paramIdSchema)
  .delete('/todos/:id', ({ params }) => {
    const todo = dbData.find(todo => todo.id === params.id)
    if (todo) {
      dbData.splice(dbData.indexOf(todo), 1)
    }
  }, paramIdSchema)
  .post('/todos', ({ body }) => {
    const newTodo: Todo = {
      id: lasTodotId++,
      title: body.title,
      description: body.description,
      completed: false
    }

    dbData.push(newTodo)
    return <TodoItem todo={newTodo} />
  }, bodySchema)
  .listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
