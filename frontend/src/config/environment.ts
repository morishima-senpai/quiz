interface Environment {
    apiUrl: string;
    isDevelopment: boolean;
    isProduction: boolean;
}

const environment: Environment = {
    apiUrl: process.env.REACT_APP_API_URL || 'http://localhost:8000/api',
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production'
};

export default environment;
