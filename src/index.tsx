import { Elysia } from 'elysia'
import { html } from '@elysiajs/html'
import * as elements from 'typed-html'
import { Html } from './ui-components/html'

const app = new Elysia()
  .use(html())
  .get('/', ({ html }) => html(
    <Html>
      <h1>Hello from templating</h1>
    </Html>
  ))
  .listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
