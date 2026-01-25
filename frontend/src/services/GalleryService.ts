import apiClient from '../api/axios';
import type { GalleryItem, PaginatedResponse } from '../types';

class GalleryService {
    /**
     * Get all gallery items with pagination
     */
    async getAll(page: number = 1, limit: number = 10): Promise<PaginatedResponse<GalleryItem>> {
        try {
            const response = await apiClient.get('/gallery', {
                params: { page, limit }
            });
            return response as any;
        } catch (error: any) {
            console.error('Get all gallery items error:', error);
            throw error;
        }
    }

    /**
     * Get gallery item by ID
     */
    async getById(id: string): Promise<GalleryItem> {
        try {
            const response = await apiClient.get(`/gallery/${id}`);
            return response.data;
        } catch (error: any) {
            console.error('Get gallery item by ID error:', error);
            throw error;
        }
    }

    /**
     * Create new gallery item
     */
    async create(data: GalleryItem & { file?: File }): Promise<GalleryItem> {
        try {
            let payload: any = data;

            if (data.file) {
                const formData = new FormData();
                formData.append('image', data.file);
                formData.append('title', data.title);
                formData.append('subtitle', data.subtitle);
                if (data.id) formData.append('id', data.id);
                payload = formData;
            }

            const response = await apiClient.post('/gallery', payload, {
                headers: {
                    'Content-Type': data.file ? 'multipart/form-data' : 'application/json'
                }
            });
            return response.data;
        } catch (error: any) {
            console.error('Create gallery item error:', error);
            throw error;
        }
    }

    /**
     * Update gallery item
     */
    async update(id: string, data: Partial<GalleryItem> & { file?: File }): Promise<GalleryItem> {
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

            const response = await apiClient.put(`/gallery/${id}`, payload, {
                headers: {
                    'Content-Type': data.file ? 'multipart/form-data' : 'application/json'
                }
            });
            return response.data;
        } catch (error: any) {
            console.error('Update gallery item error:', error);
            throw error;
        }
    }

    /**
     * Delete gallery item
     */
    async delete(id: string): Promise<void> {
        try {
            await apiClient.delete(`/gallery/${id}`);
        } catch (error: any) {
            console.error('Delete gallery item error:', error);
            throw error;
        }
    }
}

// Export singleton instance
export default new GalleryService();
