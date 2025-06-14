import { useReducer } from 'react';
import { FaCheck, FaEdit, FaTrash } from 'react-icons/fa';

function TaskCard(props) {
    const initialState = {
        editing: false,
        text: props.task.text,
    };

    function CardReducer(state, action) {
        switch (action.type) {
        case 'TOGGLE_EDIT':
            return { ...state, editing: !state.editing };
        case 'SET_TEXT':
            return { ...state, text: action.payload };
        case 'RESET':
            return { editing: false, text: props.task.text };
        default:
            return state;
        }
    }

    const [state, localDispatch] = useReducer(CardReducer, initialState);

    const handleUpdate = () => {
        props.dispatch({ type: 'UPDATE', payload: { id: props.task.id, text: state.text } });
        localDispatch({ type: 'TOGGLE_EDIT' });
    };

    const renderEditMode = () => (
        <div>
            <input
                value={state.text}
                onChange={(e) => localDispatch({ type: 'SET_TEXT', payload: e.target.value })}
            />
            <button onClick={handleUpdate}>Save</button>
        </div>
    );

    const renderViewMode = () => (
        <div>
            <p>{props.task.text}</p>
            <span>{props.task.date}</span>
        </div>
    );

    return (
        <div className={`task ${props.task.completed ? 'completed' : ''}`}>
            {state.editing ? renderEditMode() : renderViewMode()}

            <div className="actions">
                <button onClick={() => props.dispatch({ type: 'TOGGLE', payload: props.task.id })}>
                    <FaCheck />
                </button>
                <button onClick={() => localDispatch({ type: 'TOGGLE_EDIT' })}>
                    <FaEdit />
                </button>
                <button onClick={() => props.dispatch({ type: 'DELETE', payload: props.task.id })}>
                    <FaTrash />
                </button>
            </div>
        </div>
    );
}

export default TaskCard;
