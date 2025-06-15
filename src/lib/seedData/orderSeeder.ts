
import { collection, writeBatch, doc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Order } from "@/types/firestore";
import { productNames } from "./sampleData";

export const createOrders = async (userId: string, vendorIds: string[]): Promise<number> => {
  try {
    const batch = writeBatch(db);
    let orderCount = 0;
    
    for (let i = 0; i < 20; i++) {
      const docRef = doc(collection(db, "orders"));
      
      const itemCount = Math.floor(Math.random() * 3) + 1;
      const items = [];
      let subtotal = 0;
      
      for (let j = 0; j < itemCount; j++) {
        const price = Math.floor(Math.random() * 100) + 20;
        const quantity = Math.floor(Math.random() * 3) + 1;
        
        items.push({
          productId: `product_${Math.floor(Math.random() * 120)}`,
          productName: productNames[Math.floor(Math.random() * productNames.length)],
          price,
          quantity,
          vendorId: vendorIds[Math.floor(Math.random() * vendorIds.length)]
        });
        
        subtotal += price * quantity;
      }
      
      const shipping = 9.99;
      const tax = subtotal * 0.08;
      const total = subtotal + shipping + tax;
      
      const order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'> = {
        userId,
        items,
        subtotal,
        shipping,
        tax,
        total,
        status: ['pending', 'confirmed', 'processing', 'shipped', 'delivered'][Math.floor(Math.random() * 5)] as Order['status'],
        shippingInfo: {
          firstName: "John",
          lastName: "Doe",
          email: "john.doe@example.com",
          address: "123 Main St",
          city: "Anytown",
          state: "CA",
          zipCode: "12345",
          shippingMethod: 'standard'
        },
        paymentDetails: {
          method: 'card',
          transactionId: `txn_${Math.random().toString(36).substr(2, 9)}`,
          paymentStatus: 'completed'
        }
      };
      
      batch.set(docRef, {
        ...order,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      orderCount++;
    }
    
    await batch.commit();
    return orderCount;
  } catch (error) {
    console.error("Error creating orders:", error);
    throw new Error("Failed to create orders");
  }
};
