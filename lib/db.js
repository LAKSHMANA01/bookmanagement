import mongoose from "mongoose";

// Temporarily hardcoded for debugging
const MONGODB_URI = "mongodb+srv://Lucky:Lucky%40123@cluster0.kqvpp.mongodb.net/db";

console.log('MONGODB_URI:', MONGODB_URI);

if (!MONGODB_URI) {
    throw new Error("Please define MONGODB_URI");
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        console.log('Attempting to connect to MongoDB...');
        cached.promise = mongoose.connect(MONGODB_URI)
            .then((mongoose) => {
                console.log('MongoDB connected successfully!');
                return mongoose;
            })
            .catch((error) => {
                console.error('MongoDB connection error:', error);
                throw error;
            });
    }

    try {
        cached.conn = await cached.promise;
        return cached.conn;
    } catch (error) {
        console.error('Failed to establish MongoDB connection:', error);
        throw error;
    }
}
