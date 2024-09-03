import type React from 'react';
import useCourses from '@/redux/hooks/useCourses';
import { Input } from '@/components/ui/input';
import {  H2 } from '@/components/ui/typography';
import CourseCard from '../components/CourseCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CourseListPage: React.FC = () => {
    const { courses, searchQuery, handleSearchChange } = useCourses();


    return (
        <div className="p-4">
            <div className='flex justify-between'>
                <H2 className='mb-4'> Course List </H2>
                <Link to='/dashboard'>
                    <Button className='mb-4'> Dashboard </Button>
                </Link>
            </div>
            <div className="mb-4">
                <Input
                    type="text"
                    placeholder="Search by course name or instructor"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="border rounded p-2 w-full"
                />
            </div>
            <div className="space-y-4">
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <CourseCard course={course} key={'asdasd'} />
                    ))
                ) : (
                    <p>No courses available.</p>
                )}
            </div>
        </div>
    );
};

export default CourseListPage;
