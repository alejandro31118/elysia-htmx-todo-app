import { SelectTodo } from '$/db/schema'
import { TodoItem, TodoForm, TodoFilter } from '$/ui-components/todos'
import * as elements from 'typed-html'

type TodoListProps = {
  todos: SelectTodo[]
}

export function TodoList({ todos }: TodoListProps) {
  return (
    <div class='flex flex-col'>
      <TodoFilter />
      {todos.map((todo) => (
        <TodoItem todo={todo} />
      ))}

      <TodoForm />
    </div>
  )
}
