
import mongoose from "mongoose";

// Use MongoDB Atlas URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

// Make sure we have a valid MongoDB URI
if (!MONGODB_URI) {
  console.error('Please define the MONGODB_URI environment variable');
}

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