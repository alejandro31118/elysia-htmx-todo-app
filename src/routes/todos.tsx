import { t } from 'elysia'
import { db } from '$/db/config'
import { TodoItem, TodoList } from '$/ui-components/todos'
import * as elements from 'typed-html'
import { ElysiaApp } from '$/index'
import { Todo } from '$/types'

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
      let { title, completed } = query
      title ||= null

      let queryStr = 'SELECT title, description, completed FROM todos WHERE 1=1'
      if (completed) {
        queryStr += ` AND completed = ${completed}`
      }
      if (title) {
        queryStr += ` AND title like '%${title}%'`
      }

      const dbQuery = db.query(queryStr)
      const data = dbQuery.all() as Todo[] | undefined

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