import apiClient from '../api/axios';
import type { User, PaginatedResponse } from '../types';

class HelperService {
    /**
     * Get all helpers with pagination
     */
    async getAll(page: number = 1, limit: number = 10): Promise<PaginatedResponse<User>> {
        try {
            const response = await apiClient.get('/helpers', {
                params: { page, limit }
            });
            return response;
        } catch (error: any) {
            console.error('Get all helpers error:', error);
            throw error;
        }
    }

    /**
     * Get helper by ID
     */
    async getById(id: string): Promise<User> {
        try {
            const response = await apiClient.get(`/helpers/${id}`);
            return response.data;
        } catch (error: any) {
            console.error('Get helper by ID error:', error);
            throw error;
        }
    }

    /**
     * Create new helper
     */
    async create(data: { name: string; email: string; isValidated?: boolean }): Promise<User> {
        try {
            const response = await apiClient.post('/helpers', data);
            return response;
        } catch (error: any) {
            console.error('Create helper error:', error);
            throw error;
        }
    }

    /**
     * Update helper
     */
    async update(id: string, data: Partial<User>): Promise<User> {
        try {
            const response = await apiClient.put(`/helpers/${id}`, data);
            return response;
        } catch (error: any) {
            console.error('Update helper error:', error);
            throw error;
        }
    }

    /**
     * Delete helper
     */
    async delete(id: string): Promise<void> {
        try {
            await apiClient.delete(`/helpers/${id}`);
        } catch (error: any) {
            console.error('Delete helper error:', error);
            throw error;
        }
    }
}

// Export singleton instance
export default new HelperService();
