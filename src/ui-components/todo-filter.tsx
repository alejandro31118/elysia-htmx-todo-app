import * as elements from 'typed-html'

export function TodoFilter() {
  return (
    <form
      class='flex flex-col mt-5'
      hx-get='/todos'
      hx-target='closest body'
      hx-swap='innerHTML'
      _='on submit target.reset()'
    >
      <label for="title">Title</label>
      <input type="text" name="title" id="title" class='bg-gray-700' />

      <label for="completed">True</label>
      <input type="radio" name="completed" id="completed" value='true' />
      <label for="completed">False</label>
      <input type="radio" name="completed" id="completed" value='false' />

      <button type="submit">Filter</button>
    </form>
  )
}
