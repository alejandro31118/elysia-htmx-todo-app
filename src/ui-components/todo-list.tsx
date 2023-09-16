import { SelectTodo } from '../db/schema'
import { TodoForm } from './todo-form'
import { TodoItem } from './todo-item'
import * as elements from 'typed-html'

type TodoListProps = {
  todos: SelectTodo[]
}

export function TodoList({ todos }: TodoListProps) {
  return (
    <div class='flex flex-col'>
      {todos.map((todo) => (
        <TodoItem todo={todo} />
      ))}

      <TodoForm />
    </div>
  )
}
