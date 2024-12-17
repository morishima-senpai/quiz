// format percentage to display with appropriate decimal places
export const formatPercentage = (value: number): string => {
    return `${Math.round(value)}%`;
};

// format date to display in user's locale
export const formatDate = (date: string | Date): string => {
    return new Date(date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

// validate password strength
export const validatePassword = (password: string): {
    isValid: boolean;
    message: string;
} => {
    if (password.length < 8) {
        return {
            isValid: false,
            message: 'Password must be at least 8 characters long'
        };
    }

    if (!/[A-Z]/.test(password)) {
        return {
            isValid: false,
            message: 'Password must contain at least one uppercase letter'
        };
    }

    if (!/[a-z]/.test(password)) {
        return {
            isValid: false,
            message: 'Password must contain at least one lowercase letter'
        };
    }

    if (!/[0-9]/.test(password)) {
        return {
            isValid: false,
            message: 'Password must contain at least one number'
        };
    }

    return {
        isValid: true,
        message: 'Password is strong'
    };
};

// get difficulty color for badges
export const getDifficultyColor = (difficulty: string): string => {
    switch (difficulty.toLowerCase()) {
        case 'easy':
            return 'bg-green-100 text-green-800';
        case 'medium':
            return 'bg-yellow-100 text-yellow-800';
        case 'hard':
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

// handle API errors and return user-friendly messages
export const getErrorMessage = (error: any): string => {
    if (error.response) {
        // cerver responded with error
        const data = error.response.data;
        if (typeof data === 'string') {
            return data;
        }
        if (data.message) {
            return data.message;
        }
        if (data.detail) {
            return data.detail;
        }
        return 'An error occurred while processing your request';
    }
    
    if (error.request) {
        // request made but no response received
        return 'Unable to connect to the server. Please check your internet connection';
    }
    
    // rrror setting up the request
    return 'An unexpected error occurred';
};




// theme
export const THEME = {
    colors: {
        primary: '#3B82F6',
        secondary: '#6B7280',
        success: '#10B981',
        danger: '#EF4444',
        warning: '#F59E0B'
    },
    fonts: {
        primary: '"Inter", system-ui, -apple-system, sans-serif',
        mono: '"Roboto Mono", monospace'
    }
} as const;
