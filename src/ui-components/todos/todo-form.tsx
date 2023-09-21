import * as elements from 'typed-html'

export function TodoForm() {
  return (
    <form
      class='flex flex-col mt-5'
      hx-post='/todos'
      hx-swap='beforebegin'
      // @ts-ignore
      _='on submit target.reset()'
    >
      <label for="title">Title</label>
      <input type="text" name="title" id="title" class='bg-zinc-700 border' required='true' />

      <label for="description">Description</label>
      <input type="text" name="description" id="description" class='bg-zinc-700 border' />

      <button type="submit" class='border my-2 bg-zinc-800'>Save</button>
    </form>
  )
}
