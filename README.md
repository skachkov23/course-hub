# 📚 CourseHub
A modern React-based online learning platform where users can browse, purchase, and watch educational courses. Built with TypeScript, Redux Toolkit, and features a clean, responsive design with dark theme support.
- Click here to see [Preview](https://skachkov23.github.io/course-hub/)

## ✨ Features

### 🔐 Authentication System
- **User Registration & Login**: Secure sign-up and sign-in functionality
- **Persistent Sessions**: User data saved in localStorage
- **Form Validation**: Email format and password strength validation
- **User Profiles**: Name, email, and balance management

### 👤 User Management
- **Balance System**: Users start with 0₴ balance
- **Top-up Functionality**: Add funds to purchase courses
- **Purchase History**: Track bought courses across sessions
- **Profile Information**: Display user name and current balance

### 📋 Course Management
- **Course Catalog**: Browse available courses with descriptions and pricing
- **Video Streaming**: Watch purchased courses with built-in video player
- **Purchase System**: Buy courses using account balance
- **Course Protection**: Only purchased courses are accessible

### 🛠️ Admin Features
- **Admin Access**: Special privileges for admin@admin.com
- **Course CRUD**: Create, read, update, and delete courses
- **Dynamic Pricing**: Set custom prices for new courses
- **Content Management**: Add video URLs and descriptions

### 🎨 User Experience
- **Dark/Light Theme**: Toggle between themes with persistent preference
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Loading States**: Smooth loading animations and feedback
- **Error Handling**: User-friendly error messages and validation

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd coursehub
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── AdminPanel.tsx   # Admin course management
│   ├── AuthForm.tsx     # Login/Register form
│   ├── BalancePanel.tsx # Balance management
│   ├── CourseCard.tsx   # Individual course display
│   ├── CourseList.tsx   # Course catalog
│   ├── Header.tsx       # Navigation header
│   └── VideoModal.tsx   # Video player modal
├── store/              # Redux store configuration
│   ├── slices/
│   │   └── appSlice.ts # Main application state
│   └── index.ts        # Store setup
├── styles/
│   └── global.css      # Global styles and themes
├── types/
│   └── index.ts        # TypeScript interfaces
├── utils/
│   ├── api.ts          # Mock API functions
│   └── validation.ts   # Form validation utilities
├── App.tsx             # Main application component
└── index.tsx           # Application entry point
```

## 💡 Usage Guide

### For Regular Users

1. **Sign Up**: Create an account with name, email, and secure password
2. **Add Funds**: Use the "Top Up Balance" feature to add money to your account
3. **Browse Courses**: View available courses with descriptions and prices
4. **Purchase Courses**: Buy courses using your account balance
5. **Watch Content**: Access your purchased courses anytime
6. **Theme Toggle**: Switch between light and dark themes using the theme button

### For Administrators

1. **Admin Login**: Use `admin@admin.com` as email to get admin privileges
2. **Access Admin Panel**: Admin panel appears below the balance section
3. **Add Courses**: Click "Add New Course" and fill in the details
4. **Edit Courses**: Click "Edit" next to any course to modify it
5. **Delete Courses**: Remove courses with the "Delete" button (confirmation required)
6. **Manage Content**: Add video URLs, set prices, and write descriptions

## 🔧 Technical Details

### Built With
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe JavaScript
- **Redux Toolkit** - State management
- **CSS3** - Modern styling with flexbox/grid
- **localStorage** - Client-side data persistence

### Key Technologies
- **React Hooks**: useState, useEffect, useSelector, useDispatch
- **Redux Slices**: Simplified Redux state management
- **CSS Variables**: Dynamic theming support
- **Responsive Design**: Mobile-first approach
- **Form Validation**: Custom validation utilities

### Data Storage
- **User Data**: Stored in `registeredUsers` localStorage key
- **Current Session**: Active user in `currentUser` localStorage key
- **Purchases**: User purchases tracked in `userPurchases` localStorage key
- **Admin Courses**: Custom courses in `adminCourses` localStorage key
- **Theme Preference**: Theme choice in `isDarkTheme` localStorage key

## 🎨 Themes

The application supports two themes:

### Light Theme
- Clean white backgrounds
- Blue gradient accents (#667eea to #764ba2)
- Dark text for readability
- Subtle shadows and borders

### Dark Theme
- Dark blue backgrounds (#2c3e50 to #34495e)
- Reduced contrast for eye comfort
- Light text on dark surfaces
- Smooth theme transitions

## 📱 Responsive Design

- **Desktop**: Full feature set with optimal layout
- **Tablet**: Adapted grid layouts and navigation
- **Mobile**: Single-column layout, touch-friendly buttons
- **Breakpoints**: 768px and 480px for different screen sizes

## 🔐 Security Features

- **Password Validation**: Enforces strong password requirements
- **Email Validation**: Proper email format checking
- **Session Management**: Secure localStorage usage
- **Purchase Validation**: Balance checking before transactions
- **Admin Protection**: Role-based access control

## 🚦 Current Limitations

- **Mock Data**: Uses simulated API calls (no backend)
- **Payment System**: Simplified balance system (no real payments)
- **Video Storage**: External video URLs only
- **User Verification**: No email verification process
- **Admin Management**: Single hardcoded admin account

## 🔮 Future Enhancements

- **Backend Integration**: Connect to real API
- **Payment Gateway**: Integration with payment services
- **Video Upload**: Course creator video upload system
- **User Reviews**: Course rating and review system
- **Progress Tracking**: Course completion tracking
- **Certificates**: Course completion certificates
- **Social Features**: User profiles and course sharing

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Development

### Available Scripts
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run test suite
- `npm run eject` - Eject from Create React App

### Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request
