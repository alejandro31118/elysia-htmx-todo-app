import { type InferSelectModel, type InferInsertModel } from 'drizzle-orm'
import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core'

export const todos = sqliteTable('todos', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description'),
  completed: integer('completed', { mode: 'boolean' }).notNull().default(false)
})

export type SelectTodo = InferSelectModel<typeof todos>
export type InsertTodo = InferInsertModel<typeof todos>
