
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp,
  writeBatch
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Product, Order, CartItem, Category, Vendor } from "@/types/firestore";

// Collection references
export const productsCollection = collection(db, "products");
export const ordersCollection = collection(db, "orders");
export const cartItemsCollection = collection(db, "cartItems");
export const categoriesCollection = collection(db, "categories");
export const vendorsCollection = collection(db, "vendors");

// Product operations
export const createProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
  const docRef = await addDoc(productsCollection, {
    ...productData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return docRef.id;
};

export const updateProduct = async (productId: string, updates: Partial<Product>) => {
  const productRef = doc(db, "products", productId);
  await updateDoc(productRef, {
    ...updates,
    updatedAt: serverTimestamp()
  });
};

export const deleteProduct = async (productId: string) => {
  const productRef = doc(db, "products", productId);
  await deleteDoc(productRef);
};

export const getProduct = async (productId: string) => {
  const productRef = doc(db, "products", productId);
  const productSnap = await getDoc(productRef);
  
  if (productSnap.exists()) {
    return { id: productSnap.id, ...productSnap.data() } as Product;
  }
  return null;
};

export const getProductsByVendor = async (vendorId: string) => {
  const q = query(
    productsCollection,
    where("vendorId", "==", vendorId),
    where("isActive", "==", true),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
};

export const getProductsByCategory = async (categoryId: string) => {
  const q = query(
    productsCollection,
    where("categoryId", "==", categoryId),
    where("isActive", "==", true),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
};

// Order operations
export const createOrder = async (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>) => {
  const docRef = await addDoc(ordersCollection, {
    ...orderData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return docRef.id;
};

export const updateOrderStatus = async (orderId: string, status: Order['status']) => {
  const orderRef = doc(db, "orders", orderId);
  await updateDoc(orderRef, {
    status,
    updatedAt: serverTimestamp()
  });
};

export const getUserOrders = async (userId: string) => {
  const q = query(
    ordersCollection,
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
};

export const getVendorOrders = async (vendorId: string) => {
  const q = query(
    ordersCollection,
    where("items", "array-contains-any", [{ vendorId }]),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order));
};

// Cart operations
export const addToCart = async (cartItemData: Omit<CartItem, 'id' | 'createdAt' | 'updatedAt'>) => {
  // Check if item already exists in cart
  const existingItemQuery = query(
    cartItemsCollection,
    where("userId", "==", cartItemData.userId),
    where("productId", "==", cartItemData.productId)
  );
  const existingItems = await getDocs(existingItemQuery);
  
  if (!existingItems.empty) {
    // Update existing cart item
    const existingItem = existingItems.docs[0];
    const currentQuantity = existingItem.data().quantity;
    await updateDoc(existingItem.ref, {
      quantity: currentQuantity + cartItemData.quantity,
      updatedAt: serverTimestamp()
    });
    return existingItem.id;
  } else {
    // Create new cart item
    const docRef = await addDoc(cartItemsCollection, {
      ...cartItemData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  }
};

export const updateCartItem = async (cartItemId: string, quantity: number) => {
  const cartItemRef = doc(db, "cartItems", cartItemId);
  await updateDoc(cartItemRef, {
    quantity,
    updatedAt: serverTimestamp()
  });
};

export const removeFromCart = async (cartItemId: string) => {
  const cartItemRef = doc(db, "cartItems", cartItemId);
  await deleteDoc(cartItemRef);
};

export const getUserCart = async (userId: string) => {
  const q = query(
    cartItemsCollection,
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as CartItem));
};

export const clearUserCart = async (userId: string) => {
  const userCartItems = await getUserCart(userId);
  const batch = writeBatch(db);
  
  userCartItems.forEach((item) => {
    const cartItemRef = doc(db, "cartItems", item.id);
    batch.delete(cartItemRef);
  });
  
  await batch.commit();
};

// Category operations
export const createCategory = async (categoryData: Omit<Category, 'id' | 'createdAt' | 'updatedAt'>) => {
  const docRef = await addDoc(categoriesCollection, {
    ...categoryData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return docRef.id;
};

export const getCategories = async () => {
  const q = query(
    categoriesCollection,
    where("isActive", "==", true),
    orderBy("name")
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Category));
};

// Vendor operations
export const createVendor = async (vendorData: Omit<Vendor, 'id' | 'createdAt' | 'updatedAt'>) => {
  const docRef = await addDoc(vendorsCollection, {
    ...vendorData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return docRef.id;
};

export const getVendor = async (vendorId: string) => {
  const vendorRef = doc(db, "vendors", vendorId);
  const vendorSnap = await getDoc(vendorRef);
  
  if (vendorSnap.exists()) {
    return { id: vendorSnap.id, ...vendorSnap.data() } as Vendor;
  }
  return null;
};

export const getVendorByUserId = async (userId: string) => {
  const q = query(
    vendorsCollection,
    where("userId", "==", userId),
    limit(1)
  );
  const querySnapshot = await getDocs(q);
  
  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() } as Vendor;
  }
  return null;
};

export const getActiveVendors = async () => {
  const q = query(
    vendorsCollection,
    where("isActive", "==", true),
    where("isVerified", "==", true),
    orderBy("rating", "desc")
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Vendor));
};
