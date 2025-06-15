
import { Button } from "@/components/ui/button";
import { ArrowRight, Store, Users, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-background py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Connect with
              <span className="text-primary block">Trusted Vendors</span>
              Worldwide
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Discover thousands of products and services from verified vendors. 
              Shop with confidence, chat directly with sellers, and experience 
              seamless transactions on our secure platform.
            </p>
            
            {/* Google Sign-In Note */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <Shield className="inline h-4 w-4 mr-2" />
                Secure authentication powered by Google Sign-In. No passwords to remember!
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8" asChild>
                <Link to="/search">
                  Start Shopping
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                <Link to="/register">
                  Join as Vendor
                </Link>
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex items-center space-x-8 pt-8">
              <div className="flex items-center space-x-2">
                <Store className="h-5 w-5 text-primary" />
                <span className="text-sm text-gray-600">10,000+ Vendors</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="text-sm text-gray-600">500K+ Customers</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm text-gray-600">Google Secure Auth</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
              <h3 className="text-2xl font-semibold">Featured Today</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Store className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">TechGear Pro</p>
                    <p className="text-sm text-gray-600">Electronics & Gadgets</p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-sm font-medium">4.8★</p>
                    <p className="text-xs text-gray-600">2.1k reviews</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Store className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Fashion Hub</p>
                    <p className="text-sm text-gray-600">Clothing & Accessories</p>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-sm font-medium">4.9★</p>
                    <p className="text-xs text-gray-600">1.8k reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
