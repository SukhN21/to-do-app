import TaskInput from './components/TaskInput';
import TaskBoard from './components/TaskBoard';
import TaskReducer from './components/TaskReducer';

function App() {
  const [tasks, dispatch] = TaskReducer();

  return (
    <div className="app">
      <h1>Task Calendar</h1>
      <TaskInput dispatch={dispatch} />
      <TaskBoard tasks={tasks} dispatch={dispatch} />
    </div>
  );
}

export default App;
