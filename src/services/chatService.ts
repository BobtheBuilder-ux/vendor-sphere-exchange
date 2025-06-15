
import { 
  getDatabase, 
  ref, 
  push, 
  onValue, 
  off, 
  serverTimestamp,
  set,
  query,
  orderByChild,
  limitToLast,
  get
} from "firebase/database";
import { 
  getStorage, 
  ref as storageRef, 
  uploadBytes, 
  getDownloadURL 
} from "firebase/storage";
import { storage } from "@/lib/firebase";

const db = getDatabase();

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: number;
  type: "text" | "image" | "file";
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  status: "sent" | "delivered" | "read";
  conversationId: string;
}

export interface ChatConversation {
  id: string;
  participants: string[];
  participantNames: { [userId: string]: string };
  lastMessage: string;
  lastMessageTime: number;
  lastMessageSender: string;
  unreadCount: { [userId: string]: number };
  createdAt: number;
}

export interface UserStatus {
  isOnline: boolean;
  lastSeen: number;
}

export const chatService = {
  // Send a text message
  sendMessage: async (conversationId: string, senderId: string, senderName: string, content: string) => {
    const messagesRef = ref(db, `messages/${conversationId}`);
    const newMessage = {
      senderId,
      senderName,
      content,
      timestamp: serverTimestamp(),
      type: "text",
      status: "sent"
    };
    
    const messageRef = await push(messagesRef, newMessage);
    
    // Update conversation last message
    const conversationRef = ref(db, `conversations/${conversationId}`);
    await set(conversationRef, {
      lastMessage: content,
      lastMessageTime: serverTimestamp(),
      lastMessageSender: senderId
    });
    
    return messageRef.key;
  },

  // Send a file message
  sendFileMessage: async (
    conversationId: string, 
    senderId: string, 
    senderName: string, 
    file: File
  ) => {
    // Upload file to Firebase Storage
    const fileRef = storageRef(storage, `chat-files/${conversationId}/${Date.now()}_${file.name}`);
    const snapshot = await uploadBytes(fileRef, file);
    const fileUrl = await getDownloadURL(snapshot.ref);
    
    const messagesRef = ref(db, `messages/${conversationId}`);
    const newMessage = {
      senderId,
      senderName,
      content: file.type.startsWith('image/') ? 'Sent an image' : `Sent a file: ${file.name}`,
      timestamp: serverTimestamp(),
      type: file.type.startsWith('image/') ? "image" : "file",
      fileUrl,
      fileName: file.name,
      fileSize: file.size,
      status: "sent"
    };
    
    const messageRef = await push(messagesRef, newMessage);
    
    // Update conversation last message
    const conversationRef = ref(db, `conversations/${conversationId}`);
    await set(conversationRef, {
      lastMessage: newMessage.content,
      lastMessageTime: serverTimestamp(),
      lastMessageSender: senderId
    });
    
    return messageRef.key;
  },

  // Listen to messages in a conversation
  subscribeToMessages: (conversationId: string, callback: (messages: ChatMessage[]) => void) => {
    const messagesRef = ref(db, `messages/${conversationId}`);
    const messagesQuery = query(messagesRef, orderByChild('timestamp'), limitToLast(100));
    
    const unsubscribe = onValue(messagesQuery, (snapshot) => {
      const messages: ChatMessage[] = [];
      snapshot.forEach((childSnapshot) => {
        const message = {
          id: childSnapshot.key!,
          conversationId,
          ...childSnapshot.val()
        };
        messages.push(message);
      });
      callback(messages);
    });
    
    return () => off(messagesRef, 'value', unsubscribe);
  },

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
  },

  // Search messages in a conversation
  searchMessages: async (conversationId: string, searchTerm: string): Promise<ChatMessage[]> => {
    const messagesRef = ref(db, `messages/${conversationId}`);
    const snapshot = await get(messagesRef);
    const messages: ChatMessage[] = [];
    
    snapshot.forEach((childSnapshot) => {
      const message = {
        id: childSnapshot.key!,
        conversationId,
        ...childSnapshot.val()
      };
      if (message.content.toLowerCase().includes(searchTerm.toLowerCase())) {
        messages.push(message);
      }
    });
    
    return messages.sort((a, b) => b.timestamp - a.timestamp);
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
