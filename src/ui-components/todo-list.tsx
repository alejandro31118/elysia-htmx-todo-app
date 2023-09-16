import { Todo } from '../types'
import { TodoDisplay } from './todo-display'
import * as elements from 'typed-html'

type TodoListProps = {
  todos: Todo[]
}

export function TodoList({ todos }: TodoListProps) {
  return (
    <div class='flex flex-col'>
      {todos.map((todo) => (
        <TodoDisplay todo={todo} />
      ))}
    </div>
  )
}
