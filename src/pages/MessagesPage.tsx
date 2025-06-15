
import Navigation from "@/components/Navigation";
import ChatSystem from "@/components/ChatSystem";
import ChatNotifications from "@/components/chat/ChatNotifications";

const MessagesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <ChatNotifications />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600 mt-2">Connect with vendors and customers</p>
        </div>
        <ChatSystem />
      </div>
    </div>
  );
};

export default MessagesPage;
