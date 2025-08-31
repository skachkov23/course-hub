import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './store';
import { setCurrentUser, toggleTheme } from './store/slices/appSlice';
import Header from './components/Header';
import AuthForm from './components/AuthForm';
import CourseList from './components/CourseList';
import './styles/global.css';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector((state: RootState) => state.app.currentUser);
  const isDarkTheme = useSelector((state: RootState) => state.app.isDarkTheme);


  useEffect(() => {
    const savedTheme = localStorage.getItem('isDarkTheme');
    if (savedTheme) {
        const isDark = JSON.parse(savedTheme);
        if (isDark) {
            dispatch(toggleTheme());
        }
    }

    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        try {
            const user = JSON.parse(savedUser);
            const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
            if (registeredUsers[user.email]) {
                dispatch(setCurrentUser(registeredUsers[user.email]));
            } else {
                localStorage.removeItem('currentUser');
            }
        } catch (err) {
            localStorage.removeItem('currentUser');
        }
    }
  }, [dispatch]);

  if (!currentUser) {
    return (
      <div className={`app ${isDarkTheme ? 'dark-theme' : ''}`}>
        <Header />
        <main className="main">
          <AuthForm />
        </main>
      </div>
    );
  }

  return (
    <div className={`app ${isDarkTheme ? 'dark-theme' : ''}`}>
      <Header />
      <main className="main">
        <div className="container">
          <CourseList />
        </div>
      </main>
    </div>
  );
};

export default App;
