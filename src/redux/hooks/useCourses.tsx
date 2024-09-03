import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCourses, filterCourses, updateLikes } from '../slices/courses/course.slice';
import type { RootState, AppDispatch } from '../store';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '@/configs/firebase';
import type { Course } from '@/models/courseModel';

const useCourses = () => {
    const dispatch: AppDispatch = useDispatch();
    const courses = useSelector((state: RootState) => state.courses.filteredCourses);
    const searchQuery = useSelector((state: RootState) => state.courses.searchQuery);

    useEffect(() => {
        const fetchCourses = async () => {
            const coursesCollection = collection(db, 'courses');
            const courseSnapshot = await getDocs(coursesCollection);
            const courseList = courseSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            dispatch(setCourses(courseList as any));
        };

        fetchCourses();
        const unsubscribe = onSnapshot(collection(db, 'courses'), (snapshot) => {
            const updatedCourses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            dispatch(setCourses(updatedCourses as any));
        });

        return () => unsubscribe();
    }, [dispatch]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(filterCourses(e.target.value));
    };

    const handleLikeClick = (course: Course) => {
        dispatch(updateLikes({ id: course.id, likes: course.likes + 1 }));
    };

    return {
        courses,
        searchQuery,
        handleSearchChange,
        handleLikeClick
    };
};

export default useCourses;
