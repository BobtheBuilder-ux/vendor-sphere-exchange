
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

interface ContactInfoStepProps {
  contactInfo: ContactInfo;
  onUpdate: (contactInfo: ContactInfo) => void;
}

const ContactInfoStep = ({ contactInfo, onUpdate }: ContactInfoStepProps) => {
  const handleChange = (field: keyof ContactInfo, value: string) => {
    onUpdate({ ...contactInfo, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={contactInfo.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={contactInfo.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          value={contactInfo.email}
          onChange={(e) => handleChange('email', e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="phone">Phone *</Label>
        <Input
          id="phone"
          value={contactInfo.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="address">Business Address *</Label>
        <Input
          id="address"
          value={contactInfo.address}
          onChange={(e) => handleChange('address', e.target.value)}
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            value={contactInfo.city}
            onChange={(e) => handleChange('city', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="state">State *</Label>
          <Input
            id="state"
            value={contactInfo.state}
            onChange={(e) => handleChange('state', e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="zipCode">ZIP Code *</Label>
          <Input
            id="zipCode"
            value={contactInfo.zipCode}
            onChange={(e) => handleChange('zipCode', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactInfoStep;
