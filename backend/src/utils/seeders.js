import dotenv from 'dotenv';
import { testConnection } from '../config/database.js';
import { syncDatabase, User } from '../models/index.js';

dotenv.config();

const seedDatabase = async () => {
    try {
        console.log('🌱 Starting database seeding...');

        // Test connection
        const isConnected = await testConnection();
        if (!isConnected) {
            console.error('❌ Database connection failed');
            process.exit(1);
        }

        // Sync database (force: true will drop existing tables)
        console.log('📊 Syncing database...');
        await syncDatabase(true);

        // Seed root admin user
        console.log('👤 Creating root admin user...');
        await User.create({
            id: 'admin-root',
            name: 'Kenny Tohne',
            email: 'kennytohne@gmail.com',
            password: 'admin123', // Default password
            role: 'admin',
            isValidated: true
        });

        console.log('✅ Database seeded successfully!');
        console.log('');
        console.log('Default Admin User:');
        console.log('  Email: kennytohne@gmail.com');
        console.log('  Password: admin123');
        console.log('  Role: admin');
        console.log('');
        console.log('⚠️  IMPORTANT: Change the default password after first login!');
        console.log('');
        console.log('You can now start the server with: npm run dev');

        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        process.exit(1);
    }
};

seedDatabase();
