
// Re-export types
export type { ChatMessage, ChatConversation, UserStatus } from "@/types/chat";

// Re-export services
export { messagesService } from "@/services/firebase/messages";
export { conversationsService } from "@/services/firebase/conversations";
export { userStatusService } from "@/services/firebase/userStatus";

// Import services for the main chatService
import { messagesService } from "@/services/firebase/messages";
import { conversationsService } from "@/services/firebase/conversations";
import { userStatusService } from "@/services/firebase/userStatus";

// Main chat service that combines all functionality
export const chatService = {
  // Messages
  sendMessage: (conversationId: string, senderId: string, senderName: string, content: string) =>
    messagesService.sendMessage(conversationId, senderId, senderName, content),
  
  sendFileMessage: (conversationId: string, senderId: string, senderName: string, file: File) =>
    messagesService.sendFileMessage(conversationId, senderId, senderName, file),
  
  subscribeToMessages: (conversationId: string, callback: (messages: any[]) => void) =>
    messagesService.subscribeToMessages(conversationId, callback),
  
  searchMessages: (conversationId: string, searchTerm: string) =>
    messagesService.searchMessages(conversationId, searchTerm),

  // Conversations
  subscribeToConversations: (userId: string, callback: (conversations: any[]) => void) =>
    conversationsService.subscribeToConversations(userId, callback),
  
  createConversation: (participants: string[], participantNames: { [userId: string]: string }) =>
    conversationsService.createConversation(participants, participantNames),

  // User Status
  updateUserStatus: (userId: string, isOnline: boolean) =>
    userStatusService.updateUserStatus(userId, isOnline),
  
  subscribeToUserStatus: (userId: string, callback: (status: any) => void) =>
    userStatusService.subscribeToUserStatus(userId, callback)
};
