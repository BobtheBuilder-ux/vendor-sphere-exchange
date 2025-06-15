
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";
import { chatService, ChatMessage } from "@/services/chatService";

interface ChatSearchProps {
  conversationId: string;
  onMessageFound: (message: ChatMessage) => void;
}

const ChatSearch = ({ conversationId, onMessageFound }: ChatSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<ChatMessage[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    try {
      const results = await chatService.searchMessages(conversationId, searchTerm);
      setSearchResults(results);
      setIsExpanded(true);
    } catch (error) {
      console.error("Search failed:", error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
    setIsExpanded(false);
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm.trim()) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  };

  return (
    <div className="border-b p-4 space-y-2">
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10"
          />
        </div>
        <Button 
          onClick={handleSearch} 
          disabled={!searchTerm.trim() || isSearching}
          size="sm"
        >
          {isSearching ? "Searching..." : "Search"}
        </Button>
        {(searchTerm || isExpanded) && (
          <Button onClick={clearSearch} variant="ghost" size="sm">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {isExpanded && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
            </span>
            <Badge variant="secondary">{searchTerm}</Badge>
          </div>
          
          {searchResults.length > 0 && (
            <div className="max-h-40 overflow-y-auto space-y-1">
              {searchResults.map((message) => (
                <div
                  key={message.id}
                  className="p-2 bg-gray-50 rounded cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => onMessageFound(message)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium">{message.senderName}</span>
                    <span className="text-xs text-gray-500">
                      {formatTime(message.timestamp)}
                    </span>
                  </div>
                  <p 
                    className="text-sm text-gray-700 truncate"
                    dangerouslySetInnerHTML={{ 
                      __html: highlightText(message.content, searchTerm) 
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatSearch;
