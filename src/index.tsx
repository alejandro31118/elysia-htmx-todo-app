import { Elysia } from 'elysia'
import { html } from '@elysiajs/html'
import * as elements from 'typed-html'
import { Html } from './ui-components/html'
import { Todo } from './types'
import { TodoList } from './ui-components/todo-list'

const dbData: Todo[] = [
  { id: 1, title: 'Do something', completed: false },
  { id: 2, title: 'Go to the supermarket', description: 'Buy things', completed: true },
]

const app = new Elysia()
  .use(html())
  .get('/', ({ html }) => html(
    <Html>
      <body
        class='min-h-screen w-screen'
        hx-get='/todos'
        hx-trigger='load'
        hx-swap='innerHTML'
      />
    </Html>
  ))
  .get('/todos', () => <TodoList todos={dbData} />)
  .listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
