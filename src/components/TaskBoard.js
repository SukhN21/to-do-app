import TaskCard from './TaskCard';

function TaskBoard(props) {
    return (
        <div className="task-list">
            {props.tasks.map(task => (
                <TaskCard key={task.id} task={task} dispatch={props.dispatch} />
            ))}
        </div>
    );
}

export default TaskBoard;
