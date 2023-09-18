import { t } from 'elysia'
import { db } from '$/db/config'
import { todos } from '$/db/schema'
import { TodoItem, TodoList } from '$/ui-components/todos'
import * as elements from 'typed-html'
import { eq, like } from 'drizzle-orm'
import { ElysiaApp, app } from '$/index'

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

export const addTodosGroupToApp = (app: ElysiaApp) => app
  .group('/todos', app => app
    .get('/', async ({ query }) => {
      const { title, completed } = query
      const completedBool = completed == 'true'

      const queryDb = db.select().from(todos)
      if (completed) {
        queryDb.where(eq(todos.completed, completedBool))
      }
      if (title) {
        queryDb.where(like(todos.title, `%${title}%`))
      }

      const data = await queryDb.all()

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