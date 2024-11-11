import './App.css';
import TodoList from './Containers/TodoList/TodoList.tsx';
import AddTask from './Containers/AddTask/AddTask.tsx';

const App = () => {
  return <div className="container m-5 d-flex flex-column align-items-center">
    <AddTask/>
    <TodoList/>
  </div>;
};

export default App;
