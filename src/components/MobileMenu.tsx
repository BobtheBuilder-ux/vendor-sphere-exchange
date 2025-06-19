
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, MessageSquare, User, Store, Search, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useClerkAuth";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

interface MobileMenuProps {
  cartItems: number;
  unreadMessages: number;
}

const MobileMenu = ({ cartItems, unreadMessages }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  if (!isMobile) return null;

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[280px] sm:w-[320px]">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2">
            <Store className="h-6 w-6 text-primary" />
            <span>VendorSphere</span>
          </SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-4">
          {/* Search Button */}
          <Button 
            variant="outline" 
            className="w-full justify-start"
            onClick={() => handleNavigation('/search')}
          >
            <Search className="h-4 w-4 mr-2" />
            Search Products
          </Button>

          <Separator />

          {/* Quick Actions */}
          <div className="space-y-2">
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => handleNavigation('/messages')}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Messages
              {unreadMessages > 0 && (
                <Badge className="ml-auto h-5 w-5 rounded-full text-xs">
                  {unreadMessages}
                </Badge>
              )}
            </Button>
            
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => handleNavigation('/cart')}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Cart
              {cartItems > 0 && (
                <Badge className="ml-auto h-5 w-5 rounded-full text-xs">
                  {cartItems}
                </Badge>
              )}
            </Button>
          </div>

          <Separator />

          {/* Categories */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-gray-600 px-2">Categories</h3>
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => handleNavigation('/categories/electronics')}
            >
              Electronics
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => handleNavigation('/categories/fashion')}
            >
              Fashion
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => handleNavigation('/categories/home-garden')}
            >
              Home & Garden
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => handleNavigation('/categories/services')}
            >
              Services
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => handleNavigation('/categories/automotive')}
            >
              Automotive
            </Button>
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => handleNavigation('/vendors')}
            >
              All Vendors
            </Button>
          </div>

          <Separator />

          {/* User Section */}
          {user ? (
            <div className="space-y-2">
              <div className="px-2 py-2 text-sm">
                <p className="font-medium">{user.firstName} {user.lastName}</p>
                <p className="text-gray-600">{user.email}</p>
              </div>
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => handleNavigation('/profile')}
              >
                <User className="h-4 w-4 mr-2" />
                My Profile
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => handleNavigation('/orders')}
              >
                My Orders
              </Button>
              {user.userType === "vendor" && (
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={() => handleNavigation('/vendor/dashboard')}
                >
                  Vendor Dashboard
                </Button>
              )}
              {user.userType === "admin" && (
                <Button 
                  variant="ghost" 
                  className="w-full justify-start"
                  onClick={() => handleNavigation('/admin/dashboard')}
                >
                  Admin Dashboard
                </Button>
              )}
              <Button 
                variant="ghost" 
                className="w-full justify-start text-red-600"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => handleNavigation('/login')}
              >
                Sign In
              </Button>
              <Button 
                className="w-full"
                onClick={() => handleNavigation('/register')}
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
