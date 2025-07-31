import Link from 'next/link';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { BookOpen, Users, Award, Globe } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            About <span className="text-blue-600">LearnHub</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Empowering learners worldwide with quality education. We believe that knowledge should be accessible to everyone, everywhere.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-6">
              At LearnHub, we're passionate about democratizing education. Our mission is to provide high-quality, 
              accessible learning experiences that empower individuals to achieve their goals and transform their careers.
            </p>
            <p className="text-lg text-gray-600">
              Whether you're looking to learn a new skill, advance your career, or explore your passions, 
              we provide the tools, resources, and community you need to succeed.
            </p>
          </div>
          <div className="bg-blue-50 rounded-lg p-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">10K+ Students</h3>
                <p className="text-gray-600">Active learners worldwide</p>
              </div>
              <div className="text-center">
                <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">500+ Courses</h3>
                <p className="text-gray-600">Comprehensive curriculum</p>
              </div>
              <div className="text-center">
                <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">200+ Instructors</h3>
                <p className="text-gray-600">Expert educators</p>
              </div>
              <div className="text-center">
                <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">95% Success Rate</h3>
                <p className="text-gray-600">Student satisfaction</p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Quality Education</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We maintain the highest standards of educational quality, ensuring that every course 
                  provides real value and practical skills.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Accessibility</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Education should be accessible to everyone. We break down barriers and make learning 
                  available to people from all walks of life.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Learning is better together. We foster a supportive community where learners can 
                  connect, collaborate, and grow together.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Start Learning?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of learners and start your journey to success today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8 py-3">
                Get Started Free
              </Button>
            </Link>
            <Link href="/courses">
              <Button variant="outline" size="lg" className="text-lg px-8 py-3">
                Browse Courses
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 