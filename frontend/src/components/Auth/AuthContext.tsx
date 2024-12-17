import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../../services/api';
import { AuthContextType, LoginCredentials, User } from '../../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: React.ReactNode;
}


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('quiz_app_auth_token');
        if (storedToken) {
            setToken(storedToken);
            fetchStats();
        }
    }, []);

    const login = async (credentials: LoginCredentials) => {
        try {
            const response = await authService.login(credentials);
            localStorage.setItem('quiz_app_auth_token', response.token);
            setToken(response.token);
            if (response.token) {
                setUser(prevUser  => ({
                    ...prevUser,
                    username: credentials.username
                } as any));
            }
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const logout = async () => {
        await authService.logout();
        localStorage.removeItem('quiz_app_auth_token');
        setToken(null);
        setUser(null);
    };

    const fetchStats = async () => {
        try {
            const response = await authService.getUserStats();
            if (response.stats) {
                setUser(prevUser  => ({
                    ...prevUser,
                    statistics: response.stats,
                    attempts: response?.sessions
                } as any));

            }
        } catch (error) {
            console.error('User stat fetch failed:', error);
            throw error;
        }
    };

    const value: AuthContextType = {
        user,
        token,
        login,
        logout,
        fetchStats
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
