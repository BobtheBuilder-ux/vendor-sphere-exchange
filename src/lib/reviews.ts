
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  getDocs, 
  getDoc,
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  increment
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Review, Product } from "@/types/firestore";

export const reviewsCollection = collection(db, "reviews");

interface ReviewFilters {
  sortBy: 'newest' | 'oldest' | 'highest' | 'lowest' | 'helpful';
  filterBy: 'all' | '5' | '4' | '3' | '2' | '1';
}

export const createReview = async (reviewData: {
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  comment: string;
  isVerified: boolean;
}) => {
  try {
    // Create the review
    const docRef = await addDoc(reviewsCollection, {
      ...reviewData,
      isModerated: false,
      isApproved: false,
      helpfulCount: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });

    // Update product rating
    await updateProductRating(reviewData.productId);

    return docRef.id;
  } catch (error) {
    console.error('Error creating review:', error);
    throw error;
  }
};

export const getProductReviews = async (
  productId: string, 
  filters: ReviewFilters = { sortBy: 'newest', filterBy: 'all' }
): Promise<Review[]> => {
  try {
    let q = query(
      reviewsCollection,
      where("productId", "==", productId),
      where("isApproved", "==", true)
    );

    // Add rating filter
    if (filters.filterBy !== 'all') {
      q = query(q, where("rating", "==", parseInt(filters.filterBy)));
    }

    // Add sorting
    switch (filters.sortBy) {
      case 'newest':
        q = query(q, orderBy("createdAt", "desc"));
        break;
      case 'oldest':
        q = query(q, orderBy("createdAt", "asc"));
        break;
      case 'highest':
        q = query(q, orderBy("rating", "desc"));
        break;
      case 'lowest':
        q = query(q, orderBy("rating", "asc"));
        break;
      case 'helpful':
        q = query(q, orderBy("helpfulCount", "desc"));
        break;
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    } as Review));
  } catch (error) {
    console.error('Error getting reviews:', error);
    return [];
  }
};

export const markReviewHelpful = async (reviewId: string) => {
  try {
    const reviewRef = doc(db, "reviews", reviewId);
    await updateDoc(reviewRef, {
      helpfulCount: increment(1)
    });
  } catch (error) {
    console.error('Error marking review helpful:', error);
    throw error;
  }
};

export const updateProductRating = async (productId: string) => {
  try {
    // Get all approved reviews for this product
    const q = query(
      reviewsCollection,
      where("productId", "==", productId),
      where("isApproved", "==", true)
    );
    
    const querySnapshot = await getDocs(q);
    const reviews = querySnapshot.docs.map(doc => doc.data() as Review);
    
    if (reviews.length === 0) return;

    // Calculate average rating
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / reviews.length;

    // Update product with new rating
    const productRef = doc(db, "products", productId);
    await updateDoc(productRef, {
      rating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
      totalReviews: reviews.length,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating product rating:', error);
    throw error;
  }
};

export const moderateReview = async (reviewId: string, approved: boolean) => {
  try {
    const reviewRef = doc(db, "reviews", reviewId);
    await updateDoc(reviewRef, {
      isModerated: true,
      isApproved: approved,
      updatedAt: serverTimestamp()
    });

    // If approved, update product rating
    if (approved) {
      const reviewDoc = await getDoc(reviewRef);
      if (reviewDoc.exists()) {
        const review = reviewDoc.data() as Review;
        await updateProductRating(review.productId);
      }
    }
  } catch (error) {
    console.error('Error moderating review:', error);
    throw error;
  }
};

export const getPendingReviews = async (): Promise<Review[]> => {
  try {
    const q = query(
      reviewsCollection,
      where("isModerated", "==", false),
      orderBy("createdAt", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data() 
    } as Review));
  } catch (error) {
    console.error('Error getting pending reviews:', error);
    return [];
  }
};
