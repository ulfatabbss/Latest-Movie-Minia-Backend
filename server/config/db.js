const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.set('strictQuery', false);
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB:', conn.connection.host);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

module.exports = connectDB;

