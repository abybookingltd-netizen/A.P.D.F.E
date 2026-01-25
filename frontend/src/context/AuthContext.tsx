import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types';
import AuthService from '../services/AuthService';

interface AuthContextType {
    currentUser: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    registerStaff: (name: string, email: string, role: 'admin' | 'helper', password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check for existing session on mount
    useEffect(() => {
        const session = localStorage.getItem('APDFE_SESSION');
        const token = localStorage.getItem('AUTH_TOKEN');

        if (session && token) {
            try {
                const user = JSON.parse(session);
                setCurrentUser(user);
            } catch (e) {
                localStorage.removeItem('APDFE_SESSION');
                localStorage.removeItem('AUTH_TOKEN');
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await AuthService.login(email, password);
            setCurrentUser(response.user);
            localStorage.setItem('APDFE_SESSION', JSON.stringify(response.user));
        } catch (error: any) {
            console.error('Login error:', error);
            throw new Error(error.message || 'Login failed');
        }
    };

    const logout = async () => {
        try {
            await AuthService.logout();
            setCurrentUser(null);
        } catch (error: any) {
            console.error('Logout error:', error);
            // Clear local state even if API call fails
            setCurrentUser(null);
        }
    };

    const registerStaff = async (name: string, email: string, role: 'admin' | 'helper', password: string) => {
        try {
            await AuthService.registerStaff(name, email, role, password);
        } catch (error: any) {
            console.error('Register staff error:', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                isAuthenticated: !!currentUser,
                isLoading,
                login,
                logout,
                registerStaff,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
