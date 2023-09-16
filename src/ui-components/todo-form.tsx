import { Todo } from '../types'
import * as elements from 'typed-html'

export function TodoForm() {
  return (
    <form
      class='flex flex-col mt-5'
      hx-post='/todos'
      hx-swap='beforebegin'
    >
      <label for="title">Title</label>
      <input type="text" name="title" id="title" class='bg-gray-700' required='true' />

      <label for="description">Description</label>
      <input type="text" name="description" id="description" class='bg-gray-700' />

      <button type="submit">Save</button>
    </form>
  )
}
