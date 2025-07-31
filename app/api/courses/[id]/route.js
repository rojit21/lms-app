import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/db';
import Course from '@/models/Course';
import User from '@/models/User';

export async function GET(request, { params }) {
  try {
    const session = await getServerSession();
    await dbConnect();

    const course = await Course.findById(params.id)
      .populate('instructor', 'name avatar')
      .populate('ratings.userId', 'name avatar');

    if (!course) {
      return NextResponse.json(
        { message: 'Course not found' },
        { status: 404 }
      );
    }

    let isEnrolled = false;
    let enrollmentProgress = 0;

    if (session) {
      const user = await User.findOne({ email: session.user.email });
      if (user) {
        const enrollment = user.enrolledCourses.find(
          enrollment => enrollment.courseId.toString() === params.id
        );
        
        if (enrollment) {
          isEnrolled = true;
          enrollmentProgress = enrollment.progress;
        }
      }
    }

    return NextResponse.json({
      course,
      isEnrolled,
      enrollmentProgress,
    });
  } catch (error) {
    console.error('Error fetching course:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 