import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/Auth/AuthContext';
import Container from '../components/Common/Container';
import Button from '../components/Common/Button';

const DashboardPage: React.FC = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    const handleStartQuiz = () => {
        navigate('/quiz');
    };

    const handleLogout = () => {
        logout();
        navigate('/auth');
    };

    return (
        <Container>
            <div className="min-h-screen py-12">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white shadow rounded-lg p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold text-gray-900">
                                Welcome, {(user && user.username) ? user.username: 'looner'}!
                            </h1>
                            <Button
                                variant="secondary"
                                onClick={handleLogout}
                            >
                                Logout
                            </Button>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-blue-50 p-6 rounded-lg">
                                <h2 className="text-xl font-semibold text-blue-900 mb-2">
                                    Ready for a Challenge?
                                </h2>
                                <p className="text-blue-700 mb-4">
                                    Test your knowledge with our interactive quizzes.
                                </p>
                                <Button
                                    onClick={handleStartQuiz}
                                    size="large"
                                >
                                    Start New Quiz
                                </Button>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-lg">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                                    Your Quiz Stats
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="bg-white p-4 rounded-md shadow">
                                        <p className="text-gray-500 text-sm">Total Quizzes</p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {(user && user.statistics && user.statistics.total_quiz_sessions ) ? user.statistics.total_quiz_sessions : '0'}
                                        </p>
                                    </div>
                                    <div className="bg-white p-4 rounded-md shadow">
                                        <p className="text-gray-500 text-sm">Average Score</p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {(user && user.statistics && user.statistics.avg_score ) ? user.statistics.avg_score : '0'}%
                                        </p>
                                    </div>
                                    <div className="bg-white p-4 rounded-md shadow">
                                        <p className="text-gray-500 text-sm">Best Score</p>
                                        <p className="text-2xl font-bold text-gray-900">
                                            {(user && user.statistics && user.statistics.best_score ) ? user.statistics.best_score : '0'}%
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default DashboardPage;
