import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AnswerSubmitResponse } from '../../types/';
import Button from '../Common/Button';
import { useAuth } from 'components/Auth/AuthContext';


interface QuizSummaryProps {
    summary: AnswerSubmitResponse;
}


const QuizSummary: React.FC<QuizSummaryProps> = ({ summary }) => {
    const navigate = useNavigate();
    const { fetchStats } = useAuth();
    const handleBackToDashboard = () => {
        fetchStats();
        navigate('/dashboard');
    };

    const handleGoToAnalysis = () => {
        navigate('/attempts');
    };

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Quiz Complete!
                </h2>
                <p className="text-gray-600">
                    Here's how you did:
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-6 rounded-lg text-center">
                    <p className="text-sm text-blue-600 font-medium mb-1">
                        Total Questions
                    </p>
                    <p className="text-3xl font-bold text-blue-900">
                        {summary.total_questions}
                    </p>
                </div>

                <div className="bg-green-50 p-6 rounded-lg text-center">
                    <p className="text-sm text-green-600 font-medium mb-1">
                        Correct Answers
                    </p>
                    <p className="text-3xl font-bold text-green-900">
                        {summary.correct_answers}
                    </p>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg text-center">
                    <p className="text-sm text-purple-600 font-medium mb-1">
                        Score
                    </p>
                    <p className="text-3xl font-bold text-purple-900">
                        {summary.score_percentage}%
                    </p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Button
                    onClick={handleGoToAnalysis}
                    className="sm:w-auto"
                >
                    Analysis
                </Button>
                <Button
                    variant="secondary"
                    onClick={handleBackToDashboard}
                    className="sm:w-auto"
                >
                    Back to Dashboard
                </Button>
            </div>
        </div>
    );
};

export default QuizSummary;
