import { Children } from 'typed-html'

export const Html = ({ children }: Children) => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Elysia HTMX - Todo App</title>
        <script src="https://unpkg.com/htmx.org@1.9.5"></script>
    </head>
    <body>
        ${children}
    </body>
  </html>
`
