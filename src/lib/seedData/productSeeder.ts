
import { collection, writeBatch, doc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Product } from "@/types/firestore";
import { productNames, descriptions } from "./sampleData";

export const createProducts = async (categoryIds: string[], vendorIds: string[]): Promise<number> => {
  try {
    const batches: any[] = [];
    let currentBatch = writeBatch(db);
    let operationCount = 0;
    let productCount = 0;
    
    // Create 100+ products
    for (let i = 0; i < 120; i++) {
      const docRef = doc(collection(db, "products"));
      
      const product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'> = {
        name: productNames[i % productNames.length] + (i >= productNames.length ? ` ${Math.floor(i / productNames.length) + 1}` : ''),
        price: Math.floor(Math.random() * 200) + 10,
        description: descriptions[Math.floor(Math.random() * descriptions.length)],
        images: ["/placeholder.svg"],
        imageUrl: "/placeholder.svg",
        vendorId: vendorIds[Math.floor(Math.random() * vendorIds.length)],
        categoryId: categoryIds[Math.floor(Math.random() * categoryIds.length)],
        stock: Math.floor(Math.random() * 100) + 1,
        isActive: true,
        rating: 3.5 + Math.random() * 1.5,
        totalReviews: Math.floor(Math.random() * 200) + 5
      };
      
      currentBatch.set(docRef, {
        ...product,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      operationCount++;
      productCount++;
      
      if (operationCount === 450) {
        batches.push(currentBatch);
        currentBatch = writeBatch(db);
        operationCount = 0;
      }
    }
    
    if (operationCount > 0) {
      batches.push(currentBatch);
    }
    
    for (const batch of batches) {
      await batch.commit();
    }
    
    return productCount;
  } catch (error) {
    console.error("Error creating products:", error);
    throw new Error("Failed to create products");
  }
};
