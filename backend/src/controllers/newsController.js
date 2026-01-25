import { NewsUpdate } from '../models/index.js';

// Get all news
export const getAllNews = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const { count, rows } = await NewsUpdate.findAndCountAll({
            order: [['date', 'DESC']],
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
        console.error('Get all news error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Get news by ID
export const getNewsById = async (req, res) => {
    try {
        const news = await NewsUpdate.findByPk(req.params.id);

        if (!news) {
            return res.status(404).json({
                success: false,
                message: 'News not found'
            });
        }

        res.json({
            success: true,
            data: news
        });
    } catch (error) {
        console.error('Get news by ID error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Create news
export const createNews = async (req, res) => {
    try {
        const newsData = req.body;
        let imagePath = newsData.image;

        if (req.file) {
            imagePath = `/uploads/${req.file.filename}`;
        }

        const news = await NewsUpdate.create({
            ...newsData,
            image: imagePath,
            id: newsData.id || `news-${Date.now()}`
        });

        res.status(201).json({
            success: true,
            message: 'News created successfully',
            data: news
        });
    } catch (error) {
        console.error('Create news error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Update news
export const updateNews = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const news = await NewsUpdate.findByPk(id);

        if (!news) {
            return res.status(404).json({
                success: false,
                message: 'News not found'
            });
        }

        if (req.file) {
            updates.image = `/uploads/${req.file.filename}`;
        }

        await news.update(updates);

        res.json({
            success: true,
            message: 'News updated successfully',
            data: news
        });
    } catch (error) {
        console.error('Update news error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};

// Delete news
export const deleteNews = async (req, res) => {
    try {
        const { id } = req.params;

        const news = await NewsUpdate.findByPk(id);

        if (!news) {
            return res.status(404).json({
                success: false,
                message: 'News not found'
            });
        }

        await news.destroy();

        res.json({
            success: true,
            message: 'News deleted successfully'
        });
    } catch (error) {
        console.error('Delete news error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
};
