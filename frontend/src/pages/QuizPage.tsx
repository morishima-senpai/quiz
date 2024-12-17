import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '../components/Common/Container';
import Button from '../components/Common/Button';
import QuizSession from '../components/Quiz/QuizSession';

const QuizPage: React.FC = () => {
    const navigate = useNavigate();

    const handleBackToDashboard = () => {
        navigate('/dashboard');
    };

    return (
        <Container>
            <div className="min-h-screen py-12">
                <div className="max-w-3xl mx-auto">
                    <div className="mb-6 flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-900">
                            Quiz Session
                        </h1>
                        <Button
                            variant="secondary"
                            onClick={handleBackToDashboard}
                        >
                            Back to Dashboard
                        </Button>
                    </div>

                    <div className="bg-white shadow rounded-lg p-6">
                        <QuizSession />
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default QuizPage;
