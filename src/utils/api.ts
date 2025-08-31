import { Course } from '../types';

const mockCourses: Course[] = [
    {
        id: '1',
        title: 'React for beginners',
        description: 'Learn the fundamentals of React from scratch to become a professional. Includes React hooks.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        price: 299
    },
    {
        id: '2',
        title: 'TypeScript for beginners',
        description: 'Learn TypeScript. Types, interfaces, generics and React integration.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        price: 399
    },
    {
        id: '3',
        title: 'Redux Toolkit full course',
        description: 'A modern approach to state management in React applications with Redux Toolkit.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        price: 349
    },
    {
        id: '4',
        title: 'Node.js Backend development',
        description: 'Creating a RESTful API with Node.js, Express, and MongoDB. Authentication and security.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        price: 449
    },
    {
        id: '5',
        title: 'Vue.js Essentials',
        description: 'A beginner-friendly guide to building dynamic front-end applications with Vue.js and Vue Router.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        price: 359
    },
    {
        id: '6',
        title: 'Database Design and SQL',
        description: 'Learn how to design efficient database schemas and write optimized SQL queries for relational databases.',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        price: 379
    }
];

export const fetchCourses = (): Promise<Course[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
        resolve(mockCourses);
        }, 1000);
    });
};

export const handlePurchase = (courseId: string): Promise<{ success: boolean; message: string }> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        if (Math.random() > 0.1) {
            resolve({ success: true, message: 'Payment successful' });
        } else {
            reject({ success: false, message: 'Payment error. Try one more time.' });
        }
        }, 1500);
    });
};
