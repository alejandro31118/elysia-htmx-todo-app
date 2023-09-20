import { Todo } from '$/types'
import { TodoItem, TodoForm, TodoFilter } from '$/ui-components/todos'
import * as elements from 'typed-html'

type TodoListProps = {
  todos?: Todo[]
}

export function TodoList({ todos }: TodoListProps) {
  return (
    <div class='flex flex-col'>
      <TodoFilter />
      {todos && todos.map((todo) => (
        <TodoItem todo={todo} />
      ))}

      <TodoForm />
    </div>
  )
}
