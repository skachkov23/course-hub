
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { setCurrentUser, toggleTheme } from '../store/slices/appSlice';

const Header: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const currentUser = useSelector((state: RootState) => state.app.currentUser);
    const isDarkTheme = useSelector((state: RootState) => state.app.isDarkTheme);

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        dispatch(setCurrentUser(null));
    };
    const handleThemeToggle = () => {
        dispatch(toggleTheme());
    };

    return (
        <header className="header">
        <div className="container">
            <h1 className="logo">📚 CourseHub</h1>
            <div className='switch-theme-exit'>
                {currentUser && (
                    <div className="user-info">
                        <span>Greetings, {currentUser.name || currentUser.email}</span>
                        <button onClick={handleLogout} className="btn-secondary">Exit</button>
                    </div>
                )}
                <button onClick={handleThemeToggle} className="btn-secondary">
                    {isDarkTheme ? '☀️' : '🌙'}
                </button>
            </div>
        </div>
        </header>
    );
};

export default Header;
