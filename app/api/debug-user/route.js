import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    console.log('Debug - Full Session:', JSON.stringify(session, null, 2));
    
    if (!session) {
      return NextResponse.json({
        error: 'No session found',
        session: null
      });
    }

    // Get user from database to check actual role
    await dbConnect();
    const user = await User.findOne({ email: session.user.email });
    
    return NextResponse.json({
      session: session,
      user: session.user,
      databaseUser: user ? {
        email: user.email,
        role: user.role,
        name: user.name,
        id: user._id
      } : null,
      sessionRole: session.user.role,
      databaseRole: user?.role,
      rolesMatch: session.user.role === user?.role
    });
  } catch (error) {
    console.error('Debug error:', error);
    return NextResponse.json({
      error: error.message,
      session: null
    });
  }
} 