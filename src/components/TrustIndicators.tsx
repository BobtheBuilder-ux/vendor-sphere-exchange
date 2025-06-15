
import { Shield, Truck, MessageSquare, Award, RefreshCw, CreditCard } from "lucide-react";

const TrustIndicators = () => {
  const features = [
    {
      icon: Shield,
      title: "Secure Payments",
      description: "All transactions are protected with bank-level encryption"
    },
    {
      icon: Truck,
      title: "Fast Shipping",
      description: "Quick delivery from verified vendors worldwide"
    },
    {
      icon: MessageSquare,
      title: "Direct Communication",
      description: "Chat directly with vendors for better service"
    },
    {
      icon: Award,
      title: "Quality Guarantee",
      description: "All vendors are verified and quality-checked"
    },
    {
      icon: RefreshCw,
      title: "Easy Returns",
      description: "Hassle-free return policy for your peace of mind"
    },
    {
      icon: CreditCard,
      title: "Multiple Payment Options",
      description: "Pay with credit cards, digital wallets, and more"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose VendorSphere?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're committed to providing a safe, reliable, and efficient marketplace experience
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        
        {/* Stats Section */}
        <div className="mt-16 pt-16 border-t">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">10,000+</div>
              <div className="text-gray-600">Active Vendors</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">500K+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">1M+</div>
              <div className="text-gray-600">Products & Services</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">99.8%</div>
              <div className="text-gray-600">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;
