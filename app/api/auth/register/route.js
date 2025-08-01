import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function POST(request) {
  try {
    console.log('Registration attempt started');
    
    // Check if MongoDB URI is configured
    if (!process.env.MONGODB_URI) {
      console.error('MONGODB_URI is not configured');
      return NextResponse.json(
        { message: 'Database configuration error. Please contact support.' },
        { status: 500 }
      );
    }
    
    await dbConnect();
    console.log('Database connected');

    const { name, email, password, role } = await request.json();
    console.log('Received data:', { name, email, role });

    // Validate input
    if (!name || !email || !password || !role) {
      console.log('Missing required fields');
      return NextResponse.json(
        { message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('User already exists');
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Create new user
    const user = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      role,
    });

    console.log('Saving user...');
    await user.save();
    console.log('User saved successfully');

    return NextResponse.json(
      { message: 'User created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle specific MongoDB errors
    if (error.code === 11000) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 400 }
      );
    }
    
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { message: messages.join(', ') },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { message: 'Registration failed. Please try again.' },
      { status: 500 }
    );
  }
} 