
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface BusinessInfo {
  businessName: string;
  businessType: string;
  description: string;
  website: string;
  taxId: string;
  registrationNumber: string;
}

interface BusinessInfoStepProps {
  businessInfo: BusinessInfo;
  onUpdate: (businessInfo: BusinessInfo) => void;
}

const BusinessInfoStep = ({ businessInfo, onUpdate }: BusinessInfoStepProps) => {
  const handleChange = (field: keyof BusinessInfo, value: string) => {
    onUpdate({ ...businessInfo, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="businessName">Business Name *</Label>
        <Input
          id="businessName"
          value={businessInfo.businessName}
          onChange={(e) => handleChange('businessName', e.target.value)}
          placeholder="Enter your business name"
        />
      </div>
      <div>
        <Label htmlFor="businessType">Business Type *</Label>
        <Input
          id="businessType"
          value={businessInfo.businessType}
          onChange={(e) => handleChange('businessType', e.target.value)}
          placeholder="e.g., LLC, Corporation, Partnership"
        />
      </div>
      <div>
        <Label htmlFor="description">Business Description *</Label>
        <Textarea
          id="description"
          value={businessInfo.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Describe your business and products"
          rows={3}
        />
      </div>
      <div>
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          value={businessInfo.website}
          onChange={(e) => handleChange('website', e.target.value)}
          placeholder="https://your-website.com"
        />
      </div>
    </div>
  );
};

export default BusinessInfoStep;
