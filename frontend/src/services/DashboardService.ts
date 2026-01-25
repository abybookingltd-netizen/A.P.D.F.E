import apiClient from '../api/axios';

interface DashboardAggregates {
    totalRevenue: number;
    totalExpenses: number;
    activeBeneficiaries: string;
    volunteerCount: number;
    projectCount: number;
    revenueHistory: { month: string; amount: number }[];
}

class DashboardService {
    /**
     * Get dashboard aggregates
     */
    async getAggregates(): Promise<DashboardAggregates> {
        try {
            const response = await apiClient.get('/dashboard/aggregates');
            return response.data;
        } catch (error: any) {
            console.error('Get dashboard aggregates error:', error);
            throw error;
        }
    }
}

// Export singleton instance
export default new DashboardService();
