import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { purchaseCourse, setCurrentVideo, setError, updateUserBalance } from '../store/slices/appSlice';
import { handlePurchase } from '../utils/api';
import { Course } from '../types';
import VideoModal from './VideoModal';

interface CourseCardProps {
    course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
    const dispatch = useDispatch<AppDispatch>();
    const currentUser = useSelector((state: RootState) => state.app.currentUser);
    const purchasedCourses = useSelector((state: RootState) => state.app.purchasedCourses);
    const currentVideo = useSelector((state: RootState) => state.app.currentVideo);
    const [purchasing, setPurchasing] = useState(false);
    
    const isPurchased = purchasedCourses.includes(course.id);
    const isVideoPlaying = currentVideo === course.id;

    const handlePurchaseClick = async () => {
    if (isPurchased) return;
    
    if (!currentUser || currentUser.balance < course.price) {
        dispatch(setError('Insufficient balance. Please add funds to your account.'));
        return;
    }
    
    setPurchasing(true);
    try {
        await handlePurchase(course.id);
        dispatch(purchaseCourse(course.id));
        dispatch(updateUserBalance(currentUser.balance - course.price));
        dispatch(setError(null));
    } catch (error: any) {
        dispatch(setError(error.message || 'Error purchasing the course'));
    } finally {
        setPurchasing(false);
    }
    };

    const handleWatchClick = () => {
        if (!isPurchased) return;
        dispatch(setCurrentVideo(course.id));
    };

    const handleCloseVideo = () => {
        dispatch(setCurrentVideo(null));
    };

    return (
        <>
        <div className="course-card">
            <div className="course-image">
            🎥
            </div>
            <div className="course-content">
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <div className="course-footer">
                <span className="price">{course.price} ₴</span>
                <div className="course-actions">
                {isPurchased ? (
                    <button 
                    className="btn-primary" 
                    onClick={handleWatchClick}
                    >
                    Watch
                    </button>
                ) : (
                    <button 
                    className={`btn-primary ${purchasing ? 'loading' : ''}`}
                    onClick={handlePurchaseClick}
                    disabled={purchasing}
                    >
                    {purchasing ? 'Processing...' : 'Buy'}
                    </button>
                )}
                </div>
            </div>
            </div>
        </div>
        
        {isVideoPlaying && (
            <VideoModal
            videoUrl={course.videoUrl}
            title={course.title}
            onClose={handleCloseVideo}
            />
        )}
        </>
    );
};

export default CourseCard;
