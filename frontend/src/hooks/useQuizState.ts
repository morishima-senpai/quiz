import { useState, useCallback } from 'react';
import { quizService } from '../services/api';
import { useToast } from '../contexts/ToastContext';
import {
    QuizSessionResponse,
    AnswerSubmitResponse
} from '../types';

interface QuizState {
    session: QuizSessionResponse | null;
    summary: AnswerSubmitResponse | null;
    loading: boolean;
    error: string | null;
}

export const useQuizState = () => {
    const [state, setState] = useState<QuizState>({
        session: null,
        summary: null,
        loading: true,
        error: null
    });
    
    const { showToast } = useToast();

    const startNewQuizSession = useCallback(async () => {
        setState(prev => ({ ...prev, loading: true, error: null }));
        try {
            const response = await quizService.startSession();

            if(response.session_id){
                setState(prev => ({
                    ...prev,
                    session: {
                        session_id: response.session_id,
                        question: response.question,
                        is_correct: false,
                        session_complete: false
                    },
                    loading: false
                }));
            }else{
                setState(prev => ({
                    ...prev,
                    error: 'All questions have been attempted. No more question.',
                    loading: false
                }));
                showToast('You solved all questions', 'info');
            }
            
        } catch (err) {
            setState(prev => ({
                ...prev,
                error: 'Failed to start quiz session',
                loading: false
            }));
            showToast('Failed to start quiz session', 'error');
        }
    }, [showToast]);

    const submitAnswer = useCallback(async (optionId: string) => {
        if (!state.session) return;

        setState(prev => ({ ...prev, loading: true }));
        try {
            const response = await quizService.submitAnswer(
                state.session.session_id,
                state.session.question.id,
                optionId
            );

            if (response.session_complete) {
                setState(prev => ({
                    ...prev,
                    summary: response,
                    loading: false
                }));
                showToast('Quiz completed!', 'success');
            } else {
                setState(prev => ({
                    ...prev,
                    session: {
                        session_id: state.session!.session_id,
                        question: response.question!,
                        is_correct: response.is_correct,
                        session_complete: false,
                        error : null
                    },
                    loading: false
                }));
                showToast(
                    response.is_correct ? 'Correct answer!' : 'Incorrect answer',
                    response.is_correct ? 'success' : 'error'
                );
            }
        } catch (err) {
            setState(prev => ({
                ...prev,
                error: 'Failed to submit answer',
                loading: false
            }));
            showToast('Failed to submit answer', 'error');
        }
    }, [state.session, showToast]);

    const resetQuiz = useCallback(() => {
        setState({
            session: null,
            summary: null,
            loading: false,
            error: null
        });
    }, []);

    return {
        ...state,
        startNewQuizSession,
        submitAnswer,
        resetQuiz
    };
};

export default useQuizState;
