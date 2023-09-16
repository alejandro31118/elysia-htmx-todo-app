import { Todo } from '../types'
import { TodoItem } from './todo-item'
import * as elements from 'typed-html'

type TodoListProps = {
  todos: Todo[]
}

export function TodoList({ todos }: TodoListProps) {
  return (
    <div class='flex flex-col'>
      {todos.map((todo) => (
        <TodoItem todo={todo} />
      ))}
    </div>
  )
}
