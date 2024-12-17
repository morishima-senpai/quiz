import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/Auth/AuthContext';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import Container from '../components/Common/Container';

const AuthPage: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();
    const { token, fetchStats } = useAuth();


    const changeIsLogin = (state_passed : boolean = true) => {
        setIsLogin(state_passed);
    }

    // redirect if already authenticated
    React.useEffect(() => {
        if (token) {
            navigate('/dashboard');
            fetchStats();
        }
    }, [token, navigate]);

    return (
        <Container>
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-800">
                            {isLogin ? 'Welcome Back!' : 'Create Account'}
                        </h1>
                        <p className="text-gray-600 mt-2">
                            {isLogin 
                                ? 'Sign in to access your quizzes' 
                                : 'Sign up to start taking quizzes'}
                        </p>
                    </div>

                    {isLogin ? <Login /> : <Register registerCallBackOnSuccess={changeIsLogin} />}

                    <div className="mt-6 text-center">
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                            {isLogin 
                                ? "Don't have an account? Sign up" 
                                : 'Already have an account? Sign in'}
                        </button>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default AuthPage;
