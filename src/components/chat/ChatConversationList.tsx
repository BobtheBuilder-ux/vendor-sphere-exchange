
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { MessageSquare } from "lucide-react";
import { ChatConversation } from "@/services/chatService";
import OnlineStatus from "@/components/chat/OnlineStatus";

interface ChatConversationListProps {
  conversations: ChatConversation[];
  selectedConversation: ChatConversation | null;
  onConversationSelect: (conversation: ChatConversation) => void;
  currentUserId: string;
}

const ChatConversationList = ({
  conversations,
  selectedConversation,
  onConversationSelect,
  currentUserId
}: ChatConversationListProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const getOtherParticipant = (conversation: ChatConversation) => {
    const otherUserId = conversation.participants.find(id => id !== currentUserId);
    return otherUserId ? {
      id: otherUserId,
      name: conversation.participantNames[otherUserId] || 'Unknown User'
    } : null;
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const filteredConversations = conversations.filter(conv =>
    Object.values(conv.participantNames).some(name => 
      name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalUnreadCount = conversations.reduce((acc, conv) => acc + (conv.unreadCount[currentUserId] || 0), 0);

  return (
    <div className="w-1/3 border-r">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center">
            <MessageSquare className="h-5 w-5 mr-2" />
            Messages
          </h2>
          <Badge variant="destructive">
            {totalUnreadCount}
          </Badge>
        </div>
        <Input
          placeholder="Search conversations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-y-auto">
        {filteredConversations.map((conversation) => {
          const otherParticipant = getOtherParticipant(conversation);
          if (!otherParticipant) return null;

          return (
            <div
              key={conversation.id}
              className={`p-4 cursor-pointer hover:bg-gray-50 border-b ${
                selectedConversation?.id === conversation.id ? 'bg-blue-50 border-blue-200' : ''
              }`}
              onClick={() => onConversationSelect(conversation)}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Avatar>
                    <AvatarFallback>
                      {otherParticipant.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <OnlineStatus 
                    userId={otherParticipant.id}
                    className="absolute -bottom-1 -right-1"
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-sm truncate">
                      {otherParticipant.name}
                    </p>
                    <span className="text-xs text-gray-500">
                      {formatTime(conversation.lastMessageTime)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 truncate">
                      {conversation.lastMessage}
                    </p>
                    {(conversation.unreadCount[currentUserId] || 0) > 0 && (
                      <Badge variant="destructive" className="ml-2 h-5 w-5 rounded-full text-xs">
                        {conversation.unreadCount[currentUserId]}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatConversationList;
