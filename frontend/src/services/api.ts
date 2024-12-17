import axios from 'axios';
import environment from '../config/environment';
import { LoginCredentials, QuizSessionResponse, AnswerSubmitResponse } from '../types';

// axios instance with base configuration
const api = axios.create({
    baseURL: environment.apiUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});

// adds token to requests if available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('quiz_app_auth_token');
    if (token) {
        config.headers.Authorization = `Token ${token}`;
    }
    return config;
});


export const authService = {
    login: async (credentials: LoginCredentials) => {
        const response = await api.post('/auth/login/', credentials);
        return response.data;
    },

    register: async (credentials: LoginCredentials) => {
        const response = await api.post('/auth/signup/', credentials);
        return response.data;
    },

    getUserStats: async () => {
        const response = await api.get('/stats/');
        return response.data;
    }
    
};

export const quizService = {
    startSession: async () => {
        const response = await api.post<QuizSessionResponse>('/sessions/new_session/');
        return response.data;
    },

    submitAnswer: async (sessionId: string, questionId: string, optionId: string) => {
        const response = await api.post<AnswerSubmitResponse>(
            `/sessions/${sessionId}/submit_answer/`,
            { question_id: questionId, option_id: optionId }
        );
        return response.data;
    }
};

// error handling interceptor
api.interceptors.response.use(
    response => response,
    error => {
        if (!environment.isProduction) {
            console.error('API Error:', error);
        }

        if (error.response?.status === 401) {
            // Handle unauthorized access
            localStorage.removeItem('quiz_app_auth_token');
            window.location.href = '/auth';
        }
        return Promise.reject(error);
    }
);

export default api;
