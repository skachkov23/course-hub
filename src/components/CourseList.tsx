import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { setCourses, setLoading, setError, loadUserPurchases } from '../store/slices/appSlice';
import { fetchCourses } from '../utils/api';
import CourseCard from './CourseCard';
import BalancePanel from './BalancePanel';
import AdminPanel from './AdminPanel';

const CourseList: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const currentUser = useSelector((state: RootState) => state.app.currentUser);
    const { courses, loading, error } = useSelector((state: RootState) => state.app);

    useEffect(() => {
    const loadCourses = async () => {
        dispatch(setLoading(true));
        try {
            const coursesData = await fetchCourses();
            
            const savedAdminCourses = localStorage.getItem('adminCourses');
            const adminCourses = savedAdminCourses ? JSON.parse(savedAdminCourses) : [];
            
            dispatch(setCourses([...coursesData, ...adminCourses]));
            
            if (currentUser) {
                const userPurchases = JSON.parse(localStorage.getItem('userPurchases') || '{}');
                const purchases = userPurchases[currentUser.email] || [];
                dispatch(loadUserPurchases(purchases));
            }
        } catch (err) {
            dispatch(setError('Error loading courses'));
        }
    };
    loadCourses();
    }, [dispatch, currentUser]);
    if (loading) {
        return (
        <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading courses...</p>
        </div>
        );
    }

    return (
        <div className="course-list">
        <h2>Our Courses</h2>
        <BalancePanel />
        {currentUser?.isAdmin && <AdminPanel />}
        {error && <div className="error-banner">{error}</div>}
        <div className="courses-grid">
            {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
            ))}
        </div>
        </div>
    );
};

export default CourseList;
