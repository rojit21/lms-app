import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import dbConnect from '@/lib/db';
import Course from '@/models/Course';
import User from '@/models/User';

export async function POST(request, { params }) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();

    const course = await Course.findById(params.id);
    if (!course) {
      return NextResponse.json(
        { message: 'Course not found' },
        { status: 404 }
      );
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    // Check if already enrolled
    const existingEnrollment = user.enrolledCourses.find(
      enrollment => enrollment.courseId.toString() === params.id
    );

    if (existingEnrollment) {
      return NextResponse.json(
        { message: 'Already enrolled in this course' },
        { status: 400 }
      );
    }

    // Add enrollment to user
    user.enrolledCourses.push({
      courseId: course._id,
      progress: 0,
      completedModules: [],
      enrolledAt: new Date(),
    });

    await user.save();

    // Add student to course
    course.enrolledStudents.push({
      studentId: user._id,
      enrolledAt: new Date(),
      progress: 0,
      completedModules: [],
    });

    course.totalStudents = course.enrolledStudents.length;
    await course.save();

    return NextResponse.json({
      message: 'Successfully enrolled in course',
      enrollment: {
        courseId: course._id,
        progress: 0,
        enrolledAt: new Date(),
      },
    });
  } catch (error) {
    console.error('Error enrolling in course:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 