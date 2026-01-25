import apiClient from '../api/axios';
import type { Donation, PaginatedResponse } from '../types';

class DonationService {
    /**
     * Get all donations with pagination
     */
    async getAll(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Donation>> {
        try {
            const response = await apiClient.get('/donations', {
                params: { page, limit }
            });
            return response as any;
        } catch (error: any) {
            console.error('Get all donations error:', error);
            throw error;
        }
    }

    /**
     * Create new donation
     */
    async create(data: Donation): Promise<Donation> {
        try {
            const response = await apiClient.post('/donations', data);
            return response.data;
        } catch (error: any) {
            console.error('Create donation error:', error);
            throw error;
        }
    }
}

// Export singleton instance
export default new DonationService();
