
import { User, ShoppingBag, Heart, MapPin, CreditCard, MessageSquare } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface DashboardSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const DashboardSidebar = ({ activeTab, onTabChange }: DashboardSidebarProps) => {
  const navigationItems = [
    { id: "orders", label: "My Orders", icon: ShoppingBag },
    { id: "favorites", label: "Favorites", icon: Heart },
    { id: "addresses", label: "Addresses", icon: MapPin },
    { id: "payments", label: "Payment Methods", icon: CreditCard },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "profile", label: "Profile Settings", icon: User },
  ];

  return (
    <Card>
      <CardContent className="p-0">
        <div className="p-6 border-b">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="font-semibold">John Doe</p>
              <p className="text-sm text-gray-600">john.doe@example.com</p>
            </div>
          </div>
        </div>
        <nav className="p-2">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === item.id 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-gray-100'
              }`}
            >
              <item.icon className="h-4 w-4" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </CardContent>
    </Card>
  );
};

export default DashboardSidebar;
