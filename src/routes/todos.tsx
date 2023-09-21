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

      let queryStr = 'SELECT id, title, description, completed FROM todos WHERE 1=1'
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
      const inserted = db.prepare('INSERT INTO todos (title, description, completed) VALUES ($title, $description, $completed)')
        .all({ $title: body.title, $description: body?.description, $completed: 0 })

      if (inserted) {
        const data = db.prepare('SELECT id, title, description, completed FROM todos ORDER BY id DESC LIMIT 1').get() as Todo | undefined

        return <TodoItem todo={data} />
      }
    }, bodySchema)
    .post('/complete/:id', async ({ params }) => {
      const query = db.query('SELECT completed FROM todos WHERE id = ?1')
      const oldTodo = query.get(params.id) as { completed: number } | null

      if (oldTodo) {
        const completed = oldTodo.completed === 0 ? 1 : 0
        const updated = db.prepare('UPDATE todos SET completed = ?1 WHERE id = ?2').all(completed, params.id)

        if (updated) {
          const data = db.query('SELECT id, title, description, completed FROM todos WHERE id = ?1').get(params.id) as Todo

          return <TodoItem todo={data} />
        }
      }
    }, paramIdSchema)
    .delete('/:id', async ({ params }) => {
      db.prepare('DELETE FROM todos WHERE id = ?1').run(params.id)
    }, paramIdSchema)
  )