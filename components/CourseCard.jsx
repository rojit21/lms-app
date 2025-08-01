'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import VideoPreview from '@/components/VideoPreview.jsx';
import { Star, Clock, Users, Play, User } from 'lucide-react';

export default function CourseCard({ course, isEnrolled = false }) {
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden border-gray-200">
      <div className="relative">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {course.isFree && (
          <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
            FREE
          </div>
        )}
        {course.price > 0 && (
          <div className="absolute top-3 right-3 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
            ${course.price}
          </div>
        )}
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
            {course.category}
          </span>
          <div className="flex items-center space-x-1">
            {renderStars(course.averageRating)}
            <span className="text-sm text-gray-600 ml-1">
              ({course.totalRatings})
            </span>
          </div>
        </div>
        <CardTitle className="text-lg leading-tight line-clamp-2 group-hover:text-blue-600 transition-colors">
          {course.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-gray-600 text-sm line-clamp-2 mb-4 leading-relaxed">
          {course.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4" />
            <span>{formatDuration(course.totalDuration)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span>{course.totalStudents} students</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              {course.instructor?.avatar ? (
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <User className="h-4 w-4 text-gray-400" />
              )}
            </div>
            <span className="text-sm text-gray-600 font-medium">
              {course.instructor?.name || 'Instructor'}
            </span>
          </div>
          <Link href={`/courses/${course._id}`}>
            <Button size="sm" className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700">
              <Play className="h-4 w-4" />
              <span>View Course</span>
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
} 