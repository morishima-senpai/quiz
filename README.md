# Interactive Quiz Application Assignment

A full-stack web application for creating and taking quizzes, built with Django REST Framework and React TypeScript.

### [Depoyed: https://quiz-verrel.vercel.app](https://quiz-verrel.vercel.app/)
### [Backend: https://itscweb.pythonanywhere.com](https://itscweb.pythonanywhere.com/)

## Demo Video
https://github.com/user-attachments/assets/7050d381-49ac-4dae-a201-b2687e1bd6dc



## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Backend Architecture](#backend-architecture)
- [Frontend Architecture](#frontend-architecture)
- [Installation](#installation)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)

## Overview

This application provides an interactive platform for users to take quizzes, track their progress, and view their performance history. The system is built with a Django backend serving a REST API and a React TypeScript frontend providing a modern, responsive user interface.

## Features

- User authentication and authorization
- Interactive quiz sessions
- Multiple choice questions with varying difficulty levels
- Real-time scoring and progress tracking
- Performance history and analytics
- Responsive design for all devices
- Error boundary protection
- Lazy loading for optimal performance

## Backend Architecture

### Technology Stack
- Django
- Django REST Framework
- SQLite Database
- Token Authentication
- CORS support

### Core Components

#### Models

1. **Question**
```python
class Question(models.Model):
    id = models.UUIDField(primary_key=True)
    text = models.TextField()
    difficulty = models.CharField(choices=['easy', 'medium', 'hard'])
```
- Represents quiz questions
- Uses UUID for secure identification
- Supports different difficulty levels

2. **QuestionOption**
```python
class QuestionOption(models.Model):
    question = models.ForeignKey(Question)
    text = models.CharField(max_length=255)
    is_correct = models.BooleanField()
```
- Represents multiple choice options
- Links to parent question
- Tracks correct answers

3. **QuizSession**
```python
class QuizSession(models.Model):
    user = models.ForeignKey(User)
    started_at = models.DateTimeField()
    total_questions = models.IntegerField()
    correct_answers = models.IntegerField()
```
- Tracks individual quiz attempts
- Calculates score percentage
- Links to user profile

### Security Features
- Token-based authentication
- CSRF protection
- Secure password validation
- Cross-Origin Resource Sharing (CORS) configuration

### Configuration
```python
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
    ),
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.IsAuthenticated',
    )
}
```

## Frontend Architecture

### Technology Stack
- React 18
- TypeScript
- React Router v6
- Tailwind CSS
- Context API for state management

### Key Components

#### Authentication
```typescript
const AuthProvider: React.FC = ({ children }) => {
    // handles user authentication state
    // provides login/logout functionality
    // manages authentication tokens
}
```

#### Routing Structure
```typescript
<Routes>
    <Route path="/auth" element={<AuthPage />} />
    <Route path="/dashboard" element={<DashboardPage />} />
    <Route path="/quiz" element={<QuizPage />} />
    <Route path="/attempts" element={<AttemptPage />} />
</Routes>
```

### Performance Optimizations
1. **Code Splitting**
```typescript
const AuthPage = React.lazy(() => import('./pages/AuthPage'));
const DashboardPage = React.lazy(() => import('./pages/DashboardPage'));
```

2. **Error Boundary**
```typescript
<ErrorBoundary>
    <ToastProvider>
        <AuthProvider>
            <Router>
                <AppRoutes />
            </Router>
        </AuthProvider>
    </ToastProvider>
</ErrorBoundary>
```

### State Management
- Context API for global state
- Custom hooks for quiz state management
- Toast notifications system

## Installation

### Backend Setup
1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # on windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
cd backend
pip install -r requirements.txt
```

3. Run migrations:
```bash
python manage.py migrate
```

4. Create superuser:
```bash
python manage.py createsuperuser
```

5. Start the server:
```bash
python manage.py runserver
```

### Frontend Setup
1. Install dependencies:
```bash
cd frontend
npm install
```

2. Start the development server:
```bash
npm start
```

## Usage

1. Access the application at `http://localhost:3000`
2. Register a new account or login
3. Navigate to the dashboard to start a quiz
4. Answer questions and submit responses
5. View your results and performance history

## API Documentation

### Authentication Endpoints
- POST `/api/auth/login/`: User login
- POST `/api/auth/register/`: User registration
- POST `/api/auth/logout/`: User logout

### Quiz Endpoints
- POST `/api/sessions/new_session/`: Start new quiz session
- POST `/api/sessions/<session_id>/submit_answer/`: Answer questions and gets a new one
- POST `/api/sessions/<session_id>/skip_and_finish/`: Skips the quiz and shows retuns the result of the session
- GET `/api/stats/`: Get user's statistics

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---

For more information or support, please open an issue in the repository.
