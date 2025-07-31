import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function GET() {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();

    const user = await User.findOne({ email: session.user.email })
      .populate({
        path: 'enrolledCourses.courseId',
        populate: {
          path: 'instructor',
          select: 'name avatar'
        }
      });

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Calculate stats
    const totalCourses = user.enrolledCourses.length;
    const completedCourses = user.enrolledCourses.filter(
      enrollment => enrollment.progress === 100
    ).length;
    
    const totalHours = user.enrolledCourses.reduce((total, enrollment) => {
      return total + (enrollment.courseId.totalDuration / 60);
    }, 0);

    const certificates = completedCourses; // Assuming one certificate per completed course

    const stats = {
      totalCourses,
      completedCourses,
      totalHours: Math.round(totalHours),
      certificates,
    };

    return NextResponse.json({
      courses: user.enrolledCourses,
      stats,
    });
  } catch (error) {
    console.error('Error fetching learner dashboard:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 