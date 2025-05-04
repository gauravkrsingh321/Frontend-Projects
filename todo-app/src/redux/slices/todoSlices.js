import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  todos: [{ id: 1, text: "My First Goal Is Nothing" }]
};

export const todoSlices = createSlice({
  name: 'todoApp',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(),
        text: action.payload
      };
      state.todos.push(todo);
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    updateTodo: (state, action) => {
      const { id, text } = action.payload;
      const todo = state.todos.find((todo) => todo.id === id);
      if(todo) {
        todo.text = text; //Update the todo's text
      }
    }    
  }
});

export const { addTodo, removeTodo, updateTodo} = todoSlices.actions;
export default todoSlices.reducer;
