import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx';

export default function TermsPage() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Terms of <span className="text-blue-600">Service</span>
          </h1>
          <p className="text-xl text-gray-600">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">1. Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                By accessing and using LearnHub's platform, you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to abide by the above, please do not 
                use this service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">2. Use License</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Permission is granted to temporarily access the materials on LearnHub's website for personal, 
                non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, 
                and under this license you may not:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on LearnHub's website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">3. User Accounts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                When you create an account with us, you must provide information that is accurate, complete, 
                and current at all times. You are responsible for safeguarding the password and for all activities 
                that occur under your account.
              </p>
              <p className="text-gray-600">
                You agree not to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Use another user's account without permission</li>
                <li>Create false or misleading information</li>
                <li>Interfere with or disrupt the service</li>
                <li>Attempt to gain unauthorized access to any part of the service</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">4. Course Content and Intellectual Property</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                All content on LearnHub, including but not limited to text, graphics, images, videos, 
                and course materials, is the property of LearnHub or its content suppliers and is protected 
                by copyright laws.
              </p>
              <p className="text-gray-600">
                For instructors:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>You retain ownership of your original content</li>
                <li>You grant LearnHub a license to host and distribute your content</li>
                <li>You are responsible for ensuring you have rights to all content you upload</li>
                <li>You agree not to upload content that infringes on others' intellectual property</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">5. Payment Terms</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Course fees are charged at the time of enrollment. All payments are processed securely 
                through our payment partners.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Prices are subject to change without notice</li>
                <li>Refunds are available within 30 days of purchase</li>
                <li>Subscription fees are billed in advance on a recurring basis</li>
                <li>You may cancel your subscription at any time</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">6. Prohibited Uses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                You may not use our service for any illegal or unauthorized purpose. You agree not to:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Violate any laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Harass, abuse, or harm others</li>
                <li>Spread malware or harmful code</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use automated tools to access the service</li>
                <li>Share account credentials with others</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">7. Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your 
                use of the service, to understand our practices.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">8. Disclaimers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                The materials on LearnHub's website are provided on an 'as is' basis. LearnHub makes no 
                warranties, expressed or implied, and hereby disclaims and negates all other warranties 
                including without limitation, implied warranties or conditions of merchantability, fitness 
                for a particular purpose, or non-infringement of intellectual property or other violation 
                of rights.
              </p>
              <p className="text-gray-600">
                Further, LearnHub does not warrant or make any representations concerning the accuracy, 
                likely results, or reliability of the use of the materials on its website or otherwise 
                relating to such materials or on any sites linked to this site.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">9. Limitations</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                In no event shall LearnHub or its suppliers be liable for any damages (including, without 
                limitation, damages for loss of data or profit, or due to business interruption) arising 
                out of the use or inability to use the materials on LearnHub's website, even if LearnHub 
                or a LearnHub authorized representative has been notified orally or in writing of the 
                possibility of such damage.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">10. Termination</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We may terminate or suspend your account and bar access to the service immediately, without 
                prior notice or liability, under our sole discretion, for any reason whatsoever and without 
                limitation, including but not limited to a breach of the Terms.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">11. Governing Law</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                These Terms shall be interpreted and governed by the laws of the jurisdiction in which 
                LearnHub operates, without regard to its conflict of law provisions.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">12. Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                If a revision is material, we will try to provide at least 30 days notice prior to any new 
                terms taking effect.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">13. Contact Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-900 font-semibold">LearnHub</p>
                <p className="text-gray-600">Email: legal@learnhub.com</p>
                <p className="text-gray-600">Phone: +1 (555) 123-4567</p>
                <p className="text-gray-600">Address: 123 Learning St, Education City, TC 12345</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 