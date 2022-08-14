import { ToastAndroid } from 'react-native';
import uuid from 'react-native-uuid';

export const initialState = {
    todos: []
}
export function reducer(state, action) {
    switch (action.type) {
        case "ADD":
            if (action.value) {
                const data = {
                    title: action.value,
                    id: uuid.v4(),
                    complete: false
                }
                ToastAndroid.showWithGravity(
                    "Task is added.",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );
                return { todos: [...state.todos, data] }
            }
            ToastAndroid.showWithGravity(
                "Please enter some value",
                ToastAndroid.LONG,
                ToastAndroid.CENTER
            );
            return state

        case "DELETE":
            let todos = state.todos.filter((todo) => todo.id !== action.id)
            return { todos }
        case "COMPLETE":
            const todos1 = state.todos.map(todo => {
                if (todo.id === action.id)
                    return { ...todo, complete: !todo.complete }
                else
                    return todo
            })
            return { todos: [...todos1] }

        default:
            return state
    }
}