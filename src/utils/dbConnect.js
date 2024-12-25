// src/utils/dbConnect.js
'use server ';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI; // Set your MongoDB URI in .env.local
console.log('mongodb url is ', MONGODB_URI); //)

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

let cached = global.mongo;

if (!cached) {
  cached = global.mongo = { conn: null, promise: null };
}

async function dbConnect() {
  console.log('Attempting to connect to MongoDB...');

  if (cached.conn) {
    console.log('Using cached MongoDB connection');
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('No cached connection, creating a new connection...');
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, opts)
      .then((mongoose) => {
        console.log('Successfully connected to MongoDB');
        return mongoose;
      })
      .catch((error) => {
        console.error('MongoDB connection error:', error);
        throw error;
      });
  }

  cached.conn = await cached.promise;
  console.log('Returning MongoDB connection');
  return cached.conn;
}

export default dbConnect;
