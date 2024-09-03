import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/redux/store';
import { enrollCourse, fetchStudentById, markCourseAsCompleted, setStudent } from '@/redux/slices/students/student.slice';

const useStudentCourses = (studentId: number) => {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const student = await dispatch(fetchStudentById(studentId)).unwrap();
                dispatch(setStudent(student));
            } catch (err) {
                console.log(err.message || 'Failed to fetch student data');
            }
        };

        fetchData();

    }, [dispatch, studentId]);

    const enrolledCourses = useSelector((state: RootState) => state.student.enrolledCourses);
    const studentName = useSelector((state: RootState) => state.student.name);

    const handleMarkCompleted = (courseId: number) => {
        dispatch(markCourseAsCompleted(courseId));
    };

    return {
        studentName,
        enrolledCourses,
        handleMarkCompleted,
    };
};

export default useStudentCourses;
