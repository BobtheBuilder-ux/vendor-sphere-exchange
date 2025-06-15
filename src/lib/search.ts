
import { collection, query, where, orderBy, getDocs, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product, Vendor } from '@/types/firestore';

interface SearchFilters {
  query: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  vendor: string;
  minRating: number;
  location: string;
  sortBy: 'price-low' | 'price-high' | 'rating' | 'newest' | 'popularity';
  inStock: boolean;
}

export const searchProducts = async (filters: SearchFilters): Promise<Product[]> => {
  const productsRef = collection(db, 'products');
  let q = query(productsRef, where('isActive', '==', true));

  // Category filter
  if (filters.category !== 'all') {
    q = query(q, where('categoryId', '==', filters.category));
  }

  // Price range filter
  if (filters.minPrice > 0) {
    q = query(q, where('price', '>=', filters.minPrice));
  }
  if (filters.maxPrice < 1000) {
    q = query(q, where('price', '<=', filters.maxPrice));
  }

  // Vendor filter
  if (filters.vendor !== 'all') {
    q = query(q, where('vendorId', '==', filters.vendor));
  }

  // Stock filter
  if (filters.inStock) {
    q = query(q, where('stock', '>', 0));
  }

  // Add sorting
  switch (filters.sortBy) {
    case 'price-low':
      q = query(q, orderBy('price', 'asc'));
      break;
    case 'price-high':
      q = query(q, orderBy('price', 'desc'));
      break;
    case 'newest':
      q = query(q, orderBy('createdAt', 'desc'));
      break;
    default:
      q = query(q, orderBy('createdAt', 'desc'));
  }

  const querySnapshot = await getDocs(q);
  let products = querySnapshot.docs.map(doc => ({ 
    id: doc.id, 
    ...doc.data() 
  } as Product));

  // Client-side filtering for text search and rating
  if (filters.query) {
    const searchTerm = filters.query.toLowerCase();
    products = products.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    );
  }

  return products;
};

export const searchVendors = async (location: string): Promise<Vendor[]> => {
  const vendorsRef = collection(db, 'vendors');
  let q = query(
    vendorsRef, 
    where('isActive', '==', true),
    where('isVerified', '==', true),
    orderBy('rating', 'desc')
  );

  const querySnapshot = await getDocs(q);
  let vendors = querySnapshot.docs.map(doc => ({ 
    id: doc.id, 
    ...doc.data() 
  } as Vendor));

  // Client-side location filtering
  if (location) {
    const locationTerm = location.toLowerCase();
    vendors = vendors.filter(vendor => 
      vendor.address?.city?.toLowerCase().includes(locationTerm) ||
      vendor.address?.state?.toLowerCase().includes(locationTerm)
    );
  }

  return vendors;
};

export const getSearchSuggestions = async (searchQuery: string): Promise<string[]> => {
  if (searchQuery.length < 2) return [];

  const productsRef = collection(db, 'products');
  const q = query(productsRef, where('isActive', '==', true), limit(10));
  
  const querySnapshot = await getDocs(q);
  const products = querySnapshot.docs.map(doc => doc.data() as Product);
  
  const suggestions = products
    .filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map(product => product.name)
    .slice(0, 5);

  return suggestions;
};
