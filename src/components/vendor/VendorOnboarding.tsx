
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Building,
  FileText,
  Upload,
  CreditCard,
  CheckCircle
} from "lucide-react";
import VendorOnboardingSteps from "./VendorOnboardingSteps";
import BusinessInfoStep from "./BusinessInfoStep";
import ContactInfoStep from "./ContactInfoStep";
import DocumentUploadStep from "./DocumentUploadStep";
import BankingInfoStep from "./BankingInfoStep";
import ReviewStep from "./ReviewStep";

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

  const updateBusinessInfo = (businessInfo: typeof formData.businessInfo) => {
    setFormData({ ...formData, businessInfo });
  };

  const updateContactInfo = (contactInfo: typeof formData.contactInfo) => {
    setFormData({ ...formData, contactInfo });
  };

  const updateDocuments = (documents: typeof formData.documents) => {
    setFormData({ ...formData, documents });
  };

  const updateBankingInfo = (bankingInfo: typeof formData.bankingInfo) => {
    setFormData({ ...formData, bankingInfo });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <BusinessInfoStep
            businessInfo={formData.businessInfo}
            onUpdate={updateBusinessInfo}
          />
        );
      case 2:
        return (
          <ContactInfoStep
            contactInfo={formData.contactInfo}
            onUpdate={updateContactInfo}
          />
        );
      case 3:
        return (
          <DocumentUploadStep
            documents={formData.documents}
            onUpdate={updateDocuments}
          />
        );
      case 4:
        return (
          <BankingInfoStep
            bankingInfo={formData.bankingInfo}
            onUpdate={updateBankingInfo}
          />
        );
      case 5:
        return <ReviewStep formData={formData} />;
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

      <VendorOnboardingSteps currentStep={currentStep} steps={steps} />

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
