import React, { useState, useEffect } from 'react';
import { quizService } from '../../services/api';
import {
    QuizSessionResponse, Question, AnswerSubmitResponse
} from '../../services/types';
import QuizQuestion from './QuizQuestion';
import QuizSummary from './QuizSummary';

const QuizSession: React.FC = () => {
    const [session, setSession] = useState<QuizSessionResponse | null>(null);
    const [summary, setSummary] = useState<AnswerSubmitResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {startNewQuizSession();}, []);

    const startNewQuizSession = async () => {
        try {
            setLoading(true);
            const response = await quizService.startSession();
            setSession(response);
            setLoading(false);
        } catch (err) {
            setError('Failed to start quiz session');
            setLoading(false);
        }
    };

    const handleAnswerSubmit = async (optionId: string) => {
        if (!session) return;

        try {
            const response = await quizService.submitAnswer(
                session.session_id,
                session.question.id,
                optionId
            );

            if (response.session_complete) {
                setSummary(response);
            } else {
                setSession({
                    session_id: session.session_id,
                    question: response.question!
                });
            }
        } catch (err) {
            setError('Failed to submit answer');
        }
    };

    if (loading) return <div>Loading quiz...</div>;
    if (error) return <div>Error: {error}</div>;
    if (summary) return <QuizSummary summary={summary} />;

    return (
        <div className="max-w-md mx-auto p-4">
            {session && (
                <QuizQuestion
                    question={session.question}
                    onAnswerSelect={handleAnswerSubmit}
                />
            )}
        </div>
    );
};

export default QuizSession;