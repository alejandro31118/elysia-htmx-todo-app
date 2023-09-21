import * as elements from 'typed-html'

export function TodoFilter() {
  return (
    <form
      class='flex flex-col mb-5 px-2 border'
      hx-get='/todos'
      hx-target='closest body'
      hx-swap='innerHTML'
      // @ts-ignore
      _='on submit target.reset()'
    >
      <label for="title">Title</label>
      <input type="text" name="title" id="title" class='bg-zinc-700 border' />

      <div class='flex flex-row space-x-2'>
        <span>Completed: </span>
        <label for="completed">True</label>
        <input type="radio" name="completed" id="completed" value='1' />
        <label for="completed">False</label>
        <input type="radio" name="completed" id="completed" value='0' />
      </div>

      <button type="submit" class='border my-2 bg-zinc-800'>Filter</button>
    </form>
  )
}
