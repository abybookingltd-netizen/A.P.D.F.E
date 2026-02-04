import apiClient from '../api/axios';
import type { User, PaginatedResponse } from '../types';

class UserService {
    /**
     * Get all users with pagination
     */
    async getAll(page: number = 1, limit: number = 10): Promise<PaginatedResponse<User>> {
        try {
            const response = await apiClient.get('/users', {
                params: { page, limit }
            });
            return response as any;
        } catch (error: any) {
            console.error('Get all users error:', error);
            throw error;
        }
    }

    /**
     * Get user by ID
     */
    async getById(id: string): Promise<User> {
        try {
            const response = await apiClient.get(`/users/${id}`);
            return response.data;
        } catch (error: any) {
            console.error('Get user by ID error:', error);
            throw error;
        }
    }

    /**
     * Update user
     */
    async update(id: string, data: Partial<User> & { file?: File }): Promise<User> {
        try {
            let payload: any = data;

            if (data.file) {
                const formData = new FormData();
                formData.append('profilePicture', data.file);
                Object.keys(data).forEach(key => {
                    if (key !== 'file' && key !== 'profilePicture') {
                        formData.append(key, (data as any)[key]);
                    }
                });
                payload = formData;
            }

            const response = await apiClient.put(`/users/${id}`, payload, {
                headers: {
                    'Content-Type': data.file ? 'multipart/form-data' : 'application/json'
                }
            });
            return response.data;
        } catch (error: any) {
            console.error('Update user error:', error);
            throw error;
        }
    }

    /**
     * Update current user profile
     */
    async updateProfile(data: Partial<User> & { file?: File }): Promise<User> {
        try {
            let payload: any = data;

            if (data.file) {
                const formData = new FormData();
                formData.append('profilePicture', data.file);
                Object.keys(data).forEach(key => {
                    if (key !== 'file' && key !== 'profilePicture') {
                        formData.append(key, (data as any)[key]);
                    }
                });
                payload = formData;
            }

            const response = await apiClient.put('/users/profile', payload, {
                headers: {
                    'Content-Type': data.file ? 'multipart/form-data' : 'application/json'
                }
            });
            return response.data;
        } catch (error: any) {
            console.error('Update profile error:', error);
            throw error;
        }
    }

    /**
     * Delete user
     */
    async delete(id: string): Promise<void> {
        try {
            await apiClient.delete(`/users/${id}`);
        } catch (error: any) {
            console.error('Delete user error:', error);
            throw error;
        }
    }
}

// Export singleton instance
export default new UserService();
