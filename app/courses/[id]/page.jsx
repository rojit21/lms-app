'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';
import VideoPlayer from '@/components/VideoPlayer.jsx';
import { 
  Play, 
  Clock, 
  Users, 
  Star, 
  BookOpen, 
  CheckCircle,
  Award,
  ArrowRight,
  Lock,
  User,
  Trash2
} from 'lucide-react';

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedModule, setSelectedModule] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrollmentProgress, setEnrollmentProgress] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchCourse();
  }, [params.id]);

  const fetchCourse = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/courses/${params.id}`);
      const data = await response.json();

      if (response.ok) {
        setCourse(data.course);
        setIsEnrolled(data.isEnrolled);
        setEnrollmentProgress(data.enrollmentProgress || 0);
        if (data.course.modules.length > 0) {
          setSelectedModule(data.course.modules[0]);
        }
      } else {
        setError(data.message || 'Course not found');
      }
    } catch (error) {
      setError('An error occurred while fetching the course');
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async () => {
    if (!session) {
      // Redirect to login
      return;
    }

    try {
      const response = await fetch(`/api/courses/${params.id}/enroll`, {
        method: 'POST',
      });

      const data = await response.json();

      if (response.ok) {
        setIsEnrolled(true);
        setEnrollmentProgress(0);
      } else {
        setError(data.message || 'Failed to enroll');
      }
    } catch (error) {
      setError('An error occurred while enrolling');
    }
  };

  const handleDelete = async () => {
    if (!session || (session.user.role !== 'creator' && session.user.role !== 'admin')) {
      return;
    }

    if (!confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      return;
    }

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/courses?id=${params.id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        router.push('/courses');
      } else {
        setError(data.message || 'Failed to delete course');
      }
    } catch (error) {
      setError('An error occurred while deleting the course');
    } finally {
      setIsDeleting(false);
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Course Not Found</h2>
          <p className="text-gray-600">{error || 'The course you are looking for does not exist.'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {course.title}
                  </h1>
                  <p className="text-gray-600 text-lg mb-4">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{formatDuration(course.totalDuration)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{course.totalStudents} students enrolled</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{course.modules.length} modules</span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      {renderStars(course.averageRating)}
                      <span className="text-sm text-gray-600 ml-1">
                        {course.averageRating.toFixed(1)} ({course.totalRatings} reviews)
                      </span>
                    </div>
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded">
                      {course.category}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  {course.isFree ? (
                    <div className="text-2xl font-bold text-green-600">FREE</div>
                  ) : (
                    <div className="text-2xl font-bold text-gray-900">${course.price}</div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {!isEnrolled ? (
                  <Button
                    onClick={handleEnroll}
                    className="w-full md:w-auto"
                    size="lg"
                  >
                    {course.isFree ? 'Enroll Now' : `Enroll for $${course.price}`}
                  </Button>
                ) : (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-green-800 font-medium">Enrolled</span>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-green-700">Progress</span>
                        <span className="text-green-700 font-medium">{enrollmentProgress}%</span>
                      </div>
                      <div className="w-full bg-green-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${enrollmentProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Delete Button for Creators */}
                {session && (session.user.role === 'creator' || session.user.role === 'admin') && 
                 course.instructor?._id === session.user.id && (
                  <Button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    variant="outline"
                    className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                    size="lg"
                  >
                    {isDeleting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-600 mr-2"></div>
                        Deleting...
                      </>
                    ) : (
                      <>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Course
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>

            {/* Video Player */}
            {selectedModule && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>{selectedModule.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  {isEnrolled ? (
                    <div>
                      <VideoPlayer 
                        videoUrl={selectedModule.videoUrl}
                        title={selectedModule.title}
                        onProgress={(progress) => {
                          // Handle progress tracking
                          console.log('Video progress:', progress);
                        }}
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                      <div className="text-center text-white">
                        <Lock className="h-16 w-16 mx-auto mb-4" />
                        <p className="text-lg font-medium mb-2">Enroll to watch this video</p>
                        <p className="text-sm text-gray-400">
                          This video is only available to enrolled students
                        </p>
                      </div>
                    </div>
                  )}
                  <div className="mt-4">
                    <p className="text-gray-600">{selectedModule.description}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Course Content */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BookOpen className="h-5 w-5" />
                  <span>Course Content</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {course.modules.map((module, index) => (
                    <div
                      key={module._id || index}
                      className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                        selectedModule?._id === module._id
                          ? 'bg-blue-50 border-blue-200 shadow-sm'
                          : 'hover:bg-gray-50 border-gray-200'
                      }`}
                      onClick={() => setSelectedModule(module)}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-blue-600">
                            {index + 1}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">
                            {module.title}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {formatDuration(module.duration)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {module.isFree && (
                          <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full font-medium">
                            FREE
                          </span>
                        )}
                        {!module.isFree && !isEnrolled && (
                          <Lock className="h-4 w-4 text-gray-400" />
                        )}
                        {isEnrolled && (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                        <Play className="h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Requirements */}
            {course.requirements && course.requirements.length > 0 && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <ArrowRight className="h-5 w-5" />
                    <span>Requirements</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {course.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700 leading-relaxed">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Learning Outcomes */}
            {course.learningOutcomes && course.learningOutcomes.length > 0 && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5" />
                    <span>What you'll learn</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {course.learningOutcomes.map((outcome, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700 leading-relaxed">{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Instructor */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Instructor</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center">
                    {course.instructor?.avatar ? (
                      <img
                        src={course.instructor.avatar}
                        alt={course.instructor.name}
                        className="w-14 h-14 rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-7 w-7 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 text-lg">
                      {course.instructor?.name || 'Instructor Name'}
                    </h4>
                    <p className="text-sm text-gray-600">Course Instructor</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Stats */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5" />
                  <span>Course Statistics</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Students enrolled</span>
                    <span className="font-semibold text-gray-900">{course.totalStudents}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Average rating</span>
                    <div className="flex items-center space-x-2">
                      {renderStars(course.averageRating)}
                      <span className="font-semibold text-gray-900">{course.averageRating.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Total duration</span>
                    <span className="font-semibold text-gray-900">{formatDuration(course.totalDuration)}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-600">Modules</span>
                    <span className="font-semibold text-gray-900">{course.modules.length}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Certificate */}
            {isEnrolled && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Award className="h-5 w-5" />
                    <span>Certificate</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">
                    Complete this course to earn your certificate of completion.
                  </p>
                  <Button variant="outline" className="w-full">
                    View Certificate
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 