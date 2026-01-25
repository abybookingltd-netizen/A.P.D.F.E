import { GalleryItem } from '../models/index.js';

// Get all gallery items
export const getAllGalleryItems = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { count, rows } = await GalleryItem.findAndCountAll({
            order: [['createdAt', 'DESC']],
            limit,
            offset
        });

        res.json({
            success: true,
            data: rows,
            total: count,
            page,
            totalPages: Math.ceil(count / limit)
        });
    } catch (error) {
        console.error('Get all gallery items error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Get gallery item by ID
export const getGalleryItemById = async (req, res) => {
    try {
        const item = await GalleryItem.findByPk(req.params.id);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Gallery item not found'
            });
        }

        res.json({
            success: true,
            data: item
        });
    } catch (error) {
        console.error('Get gallery item by ID error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Create gallery item
export const createGalleryItem = async (req, res) => {
    try {
        const itemData = req.body;
        let imgPath = itemData.img;

        if (req.file) {
            imgPath = `/uploads/${req.file.filename}`;
        }

        const item = await GalleryItem.create({
            ...itemData,
            img: imgPath,
            id: itemData.id || `gallery-${Date.now()}`
        });

        res.status(201).json({
            success: true,
            message: 'Gallery item created successfully',
            data: item
        });
    } catch (error) {
        console.error('Create gallery item error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Update gallery item
export const updateGalleryItem = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const item = await GalleryItem.findByPk(id);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Gallery item not found'
            });
        }

        if (req.file) {
            updates.img = `/uploads/${req.file.filename}`;
        }

        await item.update(updates);

        res.json({
            success: true,
            message: 'Gallery item updated successfully',
            data: item
        });
    } catch (error) {
        console.error('Update gallery item error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Delete gallery item
export const deleteGalleryItem = async (req, res) => {
    try {
        const { id } = req.params;

        const item = await GalleryItem.findByPk(id);

        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Gallery item not found'
            });
        }

        await item.destroy();

        res.json({
            success: true,
            message: 'Gallery item deleted successfully'
        });
    } catch (error) {
        console.error('Delete gallery item error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
