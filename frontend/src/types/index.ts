export interface UserStatistics {
    total_quiz_sessions: number;
    best_score: number;
    avg_score: number;
}

export interface Attempt {
    started_at: string;
    total_questions: number;
    correct_answers: number;
    score: number | null;
}

export interface User {
    id: string;
    username: string;
    statistics: UserStatistics;
    attempts : Attempt[];
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => Promise<void>;
    fetchStats: () => Promise<void>;
}


export interface QuestionOption {
    id: string;
    text: string;
}

export interface Question {
    id: string;
    text: string;
    difficulty: 'easy' | 'medium' | 'hard';
    options: QuestionOption[];
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
    question?: Question;
    total_questions?: number;
    correct_answers?: number;
    score_percentage?: number;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
    size?: 'small' | 'medium' | 'large';
}

export interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

export interface QuizQuestionProps {
    question: Question;
    onAnswerSelect: (optionId: string) => void;
}

export interface QuizSummaryProps {
    summary: AnswerSubmitResponse;
}
