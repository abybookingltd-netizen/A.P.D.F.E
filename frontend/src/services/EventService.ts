import apiClient from '../api/axios';
import type { AppEvent, PaginatedResponse } from '../types';

class EventService {
    /**
     * Get all events with pagination
     */
    async getAll(page: number = 1, limit: number = 10): Promise<PaginatedResponse<AppEvent>> {
        try {
            const response = await apiClient.get('/events', {
                params: { page, limit }
            });
            return response as any;
        } catch (error: any) {
            console.error('Get all events error:', error);
            throw error;
        }
    }

    /**
     * Get event by ID
     */
    async getById(id: string): Promise<AppEvent> {
        try {
            const response = await apiClient.get(`/events/${id}`);
            return response.data;
        } catch (error: any) {
            console.error('Get event by ID error:', error);
            throw error;
        }
    }

    /**
     * Create new event
     */
    async create(data: AppEvent): Promise<AppEvent> {
        try {
            const response = await apiClient.post('/events', data);
            return response.data;
        } catch (error: any) {
            console.error('Create event error:', error);
            throw error;
        }
    }

    /**
     * Update event
     */
    async update(id: string, data: Partial<AppEvent>): Promise<AppEvent> {
        try {
            const response = await apiClient.put(`/events/${id}`, data);
            return response.data;
        } catch (error: any) {
            console.error('Update event error:', error);
            throw error;
        }
    }

    /**
     * Delete event
     */
    async delete(id: string): Promise<void> {
        try {
            await apiClient.delete(`/events/${id}`);
        } catch (error: any) {
            console.error('Delete event error:', error);
            throw error;
        }
    }
}

// Export singleton instance
export default new EventService();
