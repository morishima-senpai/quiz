import React from 'react';

interface LoadingSpinnerProps {
    size?: 'small' | 'medium' | 'large';
    className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
    size = 'medium',
    className = ''
}) => {
    const sizeClasses = {
        small: 'w-4 h-4',
        medium: 'w-8 h-8',
        large: 'w-12 h-12'
    };

    return (
        <div className={`flex justify-center items-center ${className}`}>
            <div
                className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-blue-200 border-t-blue-600`}
                role="status"
                aria-label="loading"
            >
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export const LoadingOverlay: React.FC = () => {
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
            <LoadingSpinner size="large" />
        </div>
    );
};

export default LoadingSpinner;
