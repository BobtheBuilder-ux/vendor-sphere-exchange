
import { useEffect, useState } from "react";
import { chatService } from "@/services/chatService";
import { UserStatus } from "@/types/chat";
import { Circle } from "lucide-react";

interface OnlineStatusProps {
  userId: string;
  showText?: boolean;
  className?: string;
}

const OnlineStatus = ({ userId, showText = false, className = "" }: OnlineStatusProps) => {
  const [status, setStatus] = useState<UserStatus>({ isOnline: false, lastSeen: Date.now() });

  useEffect(() => {
    const unsubscribe = chatService.subscribeToUserStatus(userId, setStatus);
    return unsubscribe;
  }, [userId]);

  const formatLastSeen = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      <Circle 
        className={`h-2 w-2 ${
          status.isOnline ? 'fill-green-500 text-green-500' : 'fill-gray-300 text-gray-300'
        }`} 
      />
      {showText && (
        <span className="text-xs text-gray-600">
          {status.isOnline ? 'Online' : formatLastSeen(status.lastSeen)}
        </span>
      )}
    </div>
  );
};

export default OnlineStatus;
