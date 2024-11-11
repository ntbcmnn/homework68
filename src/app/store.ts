import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../Containers/TodoList/todoListSlice.ts';

export const store = configureStore({
  reducer: {
    todo: todoReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
