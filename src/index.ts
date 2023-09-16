import { Elysia } from 'elysia'
import { html } from '@elysiajs/html'

const app = new Elysia()
  .use(html())
  .get('/', ({ html }) => html(baseHtml))
  .listen(3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
)

const baseHtml = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Elysia HTMX - Todo App</title>
    </head>
    <body>
        Hello from HTML string
    </body>
  </html>
`