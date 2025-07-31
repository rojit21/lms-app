import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import mongoose from 'mongoose';
import dbConnect from '@/lib/db';
import Course from '@/models/Course';
import User from '@/models/User';

// Function to create sample courses if they don't exist
async function createSampleCourses() {
  try {
    const existingCourses = await Course.countDocuments();
    
    if (existingCourses === 0) {
      console.log('Creating sample courses...');
      
      // Create a sample instructor user
      let instructor = await User.findOne({ email: 'instructor@learnhub.com' });
      if (!instructor) {
        instructor = new User({
          name: 'LearnHub Instructor',
          email: 'instructor@learnhub.com',
          password: 'hashedpassword123',
          role: 'creator',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face'
        });
        await instructor.save();
      }

      const sampleCourses = [
        {
          title: "Complete Web Development Bootcamp",
          description: "Learn web development from scratch with HTML, CSS, JavaScript, React, and Node.js. Build real-world projects and become a full-stack developer.",
          category: "Programming",
          price: 89,
          isFree: false,
          thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop",
          instructor: instructor._id,
          modules: [
            {
              title: "Introduction to HTML",
              description: "Learn the basics of HTML markup language",
              duration: 45,
              videoUrl: "https://www.youtube.com/watch?v=UB1O30fR-EE",
              isFree: true
            },
            {
              title: "CSS Fundamentals",
              description: "Master CSS styling and layout techniques",
              duration: 60,
              videoUrl: "https://www.youtube.com/watch?v=1PnVor36_40",
              isFree: false
            },
            {
              title: "JavaScript Basics",
              description: "Learn JavaScript programming fundamentals",
              duration: 90,
              videoUrl: "https://www.youtube.com/watch?v=W6NZfCO5SIk",
              isFree: false
            }
          ],
          requirements: [
            "Basic computer knowledge",
            "No programming experience required",
            "A computer with internet connection"
          ],
          learningOutcomes: [
            "Build responsive websites",
            "Create interactive web applications",
            "Deploy websites to the internet",
            "Understand modern web development"
          ],
          totalDuration: 195,
          totalStudents: 1250,
          averageRating: 4.8,
          totalRatings: 156,
          status: 'published'
        },
        {
          title: "UI/UX Design Masterclass",
          description: "Master the art of user interface and user experience design. Learn to create beautiful, functional, and user-friendly digital products.",
          category: "Design",
          price: 79,
          isFree: false,
          thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop",
          instructor: instructor._id,
          modules: [
            {
              title: "Design Principles",
              description: "Learn fundamental design principles and concepts",
              duration: 30,
              videoUrl: "https://www.youtube.com/watch?v=ZK86XQ1iFVs",
              isFree: true
            },
            {
              title: "User Research",
              description: "Conduct effective user research and interviews",
              duration: 45,
              videoUrl: "https://www.youtube.com/watch?v=7VZLIPr5Uu4",
              isFree: false
            },
            {
              title: "Prototyping with Figma",
              description: "Create interactive prototypes using Figma",
              duration: 75,
              videoUrl: "https://www.youtube.com/watch?v=FTFaQWZBqQ8",
              isFree: false
            }
          ],
          requirements: [
            "Basic computer skills",
            "Creative mindset",
            "Figma account (free)"
          ],
          learningOutcomes: [
            "Design user-centered interfaces",
            "Create wireframes and prototypes",
            "Conduct user research",
            "Build a professional portfolio"
          ],
          totalDuration: 150,
          totalStudents: 890,
          averageRating: 4.9,
          totalRatings: 98,
          status: 'published'
        },
        {
          title: "Digital Marketing Strategy",
          description: "Learn comprehensive digital marketing strategies including SEO, social media, email marketing, and paid advertising.",
          category: "Marketing",
          price: 99,
          isFree: false,
          thumbnail: "https://images.unsplash.com/photo-1557838923-2985c318be48?w=400&h=250&fit=crop",
          instructor: instructor._id,
          modules: [
            {
              title: "Marketing Fundamentals",
              description: "Understand the basics of digital marketing",
              duration: 40,
              videoUrl: "https://www.youtube.com/watch?v=9VN9bYz4Qwo",
              isFree: true
            },
            {
              title: "SEO Optimization",
              description: "Learn search engine optimization techniques",
              duration: 80,
              videoUrl: "https://www.youtube.com/watch?v=El3IZAFERKY",
              isFree: false
            },
            {
              title: "Social Media Marketing",
              description: "Master social media marketing strategies",
              duration: 90,
              videoUrl: "https://www.youtube.com/watch?v=9P6rdqiybaw",
              isFree: false
            }
          ],
          requirements: [
            "Basic internet knowledge",
            "Social media accounts",
            "Analytical mindset"
          ],
          learningOutcomes: [
            "Create effective marketing campaigns",
            "Optimize for search engines",
            "Manage social media presence",
            "Analyze marketing performance"
          ],
          totalDuration: 210,
          totalStudents: 2100,
          averageRating: 4.7,
          totalRatings: 234,
          status: 'published'
        },
        {
          title: "Python for Beginners",
          description: "Start your programming journey with Python. Learn the fundamentals and build your first applications.",
          category: "Programming",
          price: 0,
          isFree: true,
          thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop",
          instructor: instructor._id,
          modules: [
            {
              title: "Python Installation",
              description: "Set up Python on your computer",
              duration: 20,
              videoUrl: "https://www.youtube.com/watch?v=YYXdXT2l-Gg",
              isFree: true
            },
            {
              title: "Variables and Data Types",
              description: "Learn about variables and different data types in Python",
              duration: 35,
              videoUrl: "https://www.youtube.com/watch?v=khKv-8q7YmY",
              isFree: true
            },
            {
              title: "Control Flow",
              description: "Master if statements, loops, and functions",
              duration: 50,
              videoUrl: "https://www.youtube.com/watch?v=8ext9G7xspg",
              isFree: true
            }
          ],
          requirements: [
            "No programming experience needed",
            "Computer with internet connection",
            "Willingness to learn"
          ],
          learningOutcomes: [
            "Write Python programs",
            "Understand programming concepts",
            "Build simple applications",
            "Prepare for advanced programming"
          ],
          totalDuration: 105,
          totalStudents: 3500,
          averageRating: 4.6,
          totalRatings: 445,
          status: 'published'
        }
      ];

      for (const courseData of sampleCourses) {
        const course = new Course(courseData);
        await course.save();
      }

      // Update instructor's created courses
      const courseIds = sampleCourses.map((_, index) => mongoose.Types.ObjectId());
      await User.findByIdAndUpdate(instructor._id, {
        $push: { createdCourses: { $each: courseIds } }
      });

      console.log('Sample courses created successfully!');
    }
  } catch (error) {
    console.error('Error creating sample courses:', error);
  }
}

// GET - Fetch all courses
export async function GET(request) {
  try {
    await dbConnect();
    
    // Create sample courses if none exist
    await createSampleCourses();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 12;

    let query = {}; // Show all courses for now

    if (category && category !== 'all') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    console.log('Courses query:', query);

    const skip = (page - 1) * limit;

    const courses = await Course.find(query)
      .populate('instructor', 'name avatar')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    console.log('Found courses:', courses.length);
    courses.forEach(course => {
      console.log('Course:', course._id, course.title);
    });

    const total = await Course.countDocuments(query);

    return NextResponse.json({
      courses,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create a new course
export async function POST(request) {
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
    
    if (user.role !== 'creator' && user.role !== 'admin') {
      return NextResponse.json(
        { message: 'Only creators can create courses' },
        { status: 403 }
      );
    }

    const courseData = await request.json();

    const course = new Course({
      ...courseData,
      instructor: user._id,
      status: 'published', // Set status to published by default
    });

    await course.save();

    // Update user's created courses
    await User.findByIdAndUpdate(user._id, {
      $push: { createdCourses: course._id },
    });

    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    console.error('Error creating course:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete a course (only by creator or admin)
export async function DELETE(request) {
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
    
    if (user.role !== 'creator' && user.role !== 'admin') {
      return NextResponse.json(
        { message: 'Only creators and admins can delete courses' },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('id');

    if (!courseId) {
      return NextResponse.json(
        { message: 'Course ID is required' },
        { status: 400 }
      );
    }

    console.log('Attempting to delete course:', courseId);

    // Convert courseId to ObjectId
    const courseObjectId = new mongoose.Types.ObjectId(courseId);

    const course = await Course.findById(courseObjectId);
    
    if (!course) {
      console.log('Course not found:', courseId);
      return NextResponse.json(
        { message: 'Course not found' },
        { status: 404 }
      );
    }

    console.log('Found course:', course.title);

    // Only allow deletion if user is admin or the course creator
    if (user.role !== 'admin' && course.instructor.toString() !== user._id.toString()) {
      return NextResponse.json(
        { message: 'You can only delete your own courses' },
        { status: 403 }
      );
    }

    console.log('Removing course from enrolled students...');
    // Remove course from all enrolled students
    const enrolledUpdate = await User.updateMany(
      { enrolledCourses: courseObjectId },
      { $pull: { enrolledCourses: courseObjectId } }
    );
    console.log('Updated enrolled students:', enrolledUpdate);

    console.log('Removing course from instructor...');
    // Remove course from instructor's created courses
    const instructorUpdate = await User.findByIdAndUpdate(course.instructor, {
      $pull: { createdCourses: courseObjectId }
    });
    console.log('Updated instructor:', instructorUpdate);

    console.log('Deleting course from database...');
    // Delete the course
    const deletedCourse = await Course.findByIdAndDelete(courseObjectId);
    console.log('Deleted course:', deletedCourse);

    return NextResponse.json(
      { message: 'Course deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting course:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 