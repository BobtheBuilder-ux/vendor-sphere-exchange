
import { collection, writeBatch, doc, serverTimestamp, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const simpleSeedDatabase = async () => {
  console.log("Starting simple database seeding...");
  
  try {
    // Check if data already exists
    const categoriesSnapshot = await getDocs(collection(db, "categories"));
    if (!categoriesSnapshot.empty) {
      console.log("Database already has data, skipping seed");
      return { success: true, message: "Database already seeded" };
    }

    let batch = writeBatch(db);
    let operationCount = 0;
    
    // Create categories
    const categories = [
      { name: "Electronics", description: "Latest gadgets and electronic devices" },
      { name: "Fashion", description: "Trendy clothing and accessories" },
      { name: "Home & Garden", description: "Home improvement and garden supplies" },
      { name: "Health & Beauty", description: "Personal care and wellness products" },
      { name: "Sports & Outdoors", description: "Athletic and outdoor equipment" }
    ];
    
    const categoryIds: string[] = [];
    
    categories.forEach((category) => {
      const docRef = doc(collection(db, "categories"));
      categoryIds.push(docRef.id);
      
      batch.set(docRef, {
        ...category,
        isActive: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      operationCount++;
    });
    
    // Create vendors
    const vendors = [
      "TechGear Pro", "Fashion Hub", "Home Essentials", "Beauty World", "Sports Zone"
    ];
    
    const vendorIds: string[] = [];
    
    vendors.forEach((name, index) => {
      const docRef = doc(collection(db, "vendors"));
      vendorIds.push(docRef.id);
      
      batch.set(docRef, {
        userId: `demo_vendor_${index}`,
        businessName: name,
        description: `${name} - Your trusted partner for quality products and excellent service.`,
        contactEmail: `contact@${name.toLowerCase().replace(/\s+/g, '')}.com`,
        contactPhone: `+1-555-${String(index).padStart(3, '0')}-1234`,
        isActive: true,
        isVerified: true,
        rating: 4.0 + Math.random() * 1.0,
        totalReviews: Math.floor(Math.random() * 500) + 50,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      operationCount++;
    });
    
    // Commit first batch
    await batch.commit();
    console.log("First batch committed successfully");
    
    // Create products in a new batch
    batch = writeBatch(db);
    operationCount = 0;
    
    const productNames = [
      "Wireless Bluetooth Headphones", "Smart Fitness Watch", "Organic Coffee Beans",
      "Ergonomic Office Chair", "Premium Laptop Stand", "Wireless Charging Pad",
      "Bluetooth Speaker", "LED Desk Lamp", "Memory Foam Pillow", "Stainless Steel Water Bottle"
    ];
    
    for (let i = 0; i < 50; i++) {
      const docRef = doc(collection(db, "products"));
      
      batch.set(docRef, {
        name: productNames[i % productNames.length] + (i >= productNames.length ? ` ${Math.floor(i / productNames.length) + 1}` : ''),
        price: Math.floor(Math.random() * 200) + 10,
        description: "High-quality product with excellent durability and performance.",
        images: ["/placeholder.svg"],
        imageUrl: "/placeholder.svg",
        vendorId: vendorIds[Math.floor(Math.random() * vendorIds.length)],
        categoryId: categoryIds[Math.floor(Math.random() * categoryIds.length)],
        stock: Math.floor(Math.random() * 100) + 1,
        isActive: true,
        rating: 3.5 + Math.random() * 1.5,
        totalReviews: Math.floor(Math.random() * 200) + 5,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      operationCount++;
      
      // Commit every 450 operations to stay under Firestore limits
      if (operationCount === 450) {
        await batch.commit();
        console.log("Product batch committed");
        batch = writeBatch(db);
        operationCount = 0;
      }
    }
    
    // Commit remaining products
    if (operationCount > 0) {
      await batch.commit();
      console.log("Final product batch committed");
    }
    
    console.log("Simple seeding completed successfully");
    return { 
      success: true, 
      message: "Database seeded successfully with 5 categories, 5 vendors, and 50 products" 
    };
    
  } catch (error) {
    console.error("Simple seeding failed:", error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : "Unknown error occurred" 
    };
  }
};
