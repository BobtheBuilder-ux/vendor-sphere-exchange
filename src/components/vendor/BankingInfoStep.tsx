
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";

interface BankingInfo {
  accountName: string;
  accountNumber: string;
  routingNumber: string;
  bankName: string;
}

interface BankingInfoStepProps {
  bankingInfo: BankingInfo;
  onUpdate: (bankingInfo: BankingInfo) => void;
}

const BankingInfoStep = ({ bankingInfo, onUpdate }: BankingInfoStepProps) => {
  const handleChange = (field: keyof BankingInfo, value: string) => {
    onUpdate({ ...bankingInfo, [field]: value });
  };

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
          value={bankingInfo.accountName}
          onChange={(e) => handleChange('accountName', e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="bankName">Bank Name *</Label>
        <Input
          id="bankName"
          value={bankingInfo.bankName}
          onChange={(e) => handleChange('bankName', e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="accountNumber">Account Number *</Label>
        <Input
          id="accountNumber"
          type="password"
          value={bankingInfo.accountNumber}
          onChange={(e) => handleChange('accountNumber', e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="routingNumber">Routing Number *</Label>
        <Input
          id="routingNumber"
          value={bankingInfo.routingNumber}
          onChange={(e) => handleChange('routingNumber', e.target.value)}
        />
      </div>
    </div>
  );
};

export default BankingInfoStep;
