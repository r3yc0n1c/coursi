export interface SyllabusItem {
    week: number;
    topic: string;
    content: string;
}

export interface CourseEnrolled {
    courseId: number;
    courseName: string;
    instructor: string;
    thumbnail: string;
    dueDate: string;
    progress: number;
}

export interface Student {
    id: number;
    name: string;
    email: string;
    enrolledCourses: CourseEnrolled[]
}

export interface Course {
    id: number;
    name: string;
    instructor: string;
    description: string;
    enrollmentStatus: "Open" | "Closed" | "In Progress";
    thumbnail: string;
    duration: string;
    schedule: string;
    location: string;
    prerequisites: string[];
    syllabus: SyllabusItem[];
    students: Student[];
    likes: number;
    progress: number;
}