import apiClient from '../api/axios';
import type { Project, PaginatedResponse } from '../types';

class ProjectService {
    /**
     * Get all projects with pagination
     */
    async getAll(page: number = 1, limit: number = 10): Promise<PaginatedResponse<Project>> {
        try {
            const response = await apiClient.get('/projects', {
                params: { page, limit }
            });
            return response as any;
        } catch (error: any) {
            console.error('Get all projects error:', error);
            throw error;
        }
    }

    /**
     * Get project by ID
     */
    async getById(id: string): Promise<Project> {
        try {
            const response = await apiClient.get(`/projects/${id}`);
            return response.data;
        } catch (error: any) {
            console.error('Get project by ID error:', error);
            throw error;
        }
    }

    /**
     * Create new project
     */
    async create(data: Project): Promise<Project> {
        try {
            const response = await apiClient.post('/projects', data);
            return response.data;
        } catch (error: any) {
            console.error('Create project error:', error);
            throw error;
        }
    }

    /**
     * Update project
     */
    async update(id: string, data: Partial<Project>): Promise<Project> {
        try {
            const response = await apiClient.put(`/projects/${id}`, data);
            return response.data;
        } catch (error: any) {
            console.error('Update project error:', error);
            throw error;
        }
    }

    /**
     * Delete project
     */
    async delete(id: string): Promise<void> {
        try {
            await apiClient.delete(`/projects/${id}`);
        } catch (error: any) {
            console.error('Delete project error:', error);
            throw error;
        }
    }
}

// Export singleton instance
export default new ProjectService();
