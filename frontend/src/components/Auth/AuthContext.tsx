import React, {
    createContext, useState, useContext, useEffect
} from 'react';
import { authService } from '../../services/api';
import {
    AuthContextType, LoginCredentials, User
} from '../../services/types';



const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('quiz_app_auth_token');
        if (storedToken) {
            setToken(storedToken);
            // TODO: Add endpoint to fetch user details
            // setUser(...)
        }
    }, []);

    const login = async (credentials: LoginCredentials) => {
        try {
            const response = await authService.login(credentials);
            localStorage.setItem('quiz_app_auth_token', response.token);
            setToken(response.token);
            // TODO: Set user details from response
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('quiz_app_auth_token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
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