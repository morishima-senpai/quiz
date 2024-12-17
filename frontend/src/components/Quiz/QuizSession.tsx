import React, { useEffect } from 'react';
import QuizQuestion from './QuizQuestion';
import QuizSummary from './QuizSummary';
import LoadingSpinner from '../Common/LoadingSpinner';
import Button from '../Common/Button';
import useQuizState from '../../hooks/useQuizState';

const QuizSession: React.FC = () => {
    const {
        session,
        summary,
        loading,
        error,
        startNewQuizSession,
        submitAnswer,
        resetQuiz,
        skipAndFinish
    } = useQuizState();

    useEffect(() => {
        startNewQuizSession();
        return () => resetQuiz();
    }, [startNewQuizSession, resetQuiz]);

    const handleStartNewQuiz = () => {
        resetQuiz();
        startNewQuizSession();
    };

    if (loading && !session && !summary) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <LoadingSpinner size="large" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                    <p className="text-red-600">{error}</p>
                </div>
                <Button
                    onClick={startNewQuizSession}
                    variant="primary"
                >
                    Try Again
                </Button>
            </div>
        );
    }

    if (summary) {
        return (
            <div>
                <QuizSummary summary={summary} />
                <div className="mt-6 text-center">
                    <Button onClick={handleStartNewQuiz}>
                        Start New Quiz
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-4">
            {session && (
                <>
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-xl font-semibold text-gray-900">
                                Question
                            </h2>
                            {loading && (
                                <div className="text-sm text-gray-500">
                                    Processing...
                                </div>
                            )}
                        </div>
                        <div className="h-1 w-full bg-gray-200 rounded">
                            <div
                                className="h-1 bg-blue-600 rounded transition-all duration-300"
                                style={{ width: loading ? '90%' : '100%' }}
                            />
                        </div>
                    </div>
                    <QuizQuestion
                        question={session.question}
                        onAnswerSelect={submitAnswer}
                        onSkipClicked={skipAndFinish}
                        disabled={loading}
                    />
                </>
            )}
        </div>
    );
};

export default QuizSession;
