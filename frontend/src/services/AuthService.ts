import apiClient from '../api/axios';
import type { User } from '../types';

class AuthService {
    /**
     * Send OTP to email
     */
    async sendOTP(email: string): Promise<{ email: string; expiresIn: number }> {
        try {
            const response = await apiClient.post('/auth/send-otp', { email });
            return response.data;
        } catch (error: any) {
            console.error('Send OTP error:', error);
            throw error;
        }
    }

    /**
     * Verify OTP and login
     */
    async verifyOTP(email: string, otp: string): Promise<{ user: User; token: string }> {
        try {
            const response = await apiClient.post('/auth/verify-otp', { email, otp });

            // Store token in localStorage
            if (response.data.token) {
                localStorage.setItem('AUTH_TOKEN', response.data.token);
            }

            return response.data;
        } catch (error: any) {
            console.error('Verify OTP error:', error);
            throw error;
        }
    }

    /**
     * Logout current user
     */
    async logout(): Promise<void> {
        try {
            await apiClient.post('/auth/logout');

            // Clear token from localStorage
            localStorage.removeItem('AUTH_TOKEN');
            localStorage.removeItem('APDFE_SESSION');
        } catch (error: any) {
            console.error('Logout error:', error);
            // Clear token even if API call fails
            localStorage.removeItem('AUTH_TOKEN');
            localStorage.removeItem('APDFE_SESSION');
            throw error;
        }
    }

    /**
     * Get current authenticated user
     */
    async getCurrentUser(): Promise<User> {
        try {
            const response = await apiClient.get('/auth/me');
            return response.data;
        } catch (error: any) {
            console.error('Get current user error:', error);
            throw error;
        }
    }

    /**
     * Register new staff member (admin only)
     */
    async registerStaff(name: string, email: string, role: 'admin' | 'helper'): Promise<User> {
        try {
            const response = await apiClient.post('/auth/register-staff', {
                name,
                email,
                role,
            });
            return response.data;
        } catch (error: any) {
            console.error('Register staff error:', error);
            throw error;
        }
    }
}

// Export singleton instance
export default new AuthService();