
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ShoppingCart, MessageSquare, User, Menu, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems] = useState(3); // Mock cart count
  const [unreadMessages] = useState(2); // Mock message count

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to search results
    console.log("Searching for:", searchQuery);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Store className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-primary">VendorSphere</span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search products, services, or vendors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Button type="submit" size="sm" className="absolute right-2 top-1/2 transform -translate-y-1/2">
                Search
              </Button>
            </div>
          </form>

          {/* Navigation Items */}
          <div className="flex items-center space-x-4">
            {/* Messages */}
            <Link to="/messages" className="relative">
              <Button variant="ghost" size="icon">
                <MessageSquare className="h-5 w-5" />
                {unreadMessages > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full text-xs">
                    {unreadMessages}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {cartItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full text-xs">
                    {cartItems}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/profile">My Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/orders">My Orders</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/vendor/dashboard">Vendor Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/login">Sign In</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/register">Sign Up</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="border-t py-2">
          <div className="flex items-center space-x-6 text-sm">
            <Link to="/categories/electronics" className="hover:text-primary transition-colors">
              Electronics
            </Link>
            <Link to="/categories/fashion" className="hover:text-primary transition-colors">
              Fashion
            </Link>
            <Link to="/categories/home" className="hover:text-primary transition-colors">
              Home & Garden
            </Link>
            <Link to="/categories/services" className="hover:text-primary transition-colors">
              Services
            </Link>
            <Link to="/categories/automotive" className="hover:text-primary transition-colors">
              Automotive
            </Link>
            <Link to="/vendors" className="hover:text-primary transition-colors">
              All Vendors
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
