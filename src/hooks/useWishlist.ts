
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

interface WishlistItem {
  id: string;
  productId: string;
  userId: string;
  createdAt: Date;
}

export const useWishlist = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [wishlistItems, setWishlistItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadWishlist();
    } else {
      // Load from localStorage for non-authenticated users
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        setWishlistItems(JSON.parse(savedWishlist));
      }
    }
  }, [user]);

  const loadWishlist = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // In a real app, this would fetch from Firestore
      // For now, we'll use localStorage as a placeholder
      const savedWishlist = localStorage.getItem(`wishlist_${user.id}`);
      if (savedWishlist) {
        setWishlistItems(JSON.parse(savedWishlist));
      }
    } catch (error) {
      console.error('Error loading wishlist:', error);
      toast({
        title: "Error",
        description: "Failed to load wishlist",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (productId: string) => {
    try {
      const newWishlist = [...wishlistItems, productId];
      setWishlistItems(newWishlist);
      
      if (user) {
        localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(newWishlist));
      } else {
        localStorage.setItem('wishlist', JSON.stringify(newWishlist));
      }
      
      toast({
        title: "Added to Wishlist",
        description: "Product added to your wishlist",
      });
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      toast({
        title: "Error",
        description: "Failed to add to wishlist",
        variant: "destructive",
      });
    }
  };

  const removeFromWishlist = async (productId: string) => {
    try {
      const newWishlist = wishlistItems.filter(id => id !== productId);
      setWishlistItems(newWishlist);
      
      if (user) {
        localStorage.setItem(`wishlist_${user.id}`, JSON.stringify(newWishlist));
      } else {
        localStorage.setItem('wishlist', JSON.stringify(newWishlist));
      }
      
      toast({
        title: "Removed from Wishlist",
        description: "Product removed from your wishlist",
      });
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast({
        title: "Error",
        description: "Failed to remove from wishlist",
        variant: "destructive",
      });
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.includes(productId);
  };

  const clearWishlist = async () => {
    try {
      setWishlistItems([]);
      
      if (user) {
        localStorage.removeItem(`wishlist_${user.id}`);
      } else {
        localStorage.removeItem('wishlist');
      }
      
      toast({
        title: "Wishlist Cleared",
        description: "All items removed from wishlist",
      });
    } catch (error) {
      console.error('Error clearing wishlist:', error);
      toast({
        title: "Error",
        description: "Failed to clear wishlist",
        variant: "destructive",
      });
    }
  };

  return {
    wishlistItems,
    loading,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    wishlistCount: wishlistItems.length
  };
};
