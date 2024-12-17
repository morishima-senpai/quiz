import { useState, useCallback } from 'react';
import { quizService } from '../services/api';
import { 
    QuizSessionResponse, 
    AnswerSubmitResponse, 
    Question 
} from '../types';

interface QuizState {
    sessionId: string | null;
    currentQuestion: Question | null;
    isLoading: boolean;
    error: string | null;
    summary: AnswerSubmitResponse | null;
}

export const useQuiz = () => {
    const [state, setState] = useState<QuizState>({
        sessionId: null,
        currentQuestion: null,
        isLoading: false,
        error: null,
        summary: null
    });

    const startQuiz = useCallback(async () => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            const response = await quizService.startSession();
            setState(prev => ({
                ...prev,
                sessionId: response.session_id,
                currentQuestion: response.question,
                isLoading: false
            }));
        } catch (error) {
            setState(prev => ({
                ...prev,
                error: 'Failed to start quiz session',
                isLoading: false
            }));
        }
    }, []);

    const submitAnswer = useCallback(async (optionId: string) => {
        if (!state.sessionId || !state.currentQuestion) {
            return;
        }

        setState(prev => ({ ...prev, isLoading: true, error: null }));
        try {
            const response = await quizService.submitAnswer(
                state.sessionId,
                state.currentQuestion.id,
                optionId
            );

            if (response.session_complete) {
                setState(prev => ({
                    ...prev,
                    summary: response,
                    isLoading: false
                }));
            } else {
                setState(prev => ({
                    ...prev,
                    currentQuestion: response.question!,
                    isLoading: false
                }));
            }
        } catch (error) {
            setState(prev => ({
                ...prev,
                error: 'Failed to submit answer',
                isLoading: false
            }));
        }
    }, [state.sessionId, state.currentQuestion]);

    const resetQuiz = useCallback(() => {
        setState({
            sessionId: null,
            currentQuestion: null,
            isLoading: false,
            error: null,
            summary: null
        });
    }, []);

    return {
        ...state,
        startQuiz,
        submitAnswer,
        resetQuiz
    };
};

export default useQuiz;
