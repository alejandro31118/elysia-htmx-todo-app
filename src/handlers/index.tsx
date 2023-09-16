import { t } from 'elysia'
import { TodoItem } from '../ui-components/todo-item'
import * as elements from 'typed-html'

export function todoToggleComplete({ params }) {
    const todo = dbData.find(todo => todo.id === params.id)

    if (todo) {
      todo.completed = !todo.completed
      return <TodoItem todo={todo} />
    }
}
