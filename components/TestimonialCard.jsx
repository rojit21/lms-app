'use client';

import { Card, CardContent } from '@/components/ui/card.jsx';
import { User } from 'lucide-react';
import { useState } from 'react';

export default function TestimonialCard({ testimonial }) {
  const [imageError, setImageError] = useState(false);

  return (
    <Card className="text-center">
      <CardContent className="pt-6">
        <div className="flex justify-center mb-4">
          <div className="relative">
            {!imageError ? (
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="h-8 w-8 text-gray-500" />
              </div>
            )}
          </div>
        </div>
        <p className="text-gray-600 mb-4 italic">
          "{testimonial.content}"
        </p>
        <div>
          <div className="font-semibold text-gray-900">{testimonial.name}</div>
          <div className="text-sm text-gray-500">{testimonial.role}</div>
        </div>
      </CardContent>
    </Card>
  );
} 