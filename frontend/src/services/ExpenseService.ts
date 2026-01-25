import apiClient from '../api/axios';
import type { Expense, PaginatedResponse } from '../types';

class ExpenseService {
    /**
     * Get all expenses with pagination
     */
    async getAll(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Expense>> {
        try {
            const response = await apiClient.get('/expenses', {
                params: { page, limit }
            });
            return response as any;
        } catch (error: any) {
            console.error('Get all expenses error:', error);
            throw error;
        }
    }

    /**
     * Create new expense
     */
    async create(data: Expense): Promise<Expense> {
        try {
            const response = await apiClient.post('/expenses', data);
            return response.data;
        } catch (error: any) {
            console.error('Create expense error:', error);
            throw error;
        }
    }
}

// Export singleton instance
export default new ExpenseService();
