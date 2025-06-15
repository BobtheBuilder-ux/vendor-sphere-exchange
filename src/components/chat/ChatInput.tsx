
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, FileImage } from "lucide-react";
import FileUpload from "@/components/chat/FileUpload";

interface ChatInputProps {
  onSendMessage: (message: string) => Promise<void>;
  onFileUpload: (file: File) => Promise<void>;
  isLoading: boolean;
}

const ChatInput = ({ onSendMessage, onFileUpload, isLoading }: ChatInputProps) => {
  const [newMessage, setNewMessage] = useState("");
  const [showFileUpload, setShowFileUpload] = useState(false);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || isLoading) return;
    
    await onSendMessage(newMessage);
    setNewMessage("");
  };

  const handleFileUpload = async (file: File) => {
    setShowFileUpload(false);
    await onFileUpload(file);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
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
  );
};

export default ChatInput;
