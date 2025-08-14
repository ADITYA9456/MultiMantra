
import mongoose from "mongoose";

// Use MongoDB Atlas or local MongoDB URI
const MONGODB_URI = process.env.MONGODB_URI || `mongodb+srv://multimantra:multimantra123@cluster0.mongodb.net/MultiMantra?retryWrites=true&w=majority`;

// Track the connection status to avoid multiple connections
let isConnected = false;

export const connectDB = async () => {
    if (isConnected) {
        console.log('MongoDB is already connected');
        return;
    }

    try {
        console.log('Connecting to MongoDB...');
        const conn = await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        isConnected = true;
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        // Don't exit process in case of web request
        throw error;
    }
};

// For backward compatibility
export default connectDB;