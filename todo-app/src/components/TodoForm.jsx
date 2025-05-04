import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/slices/todoSlices";

const TodoForm = () => {
  const [input, setInput] = useState('');
  const dispatch = useDispatch()

  const submitHandler = (e)=>{
    e.preventDefault();
    dispatch(addTodo(input))
    setInput('')
  }

  return (
    <div className="h-[20vh] bg-amber-400 w-full flex justify-center items-start">
      <form onSubmit={submitHandler} className="flex w-full h-full items-center justify-center">
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[75%] mr-2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter Todo To Add"
          value={input}
          onChange={(e)=>setInput(e.target.value)}
        />
        <button className="text-white mt-2 bg-green-500 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm lg:w-[5%] lg:text-[1.1rem] lg:p-2 px-4 py-2.5 me-2 mb-2 focus:outline-none">
          Add
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
