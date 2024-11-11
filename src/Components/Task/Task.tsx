import React from 'react';
import { changeStatus, deleteTask, fetchTodoList } from '../../Containers/TodoList/todoListSlice.ts';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store.ts';
import { toast } from 'react-toastify';

interface Props {
  id: string;
  title: string;
  status: boolean;
}

const Task: React.FC<Props> = ({id, title, status}) => {
  const dispatch: AppDispatch = useDispatch();

  const onStatusChange: () => Promise<void> = async () => {
    try {
      await dispatch(changeStatus({id}));
      await dispatch(fetchTodoList());
      toast.success('Task status changed successfully');
    } catch (e) {
      toast.error('Error. Status changing was declined');
      console.error(e);
    }
  };

  const onDeleteTask: () => Promise<void> = async () => {
    try {
      if (confirm('Do you really want to delete the task?')) {
        await dispatch(deleteTask(id));
        toast.success('Task deleted successfully');
      } else {
        toast.info('You cancelled task deleting');
      }
    } catch (e) {
      toast.info('Error. Deleting was declined');
      console.error(e);
    }
  };

  return (
    <>
      <div className="card w-25">
        <div className="card-body p-4">
          <h5 className="card-title mb-4">{title}</h5>
          <hr/>
          <div className="d-flex gap-3 justify-content-between align-items-center mt-4">
            <div className="d-flex gap-2">
              <label htmlFor="check">{status ? 'Done!' : 'Not done yet'}</label>
              <input
                name="check"
                id={id}
                type="checkbox"
                className="form-check-input"
                checked={status}
                onChange={onStatusChange}
              />
            </div>
            <button className="btn btn-dark" onClick={onDeleteTask}>Delete</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Task;