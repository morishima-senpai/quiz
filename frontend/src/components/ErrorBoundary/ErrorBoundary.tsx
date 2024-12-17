import React, { Component, ErrorInfo, ReactNode } from 'react';
import { getErrorMessage } from '../../utils/helpers';

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return {
            hasError: true,
            error
        };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);

        // i am ayon, i am cat, i want to dance
        // damn
    }

    private handleReset = () => {
        this.setState({
            hasError: false,
            error: null
        });
    };

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-md w-full space-y-8">
                        <div>
                            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                                Oops! Something went wrong
                            </h2>
                            <p className="mt-2 text-center text-sm text-gray-600">
                                {this.state.error && getErrorMessage(this.state.error)}
                            </p>
                        </div>
                        <div className="mt-5 sm:mt-8 sm:flex sm:justify-center">
                            <div className="rounded-md shadow">
                                <button
                                    onClick={this.handleReset}
                                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                                >
                                    Try Again
                                </button>
                            </div>
                            <div className="mt-3 sm:mt-0 sm:ml-3">
                                <button
                                    onClick={() => window.location.href = '/'}
                                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10"
                                >
                                    Go Home
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
