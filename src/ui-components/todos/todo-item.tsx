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
    <div id={`todo-${todo.id}-wrapper`} class='flex flex-col w-full border p-3'>
      <div class='flex flex-row justify-between mb-1'>
        <input
          type='checkbox'
          name='completed'
          id='completed'
          checked={todo.completed == 1}
          hx-post={`/todos/complete/${todo.id}`}
          hx-target={`#todo-${todo.id}-wrapper`}
          hx-swap='outerHTML'
          />
        <button
          hx-delete={`/todos/${todo.id}`}
          hx-target={`#todo-${todo.id}-wrapper`}
          hx-swap='outerHTML'
        >
          ❌
        </button>
      </div>
      <h2>{todo.title}</h2>
      {todo.description && <span>{todo.description}</span>}
    </div>
  )
}
