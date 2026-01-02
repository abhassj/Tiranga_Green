const mongoose = require('mongoose');
const dotenv = require('dotenv');
const AdminUser = require('./src/models/AdminUser');

// Load environment variables
dotenv.config();

const createAdmin = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB Connected');

        // Admin User Details
        const adminData = {
            name: 'Admin',
            email: 'admin@TirangaGreen.in',
            password: 'password123', // Temporary password
            role: 'superadmin'
        };

        // Check if admin exists
        const userExists = await AdminUser.findOne({ email: adminData.email });

        if (userExists) {
            console.log('Admin user already exists');
            process.exit(0);
        }

        // Create Admin
        const user = await AdminUser.create(adminData);
        console.log(`Admin user created successfully:\nEmail: ${user.email}\nPassword: ${adminData.password}`);

        process.exit();
    } catch (error) {
        console.error('Error creating admin user:', error);
        process.exit(1);
    }
};

createAdmin();
