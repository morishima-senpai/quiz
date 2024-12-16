import React from 'react';
import { AnswerSubmitResponse } from '../../services/types';

interface QuizSummaryProps {
    summary: AnswerSubmitResponse;
}

const QuizSummary: React.FC<QuizSummaryProps> = ({ summary }) => {
    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                    <p className="text-gray-600">Total Questions</p>
                    <p className="text-xl font-bold">{summary.total_questions}</p>
                </div>
                <div>
                    <p className="text-gray-600">Correct Answers</p>
                    <p className="text-xl font-bold">{summary.correct_answers}</p>
                </div>
            </div>

            <div className="mb-6">
                <p className="text-gray-600">Your Score</p>
                <p className="text-3xl font-bold text-green-600">
                    {summary.score_percentage?.toFixed(2)}%
                </p>
            </div>

            <button
                onClick={() => window.location.reload()}
                className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
            >
                Start New Quiz
            </button>
        </div>
    );
};

export default QuizSummary;