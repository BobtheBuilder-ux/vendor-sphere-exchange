
import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Send, 
  Phone, 
  Video, 
  MoreVertical,
  MessageSquare,
  FileImage,
  FileText,
  Download
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { chatService, ChatMessage, ChatConversation } from "@/services/chatService";
import FileUpload from "@/components/chat/FileUpload";
import ChatSearch from "@/components/chat/ChatSearch";
import OnlineStatus from "@/components/chat/OnlineStatus";
import ChatNotifications from "@/components/chat/ChatNotifications";
import { useToast } from "@/hooks/use-toast";

const ChatSystem = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [conversations, setConversations] = useState<ChatConversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<ChatConversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation || !user || isLoading) return;

    setIsLoading(true);
    try {
      await chatService.sendMessage(
        selectedConversation.id, 
        user.id, 
        `${user.firstName} ${user.lastName}`, 
        newMessage
      );
      setNewMessage("");
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
    setShowFileUpload(false);

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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
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

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const filteredConversations = conversations.filter(conv =>
    Object.values(conv.participantNames).some(name => 
      name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const getOtherParticipant = (conversation: ChatConversation) => {
    if (!user) return null;
    const otherUserId = conversation.participants.find(id => id !== user.id);
    return otherUserId ? {
      id: otherUserId,
      name: conversation.participantNames[otherUserId] || 'Unknown User'
    } : null;
  };

  const renderMessage = (message: ChatMessage) => {
    const isCurrentUser = message.senderId === user?.id;
    
    return (
      <div
        key={message.id}
        id={`message-${message.id}`}
        className={`flex transition-colors duration-200 ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
      >
        <div
          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
            isCurrentUser
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 text-gray-900'
          }`}
        >
          {message.type === 'text' && <p>{message.content}</p>}
          
          {message.type === 'image' && message.fileUrl && (
            <div className="space-y-2">
              <img 
                src={message.fileUrl} 
                alt="Shared image" 
                className="max-w-full h-auto rounded"
              />
              <p className="text-sm">{message.content}</p>
            </div>
          )}
          
          {message.type === 'file' && message.fileUrl && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{message.fileName}</p>
                  <p className="text-xs opacity-75">{message.fileSize && formatFileSize(message.fileSize)}</p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  className={isCurrentUser ? "text-white hover:text-white" : ""}
                  onClick={() => window.open(message.fileUrl, '_blank')}
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
          
          <p className={`text-xs mt-1 ${
            isCurrentUser ? 'text-blue-100' : 'text-gray-500'
          }`}>
            {formatTime(message.timestamp)}
          </p>
        </div>
      </div>
    );
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
        {/* Conversations List */}
        <div className="w-1/3 border-r">
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                Messages
              </h2>
              <Badge variant="destructive">
                {conversations.reduce((acc, conv) => acc + (conv.unreadCount[user.id] || 0), 0)}
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
                  onClick={() => setSelectedConversation(conversation)}
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
                        {(conversation.unreadCount[user.id] || 0) > 0 && (
                          <Badge variant="destructive" className="ml-2 h-5 w-5 rounded-full text-xs">
                            {conversation.unreadCount[user.id]}
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

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarFallback>
                          {getOtherParticipant(selectedConversation)?.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <OnlineStatus 
                        userId={getOtherParticipant(selectedConversation)?.id || ''}
                        className="absolute -bottom-1 -right-1"
                      />
                    </div>
                    <div>
                      <h3 className="font-semibold">
                        {getOtherParticipant(selectedConversation)?.name}
                      </h3>
                      <OnlineStatus 
                        userId={getOtherParticipant(selectedConversation)?.id || ''}
                        showText={true}
                        className="text-sm text-gray-600"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Video className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Block User</DropdownMenuItem>
                        <DropdownMenuItem>Report</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>

              {/* Chat Search */}
              <ChatSearch 
                conversationId={selectedConversation.id}
                onMessageFound={handleMessageFound}
              />

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(renderMessage)}
                <div ref={messagesEndRef} />
              </div>

              {/* File Upload Area */}
              {showFileUpload && (
                <div className="p-4 border-t bg-gray-50">
                  <FileUpload 
                    onFileSelect={handleFileUpload}
                    disabled={isLoading}
                  />
                  <Button 
                    variant="ghost" 
                    onClick={() => setShowFileUpload(false)}
                    className="mt-2"
                  >
                    Cancel
                  </Button>
                </div>
              )}

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => setShowFileUpload(!showFileUpload)}
                    disabled={isLoading}
                  >
                    <FileImage className="h-4 w-4" />
                  </Button>
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button 
                    onClick={handleSendMessage} 
                    disabled={!newMessage.trim() || isLoading}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChatSystem;
