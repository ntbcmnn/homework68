import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { addTodo, fetchTodoList } from '../TodoList/todoListSlice.ts';
import { AppDispatch, RootState } from '../../app/store.ts';
import { toast } from 'react-toastify';

const initialState = {
  title: '',
};

const AddTask = () => {
  const {isLoading} = useSelector((state: RootState) => state.todo);
  const [form, setForm] = useState({...initialState});
  const dispatch: AppDispatch = useDispatch();

  const onFormSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void> = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      if (!form.title.trim()) {
        toast.warning('Fill in the task name');
        setForm({...initialState});
        return;
      }
      await dispatch(addTodo(form.title));
      setForm({...initialState});
      await dispatch(fetchTodoList());
      toast.success('Task added successfully');
    } catch (e) {
      toast.error('Error!');
      console.error(e);
    }
  };

  const onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForm({...form, title: e.target.value});
  };

  return (
    <form className="form mb-5 d-flex flex-column align-items-center w-25" onSubmit={onFormSubmit}>
      <input
        className="form-control mb-3"
        type="text"
        name="title"
        value={form.title}
        onChange={onInputChange}
        placeholder="New task..."
        required
      />
      <button
        className="btn btn-outline-primary"
        type="submit"
        disabled={isLoading}
      >
        Add task
      </button>
    </form>
  );
};

export default AddTask;