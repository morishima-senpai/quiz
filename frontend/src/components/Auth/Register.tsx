import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/api';
import Button from '../Common/Button';

interface RegisterProps {
    registerCallBackOnSuccess: (state_passed : boolean) => void;
}

const Register: React.FC<RegisterProps> = ({registerCallBackOnSuccess}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setIsLoading(true);

        try {
            await authService.register({ username, password });
            // redirect to login after successful registration
            navigate('/auth?login=true', { state: { message: 'Registration successful! Please login.' } });
            registerCallBackOnSuccess(true);
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
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

            <div>
                <label 
                    htmlFor="confirmPassword" 
                    className="block text-sm font-medium text-gray-700"
                >
                    Confirm Password
                </label>
                <input
                    id="confirmPassword"
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <Button
                type="submit"
                disabled={isLoading}
                className="w-full"
            >
                {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
        </form>
    );
};

export default Register;
