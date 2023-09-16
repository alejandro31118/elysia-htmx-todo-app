import { Elysia, t } from 'elysia'
import { db } from '../db/config'
import { todos } from '../db/schema'
import { TodoItem, TodoList } from '../ui-components'
import * as elements from 'typed-html'
import { eq } from 'drizzle-orm'

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

export const todosGroup = new Elysia()
  .group('/todos', app => app
    .get('/', async () => {
      const data = await db.select()
        .from(todos)
        .all()

      return <TodoList todos={data} />
    })
    .post('/', ({ body }) => {
      // Insert returning get() is buggy so that's why I'm using all()[0]
      const newTodo = db.insert(todos)
        .values(body)
        .returning()
        .all()[0]

      return <TodoItem todo={newTodo} />
    }, bodySchema)
    .post('/complete/:id', async ({ params }) => {
      // Insert returning get() is buggy so that's why I'm using all()[0]
      const oldTodo = await db.select()
        .from(todos)
        .where(eq(todos.id, params.id))
        .all()[0]

      if (oldTodo) {
        // Insert returning get() is buggy so that's why I'm using all()[0]
        const updatedTodo = await db.update(todos)
          .set({ completed: !oldTodo.completed })
          .where(eq(todos.id, params.id))
          .returning()
          .all()[0]

        return <TodoItem todo={updatedTodo} />
      }
    }, paramIdSchema)
    .delete('/:id', async ({ params }) => {
      await db.delete(todos)
        .where(eq(todos.id, params.id))
        .run()
    }, paramIdSchema)
  )