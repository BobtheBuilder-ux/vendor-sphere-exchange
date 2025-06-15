
import { 
  Building,
  FileText,
  Upload,
  CreditCard,
  CheckCircle
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface Step {
  id: number;
  title: string;
  icon: React.ComponentType<any>;
}

interface VendorOnboardingStepsProps {
  currentStep: number;
  steps: Step[];
}

const VendorOnboardingSteps = ({ currentStep, steps }: VendorOnboardingStepsProps) => {
  const progressPercentage = (currentStep / steps.length) * 100;

  return (
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
  );
};

export default VendorOnboardingSteps;
