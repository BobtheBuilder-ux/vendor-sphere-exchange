
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { 
  getUserCart, 
  addToCart, 
  updateCartItem, 
  removeFromCart, 
  clearUserCart,
  getProduct
} from "@/lib/firestore";
import { CartItem, Product } from "@/types/firestore";

interface CartItemWithProduct extends CartItem {
  product?: Product;
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItemWithProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  // Load cart items on mount and when user changes
  useEffect(() => {
    if (user) {
      loadCart();
    } else {
      setCartItems([]);
    }
  }, [user]);

  const loadCart = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const items = await getUserCart(user.id);
      
      // Fetch product details for each cart item
      const itemsWithProducts = await Promise.all(
        items.map(async (item) => {
          try {
            const product = await getProduct(item.productId);
            return { ...item, product };
          } catch (error) {
            console.warn("Failed to load product for cart item:", item.productId);
            return { ...item, product: undefined };
          }
        })
      );
      
      setCartItems(itemsWithProducts);
    } catch (error) {
      console.error("Error loading cart:", error);
      // Don't show toast error for cart loading - it's not critical
      setCartItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  const addItemToCart = async (productId: string, quantity: number = 1) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to add items to cart",
        variant: "destructive",
      });
      return;
    }

    try {
      await addToCart({
        userId: user.id,
        productId,
        quantity
      });
      
      await loadCart();
      
      toast({
        title: "Success",
        description: "Item added to cart",
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast({
        title: "Error",
        description: "Failed to add item to cart",
        variant: "destructive",
      });
    }
  };

  const updateItemQuantity = async (cartItemId: string, quantity: number) => {
    try {
      if (quantity <= 0) {
        await removeItemFromCart(cartItemId);
        return;
      }
      
      await updateCartItem(cartItemId, quantity);
      await loadCart();
    } catch (error) {
      console.error("Error updating cart item:", error);
      toast({
        title: "Error",
        description: "Failed to update cart item",
        variant: "destructive",
      });
    }
  };

  const removeItemFromCart = async (cartItemId: string) => {
    try {
      await removeFromCart(cartItemId);
      await loadCart();
      
      toast({
        title: "Success",
        description: "Item removed from cart",
      });
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast({
        title: "Error",
        description: "Failed to remove item from cart",
        variant: "destructive",
      });
    }
  };

  const clearCart = async () => {
    if (!user) return;
    
    try {
      await clearUserCart(user.id);
      setCartItems([]);
      
      toast({
        title: "Success",
        description: "Cart cleared",
      });
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast({
        title: "Error",
        description: "Failed to clear cart",
        variant: "destructive",
      });
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      if (item.product) {
        return total + (item.product.price * item.quantity);
      }
      return total;
    }, 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return {
    cartItems,
    isLoading,
    addItemToCart,
    updateItemQuantity,
    removeItemFromCart,
    clearCart,
    getCartTotal,
    getCartItemCount,
    refreshCart: loadCart
  };
};
