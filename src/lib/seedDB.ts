import { collection, addDoc } from 'firebase/firestore';
import { db } from "@/configs/firebase";


const sampleCourses = [
    {
        id: 1,
        name: 'Introduction to React Native',
        instructor: 'John Doe',
        description: 'Learn the basics of React Native development and build your first mobile app.',
        enrollmentStatus: 'Open',
        thumbnail: 'https://images.unsplash.com/photo-1552308995-2baac1ad5490',
        duration: '8 weeks',
        schedule: 'Tuesdays and Thursdays, 6:00 PM - 8:00 PM',
        location: 'Online',
        prerequisites: ['Basic JavaScript knowledge', 'Familiarity with React'],
        syllabus: [
            { week: 1, topic: 'Introduction to React Native', content: 'Overview of React Native, setting up your development environment.' },
            { week: 2, topic: 'Building Your First App', content: 'Creating a simple mobile app using React Native components.' },
        ],
        students: [
            { id: 101, name: 'Alice Johnson', email: 'alice@example.com' },
            { id: 102, name: 'Bob Smith', email: 'bob@example.com' },
        ],
        likes: 90,
        progress: 0,
    },
    {
        id: 2,
        name: 'Advanced JavaScript Concepts',
        instructor: 'Jane Smith',
        description: 'Deep dive into advanced JavaScript concepts and modern ES6+ features.',
        enrollmentStatus: 'In Progress',
        thumbnail: 'https://images.unsplash.com/photo-1687603917313-ccae1a289a9d',
        duration: '10 weeks',
        schedule: 'Mondays and Wednesdays, 7:00 PM - 9:00 PM',
        location: 'Online',
        prerequisites: ['Intermediate JavaScript knowledge', 'Basic understanding of asynchronous programming'],
        syllabus: [
            { week: 1, topic: 'ES6+ Features', content: 'Arrow functions, destructuring, spread/rest operators.' },
            { week: 2, topic: 'Asynchronous JavaScript', content: 'Promises, async/await, and error handling.' },
        ],
        students: [
            { id: 201, name: 'Charlie Brown', email: 'charlie@example.com' },
            { id: 202, name: 'Diana Prince', email: 'diana@example.com' },
        ],
        likes: 0,
        progress: 500,
    },
    {
        id: 3,
        name: 'Data Structures and Algorithms in Python',
        instructor: 'Alan Turing',
        description: 'Master fundamental data structures and algorithms using Python.',
        enrollmentStatus: 'Open',
        thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c',
        duration: '12 weeks',
        schedule: 'Fridays, 5:00 PM - 8:00 PM',
        location: 'Hybrid',
        prerequisites: ['Basic Python knowledge', 'Understanding of time and space complexity'],
        syllabus: [
            { week: 1, topic: 'Arrays and Strings', content: 'Implementing and manipulating arrays and strings in Python.' },
            { week: 2, topic: 'Linked Lists', content: 'Singly and doubly linked lists, operations and algorithms.' },
        ],
        students: [
            { id: 301, name: 'Eva Green', email: 'eva@example.com' },
            { id: 302, name: 'Frank Castle', email: 'frank@example.com' },
        ],
        likes: 10,
        progress: 170,
    },
    {
        id: 4,
        name: 'UI/UX Design Fundamentals',
        instructor: 'Olivia Wilde',
        description: 'Learn the principles of user interface and user experience design.',
        enrollmentStatus: 'Open',
        thumbnail: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d',
        duration: '6 weeks',
        schedule: 'Tuesdays, 6:00 PM - 9:00 PM',
        location: 'In-person',
        prerequisites: ['Basic design knowledge', 'Familiarity with design tools like Sketch or Figma'],
        syllabus: [
            { week: 1, topic: 'Introduction to UI/UX', content: 'Understanding the difference between UI and UX, importance in product design.' },
            { week: 2, topic: 'User Research', content: 'Techniques for gathering and analyzing user data.' },
        ],
        students: [
            { id: 401, name: 'George Orwell', email: 'george@example.com' },
            { id: 402, name: 'Hedy Lamarr', email: 'hedy@example.com' },
        ],
        likes: 50,
        progress: 0,
    },
    {
        id: 5,
        name: 'Blockchain Development with Solidity',
        instructor: 'Satoshi Nakamoto',
        description: 'Dive into blockchain technology and smart contract development using Solidity.',
        enrollmentStatus: 'Closed',
        thumbnail: 'https://images.unsplash.com/photo-1640161704729-cbe966a08476',
        duration: '10 weeks',
        schedule: 'Thursdays and Saturdays, 7:00 PM - 9:00 PM',
        location: 'Online',
        prerequisites: ['Strong programming background', 'Basic understanding of blockchain concepts'],
        syllabus: [
            { week: 1, topic: 'Blockchain Fundamentals', content: 'Understanding blockchain technology, consensus mechanisms, and decentralization.' },
            { week: 2, topic: 'Solidity Basics', content: 'Introduction to Solidity, smart contract structure, and basic syntax.' },
        ],
        students: [
            { id: 501, name: 'Isabel Allende', email: 'isabel@example.com' },
            { id: 502, name: 'Jack London', email: 'jack@example.com' },
        ],
        likes: 100,
        progress: 0,
    },
];

const sampleStudents = [
    {
        "id": 101,
        "name": "Alice Johnson",
        "email": "alice@example.com",
        "enrolledCourses": [
            {
                "courseId": 1,
                "courseName": "Introduction to React Native",
                "instructor": "John Doe",
                "thumbnail": "https://images.unsplash.com/photo-1552308995-2baac1ad5490",
                "dueDate": "Sep 15, 2024",
                "progress": 15
            },
            {
                "courseId": 2,
                "courseName": "Advanced JavaScript Concepts",
                "instructor": "Jane Smith",
                "thumbnail": "https://images.unsplash.com/photo-1687603917313-ccae1a289a9d",
                "dueDate": "Dec 10, 2024",
                "progress": 25
            },
            {
                "courseId": 4,
                "courseName": "UI/UX Design Fundamentals",
                "instructor": "Olivia Wilde",
                "thumbnail": "https://images.unsplash.com/photo-1522542550221-31fd19575a2d",
                "dueDate": "Nov 25, 2024",
                "progress": 66
            }
        ]
    },
    {
        "id": 102,
        "name": "Bob Smith",
        "email": "bob@example.com",
        "enrolledCourses": [
            {
                "courseId": 1,
                "courseName": "Introduction to React Native",
                "instructor": "John Doe",
                "thumbnail": "https://images.unsplash.com/photo-1552308995-2baac1ad5490",
                "dueDate": "Oct 20, 2024",
                "progress": 0
            }
        ]
    },
    {
        "id": 201,
        "name": "Charlie Brown",
        "email": "charlie@example.com",
        "enrolledCourses": [
            {
                "courseId": 2,
                "courseName": "Advanced JavaScript Concepts",
                "instructor": "Jane Smith",
                "thumbnail": "https://images.unsplash.com/photo-1687603917313-ccae1a289a9d",
                "dueDate": "Nov 5, 2024",
                "progress": 0
            }
        ]
    },
    {
        "id": 202,
        "name": "Diana Prince",
        "email": "diana@example.com",
        "enrolledCourses": [
            {
                "courseId": 2,
                "courseName": "Advanced JavaScript Concepts",
                "instructor": "Jane Smith",
                "thumbnail": "https://images.unsplash.com/photo-1687603917313-ccae1a289a9d",
                "dueDate": "Dec 15, 2024",
                "progress": 0
            }
        ]
    },
    {
        "id": 301,
        "name": "Eva Green",
        "email": "eva@example.com",
        "enrolledCourses": [
            {
                "courseId": 3,
                "courseName": "Data Structures and Algorithms in Python",
                "instructor": "Alan Turing",
                "thumbnail": "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
                "dueDate": "Jan 10, 2025",
                "progress": 0
            }
        ]
    },
    {
        "id": 302,
        "name": "Frank Castle",
        "email": "frank@example.com",
        "enrolledCourses": [
            {
                "courseId": 3,
                "courseName": "Data Structures and Algorithms in Python",
                "instructor": "Alan Turing",
                "thumbnail": "https://images.unsplash.com/photo-1555949963-aa79dcee981c",
                "dueDate": "Feb 5, 2025",
                "progress": 0
            }
        ]
    },
    {
        "id": 401,
        "name": "George Orwell",
        "email": "george@example.com",
        "enrolledCourses": [
            {
                "courseId": 4,
                "courseName": "UI/UX Design Fundamentals",
                "instructor": "Olivia Wilde",
                "thumbnail": "https://images.unsplash.com/photo-1522542550221-31fd19575a2d",
                "dueDate": "Mar 1, 2025",
                "progress": 0
            }
        ]
    },
    {
        "id": 402,
        "name": "Hedy Lamarr",
        "email": "hedy@example.com",
        "enrolledCourses": [
            {
                "courseId": 4,
                "courseName": "UI/UX Design Fundamentals",
                "instructor": "Olivia Wilde",
                "thumbnail": "https://images.unsplash.com/photo-1522542550221-31fd19575a2d",
                "dueDate": "Apr 20, 2025",
                "progress": 0
            }
        ]
    },
    {
        "id": 501,
        "name": "Isabel Allende",
        "email": "isabel@example.com",
        "enrolledCourses": [
            {
                "courseId": 5,
                "courseName": "Blockchain Development with Solidity",
                "instructor": "Satoshi Nakamoto",
                "thumbnail": "https://images.unsplash.com/photo-1640161704729-cbe966a08476",
                "dueDate": "May 15, 2025",
                "progress": 0
            }
        ]
    },
    {
        "id": 502,
        "name": "Jack London",
        "email": "jack@example.com",
        "enrolledCourses": [
            {
                "courseId": 5,
                "courseName": "Blockchain Development with Solidity",
                "instructor": "Satoshi Nakamoto",
                "thumbnail": "https://images.unsplash.com/photo-1640161704729-cbe966a08476",
                "dueDate": "Jun 10, 2025",
                "progress": 0
            }
        ]
    }
];


async function seedDatabase() {
    try {
        for (const course of sampleCourses) {
            const docRef = await addDoc(collection(db, "courses"), course);
            console.log("Course added with ID: ", docRef.id);
        }

        for (const student of sampleStudents) {
            const docRef = await addDoc(collection(db, "students"), student);
            console.log("Student added with ID: ", docRef.id);
        }
    } catch (e) {
        console.error("Error adding documents: ", e);
    }
}

// start seeding
seedDatabase().then(() => {
    console.log('Seeding process finished. Exiting...');
    process.exit(0);
}).catch((error) => {
    console.error('An error occurred during the seeding process:', error);
    process.exit(1);
});