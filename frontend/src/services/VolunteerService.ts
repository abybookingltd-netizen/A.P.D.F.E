import apiClient from '../api/axios';
import type { Volunteer, PaginatedResponse } from '../types';

class VolunteerService {
    /**
     * Get all volunteers with pagination
     */
    async getAll(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Volunteer>> {
        try {
            const response = await apiClient.get('/volunteers', {
                params: { page, limit }
            });
            return response as any;
        } catch (error: any) {
            console.error('Get all volunteers error:', error);
            throw error;
        }
    }

    /**
     * Register new volunteer
     */
    async create(data: Volunteer): Promise<Volunteer> {
        try {
            const response = await apiClient.post('/volunteers', data);
            return response.data;
        } catch (error: any) {
            console.error('Create volunteer error:', error);
            throw error;
        }
    }

    /**
     * Get volunteer by ID
     */
    async getById(id: string): Promise<Volunteer> {
        try {
            const response = await apiClient.get(`/volunteers/${id}`);
            return response.data;
        } catch (error: any) {
            console.error('Get volunteer by ID error:', error);
            throw error;
        }
    }

    /**
     * Update volunteer
     */
    async update(id: string, data: Partial<Volunteer>): Promise<Volunteer> {
        try {
            const response = await apiClient.put(`/volunteers/${id}`, data);
            return response.data;
        } catch (error: any) {
            console.error('Update volunteer error:', error);
            throw error;
        }
    }

    /**
     * Delete volunteer
     */
    async delete(id: string): Promise<void> {
        try {
            await apiClient.delete(`/volunteers/${id}`);
        } catch (error: any) {
            console.error('Delete volunteer error:', error);
            throw error;
        }
    }

    /**
     * Approve volunteer
     */
    async approve(id: string): Promise<Volunteer> {
        try {
            const response = await apiClient.patch(`/volunteers/${id}/approve`);
            return response.data;
        } catch (error: any) {
            console.error('Approve volunteer error:', error);
            throw error;
        }
    }
}

// Export singleton instance
export default new VolunteerService();
