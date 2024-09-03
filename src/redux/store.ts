import { configureStore } from "@reduxjs/toolkit";
import courseReducer from "./slices/courses/course.slice";
import studentReducer from "./slices/students/student.slice";


export const store = configureStore({
    reducer: {
        courses: courseReducer,
        student: studentReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;