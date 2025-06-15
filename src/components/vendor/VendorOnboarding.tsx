
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Upload, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Building,
  FileText,
  CreditCard,
  Store
} from "lucide-react";
import DocumentUpload from "./DocumentUpload";

const VendorOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    businessInfo: {
      businessName: "",
      businessType: "",
      description: "",
      website: "",
      taxId: "",
      registrationNumber: ""
    },
    contactInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: ""
    },
    documents: {
      businessLicense: null,
      taxCertificate: null,
      bankStatement: null,
      identityProof: null
    },
    bankingInfo: {
      accountName: "",
      accountNumber: "",
      routingNumber: "",
      bankName: ""
    }
  });

  const steps = [
    { id: 1, title: "Business Information", icon: Building },
    { id: 2, title: "Contact Details", icon: FileText },
    { id: 3, title: "Document Upload", icon: Upload },
    { id: 4, title: "Banking Information", icon: CreditCard },
    { id: 5, title: "Review & Submit", icon: CheckCircle }
  ];

  const progressPercentage = (currentStep / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    console.log("Submitting vendor application:", formData);
    // Submit to backend
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="businessName">Business Name *</Label>
              <Input
                id="businessName"
                value={formData.businessInfo.businessName}
                onChange={(e) => setFormData({
                  ...formData,
                  businessInfo: { ...formData.businessInfo, businessName: e.target.value }
                })}
                placeholder="Enter your business name"
              />
            </div>
            <div>
              <Label htmlFor="businessType">Business Type *</Label>
              <Input
                id="businessType"
                value={formData.businessInfo.businessType}
                onChange={(e) => setFormData({
                  ...formData,
                  businessInfo: { ...formData.businessInfo, businessType: e.target.value }
                })}
                placeholder="e.g., LLC, Corporation, Partnership"
              />
            </div>
            <div>
              <Label htmlFor="description">Business Description *</Label>
              <Textarea
                id="description"
                value={formData.businessInfo.description}
                onChange={(e) => setFormData({
                  ...formData,
                  businessInfo: { ...formData.businessInfo, description: e.target.value }
                })}
                placeholder="Describe your business and products"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={formData.businessInfo.website}
                onChange={(e) => setFormData({
                  ...formData,
                  businessInfo: { ...formData.businessInfo, website: e.target.value }
                })}
                placeholder="https://your-website.com"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.contactInfo.firstName}
                  onChange={(e) => setFormData({
                    ...formData,
                    contactInfo: { ...formData.contactInfo, firstName: e.target.value }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.contactInfo.lastName}
                  onChange={(e) => setFormData({
                    ...formData,
                    contactInfo: { ...formData.contactInfo, lastName: e.target.value }
                  })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.contactInfo.email}
                onChange={(e) => setFormData({
                  ...formData,
                  contactInfo: { ...formData.contactInfo, email: e.target.value }
                })}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone *</Label>
              <Input
                id="phone"
                value={formData.contactInfo.phone}
                onChange={(e) => setFormData({
                  ...formData,
                  contactInfo: { ...formData.contactInfo, phone: e.target.value }
                })}
              />
            </div>
            <div>
              <Label htmlFor="address">Business Address *</Label>
              <Input
                id="address"
                value={formData.contactInfo.address}
                onChange={(e) => setFormData({
                  ...formData,
                  contactInfo: { ...formData.contactInfo, address: e.target.value }
                })}
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  value={formData.contactInfo.city}
                  onChange={(e) => setFormData({
                    ...formData,
                    contactInfo: { ...formData.contactInfo, city: e.target.value }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  value={formData.contactInfo.state}
                  onChange={(e) => setFormData({
                    ...formData,
                    contactInfo: { ...formData.contactInfo, state: e.target.value }
                  })}
                />
              </div>
              <div>
                <Label htmlFor="zipCode">ZIP Code *</Label>
                <Input
                  id="zipCode"
                  value={formData.contactInfo.zipCode}
                  onChange={(e) => setFormData({
                    ...formData,
                    contactInfo: { ...formData.contactInfo, zipCode: e.target.value }
                  })}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <DocumentUpload
              title="Business License"
              description="Upload your business license or registration certificate"
              required
              onUpload={(file) => setFormData({
                ...formData,
                documents: { ...formData.documents, businessLicense: file }
              })}
            />
            <DocumentUpload
              title="Tax Certificate"
              description="Upload your tax registration certificate"
              required
              onUpload={(file) => setFormData({
                ...formData,
                documents: { ...formData.documents, taxCertificate: file }
              })}
            />
            <DocumentUpload
              title="Bank Statement"
              description="Upload a recent bank statement (last 3 months)"
              onUpload={(file) => setFormData({
                ...formData,
                documents: { ...formData.documents, bankStatement: file }
              })}
            />
            <DocumentUpload
              title="Identity Proof"
              description="Upload government-issued ID (Driver's License, Passport, etc.)"
              required
              onUpload={(file) => setFormData({
                ...formData,
                documents: { ...formData.documents, identityProof: file }
              })}
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center">
                <AlertCircle className="h-5 w-5 text-blue-600 mr-2" />
                <span className="text-blue-800 font-medium">Secure Banking Information</span>
              </div>
              <p className="text-blue-700 text-sm mt-1">
                Your banking information is encrypted and used only for payment processing.
              </p>
            </div>
            <div>
              <Label htmlFor="accountName">Account Holder Name *</Label>
              <Input
                id="accountName"
                value={formData.bankingInfo.accountName}
                onChange={(e) => setFormData({
                  ...formData,
                  bankingInfo: { ...formData.bankingInfo, accountName: e.target.value }
                })}
              />
            </div>
            <div>
              <Label htmlFor="bankName">Bank Name *</Label>
              <Input
                id="bankName"
                value={formData.bankingInfo.bankName}
                onChange={(e) => setFormData({
                  ...formData,
                  bankingInfo: { ...formData.bankingInfo, bankName: e.target.value }
                })}
              />
            </div>
            <div>
              <Label htmlFor="accountNumber">Account Number *</Label>
              <Input
                id="accountNumber"
                type="password"
                value={formData.bankingInfo.accountNumber}
                onChange={(e) => setFormData({
                  ...formData,
                  bankingInfo: { ...formData.bankingInfo, accountNumber: e.target.value }
                })}
              />
            </div>
            <div>
              <Label htmlFor="routingNumber">Routing Number *</Label>
              <Input
                id="routingNumber"
                value={formData.bankingInfo.routingNumber}
                onChange={(e) => setFormData({
                  ...formData,
                  bankingInfo: { ...formData.bankingInfo, routingNumber: e.target.value }
                })}
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <span className="text-green-800 font-medium">Application Complete</span>
              </div>
              <p className="text-green-700 text-sm mt-1">
                Review your information before submitting your vendor application.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Business Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><strong>Name:</strong> {formData.businessInfo.businessName}</p>
                  <p><strong>Type:</strong> {formData.businessInfo.businessType}</p>
                  <p><strong>Website:</strong> {formData.businessInfo.website}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><strong>Name:</strong> {formData.contactInfo.firstName} {formData.contactInfo.lastName}</p>
                  <p><strong>Email:</strong> {formData.contactInfo.email}</p>
                  <p><strong>Phone:</strong> {formData.contactInfo.phone}</p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Documents Uploaded</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm">Business License</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm">Tax Certificate</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm">Identity Proof</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 text-yellow-600 mr-2" />
                    <span className="text-sm">Bank Statement (Optional)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Vendor Application</h1>
        <p className="text-gray-600">Complete your vendor registration to start selling on our platform</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {steps.map((step) => {
            const StepIcon = step.icon;
            return (
              <div key={step.id} className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step.id <= currentStep 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  <StepIcon className="h-5 w-5" />
                </div>
                <span className="text-xs mt-2 text-center max-w-20">{step.title}</span>
              </div>
            );
          })}
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

      {/* Step Content */}
      <Card>
        <CardHeader>
          <CardTitle>
            Step {currentStep}: {steps[currentStep - 1].title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderStepContent()}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          Previous
        </Button>
        
        {currentStep === steps.length ? (
          <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
            Submit Application
          </Button>
        ) : (
          <Button onClick={handleNext}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default VendorOnboarding;
