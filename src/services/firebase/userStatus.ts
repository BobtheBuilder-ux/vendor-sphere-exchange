
import { 
  getDatabase, 
  ref, 
  onValue, 
  off, 
  serverTimestamp,
  set
} from "firebase/database";
import { UserStatus } from "@/types/chat";

const db = getDatabase();

export const userStatusService = {
  // Update user online status
  updateUserStatus: async (userId: string, isOnline: boolean) => {
    const statusRef = ref(db, `userStatus/${userId}`);
    await set(statusRef, {
      isOnline,
      lastSeen: serverTimestamp()
    });
  },

  // Listen to user status
  subscribeToUserStatus: (userId: string, callback: (status: UserStatus) => void) => {
    const statusRef = ref(db, `userStatus/${userId}`);
    const unsubscribe = onValue(statusRef, (snapshot) => {
      const status = snapshot.val() || { isOnline: false, lastSeen: Date.now() };
      callback(status);
    });
    
    return () => off(statusRef, 'value', unsubscribe);
  }
};
