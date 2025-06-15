
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
