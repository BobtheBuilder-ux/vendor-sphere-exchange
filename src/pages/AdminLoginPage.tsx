
import { Link } from "react-router-dom";
import { Store, Shield, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

const AdminLoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center space-x-2">
            <Store className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">VendorSphere</span>
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Admin Sign In
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Administrative access to manage the platform
          </p>
        </div>

        <SignedOut>
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2 text-orange-600" />
                Admin Access
              </CardTitle>
              <CardDescription>
                Sign in with your admin account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SignInButton fallbackRedirectUrl="/admin/dashboard">
                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  Sign in as Admin
                </Button>
              </SignInButton>
              
              <div className="text-center mt-4">
                <Link to="/login" className="inline-flex items-center text-sm text-gray-600 hover:text-primary">
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to main sign in
                </Link>
              </div>
            </CardContent>
          </Card>
        </SignedOut>

        <SignedIn>
          <Card>
            <CardHeader>
              <CardTitle>Admin Access</CardTitle>
              <CardDescription>
                You are signed in as an admin
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <UserButton afterSignOutUrl="/" />
              <Link to="/admin/dashboard">
                <Button>
                  Go to Admin Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>
        </SignedIn>
      </div>
    </div>
  );
};

export default AdminLoginPage;
