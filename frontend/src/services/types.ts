export interface User {
    id: string;
    username: string;
}

export interface Question {
    id: string;
    text: string;
    difficulty: 'easy' | 'medium' | 'hard';
    options: QuestionOption[];
}

export interface QuestionOption {
    id: string;
    text: string;
}

export interface QuizSessionResponse {
    session_id: string;
    session_complete?: boolean;
    is_correct: boolean;
    question: Question;
}

export interface AnswerSubmitResponse {
    session_id: string;
    session_complete?: boolean;
    is_correct: boolean;
    question?: Question; //
    total_questions?: number;
    correct_answers?: number;
    score_percentage?: number;
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
}