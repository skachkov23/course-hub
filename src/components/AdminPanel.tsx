import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { addCourse, updateCourse, deleteCourse } from '../store/slices/appSlice';
import { Course } from '../types';

const AdminPanel: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const courses = useSelector((state: RootState) => state.app.courses);
    const isDarkTheme = useSelector((state: RootState) => state.app.isDarkTheme);
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        videoUrl: '',
        price: 0
    });

    const handleSubmit = () => {
        if (!formData.title || !formData.description || !formData.videoUrl || formData.price <= 0) {
            return;
        }

        const newCourse: Course = {
            id: editingCourse ? editingCourse.id : Date.now().toString(),
            ...formData
        };

        if (editingCourse) {
            dispatch(updateCourse(newCourse));
        } else {
            dispatch(addCourse(newCourse));
        }

        const savedCourses = localStorage.getItem('adminCourses');
        let adminCourses: Course[] = savedCourses ? JSON.parse(savedCourses) : [];
        
        if (editingCourse) {
            const index = adminCourses.findIndex(c => c.id === editingCourse.id);
            if (index !== -1) {
                adminCourses[index] = newCourse;
            } else {
                adminCourses.push(newCourse);
            }
        } else {
            adminCourses.push(newCourse);
        }
        
        localStorage.setItem('adminCourses', JSON.stringify(adminCourses));

        setFormData({ title: '', description: '', videoUrl: '', price: 0 });
        setShowAddForm(false);
        setEditingCourse(null);
    };

    const handleEdit = (course: Course) => {
        setEditingCourse(course);
        setFormData({
            title: course.title,
            description: course.description,
            videoUrl: course.videoUrl,
            price: course.price
        });
        setShowAddForm(true);
    };

    const handleDelete = (courseId: string) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            dispatch(deleteCourse(courseId));
            
            const savedCourses = localStorage.getItem('adminCourses');
            if (savedCourses) {
                const adminCourses: Course[] = JSON.parse(savedCourses);
                const filteredCourses = adminCourses.filter(c => c.id !== courseId);
                localStorage.setItem('adminCourses', JSON.stringify(filteredCourses));
            }
        }
    };

    const panelStyle = {
        background: isDarkTheme ? 'rgba(45, 55, 72, 0.95)' : 'rgba(255,255,255,0.95)',
        color: isDarkTheme ? 'white' : '#333',
        padding: '2rem',
        borderRadius: '12px',
        marginBottom: '2rem'
    };

    const inputStyle = {
        background: isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : 'white',
        color: isDarkTheme ? 'white' : '#333',
        border: isDarkTheme ? '2px solid rgba(255, 255, 255, 0.2)' : '2px solid #e1e5e9'
    };

    return (
        <div style={panelStyle}>
            <h2 style={{ marginBottom: '1rem' }}>Admin Panel</h2>
            
            <button 
                className="btn-primary" 
                onClick={() => setShowAddForm(!showAddForm)}
                style={{ marginBottom: '1rem' }}
            >
                {showAddForm ? 'Cancel' : 'Add New Course'}
            </button>

            {showAddForm && (
                <div style={{ 
                    marginBottom: '2rem', 
                    padding: '1rem', 
                    border: isDarkTheme ? '1px solid #4a5568' : '1px solid #e1e5e9', 
                    borderRadius: '8px' 
                }}>
                    <h3 style={{ marginBottom: '1rem' }}>
                        {editingCourse ? 'Edit Course' : 'Add New Course'}
                    </h3>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Course Title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            style={inputStyle}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            style={inputStyle}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="url"
                            placeholder="Video URL"
                            value={formData.videoUrl}
                            onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                            style={inputStyle}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="number"
                            placeholder="Price"
                            value={formData.price || ''}
                            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                            style={inputStyle}
                        />
                    </div>
                    <button className="btn-primary" onClick={handleSubmit}>
                        {editingCourse ? 'Update Course' : 'Add Course'}
                    </button>
                </div>
            )}

            <div>
                <h3 style={{ marginBottom: '1rem' }}>Existing Courses</h3>
                {courses.map((course) => (
                    <div key={course.id} style={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        padding: '0.5rem',
                        borderBottom: isDarkTheme ? '1px solid #4a5568' : '1px solid #e1e5e9'
                    }}>
                        <span>{course.title} - {course.price}₴</span>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button 
                                className="btn-secondary" 
                                onClick={() => handleEdit(course)}
                                style={{ padding: '0.25rem 0.5rem' }}
                            >
                                Edit
                            </button>
                            <button 
                                className="btn-secondary" 
                                onClick={() => handleDelete(course.id)}
                                style={{ 
                                    padding: '0.25rem 0.5rem',
                                    background: '#e74c3c',
                                    borderColor: '#e74c3c'
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPanel;
