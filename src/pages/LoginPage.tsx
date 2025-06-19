
import { Link } from "react-router-dom";
import { Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center space-x-2">
            <Store className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">VendorSphere</span>
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Access your VendorSphere account
          </p>
        </div>

        <SignedOut>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>
                  Sign in to access your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SignInButton fallbackRedirectUrl="/">
                  <Button className="w-full">
                    Sign In
                  </Button>
                </SignInButton>
              </CardContent>
            </Card>

            <div className="text-center">
              <Link to="/admin/login" className="text-sm text-gray-600 hover:text-primary">
                Admin? Sign in here
              </Link>
            </div>
          </div>
        </SignedOut>

        <SignedIn>
          <Card>
            <CardHeader>
              <CardTitle>Welcome back!</CardTitle>
              <CardDescription>
                You are already signed in
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <UserButton afterSignOutUrl="/" />
              <Link to="/">
                <Button variant="outline">
                  Go to Homepage
                </Button>
              </Link>
            </CardContent>
          </Card>
        </SignedIn>
      </div>
    </div>
  );
};

export default LoginPage;
