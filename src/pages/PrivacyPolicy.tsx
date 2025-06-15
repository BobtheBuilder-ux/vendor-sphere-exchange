
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Information We Collect</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>We collect information you provide directly to us, such as when you:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Create an account</li>
                    <li>Make a purchase</li>
                    <li>Contact us for support</li>
                    <li>Subscribe to our newsletter</li>
                    <li>Participate in surveys or promotions</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>We use the information we collect to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Process transactions and send related information</li>
                    <li>Send you technical notices and support messages</li>
                    <li>Respond to your comments and questions</li>
                    <li>Monitor and analyze trends and usage</li>
                    <li>Personalize your experience</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Information Sharing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>We may share your information in the following situations:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>With vendors to fulfill your orders</li>
                    <li>With service providers who assist in our operations</li>
                    <li>If required by law or to protect our rights</li>
                    <li>In connection with a business transfer</li>
                    <li>With your consent</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Security</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cookies and Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>We use cookies and similar technologies to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Remember your preferences</li>
                    <li>Understand how you use our service</li>
                    <li>Improve our website performance</li>
                    <li>Provide targeted advertising</li>
                  </ul>
                  <p>You can control cookies through your browser settings.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Rights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>You have the right to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Access your personal information</li>
                    <li>Correct inaccurate information</li>
                    <li>Delete your account and information</li>
                    <li>Object to processing of your information</li>
                    <li>Data portability</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Children's Privacy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  Our service is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent and believe your child has provided us with personal information, please contact us.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Changes to This Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "last updated" date.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  If you have any questions about this privacy policy, please contact us at privacy@vendorsphere.com or through our contact form.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center text-gray-600">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
