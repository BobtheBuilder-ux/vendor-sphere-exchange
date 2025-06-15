
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { chatService, ChatMessage, ChatConversation } from "@/services/chatService";
import { useToast } from "@/hooks/use-toast";
import ChatConversationList from "@/components/chat/ChatConversationList";
import ChatArea from "@/components/chat/ChatArea";
import ChatNotifications from "@/components/chat/ChatNotifications";

const ChatSystem = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<ChatConversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Update user online status
  useEffect(() => {
    if (!user) return;

    chatService.updateUserStatus(user.id, true);

    // Update status to offline when user leaves
    const handleBeforeUnload = () => {
      chatService.updateUserStatus(user.id, false);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      chatService.updateUserStatus(user.id, false);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [user]);

  // Subscribe to conversations
  useEffect(() => {
    if (!user) return;

    const unsubscribe = chatService.subscribeToConversations(user.id, (conversations) => {
      setConversations(conversations);
      if (conversations.length > 0 && !selectedConversation) {
        setSelectedConversation(conversations[0]);
      }
    });

    return unsubscribe;
  }, [user, selectedConversation]);

  // Subscribe to messages in selected conversation
  useEffect(() => {
    if (!selectedConversation) return;

    const unsubscribe = chatService.subscribeToMessages(selectedConversation.id, (messages) => {
      setMessages(messages);
    });

    return unsubscribe;
  }, [selectedConversation]);

  const handleSendMessage = async (message: string) => {
    if (!selectedConversation || !user || isLoading) return;

    setIsLoading(true);
    try {
      await chatService.sendMessage(
        selectedConversation.id, 
        user.id, 
        `${user.firstName} ${user.lastName}`, 
        message
      );
    } catch (error) {
      console.error("Failed to send message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!selectedConversation || !user || isLoading) return;

    setIsLoading(true);

    try {
      await chatService.sendFileMessage(
        selectedConversation.id,
        user.id,
        `${user.firstName} ${user.lastName}`,
        file
      );
      
      toast({
        title: "File sent",
        description: `${file.name} has been sent successfully.`,
      });
    } catch (error) {
      console.error("Failed to send file:", error);
      toast({
        title: "Error",
        description: "Failed to send file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMessageFound = (message: ChatMessage) => {
    // Scroll to found message (simplified implementation)
    const messageElement = document.getElementById(`message-${message.id}`);
    if (messageElement) {
      messageElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      messageElement.classList.add('bg-yellow-100');
      setTimeout(() => {
        messageElement.classList.remove('bg-yellow-100');
      }, 2000);
    }
  };

  if (!user) {
    return (
      <div className="flex h-[600px] bg-white rounded-lg shadow-lg items-center justify-center">
        <p className="text-gray-500">Please log in to access messages</p>
      </div>
    );
  }

  return (
    <>
      <ChatNotifications />
      <div className="flex h-[600px] bg-white rounded-lg shadow-lg overflow-hidden">
        <ChatConversationList
          conversations={conversations}
          selectedConversation={selectedConversation}
          onConversationSelect={setSelectedConversation}
          currentUserId={user.id}
        />
        
        <ChatArea
          selectedConversation={selectedConversation}
          messages={messages}
          currentUserId={user.id}
          onSendMessage={handleSendMessage}
          onFileUpload={handleFileUpload}
          onMessageFound={handleMessageFound}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default ChatSystem;
