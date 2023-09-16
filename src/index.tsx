import { Elysia } from 'elysia'
import { html } from '@elysiajs/html'
import * as elements from 'typed-html'
import { Html } from './ui-components/html'

const app = new Elysia()
  .use(html())
  .get('/', ({ html }) => html(
    <Html>
      <button hx-post='/clicked' hx-swap='outerHTML'>Click me!</button>
    </Html>
  ))
  .post('/clicked', () => <div>I've been clicked!</div>)
  .listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)
