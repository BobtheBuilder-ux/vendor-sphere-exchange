
import { writeBatch, doc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import { mockCategories, mockVendors, generateMoreProducts } from "@/lib/mockData";

export const seedFirebaseWithBatch = async () => {
  console.log("Starting Firebase batch seeding...");
  
  try {
    // Ensure user is authenticated
    if (!auth.currentUser) {
      console.error("No authenticated user found");
      throw new Error("User must be authenticated to seed data");
    }

    console.log("Authenticated user:", auth.currentUser.email);
    
    const batch = writeBatch(db);
    let operationCount = 0;
    
    // Seed categories
    console.log("Adding categories to batch...");
    for (const category of mockCategories) {
      const categoryRef = doc(db, "categories", category.id);
      batch.set(categoryRef, {
        ...category,
        isActive: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      operationCount++;
    }
    
    // Seed vendors
    console.log("Adding vendors to batch...");
    for (const vendor of mockVendors) {
      const vendorRef = doc(db, "vendors", vendor.id);
      batch.set(vendorRef, {
        userId: `user_${vendor.id}`,
        businessName: vendor.name,
        description: `Professional ${vendor.name} providing quality products and services`,
        contactEmail: `contact@${vendor.name.toLowerCase().replace(/\s+/g, '')}.com`,
        contactPhone: "+1-555-" + Math.floor(Math.random() * 9000 + 1000),
        isActive: true,
        isVerified: true,
        rating: vendor.rating,
        totalReviews: vendor.reviews,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      operationCount++;
    }
    
    // Check if we need to commit first batch (Firestore has 500 operation limit per batch)
    if (operationCount >= 400) {
      console.log("Committing first batch...");
      await batch.commit();
      operationCount = 0;
    }
    
    // Generate and seed products
    console.log("Adding products to batch...");
    const products = generateMoreProducts(50);
    const secondBatch = writeBatch(db);
    
    for (const product of products) {
      const productRef = doc(db, "products", product.id);
      secondBatch.set(productRef, {
        name: product.name,
        price: product.price,
        description: product.description,
        images: [product.image],
        imageUrl: product.image, // backward compatibility
        vendorId: product.vendorId,
        categoryId: product.categoryId,
        stock: Math.floor(Math.random() * 100) + 10,
        isActive: true,
        rating: product.rating,
        totalReviews: product.reviews,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    }
    
    // Commit batches
    if (operationCount > 0) {
      console.log("Committing remaining operations...");
      await batch.commit();
    }
    
    console.log("Committing products batch...");
    await secondBatch.commit();
    
    console.log("Firebase seeding completed successfully!");
    return {
      success: true,
      message: `Successfully seeded ${mockCategories.length} categories, ${mockVendors.length} vendors, and ${products.length} products to Firebase!`
    };
    
  } catch (error) {
    console.error("Firebase seeding failed:", error);
    return {
      success: false,
      message: `Seeding failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    };
  }
};
