import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

export async function POST(request) {
  try {
    const session = await getServerSession();
    
    if (!session) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    if (session.user.role !== 'creator' && session.user.role !== 'admin') {
      return NextResponse.json(
        { message: 'Only creators can upload files' },
        { status: 403 }
      );
    }

    const { fileUrl, fileName, fileType } = await request.json();

    // For now, we'll just validate the URL and return it
    // In a real implementation, you would upload to cloud storage (AWS S3, Cloudinary, etc.)
    if (!fileUrl || !fileUrl.startsWith('http')) {
      return NextResponse.json(
        { message: 'Invalid file URL' },
        { status: 400 }
      );
    }

    // Return the URL as the uploaded file location
    return NextResponse.json({
      success: true,
      fileUrl: fileUrl,
      fileName: fileName || 'uploaded-file',
      message: 'File URL saved successfully'
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
} 