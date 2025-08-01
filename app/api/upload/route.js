import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import cloudinary from '../../../lib/cloudinary';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    console.log('Session:', session);
    console.log('User role:', session?.user?.role);
    
    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized - No session found' },
        { status: 401 }
      );
    }

    if (session.user.role !== 'creator' && session.user.role !== 'admin') {
      return NextResponse.json(
        { message: `Only creators can upload files. Your role: ${session.user.role}` },
        { status: 403 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { message: 'No file provided' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto',
          folder: 'lms-courses',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    return NextResponse.json({
      success: true,
      fileUrl: result.secure_url,
      publicId: result.public_id,
      fileName: file.name,
      message: 'File uploaded successfully'
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 