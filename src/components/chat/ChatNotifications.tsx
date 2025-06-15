
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { chatService, ChatMessage } from "@/services/chatService";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare } from "lucide-react";

const ChatNotifications = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isVisible, setIsVisible] = useState(true);
  const [lastNotificationTime, setLastNotificationTime] = useState(Date.now());

  useEffect(() => {
    if (!user) return;

    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    // Listen for new messages in all conversations
    const unsubscribe = chatService.subscribeToConversations(user.id, (conversations) => {
      conversations.forEach(conversation => {
        const unsubscribeMessages = chatService.subscribeToMessages(conversation.id, (messages) => {
          const latestMessage = messages[messages.length - 1];
          
          if (
            latestMessage && 
            latestMessage.senderId !== user.id && 
            latestMessage.timestamp > lastNotificationTime &&
            isVisible
          ) {
            // Show toast notification
            toast({
              title: "New Message",
              description: `${latestMessage.senderName}: ${latestMessage.content}`,
              action: (
                <MessageSquare className="h-4 w-4" />
              ),
            });

            // Show browser notification if page is not visible
            if (document.hidden && 'Notification' in window && Notification.permission === 'granted') {
              new Notification(`New message from ${latestMessage.senderName}`, {
                body: latestMessage.content,
                icon: '/favicon.ico',
                tag: `message-${latestMessage.id}`,
              });
            }

            setLastNotificationTime(latestMessage.timestamp);
          }
        });

        // Cleanup message subscription
        return () => unsubscribeMessages();
      });
    });

    // Handle page visibility changes
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      unsubscribe();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [user, toast, lastNotificationTime, isVisible]);

  return null; // This component doesn't render anything visible
};

export default ChatNotifications;
