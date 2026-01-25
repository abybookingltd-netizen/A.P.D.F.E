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
}

// Export singleton instance
export default new VolunteerService();
