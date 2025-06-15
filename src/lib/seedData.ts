
import { collection, writeBatch, doc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Product, Vendor, Category, Order } from "@/types/firestore";

// Sample data arrays for generating realistic content
const productNames = [
  "Wireless Bluetooth Headphones", "Smart Fitness Watch", "Organic Coffee Beans",
  "Ergonomic Office Chair", "Premium Laptop Stand", "Wireless Charging Pad",
  "Bluetooth Speaker", "LED Desk Lamp", "Memory Foam Pillow", "Stainless Steel Water Bottle",
  "Yoga Mat", "Air Fryer", "Electric Kettle", "Phone Case", "Tablet Stand",
  "Gaming Mouse", "Mechanical Keyboard", "Monitor Stand", "Desk Organizer", "Plant Pot",
  "Ceramic Mug", "Throw Pillow", "Wall Art Print", "Essential Oil Diffuser", "Candle Set",
  "Book Light", "Travel Backpack", "Wireless Mouse", "USB Hub", "Cable Organizer",
  "Portable Battery", "Car Phone Mount", "Bluetooth Earbuds", "Smart Thermostat", "Security Camera",
  "Robot Vacuum", "Coffee Maker", "Blender", "Food Processor", "Instant Pot",
  "Electric Toothbrush", "Hair Dryer", "Curling Iron", "Facial Cleanser", "Moisturizer",
  "Sunscreen", "Shampoo", "Conditioner", "Body Wash", "Deodorant",
  "Running Shoes", "Sneakers", "Boots", "Sandals", "Dress Shoes",
  "T-Shirt", "Jeans", "Hoodie", "Jacket", "Sweater",
  "Dress", "Skirt", "Pants", "Shorts", "Leggings",
  "Watch", "Sunglasses", "Jewelry", "Wallet", "Belt",
  "Handbag", "Backpack", "Lunch Box", "Umbrella", "Scarf",
  "Hat", "Gloves", "Socks", "Underwear", "Pajamas",
  "Bed Sheets", "Comforter", "Pillowcase", "Towel", "Bathmat",
  "Shower Curtain", "Soap Dispenser", "Trash Can", "Storage Basket", "Mirror",
  "Picture Frame", "Clock", "Lamp", "Rug", "Curtains",
  "Kitchen Scale", "Cutting Board", "Knife Set", "Mixing Bowls", "Measuring Cups",
  "Baking Sheet", "Non-stick Pan", "Spatula", "Whisk", "Can Opener",
  "Garden Tools", "Plant Seeds", "Fertilizer", "Watering Can", "Garden Gloves",
  "Outdoor Chair", "Patio Table", "Grill", "Fire Pit", "String Lights"
];

const categories = [
  { name: "Electronics", description: "Latest gadgets and electronic devices" },
  { name: "Fashion", description: "Trendy clothing and accessories" },
  { name: "Home & Garden", description: "Home improvement and garden supplies" },
  { name: "Health & Beauty", description: "Personal care and wellness products" },
  { name: "Sports & Outdoors", description: "Athletic and outdoor equipment" },
  { name: "Books & Media", description: "Books, movies, and entertainment" },
  { name: "Toys & Games", description: "Fun for all ages" },
  { name: "Automotive", description: "Car accessories and parts" },
  { name: "Food & Beverages", description: "Gourmet food and drinks" },
  { name: "Office Supplies", description: "Everything for your workspace" }
];

const vendorNames = [
  "TechGear Pro", "Fashion Hub", "Home Essentials", "Beauty World", "Sports Zone",
  "Book Haven", "Toy Kingdom", "Auto Parts Plus", "Gourmet Foods", "Office Depot",
  "ElectroMax", "Style Central", "Garden Paradise", "Wellness Shop", "Active Life",
  "Media Store", "Play Time", "Car Care", "Fresh Market", "Work Station",
  "Digital World", "Trendy Threads", "Living Spaces", "Pure Beauty", "Outdoor Adventures"
];

const descriptions = [
  "High-quality product with excellent durability and performance.",
  "Premium design meets functionality in this outstanding item.",
  "Perfect for daily use with exceptional value for money.",
  "Innovative solution that exceeds expectations every time.",
  "Carefully crafted with attention to detail and quality.",
  "Essential item that combines style with practicality.",
  "Top-rated product trusted by thousands of customers.",
  "Advanced features in a user-friendly design.",
  "Sustainable and eco-friendly choice for conscious consumers.",
  "Professional-grade quality at an affordable price."
];

export const seedDatabase = async (userId: string) => {
  console.log("Starting database seeding for user:", userId);
  
  if (!userId) {
    throw new Error("User ID is required for seeding");
  }
  
  try {
    // Create categories first
    console.log("Creating categories...");
    const categoryIds = await createCategories();
    console.log(`Created ${categoryIds.length} categories`);
    
    // Create vendors
    console.log("Creating vendors...");
    const vendorIds = await createVendors(userId);
    console.log(`Created ${vendorIds.length} vendors`);
    
    // Create products
    console.log("Creating products...");
    const productCount = await createProducts(categoryIds, vendorIds);
    console.log(`Created ${productCount} products`);
    
    // Create sample orders
    console.log("Creating orders...");
    const orderCount = await createOrders(userId, vendorIds);
    console.log(`Created ${orderCount} orders`);
    
    console.log("Database seeding completed successfully!");
    return true;
  } catch (error) {
    console.error("Error seeding database:", error);
    if (error instanceof Error) {
      throw new Error(`Database seeding failed: ${error.message}`);
    }
    throw new Error("Database seeding failed with unknown error");
  }
};

const createCategories = async (): Promise<string[]> => {
  try {
    const batch = writeBatch(db);
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
    });
    
    await batch.commit();
    return categoryIds;
  } catch (error) {
    console.error("Error creating categories:", error);
    throw new Error("Failed to create categories");
  }
};

const createVendors = async (userId: string): Promise<string[]> => {
  try {
    const batch = writeBatch(db);
    const vendorIds: string[] = [];
    
    vendorNames.forEach((name, index) => {
      const docRef = doc(collection(db, "vendors"));
      vendorIds.push(docRef.id);
      
      batch.set(docRef, {
        userId: index === 0 ? userId : `vendor_${index}`, // First vendor belongs to current user
        businessName: name,
        description: `${name} - Your trusted partner for quality products and excellent service.`,
        contactEmail: `contact@${name.toLowerCase().replace(/\s+/g, '')}.com`,
        contactPhone: `+1-555-${String(index).padStart(3, '0')}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
        isActive: true,
        isVerified: true,
        rating: 4.0 + Math.random() * 1.0, // Random rating between 4.0 and 5.0
        totalReviews: Math.floor(Math.random() * 500) + 50,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
    });
    
    await batch.commit();
    return vendorIds;
  } catch (error) {
    console.error("Error creating vendors:", error);
    throw new Error("Failed to create vendors");
  }
};

const createProducts = async (categoryIds: string[], vendorIds: string[]): Promise<number> => {
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
        price: Math.floor(Math.random() * 200) + 10, // Random price between $10 and $210
        description: descriptions[Math.floor(Math.random() * descriptions.length)],
        images: ["/placeholder.svg"],
        imageUrl: "/placeholder.svg",
        vendorId: vendorIds[Math.floor(Math.random() * vendorIds.length)],
        categoryId: categoryIds[Math.floor(Math.random() * categoryIds.length)],
        stock: Math.floor(Math.random() * 100) + 1, // Random stock between 1 and 100
        isActive: true,
        rating: 3.5 + Math.random() * 1.5, // Random rating between 3.5 and 5.0
        totalReviews: Math.floor(Math.random() * 200) + 5
      };
      
      currentBatch.set(docRef, {
        ...product,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      operationCount++;
      productCount++;
      
      // Firestore has a limit of 500 operations per batch
      if (operationCount === 450) {
        batches.push(currentBatch);
        currentBatch = writeBatch(db);
        operationCount = 0;
      }
    }
    
    // Add the last batch if it has operations
    if (operationCount > 0) {
      batches.push(currentBatch);
    }
    
    // Commit all batches
    for (const batch of batches) {
      await batch.commit();
    }
    
    return productCount;
  } catch (error) {
    console.error("Error creating products:", error);
    throw new Error("Failed to create products");
  }
};

const createOrders = async (userId: string, vendorIds: string[]): Promise<number> => {
  try {
    const batch = writeBatch(db);
    let orderCount = 0;
    
    // Create 20 sample orders
    for (let i = 0; i < 20; i++) {
      const docRef = doc(collection(db, "orders"));
      
      const itemCount = Math.floor(Math.random() * 3) + 1; // 1-3 items per order
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
