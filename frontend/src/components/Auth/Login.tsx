import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Button from '../Common/Button';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { login, fetchStats } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            await login({ username, password});
            navigate('/dashboard');
            await fetchStats();
        } catch (err) {
            setError('Invalid username or password');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
                    {error}
                </div>
            )}
            
            <div>
                <label 
                    htmlFor="username" 
                    className="block text-sm font-medium text-gray-700"
                >
                    Username
                </label>
                <input
                    id="username"
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <div>
                <label 
                    htmlFor="password" 
                    className="block text-sm font-medium text-gray-700"
                >
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <Button
                type="submit"
                disabled={isLoading}
                className="w-full"
            >
                {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
        </form>
    );
};

export default Login;
