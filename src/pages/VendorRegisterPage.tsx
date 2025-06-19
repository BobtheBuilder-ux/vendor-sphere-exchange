
import { useState } from "react";
import { Link } from "react-router-dom";
import { Store, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

const VendorRegisterPage = () => {
  const [formData, setFormData] = useState({
    businessName: "",
    businessDescription: "",
    contactPhone: "",
    agreeToTerms: false
  });

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center space-x-2">
            <Store className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">VendorSphere</span>
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Become a Vendor
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Join our marketplace and start selling your products
          </p>
        </div>

        <SignedOut>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                Vendor Registration
              </CardTitle>
              <CardDescription>
                Complete your business information to get started
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="businessName">Business Name *</Label>
                <Input
                  id="businessName"
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => updateFormData("businessName", e.target.value)}
                  required
                  placeholder="Enter your business name"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="businessDescription">Business Description</Label>
                <Textarea
                  id="businessDescription"
                  value={formData.businessDescription}
                  onChange={(e) => updateFormData("businessDescription", e.target.value)}
                  placeholder="Describe your business and products"
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input
                  id="contactPhone"
                  type="tel"
                  value={formData.contactPhone}
                  onChange={(e) => updateFormData("contactPhone", e.target.value)}
                  placeholder="Your business phone number"
                  className="mt-1"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.agreeToTerms}
                  onCheckedChange={(checked) => updateFormData("agreeToTerms", checked as boolean)}
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the{' '}
                  <Link to="/terms" className="text-primary hover:text-primary/80">
                    Vendor Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-primary hover:text-primary/80">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <SignUpButton 
                fallbackRedirectUrl="/vendor/dashboard"
                unsafeMetadata={{
                  userType: "vendor",
                  businessName: formData.businessName,
                  businessDescription: formData.businessDescription,
                  contactPhone: formData.contactPhone
                }}
              >
                <Button 
                  className="w-full" 
                  disabled={!formData.agreeToTerms || !formData.businessName.trim()}
                >
                  Create Vendor Account
                </Button>
              </SignUpButton>

              <div className="text-center">
                <Link to="/login" className="inline-flex items-center text-sm text-primary hover:text-primary/80">
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to sign in options
                </Link>
              </div>
            </CardContent>
          </Card>
        </SignedOut>

        <SignedIn>
          <Card>
            <CardHeader>
              <CardTitle>Welcome, Vendor!</CardTitle>
              <CardDescription>
                Your vendor account is ready
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <UserButton afterSignOutUrl="/" />
              <Link to="/vendor/dashboard">
                <Button>
                  Go to Vendor Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>
        </SignedIn>
      </div>
    </div>
  );
};

export default VendorRegisterPage;
