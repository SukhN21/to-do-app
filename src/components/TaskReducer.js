import { useReducer, useEffect } from 'react';

function taskReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            return [...state, action.payload];
        case 'DELETE':
            return state.filter(task => task.id !== action.payload);
        case 'UPDATE':
            return state.map(task =>
                task.id === action.payload.id
                ? { ...task, text: action.payload.text, date: new Date().toLocaleString() }
                : task
            );
        case 'TOGGLE':
            return state.map(task =>
                task.id === action.payload
                ? { ...task, completed: !task.completed }
                : task
            );
        default:
            return state;
    }
}

function TaskReducer() {
    const getInitialState = () => {
        return JSON.parse(localStorage.getItem("tasks")) || [];
    };

    const [tasks, dispatch] = useReducer(taskReducer, [], getInitialState);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    return (
        [tasks, dispatch]
    );
}

export default TaskReducer;
