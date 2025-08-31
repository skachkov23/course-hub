export interface Course {
    id: string;
    title: string;
    description: string;
    videoUrl: string;
    price: number;
}

export interface User {
    email: string;
    password: string;
    name: string;
    balance: number;
    isAdmin: boolean;
}

export interface AppState {
    courses: Course[];
    purchasedCourses: string[];
    currentUser: User | null;
    currentVideo: string | null;
    loading: boolean;
    error: string | null;
    isDarkTheme: boolean;
}
