import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store.ts';
import { useEffect } from 'react';
import { fetchTodoList, Todo } from './todoListSlice.ts';
import Task from '../../Components/Task/Task.tsx';
import Loader from '../../Components/UI/Loader/Loader.tsx';
import { toast } from 'react-toastify';

const TodoList = () => {
  const dispatch: AppDispatch = useDispatch();
  const {tasks, isLoading, error} = useSelector((state: RootState) => state.todo);

  useEffect(() => {
    dispatch(fetchTodoList());
  }, [dispatch]);

  if (isLoading) {
    return <Loader/>;
  }

  if (error) {
    return toast.error('Error fetching to do list.');
  }

  return (
    <div className="d-flex flex-wrap justify-content-center gap-4">
      {tasks.map((task: Todo) => (
        <Task id={task.id} title={task.title} key={task.id} status={task.status}/>
      ))}
    </div>
  );
};

export default TodoList;