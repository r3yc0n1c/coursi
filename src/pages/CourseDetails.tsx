import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '@/redux/store';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from 'react';
import { ArrowLeftIcon } from '@radix-ui/react-icons';


function CourseDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const course = useSelector((state: RootState) =>
        state.courses.courses.find((course) => course.id === Number(id))
    );
    const [isSyllabusOpen, setSyllabusOpen] = useState<boolean>(false);
    const toggleSyllabusOpen = () => setSyllabusOpen(!isSyllabusOpen);

    if (!course) {
        return (
            <div className="flex flex-col h-screen w-full justify-center items-center">
                <Link to="/">
                    <ArrowLeftIcon className='mb-4 border-2 rounded-full p-1 hover:border-gray-300' width={32} height={32} />
                </Link>
                <span className="mt-8">Go Back!</span>
            </div>
        )
    }

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <ArrowLeftIcon className='mb-4 border-2 rounded-full p-1 hover:border-gray-300' width={32} height={32} />

            <Card className="mb-4">
                <CardContent>
                    <CardTitle className="lg:text-3xl text-xl font-bold mb-2 py-4">{course.name}</CardTitle>
                    <CardDescription className="lg:text-xl text-base font-semibold mb-4">
                        Instructor: <span className='font-normal'>{course.instructor}</span>
                    </CardDescription>
                    <img src={course.thumbnail} alt={course.name} className="w-full h-64 object-cover mb-4 rounded" />
                    <p className="text-lg mb-2">{course.description}</p>
                    <div className="mb-4">
                        <div className="font-semibold">Enrollment Status:</div>
                        <p>{course.enrollmentStatus}</p>
                    </div>
                    <div className="mb-4">
                        <div className="font-semibold">Duration:</div>
                        <p>{course.duration}</p>
                    </div>
                    <div className="mb-4">
                        <div className="font-semibold">Schedule:</div>
                        <p>{course.schedule}</p>
                    </div>
                    <div className="mb-4">
                        <div className="font-semibold">Location:</div>
                        <p>{course.location}</p>
                    </div>
                    <div className="mb-4">
                        <div className="font-semibold">Prerequisites:</div>
                        <ul className="list-disc pl-5">
                            {course.prerequisites.map((prerequisite, index) => (
                                <li key={'prereq_' + index}>{prerequisite}</li>
                            ))}
                        </ul>
                    </div>
                    <Collapsible className="mb-4" open={isSyllabusOpen} onOpenChange={setSyllabusOpen}>
                        <CollapsibleTrigger asChild>
                            <Button onClick={toggleSyllabusOpen}>
                                {isSyllabusOpen ? 'Hide Syllabus' : 'Show Syllabus'}

                            </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <div className="mt-4">
                                <div className="font-semibold text-lg">Syllabus:</div>
                                <ul className="list-disc pl-5">
                                    {course.syllabus.map((item) => (
                                        <li key={item.week}>
                                            <strong>Week {item.week}:</strong> {item.topic} - {item.content}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </CollapsibleContent>
                    </Collapsible>
                </CardContent>
            </Card>
        </div>
    );
}

export default CourseDetailsPage;