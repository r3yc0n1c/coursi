import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Course } from '@/models/courseModel';

interface CourseState {
    courses: Course[];
    filteredCourses: Course[];
    searchQuery: string;
}

const initialState: CourseState = {
    courses: [],
    filteredCourses: [],
    searchQuery: '',
};

const courseSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        setCourses: (state, action: PayloadAction<Course[]>) => {
            state.courses = action.payload;
            state.filteredCourses = action.payload;
        },
        filterCourses: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
            state.filteredCourses = state.courses.filter(course =>
                course.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                course.instructor.toLowerCase().includes(state.searchQuery.toLowerCase())
            );
        },
        updateLikes: (state, action: PayloadAction<{ id: number; likes: number }>) => {
            const { id, likes } = action.payload;
            const course = state.courses.find(course => course.id === id);
            // console.log('course', course?.likes, id, likes)
            if (course) {
                course.likes = likes;
            }
        },
    },
});

export const { setCourses, filterCourses, updateLikes } = courseSlice.actions;
export default courseSlice.reducer;