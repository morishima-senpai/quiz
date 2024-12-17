import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/Auth/AuthContext';
import Container from 'components/Common/Container';

import LoadingSpinner from '../components/Common/LoadingSpinner';
import Button from '../components/Common/Button';
import { Attempt } from '../types';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts';

const AttemptPage: React.FC = () => {
    const { user, fetchStats } = useAuth();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadStats = async () => {
            try {
                await fetchStats();
            } finally {
                setLoading(false);
            }
        };
        loadStats();
    }, []);

    if (loading) {
        return (
            <Container>
                <div className="flex justify-center items-center min-h-[60vh]">
                    <LoadingSpinner size="large" />
                </div>
            </Container>
        );
    }

    const attempts = user?.attempts || [];

    const getScoreColor = (score: number | null) => {
        if (score === null) return 'text-gray-500';
        if (score >= 80) return 'text-green-600';
        if (score >= 60) return 'text-yellow-600';
        return 'text-red-600';
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    function newFormatDate(dateString : string) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}/${month}, ${hours}:${minutes}`;
    }

    

    // prepare data for the graph
    const chartData = [...attempts]
        .reverse()
        .map((attempt, index) => ({
            name: `Attempt ${index + 1}`,
            score: attempt.score || 0,
            correct: attempt?.total_questions,
            date: newFormatDate(attempt.started_at)
        }));

    return (
        <Container>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4">
                        {/* <h1 className="text-2xl font-bold text-white">Quiz Performance Analytics</h1> */}
                        <p className="text-blue-100 mt-1">Track your progress and improvement over time</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-gray-50 border-b">
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h3 className="text-sm font-medium text-gray-500">Total Attempts</h3>
                            <p className="text-2xl font-bold text-gray-900">{attempts.length}</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h3 className="text-sm font-medium text-gray-500">Best Score</h3>
                            <p className="text-2xl font-bold text-green-600">
                                {user?.statistics.best_score || 0}%
                            </p>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                            <h3 className="text-sm font-medium text-gray-500">Average Score</h3>
                            <p className="text-2xl font-bold text-blue-600">
                                {user?.statistics.avg_score || 0}%
                            </p>
                        </div>
                    </div>

                    {attempts.length === 0 ? (
                        <div className="text-center py-12">
                            <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                />
                            </svg>
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No attempts yet</h3>
                            <p className="mt-1 text-sm text-gray-500">Get started by taking your first quiz!</p>
                            <div className="mt-6">
                                <Button onClick={() => navigate('/quiz')}>
                                    Take Quiz
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
                            {/* Attempts List */}
                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                    Recent Attempts
                                </h2>
                                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-4">
                                    {attempts.map((attempt: Attempt, index: number) => (

                                        ( attempt.score &&
                                            <div
                                                key={index}
                                                className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
                                            >
                                                <div className="p-4">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center space-x-3">
                                                            <div className="flex-shrink-0">
                                                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                                                    attempt.score ? 'bg-green-100' : 'bg-gray-100'
                                                                }`}>
                                                                    <span className={`text-[14px] pl-2 font-bold ${getScoreColor(attempt.score)}`}>
                                                                        {attempt.score ? `${attempt.score}%` : '-'}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-medium text-gray-900">
                                                                    Quiz Attempt #{attempts.length - index}
                                                                </p>
                                                                <p className="text-sm text-gray-500">
                                                                    {formatDate(attempt.started_at)}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <p className="text-sm font-medium text-gray-900">
                                                                {attempt.correct_answers} / {attempt.total_questions}
                                                            </p>
                                                            <p className="text-sm text-gray-500">
                                                                Correct Answers
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="mt-4">
                                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                                            <div
                                                                className={`h-2 rounded-full ${
                                                                    attempt.score && attempt.score >= 80
                                                                        ? 'bg-green-500'
                                                                        : attempt.score && attempt.score >= 60
                                                                        ? 'bg-yellow-500'
                                                                        : 'bg-red-500'
                                                                }`}
                                                                style={{
                                                                    width: `${(attempt.correct_answers / attempt.total_questions) * 100}%`
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    ))}
                                </div>
                            </div>

                            {/* performance graph */}
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                                    Performance Trend
                                </h2>
                                <div className="h-[500px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={chartData}>
                                            <Legend />
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis 
                                                dataKey="date" 
                                                angle={-45}
                                                textAnchor="end"
                                                height={60}
                                                fontSize={12}
                                            />
                                            <YAxis domain={[0, 100]} />
                                            <Tooltip />
                                            
                                            <Line
                                                type="monotone"
                                                dataKey="score"
                                                stroke="#10B981"
                                                strokeWidth={2}
                                                dot={{ r: 4 }}
                                                name="Score"
                                            />
                                            <Line
                                                type="step"
                                                dataKey="correct"
                                                stroke="#2563EB"
                                                strokeWidth={2}
                                                dot={{ r: 4 }}
                                                name="Questions"
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    )}

                    {attempts.length > 0 && (
                        <div className="bg-gray-50 px-6 py-4 border-t">
                            <Button
                                onClick={() => navigate('/quiz')}
                                className="w-full sm:w-auto"
                            >
                                Take Another Quiz
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </Container>
    );
};

export default AttemptPage;
