import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    return NextResponse.json({
      session: session,
      user: session?.user,
      role: session?.user?.role,
      isAuthenticated: !!session,
    });
  } catch (error) {
    console.error('Session test error:', error);
    return NextResponse.json({
      error: error.message,
      session: null,
    });
  }
} 