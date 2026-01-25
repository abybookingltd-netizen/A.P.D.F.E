import apiClient from '../api/axios';
import type { NewsUpdate, PaginatedResponse } from '../types';

class NewsService {
    /**
     * Get all news with pagination
     */
    async getAll(page: number = 1, limit: number = 10): Promise<PaginatedResponse<NewsUpdate>> {
        try {
            const response = await apiClient.get('/news', {
                params: { page, limit }
            });
            return response as any;
        } catch (error: any) {
            console.error('Get all news error:', error);
            throw error;
        }
    }

    /**
     * Get news by ID
     */
    async getById(id: string): Promise<NewsUpdate> {
        try {
            const response = await apiClient.get(`/news/${id}`);
            return response.data;
        } catch (error: any) {
            console.error('Get news by ID error:', error);
            throw error;
        }
    }

    /**
     * Create new news
     */
    async create(data: NewsUpdate & { file?: File }): Promise<NewsUpdate> {
        try {
            let payload: any = data;

            if (data.file) {
                const formData = new FormData();
                formData.append('image', data.file);
                Object.keys(data).forEach(key => {
                    if (key !== 'file') {
                        formData.append(key, (data as any)[key]);
                    }
                });
                payload = formData;
            }

            const response = await apiClient.post('/news', payload, {
                headers: {
                    'Content-Type': data.file ? 'multipart/form-data' : 'application/json'
                }
            });
            return response.data;
        } catch (error: any) {
            console.error('Create news error:', error);
            throw error;
        }
    }

    /**
     * Update news
     */
    async update(id: string, data: Partial<NewsUpdate> & { file?: File }): Promise<NewsUpdate> {
        try {
            let payload: any = data;

            if (data.file) {
                const formData = new FormData();
                formData.append('image', data.file);
                Object.keys(data).forEach(key => {
                    if (key !== 'file') {
                        formData.append(key, (data as any)[key]);
                    }
                });
                payload = formData;
            }

            const response = await apiClient.put(`/news/${id}`, payload, {
                headers: {
                    'Content-Type': data.file ? 'multipart/form-data' : 'application/json'
                }
            });
            return response.data;
        } catch (error: any) {
            console.error('Update news error:', error);
            throw error;
        }
    }

    /**
     * Delete news
     */
    async delete(id: string): Promise<void> {
        try {
            await apiClient.delete(`/news/${id}`);
        } catch (error: any) {
            console.error('Delete news error:', error);
            throw error;
        }
    }
}

// Export singleton instance
export default new NewsService();
