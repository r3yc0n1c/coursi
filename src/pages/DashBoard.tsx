import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Spinner from "@/components/ui/spinner";
import useStudentCourses from "@/redux/hooks/useStudentCourses";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";


export const Dashboard: React.FC = () => {
    const studentId = 101;
    const { studentName, enrolledCourses, handleMarkCompleted } = useStudentCourses(studentId);
    const studentNameInit = studentName.split(' ').map(part => part.charAt(0).toUpperCase()).join('');
    const studentFirstName = studentName.split(' ')[0];
    const randomAvatarProfilePic = `https://api.dicebear.com/9.x/adventurer/svg?seed=${Math.random() * 10e9}`;

    if (!studentName) {
        return (
            <div className="flex flex-col h-screen w-full justify-center items-center">
                <Spinner />
                <span className="mt-8">Loading...</span>
            </div>
        )
    }

    return (
        <div className="p-4">
            <div className="flex justify-between">
                <h1 className="text-2xl font-bold mb-6">Hi, {studentFirstName}</h1>

                <div className='flex justify-between gap-4'>
                    <Link to='/'>
                        <Button className='mb-4'> Course List </Button>
                    </Link>
                    <Avatar className="border-2 rounded-full object-contain">
                        <AvatarImage src={randomAvatarProfilePic} />
                        <AvatarFallback>{studentNameInit}</AvatarFallback>
                    </Avatar>
                </div>
            </div>
            <div className="space-y-4">
                {enrolledCourses.length > 0 ? (
                    enrolledCourses.map(course => (
                        <div key={course.courseId} className="p-4 border rounded">
                            <img src={course.thumbnail} alt={course.courseName} className="w-full h-32 object-cover mb-2" />
                            <h2 className="text-xl font-semibold">{course.courseName}</h2>

                            <div className="flex justify-between">
                                <p>Instructor: {course.instructor}</p>
                                <p>Due Date: {course.dueDate}</p>
                            </div>

                            <div className="mb-2">
                                <Progress value={course.progress} max={100} className="[&>*]:bg-green-500 border-2 h-4 my-2" />
                                <span>Progress: {course.progress || 0}%</span>
                            </div>
                            <Button
                                onClick={() => handleMarkCompleted(course.courseId)}
                                className="mt-2"
                            >
                                Mark as Completed
                            </Button>
                        </div>
                    ))
                ) : (
                    <p>No enrolled courses available.</p>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
