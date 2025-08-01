import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({
        error: 'No session found'
      }, { status: 401 });
    }

    await dbConnect();
    
    // Update user role to creator
    const updatedUser = await User.findOneAndUpdate(
      { email: session.user.email },
      { $set: { role: 'creator' } },
      { new: true }
    );
    
    if (!updatedUser) {
      return NextResponse.json({
        error: 'User not found'
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      message: 'Role updated to creator',
      user: {
        email: updatedUser.email,
        role: updatedUser.role,
        name: updatedUser.name
      }
    });
  } catch (error) {
    console.error('Update role error:', error);
    return NextResponse.json({
      error: 'Internal server error'
    }, { status: 500 });
  }
} 