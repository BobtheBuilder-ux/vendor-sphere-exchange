
import { MessageSquare } from "lucide-react";
import { ChatConversation, ChatMessage } from "@/services/chatService";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatMessageList from "@/components/chat/ChatMessageList";
import ChatInput from "@/components/chat/ChatInput";
import ChatSearch from "@/components/chat/ChatSearch";

interface ChatAreaProps {
  selectedConversation: ChatConversation | null;
  messages: ChatMessage[];
  currentUserId: string;
  onSendMessage: (message: string) => Promise<void>;
  onFileUpload: (file: File) => Promise<void>;
  onMessageFound: (message: ChatMessage) => void;
  isLoading: boolean;
}

const ChatArea = ({
  selectedConversation,
  messages,
  currentUserId,
  onSendMessage,
  onFileUpload,
  onMessageFound,
  isLoading
}: ChatAreaProps) => {
  const getOtherParticipant = (conversation: ChatConversation) => {
    const otherUserId = conversation.participants.find(id => id !== currentUserId);
    return otherUserId ? {
      id: otherUserId,
      name: conversation.participantNames[otherUserId] || 'Unknown User'
    } : null;
  };

  if (!selectedConversation) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>Select a conversation to start messaging</p>
        </div>
      </div>
    );
  }

  const otherParticipant = getOtherParticipant(selectedConversation);

  return (
    <div className="flex-1 flex flex-col">
      <ChatHeader 
        conversation={selectedConversation}
        otherParticipant={otherParticipant}
      />

      <ChatSearch 
        conversationId={selectedConversation.id}
        onMessageFound={onMessageFound}
      />

      <ChatMessageList 
        messages={messages}
        currentUserId={currentUserId}
      />

      <ChatInput 
        onSendMessage={onSendMessage}
        onFileUpload={onFileUpload}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ChatArea;
