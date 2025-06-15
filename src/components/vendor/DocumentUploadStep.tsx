
import DocumentUpload from "./DocumentUpload";

interface Documents {
  businessLicense: File | null;
  taxCertificate: File | null;
  bankStatement: File | null;
  identityProof: File | null;
}

interface DocumentUploadStepProps {
  documents: Documents;
  onUpdate: (documents: Documents) => void;
}

const DocumentUploadStep = ({ documents, onUpdate }: DocumentUploadStepProps) => {
  const handleFileUpload = (documentType: keyof Documents, file: File) => {
    onUpdate({ ...documents, [documentType]: file });
  };

  return (
    <div className="space-y-6">
      <DocumentUpload
        title="Business License"
        description="Upload your business license or registration certificate"
        required
        onUpload={(file) => handleFileUpload('businessLicense', file)}
      />
      <DocumentUpload
        title="Tax Certificate"
        description="Upload your tax registration certificate"
        required
        onUpload={(file) => handleFileUpload('taxCertificate', file)}
      />
      <DocumentUpload
        title="Bank Statement"
        description="Upload a recent bank statement (last 3 months)"
        onUpload={(file) => handleFileUpload('bankStatement', file)}
      />
      <DocumentUpload
        title="Identity Proof"
        description="Upload government-issued ID (Driver's License, Passport, etc.)"
        required
        onUpload={(file) => handleFileUpload('identityProof', file)}
      />
    </div>
  );
};

export default DocumentUploadStep;
