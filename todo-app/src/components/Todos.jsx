import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeTodo, updateTodo } from '../redux/slices/todoSlices'

function Todos() {
  const todos = useSelector(state => state.todos)
  const dispatch = useDispatch()

  const [editId, setEditId] = useState(null)
  const [input, setInput] = useState('')

  const startEditing = (todo) => {
    setEditId(todo.id)
    setInput(todo.text)
  }

  const handleUpdate = (id) => {
    dispatch(updateTodo({ id, text: input }))
    setEditId(null)
    setInput('')
  }

  return (
    <>
      <div className='text-white text-center pt-2 text-2xl'>Todos</div>
      <ul className="list-none max-w-[1260px] px-2 mx-auto">
        {todos.map((todo) => (
          <li
            className="mt-4 flex gap-x-2 justify-evenly items-center bg-zinc-800 px-4 py-2 md:justify-between rounded"
            key={todo.id}
          >
            {editId === todo.id ? (
              <input
                type="text"
                className="bg-gray-50 m-2 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white w-2/3"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            ) : (
              <div className='text-white w-2/3'>{todo.text}</div>
            )}

            {editId === todo.id ? (
              <button
                onClick={() => handleUpdate(todo.id)}
                className="text-white bg-green-500 ml-2 py-1 px-4 rounded hover:bg-green-600 md:ml-[200px]"
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => startEditing(todo)}
                className="text-white bg-yellow-500 ml-2 py-1 px-4 rounded hover:bg-yellow-600 md:ml-[200px]"
              >
                Edit
              </button>
            )}

            <button
              onClick={() => dispatch(removeTodo(todo.id))}
              className="text-white bg-red-500 ml-2 py-1 px-4 rounded hover:bg-red-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>  
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default Todos
