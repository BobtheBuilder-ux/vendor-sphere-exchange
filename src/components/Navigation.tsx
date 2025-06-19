import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, MessageSquare, User, Store, LogOut, Filter, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useClerkAuth";
import { useSearch } from "@/contexts/SearchContext";
import { getSearchSuggestions } from "@/lib/search";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileMenu from "@/components/MobileMenu";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [cartItems] = useState(0);
  const [unreadMessages] = useState(2);
  const { user } = useAuth();
  const { updateFilters } = useSearch();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.length >= 2) {
        const results = await getSearchSuggestions(searchQuery);
        setSuggestions(results);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      updateFilters({ query: searchQuery });
      navigate('/search');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    updateFilters({ query: suggestion });
    navigate('/search');
    setShowSuggestions(false);
  };

  const getDashboardLink = () => {
    if (!user) return null;
    switch (user.userType) {
      case "admin":
        return "/admin/dashboard";
      case "vendor":
        return "/vendor/dashboard";
      case "buyer":
        return "/customer/dashboard";
      default:
        return "/customer/dashboard";
    }
  };

  const getDashboardLabel = () => {
    if (!user) return "Dashboard";
    switch (user.userType) {
      case "admin":
        return "Admin Dashboard";
      case "vendor":
        return "Vendor Dashboard";
      case "buyer":
        return "My Account";
      default:
        return "My Account";
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Mobile Menu */}
          <MobileMenu cartItems={cartItems} unreadMessages={unreadMessages} />

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Store className="h-8 w-8 text-primary" />
            <span className={`text-xl font-bold text-primary ${isMobile ? 'hidden sm:block' : ''}`}>
              VendorSphere
            </span>
          </Link>

          {/* Enhanced Search Bar - Hidden on mobile */}
          <div className={`flex-1 max-w-2xl mx-8 ${isMobile ? 'hidden' : ''}`} ref={searchRef}>
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search products, services, or vendors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                className="pl-10 pr-20"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                <Button type="submit" size="sm">
                  Search
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigate('/search')}
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </div>

              {/* Search Suggestions */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center">
                        <Search className="h-4 w-4 text-gray-400 mr-2" />
                        {suggestion}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </form>
          </div>

          {/* Mobile Search Button */}
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/search')}
              className="sm:hidden"
            >
              <Search className="h-5 w-5" />
            </Button>
          )}

          {/* Navigation Items - Hidden on mobile */}
          <div className={`flex items-center space-x-4 ${isMobile ? 'hidden' : ''}`}>
            {/* Dashboard Link - Only show when logged in */}
            <SignedIn>
              {user && (
                <Link to={getDashboardLink()!}>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
              )}
            </SignedIn>

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
            <SignedOut>
              <SignInButton fallbackRedirectUrl="/">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <UserButton 
                afterSignOutUrl="/"
                userProfileProps={{
                  additionalOAuthScopes: {
                    google: ['email', 'profile']
                  }
                }}
              />
            </SignedIn>
          </div>

          {/* Mobile Cart & Messages Icons */}
          {isMobile && (
            <div className="flex items-center space-x-2 sm:hidden">
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
            </div>
          )}
        </div>

        {/* Category Navigation - Hidden on mobile */}
        {!isMobile && (
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
        )}
      </div>
    </nav>
  );
};

export default Navigation;
