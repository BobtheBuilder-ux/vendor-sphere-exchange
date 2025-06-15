
import { createCategories } from "./seedData/categorySeeder";
import { createVendors } from "./seedData/vendorSeeder";
import { createProducts } from "./seedData/productSeeder";
import { createOrders } from "./seedData/orderSeeder";

export const seedDatabase = async (userId?: string) => {
  console.log("Starting database seeding (no auth required)");
  
  try {
    // Create categories (no auth required)
    console.log("Creating categories...");
    const categoryIds = await createCategories();
    console.log(`Created ${categoryIds.length} categories`);
    
    // Create vendors (no auth required)
    console.log("Creating vendors...");
    const vendorIds = await createVendors(userId || "demo_user");
    console.log(`Created ${vendorIds.length} vendors`);
    
    // Create products
    console.log("Creating products...");
    const productCount = await createProducts(categoryIds, vendorIds);
    console.log(`Created ${productCount} products`);
    
    // Create sample orders (if userId provided)
    if (userId) {
      console.log("Creating orders...");
      const orderCount = await createOrders(userId, vendorIds);
      console.log(`Created ${orderCount} orders`);
    }
    
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
