
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Phone, Video, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChatConversation } from "@/types/chat";
import OnlineStatus from "@/components/chat/OnlineStatus";

interface ChatHeaderProps {
  conversation: ChatConversation;
  otherParticipant: { id: string; name: string } | null;
}

const ChatHeader = ({ conversation, otherParticipant }: ChatHeaderProps) => {
  if (!otherParticipant) return null;

  return (
    <div className="p-4 border-b bg-gray-50">
      <div className="flex items-center justify-between">
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
          <div>
            <h3 className="font-semibold">
              {otherParticipant.name}
            </h3>
            <OnlineStatus 
              userId={otherParticipant.id}
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
  );
};

export default ChatHeader;
