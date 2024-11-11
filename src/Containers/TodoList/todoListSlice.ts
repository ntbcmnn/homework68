import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { AxiosResponse } from 'axios';
import { RootState } from '../../app/store.ts';

export interface Todo {
  id: string;
  title: string;
  status: boolean;
}

interface TodoListApi {
  [key: string]: Todo;
}

interface TodoState {
  tasks: Todo[];
  isLoading: boolean;
  error: boolean;
}

const initialState: TodoState = {
  tasks: [],
  isLoading: false,
  error: false,
};

export const fetchTodoList = createAsyncThunk('todo/fetchTodos', async () => {
  const response: AxiosResponse<TodoListApi> = await axiosApi.get('todo.json');

  if (response.data) {
    const tasksApi: Todo[] = Object.keys(response.data).map((taskKey: string) => {
      return {
        ...response.data[taskKey],
        id: taskKey,
      };
    });
    return tasksApi;
  }
  return [];
});

export const addTodo = createAsyncThunk('todo/addTodo', async (title: string) => {
  const response: AxiosResponse<Todo> = await axiosApi.post<Todo>('todo.json', {title, status: false});
  return response.data;
});

export const changeStatus =
  createAsyncThunk<void, { id: string }, { state: RootState }>('todo/changeStatus',
    async ({id}, thunkAPI) => {
      const currentTask: Todo | undefined = thunkAPI.getState().todo.tasks.find((task: Todo) => task.id === id);
      const currentStatusValue: boolean | undefined = currentTask?.status;
      await axiosApi.put(`todo/${id}.json`, {...currentTask, status: !currentStatusValue});
    });

export const deleteTask = createAsyncThunk('todo/deleteTask', async (id: string) => {
  await axiosApi.delete(`todo/${id}.json`);
  return id;
});

export const todoListSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchTodoList.pending, (state) => {
          state.isLoading = true;
          state.error = false;
        })
      .addCase(
        fetchTodoList.fulfilled, (state, action) => {
          state.isLoading = false;
          state.tasks = action.payload;
        })
      .addCase(
        fetchTodoList.rejected, (state) => {
          state.isLoading = false;
          state.error = true;
        })
      .addCase(
        addTodo.pending, (state) => {
          state.isLoading = true;
          state.error = false;
        })
      .addCase(
        addTodo.fulfilled, (state) => {
          state.isLoading = false;
        })
      .addCase(
        addTodo.rejected, (state) => {
          state.isLoading = false;
          state.error = true;
        })
      .addCase(
        changeStatus.pending, (state) => {
          state.isLoading = true;
          state.error = false;
        })
      .addCase(
        changeStatus.fulfilled, (state) => {
          state.isLoading = false;
        })
      .addCase(
        changeStatus.rejected, (state) => {
          state.isLoading = false;
          state.error = true;
        })
      .addCase(
        deleteTask.pending, (state) => {
          state.isLoading = true;
          state.error = false;
        })
      .addCase(
        deleteTask.fulfilled, (state, action) => {
          state.isLoading = false;
          state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        })
      .addCase(
        deleteTask.rejected, (state) => {
          state.isLoading = false;
          state.error = true;
        });
  },
});

export default todoListSlice.reducer;