import React from 'react'
import { Link } from 'react-router-dom';
import { HeartIcon } from "@radix-ui/react-icons";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import useCourses from '@/redux/hooks/useCourses';

const CourseCard = ({ course }) => {
    const { handleLikeClick } = useCourses();

    return (
        <div key={course.id} className="p-4 border rounded">
            <img src={course.thumbnail} alt={course.name} className="w-full h-32 object-cover mb-2" />
            <h2 className="text-xl font-semibold">{course.name}</h2>
            <p>{course.instructor}</p>
            <p>{course.description}</p>
            <div className='flex gap-4 mt-2'>
                <Link to={`/course/${course.id}`}>
                    <Button>View Details</Button>
                </Link>
                <Button
                    className='group'
                    onClick={() => handleLikeClick(course)
                    }>
                    <HeartIcon className='group-hover:text-red-500 group-hover:scale-125 transition-all' />
                </Button>
                <div className='text-xs flex items-center'>{course.likes} Likes</div>
            </div>
        </div>
    )
}
export default CourseCard