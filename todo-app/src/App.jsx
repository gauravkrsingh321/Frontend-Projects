import React, { useState } from 'react'
import TodoForm from './components/TodoForm'
import Todos from './components/Todos'

const App = () => {
  return (
    <div className='w-full h-screen bg-gray-700'>
      <header className='text-white text-2xl text-center pt-2 h-[8vh]'>My Todo App</header>
      <TodoForm/>  
      <Todos/>
    </div>
  )
}

export default App

// Action Payload
// {
//   type: "UPDATE_TODO",
//   payload: {
//     id: 1,
//     text: "Updated todo text"
//   }


// When you're working with actions like adding, removing, or updating todos, you'll need to determine which properties (like id or text) are required based on the operation you're performing. Let's break it down:
// 1. Adding a Todo (Create Operation)
// When you're adding a todo, you'll typically need the text of the todo because the id can be auto-generated (usually by a counter or random value).
// Example action payload for adding a todo: {
//   text: "Buy groceries"
// }
// text: The content of the todo.
// id: Can be automatically generated in your reducer (using something like Date.now() or Math.random()).
// Reducer example: addTodo: (state, action) => {
//   const newTodo = {
//     id: Date.now(), // or any unique id generator
//     text: action.payload.text
//   };
//   state.push(newTodo);
// }

// 2. Updating a Todo
// When you're updating a todo, you'll need both the id (to find the todo) and the text (the new value you want to update).
// Example action payload for updating a todo: {
//   id: 1,
//   text: "Updated todo text"
// }
// id: To locate the specific todo item.
// text: The new text that will replace the old one.
// Reducer example:
// updateTodo: (state, action) => {
//   const { id, text } = action.payload;
//   const todo = state.find(todo => todo.id === id);
//   if (todo) {
//     todo.text = text; // Update the todo's text
//   }
// }

// 3. Removing a Todo
// When you're removing a todo, you'll only need the id of the todo you want to delete.
// Example action payload for removing a todo: {
//   id: 1
// }
// id: To identify which todo to remove.
// Reducer example: removeTodo: (state, action) => {
//   const id = action.payload.id;
//   return state.filter(todo => todo.id !== id); // Remove the todo with the given id
// }
// 🧩 Summary of When You Need id or text
// Operation	Required Properties	Example Payload
// Add a Todo	text (to describe the todo)	{ text: "Buy groceries" }
// Update a Todo	id (to find the todo), text (new value)	{ id: 1, text: "Updated text" }
// Remove a Todo	id (to identify which todo to delete)	{ id: 1 }

// 🔄 To Summarize:
// Add: Only need text.
// Update: Need both id (to locate the todo) and text (the new value).
// Remove: Only need id (to find the todo to delete).