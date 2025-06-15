
import { useState, useEffect } from "react";
import { getProduct, updateProduct } from "@/lib/firestore";
import { useToast } from "@/hooks/use-toast";

export const useInventory = () => {
  const { toast } = useToast();

  const checkProductStock = async (productId: string, requiredQuantity: number) => {
    try {
      const product = await getProduct(productId);
      if (!product) {
        return { available: false, reason: "Product not found" };
      }
      
      if (!product.isActive) {
        return { available: false, reason: "Product is not available" };
      }
      
      if (product.stock < requiredQuantity) {
        return { 
          available: false, 
          reason: `Only ${product.stock} items available`,
          availableStock: product.stock
        };
      }
      
      return { available: true, product };
    } catch (error) {
      console.error("Error checking stock:", error);
      return { available: false, reason: "Error checking stock" };
    }
  };

  const updateProductStock = async (productId: string, quantityPurchased: number) => {
    try {
      const product = await getProduct(productId);
      if (!product) {
        throw new Error("Product not found");
      }
      
      const newStock = product.stock - quantityPurchased;
      if (newStock < 0) {
        throw new Error("Insufficient stock");
      }
      
      await updateProduct(productId, { 
        stock: newStock,
        isActive: newStock > 0 ? product.isActive : false
      });
      
      if (newStock === 0) {
        toast({
          title: "Product Out of Stock",
          description: `${product.name} is now out of stock`,
        });
      } else if (newStock <= 5) {
        toast({
          title: "Low Stock Alert",
          description: `${product.name} has only ${newStock} items left`,
        });
      }
      
      return { success: true, newStock };
    } catch (error) {
      console.error("Error updating stock:", error);
      toast({
        title: "Stock Update Failed",
        description: "Failed to update product stock",
        variant: "destructive",
      });
      return { success: false, error };
    }
  };

  const validateCartInventory = async (cartItems: Array<{ productId: string; quantity: number }>) => {
    const validationResults = [];
    
    for (const item of cartItems) {
      const stockCheck = await checkProductStock(item.productId, item.quantity);
      validationResults.push({
        productId: item.productId,
        ...stockCheck
      });
    }
    
    const hasIssues = validationResults.some(result => !result.available);
    return { valid: !hasIssues, results: validationResults };
  };

  return {
    checkProductStock,
    updateProductStock,
    validateCartInventory
  };
};
