
import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>1. Acceptance of Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  By accessing and using VendorSphere, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Use License</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>
                    Permission is granted to temporarily download one copy of VendorSphere per device for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>modify or copy the materials</li>
                    <li>use the materials for any commercial purpose or for any public display</li>
                    <li>attempt to reverse engineer any software contained on the website</li>
                    <li>remove any copyright or other proprietary notations from the materials</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Disclaimer</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  The materials on VendorSphere are provided on an 'as is' basis. VendorSphere makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Limitations</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  In no event shall VendorSphere or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on VendorSphere, even if VendorSphere or a VendorSphere authorized representative has been notified orally or in writing of the possibility of such damage.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Account Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>When you create an account with us, you must provide information that is accurate, complete, and current at all times.</p>
                  <p>You are responsible for safeguarding the password and for ensuring that others do not gain access to your account.</p>
                  <p>You must not use our service for any illegal or unauthorized purpose.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Vendor Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>Vendors using our platform agree to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide accurate product descriptions and pricing</li>
                    <li>Fulfill orders in a timely manner</li>
                    <li>Maintain professional communication with customers</li>
                    <li>Comply with all applicable laws and regulations</li>
                    <li>Pay applicable fees and commissions</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Payment Terms</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  All payments are processed securely through our payment partners. We do not store credit card information on our servers. Refunds and returns are subject to individual vendor policies.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  If you have any questions about these Terms of Service, please contact us at legal@vendorsphere.com.
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

export default TermsOfService;
