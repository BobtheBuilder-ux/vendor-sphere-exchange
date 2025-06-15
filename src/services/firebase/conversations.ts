
import { 
  getDatabase, 
  ref, 
  push, 
  onValue, 
  off, 
  serverTimestamp
} from "firebase/database";
import { ChatConversation } from "@/types/chat";

const db = getDatabase();

export const conversationsService = {
  // Listen to conversations for a user
  subscribeToConversations: (userId: string, callback: (conversations: ChatConversation[]) => void) => {
    const conversationsRef = ref(db, 'conversations');
    
    const unsubscribe = onValue(conversationsRef, (snapshot) => {
      const conversations: ChatConversation[] = [];
      snapshot.forEach((childSnapshot) => {
        const conversation = {
          id: childSnapshot.key!,
          ...childSnapshot.val()
        };
        // Only include conversations where user is a participant
        if (conversation.participants?.includes(userId)) {
          conversations.push(conversation);
        }
      });
      callback(conversations.sort((a, b) => b.lastMessageTime - a.lastMessageTime));
    });
    
    return () => off(conversationsRef, 'value', unsubscribe);
  },

  // Create a new conversation
  createConversation: async (participants: string[], participantNames: { [userId: string]: string }) => {
    const conversationsRef = ref(db, 'conversations');
    const newConversation = {
      participants,
      participantNames,
      lastMessage: "",
      lastMessageTime: serverTimestamp(),
      lastMessageSender: "",
      unreadCount: participants.reduce((acc, userId) => {
        acc[userId] = 0;
        return acc;
      }, {} as { [userId: string]: number }),
      createdAt: serverTimestamp()
    };
    
    const conversationRef = await push(conversationsRef, newConversation);
    return conversationRef.key;
  }
};
