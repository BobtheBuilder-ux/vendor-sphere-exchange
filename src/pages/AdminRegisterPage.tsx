
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store, ArrowLeft, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/useAuth";

const AdminRegisterPage = () => {
  const [formData, setFormData] = useState({
    adminCode: "",
    agreeToTerms: false
  });
  const { signInWithGoogle, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    if (!formData.agreeToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    // Verify admin code (in a real app, this would be validated on the backend)
    if (formData.adminCode !== "ADMIN2024") {
      alert("Invalid admin access code");
      return;
    }

    try {
      await signInWithGoogle("admin");
      navigate("/admin/dashboard");
    } catch (error) {
      // Error is handled by the auth hook with toast
    }
  };

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
            Admin Access
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Administrative access to the VendorSphere platform
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Administrator Sign In
            </CardTitle>
            <CardDescription>
              Enter your admin access code to continue
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="adminCode">Admin Access Code *</Label>
              <Input
                id="adminCode"
                type="password"
                value={formData.adminCode}
                onChange={(e) => updateFormData("adminCode", e.target.value)}
                required
                placeholder="Enter admin access code"
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                Contact your system administrator for the access code
              </p>
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
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-primary hover:text-primary/80">
                  Privacy Policy
                </Link>
              </Label>
            </div>

            <Button 
              onClick={handleGoogleSignIn} 
              className="w-full" 
              disabled={isLoading}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {isLoading ? "Signing in..." : "Continue with Google"}
            </Button>

            <div className="text-center">
              <Link to="/login" className="inline-flex items-center text-sm text-primary hover:text-primary/80">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to sign in options
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminRegisterPage;
