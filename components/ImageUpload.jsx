'use client';

import { useState } from 'react';
import { Button } from './ui/button';

export default function ImageUpload({ onUpload, className = '', buttonText = 'Upload Image', showPreview = false }) {
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState('');

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setUploadedUrl(data.fileUrl);
        onUpload?.(data.fileUrl, data.publicId);
      } else {
        alert('Upload failed: ' + data.message);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={className}>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        disabled={uploading}
        className="hidden"
        id="image-upload"
      />
      <label htmlFor="image-upload">
        <Button
          type="button"
          disabled={uploading}
          className="cursor-pointer"
          asChild
        >
          <span>
            {uploading ? 'Uploading...' : buttonText}
          </span>
        </Button>
      </label>
      
      {uploadedUrl && showPreview && (
        <div className="mt-4">
          <img
            src={uploadedUrl}
            alt="Uploaded"
            className="w-32 h-32 object-cover rounded"
          />
        </div>
      )}
    </div>
  );
} 