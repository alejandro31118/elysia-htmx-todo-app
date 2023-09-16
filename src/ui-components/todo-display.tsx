import { Todo } from '../types'
import * as elements from 'typed-html'

type TodoDisplayProps = {
  todo: Todo
}

export function TodoDisplay({ todo }: TodoDisplayProps) {
  return (
    <div class='flex flex-row space-x-3'>
      <h3>{todo.title}</h3>
      {todo.description && <span>- {todo.description}</span>}
      <input
        type='checkbox'
        name='completed'
        id='completed'
        checked={todo.completed}
      />
      <button>❌</button>
    </div>
  )
}
