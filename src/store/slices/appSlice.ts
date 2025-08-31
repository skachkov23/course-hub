import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState, Course, User } from '../../types';

const initialState: AppState = {
    courses: [],
    purchasedCourses: [],
    currentUser: null,
    currentVideo: null,
    loading: false,
    error: null,
    isDarkTheme: false,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setCourses: (state, action: PayloadAction<Course[]>) => {
        state.courses = action.payload;
        state.loading = false;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
        state.loading = action.payload;
        },
        purchaseCourse: (state, action: PayloadAction<string>) => {
            if (!state.purchasedCourses.includes(action.payload)) {
                state.purchasedCourses.push(action.payload);
                if (state.currentUser) {
                    const userPurchases = JSON.parse(localStorage.getItem('userPurchases') || '{}');
                    userPurchases[state.currentUser.email] = state.purchasedCourses;
                    localStorage.setItem('userPurchases', JSON.stringify(userPurchases));
                }
            }
        },
        setCurrentUser: (state, action: PayloadAction<User | null>) => {
        state.currentUser = action.payload;
        },
        setCurrentVideo: (state, action: PayloadAction<string | null>) => {
        state.currentVideo = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
        state.error = action.payload;
        },
        updateUserBalance: (state, action: PayloadAction<number>) => {
            if (state.currentUser) {
                state.currentUser.balance = action.payload;
                localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
                const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
                registeredUsers[state.currentUser.email] = state.currentUser;
                localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
            }
        },
        loadUserPurchases: (state, action: PayloadAction<string[]>) => {
            state.purchasedCourses = action.payload;
        },
        toggleTheme: (state) => {
            state.isDarkTheme = !state.isDarkTheme;
            localStorage.setItem('isDarkTheme', JSON.stringify(state.isDarkTheme));
        },
        addCourse: (state, action: PayloadAction<Course>) => {
            state.courses.push(action.payload);
        },
        updateCourse: (state, action: PayloadAction<Course>) => {
            const index = state.courses.findIndex(course => course.id === action.payload.id);
            if (index !== -1) {
                state.courses[index] = action.payload;
            }
        },
        deleteCourse: (state, action: PayloadAction<string>) => {
            state.courses = state.courses.filter(course => course.id !== action.payload);
        },
    },
});

export const { 
    setCourses,
    setLoading, 
    purchaseCourse, 
    setCurrentUser, 
    setCurrentVideo, 
    setError,
    updateUserBalance,
    loadUserPurchases,
    toggleTheme,
    addCourse,
    updateCourse,
    deleteCourse
} = appSlice.actions;

export default appSlice.reducer;
