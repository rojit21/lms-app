import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Course from '@/models/Course';

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

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Get all courses created by the user
    const courses = await Course.find({ instructor: user._id })
      .populate('instructor', 'name avatar')
      .sort({ createdAt: -1 });

    // Calculate stats
    const totalCourses = courses.length;
    const totalStudents = courses.reduce((total, course) => {
      return total + course.enrolledStudents.length;
    }, 0);

    const totalEarnings = courses.reduce((total, course) => {
      return total + (course.price * course.enrolledStudents.length);
    }, 0);

    const allRatings = courses.flatMap(course => course.ratings);
    const averageRating = allRatings.length > 0 
      ? allRatings.reduce((sum, rating) => sum + rating.rating, 0) / allRatings.length
      : 0;

    const stats = {
      totalCourses,
      totalStudents,
      totalEarnings,
      averageRating,
    };

    return NextResponse.json({
      courses,
      stats,
    });
  } catch (error) {
    console.error('Error fetching creator dashboard:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 