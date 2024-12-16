import axios from '../utils/axiosConfig';
import {
    LoginCredentials,
    QuizSessionResponse,
    AnswerSubmitResponse
} from './types';

export const authService = {
    login: async (credentials: LoginCredentials) => {
        const response = await axios.post('/auth/login/', credentials);
        return response.data;
    },

    register: async (credentials: LoginCredentials) => {
        const response = await axios.post('/auth/signup/', credentials);
        return response.data;
    }
};

export const quizService = {
    startSession: async () => {
        const response = await axios.post<QuizSessionResponse>('/sessions/');
        return response.data;
    },

    submitAnswer: async (sessionId: string, questionId: string, optionId: string) => {
        const response = await axios.post<AnswerSubmitResponse>(
            `/sessions/${sessionId}/submit/`,
            { question_id: questionId, option_id: optionId }
        );
        return response.data;
    }
};