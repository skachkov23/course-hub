import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { setCurrentUser } from '../store/slices/appSlice';
import { validateEmail, validatePassword } from '../utils/validation';

const AuthForm: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<{ email?: string; password?: string; name?: string }>({});
    const dispatch = useDispatch<AppDispatch>();

    const validateForm = () => {
    const newErrors: { email?: string; password?: string; name?: string } = {};
    
    if (!validateEmail(email)) {
        newErrors.email = 'Please enter a valid email address';
    }
    
    if (!isLogin && !validatePassword(password)) {
        newErrors.password = 'The password must contain at least 6 characters, one uppercase letter, one lowercase letter, and one special character.';
    }
    
    if (isLogin && password.trim().length === 0) {
        newErrors.password = 'Password is required';
    }
    
    if (!isLogin && name.trim().length < 2) {
        newErrors.name = 'Name must be at least 2 characters long';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
    if (!validateForm()) return;

    let user;
    
    if (isLogin) {
        const savedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
        user = savedUsers[email];
        if (!user) {
            setErrors({ email: 'User with this email does not exist. Please sign up first.' });
            return;
        }
        if (user.password !== password) {
            setErrors({ password: 'Incorrect password. Please try again.' });
            return;
        }
    } else {
        const savedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
        if (savedUsers[email]) {
            setErrors({ email: 'User with this email already exists. Please log in instead.' });
            return;
        }
        
        user = { 
            email, 
            password, 
            name: name,
            balance: 0,
            isAdmin: email === 'admin@admin.com'
        };
        savedUsers[email] = user;
        localStorage.setItem('registeredUsers', JSON.stringify(savedUsers));
    }
    
    localStorage.setItem('currentUser', JSON.stringify(user));
    dispatch(setCurrentUser(user));
    setEmail('');
    setPassword('');
    setName('');
    setErrors({});
    };

    return (
        <div className="auth-form">
        <div className="auth-card">
            <h2>{isLogin ? 'Log in' : 'Sign up'}</h2>
            <div onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            {!isLogin && (
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={errors.name ? 'error' : ''}
                    />
                    {errors.name && <span className="error-message">{errors.name}</span>}
                </div>
            )}
            <div className="form-group">
                <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={errors.password ? 'error' : ''}
                />
                {errors.password && <span className="error-message">{errors.password}</span>}
            </div>
            
            <button type="button" onClick={handleSubmit} className="btn-primary">
                {isLogin ? 'Log In' : 'Sign up'}
            </button>
            </div>
            
            <p>
            {isLogin ? 'No account yet?' : 'Already have an account?'}
            <button 
                type="button" 
                className="link-btn"
                onClick={() => setIsLogin(!isLogin)}
            >
                {isLogin ? 'Sign up' : 'Log In'}
            </button>
            </p>
        </div>
        </div>
    );
};

export default AuthForm;
