import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../types';

interface TasksState {
    tasks: Task[];
}

const initialState: TasksState = {
    tasks: [],
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
        },
        deleteTask: (state, action: PayloadAction<number>) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        },
        editTask: (state, action: PayloadAction<Task>) => {
            const index = state.tasks.findIndex(task => task.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        },
        markComplete: (state, action: PayloadAction<number>) => {
            const task = state.tasks.find(task => task.id === action.payload);
            if (task) {
                task.status = 'Completed';
            }
        },
    },
});

export const { addTask, deleteTask, editTask, markComplete } = tasksSlice.actions;
export default tasksSlice.reducer;