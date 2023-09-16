import { Elysia, t } from 'elysia'
import { html } from '@elysiajs/html'
import * as elements from 'typed-html'
import { Html } from './ui-components/html'
import { Todo } from './types'
import { TodoList } from './ui-components/todo-list'
import { TodoItem } from './ui-components/todo-item'

const dbData: Todo[] = [
  { id: 1, title: 'Do something', completed: false },
  { id: 2, title: 'Go to the supermarket', description: 'Buy things', completed: true },
]

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
  },
  {
    params: t.Object({
      id: t.Numeric()
    })
  })
  .delete('/todos/:id', ({ params }) => {
    const todo = dbData.find(todo => todo.id === params.id)
    if (todo) {
      dbData.splice(dbData.indexOf(todo), 1)
    }
  },
  {
    params: t.Object({
      id: t.Numeric()
    })
  })
  .listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
