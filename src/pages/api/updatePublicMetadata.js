import dbConnect from '@/utils/dbConnect';
import User from '@/models/User';

export default async function handler(req, res) {
  console.log('This is updatePublicMetaData file');
  await dbConnect();

  if (req.method === 'POST') {
    const { userId, publicMetadata } = req.body;

    console.log('Incoming userId:', userId);
    console.log('Incoming publicMetadata:', publicMetadata);

    try {
      // Check if the user exists
      let user = await User.findOne({ clerkId: userId });

      if (!user) {
        console.log('User not found, creating a new user...');
        user = await User.create({ clerkId: userId, ...publicMetadata });
      } else {
        console.log('User found, updating metadata...');
        user = await User.findByIdAndUpdate(user._id, publicMetadata, { new: true });
      }

      return res.status(200).json({ success: true, user });
    } catch (error) {
      console.error('Error updating public metadata:', error);
      return res.status(500).json({ error: 'Failed to update public metadata' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
