import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function getCurrentUser() {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return null;
    }

    await dbConnect();
    const user = await User.findOne({ email: session.user.email }).select('-password');
    
    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
} 