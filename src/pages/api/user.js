// src/pages/api/user.js
import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';
import { clerkClient } from '@clerk/nextjs/server';

export default async function handler(req, res) {
  console.log('API request received for /api/user');
  await dbConnect();

  if (req.method === 'POST') {
    const { userId } = req.body;

    console.log(`Handling POST request for userId: ${userId}`);

    try {
      // Check if user exists in the database
      console.log('Checking if user exists in the database...');
      let user = await User.findOne({ clerkId: userId });

      if (!user) {
        // If user does not exist, create a new user
        console.log('User not found, creating a new user...');
        user = await User.create({ clerkId: userId });
      } else {
        console.log('User found in the database.');
      }

      // Return user data
      console.log('Returning user data:', user);
      return res.status(200).json(user);
    } catch (error) {
      console.error('Error fetching or creating user:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    console.log('Method not allowed for this API route');
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
