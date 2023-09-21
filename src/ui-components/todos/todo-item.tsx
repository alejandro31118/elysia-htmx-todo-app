import { Todo } from '$/types'
import * as elements from 'typed-html'

type TodoItemProps = {
  todo: Todo | undefined
}

export function TodoItem({ todo }: TodoItemProps) {
  if (!todo) {
    return <div></div>
  }

  return (
    <div class='flex flex-row space-x-3'>
      <h3>{todo.title}</h3>
      {todo.description && <span>- {todo.description}</span>}
      <input
        type='checkbox'
        name='completed'
        id='completed'
        checked={todo.completed == 1}
        hx-post={`/todos/complete/${todo.id}`}
        hx-target='closest div'
        hx-swap='outerHTML'
      />
      <button
        hx-delete={`/todos/${todo.id}`}
        hx-target='closest div'
        hx-swap='outerHTML'
      >
        ❌
      </button>
    </div>
  )
}
