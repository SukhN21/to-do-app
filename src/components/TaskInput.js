import { useReducer } from 'react';

function TaskInput(props) {
    const initialFormState = { text: '' };

    function FormReducer(state, action) {
        switch (action.type) {
            case 'SET_TEXT':
                return { ...state, text: action.payload };
            case 'RESET':
                return { text: '' };
            default:
                return state;
        }
    }

    const [formState, formDispatch] = useReducer(FormReducer, initialFormState);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formState.text.trim()) {
            return;
        }

        props.dispatch({
            type: 'ADD',
            payload: {
                id: Date.now(),
                text: formState.text,
                date: new Date().toLocaleString(),
                completed: false,
            },
        });

        formDispatch({ type: 'RESET' });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                placeholder="New task"
                value={formState.text}
                onChange={(e) => formDispatch({ type: 'SET_TEXT', payload: e.target.value })}
            />
            <button type="submit">Add</button>
        </form>
    );
}

export default TaskInput;
