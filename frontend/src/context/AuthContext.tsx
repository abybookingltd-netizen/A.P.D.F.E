import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User } from '../types';
import AuthService from '../services/AuthService';

interface AuthContextType {
    currentUser: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    sendOTP: (email: string) => Promise<{ email: string; expiresIn: number }>;
    verifyOTP: (email: string, otp: string) => Promise<void>;
    logout: () => Promise<void>;
    registerStaff: (name: string, email: string, role: 'admin' | 'helper') => Promise<void>;
    updateProfile: (data: Partial<User> & { file?: File }) => Promise<void>;
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

    const sendOTP = async (email: string) => {
        try {
            const response = await AuthService.sendOTP(email);
            return response;
        } catch (error: any) {
            console.error('Send OTP error:', error);
            throw new Error(error.response?.data?.message || error.message || 'Failed to send OTP');
        }
    };

    const verifyOTP = async (email: string, otp: string) => {
        try {
            const response = await AuthService.verifyOTP(email, otp);
            setCurrentUser(response.user);
            localStorage.setItem('APDFE_SESSION', JSON.stringify(response.user));
        } catch (error: any) {
            console.error('Verify OTP error:', error);
            throw new Error(error.response?.data?.message || 'OTP verification failed');
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

    const registerStaff = async (name: string, email: string, role: 'admin' | 'helper') => {
        try {
            await AuthService.registerStaff(name, email, role);
        } catch (error: any) {
            console.error('Register staff error:', error);
            throw new Error(error.response?.data?.message || 'Failed to register staff');
        }
    };

    const updateProfile = async (data: Partial<User> & { file?: File }) => {
        try {
            // Import dynamically to avoid circular dependencies if any, though here it might be fine directly.
            // Using direct import since UserService is a singleton instance.
            const UserService = (await import('../services/UserService')).default;
            const updatedUser = await UserService.updateProfile(data);

            // Merge with existing user data to ensure we don't lose fields not returned
            setCurrentUser(prev => {
                if (!prev) return updatedUser;
                const newUser = { ...prev, ...updatedUser };
                localStorage.setItem('APDFE_SESSION', JSON.stringify(newUser));
                return newUser;
            });

        } catch (error: any) {
            console.error('Update profile error:', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                isAuthenticated: !!currentUser,
                isLoading,
                sendOTP,
                verifyOTP,
                logout,
                registerStaff,
                updateProfile
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