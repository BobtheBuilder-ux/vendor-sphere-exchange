import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
import { ChatMessage } from "@/types/chat";

interface ChatMessageListProps {
  messages: ChatMessage[];
  currentUserId: string;
}

const ChatMessageList = ({ messages, currentUserId }: ChatMessageListProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  const renderMessage = (message: ChatMessage) => {
    const isCurrentUser = message.senderId === currentUserId;
    
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

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map(renderMessage)}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessageList;
