import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { collection, getDocs, query, where } from 'firebase/firestore';

import type { CourseEnrolled, Student } from '@/models/courseModel';
import { db } from '@/configs/firebase';

const initialState: Student = {
    id: 0,
    name: '',
    email: '',
    enrolledCourses: []
};

export const fetchStudentById = createAsyncThunk(
    'student/fetchStudentById',
    async (studentId: number) => {
        const studentsCollection = collection(db, 'students');
        const q = query(studentsCollection, where('id', '==', studentId));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            throw new Error(`Student with ID ${studentId} not found`);
        }
        const studentSnapshot = querySnapshot.docs[0];
        // console.log(studentSnapshot.data());

        return studentSnapshot.data() as Student;
    }
);

const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        setStudent: (_state, action: PayloadAction<Student>) => {
            return action.payload;
        },
        enrollCourse: (state, action: PayloadAction<CourseEnrolled>) => {
            state.enrolledCourses.push(action.payload);
        },
        markCourseAsCompleted: (state, action: PayloadAction<number>) => {
            const courseIndex = state.enrolledCourses.findIndex(
                (course) => course.courseId === action.payload
            );
            if (courseIndex !== -1) {
                state.enrolledCourses[courseIndex].progress = 100;
            }
        },
    },
});

export const { setStudent, enrollCourse, markCourseAsCompleted } = studentSlice.actions;
export default studentSlice.reducer;
