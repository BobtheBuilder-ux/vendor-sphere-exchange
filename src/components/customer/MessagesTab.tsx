
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const MessagesTab = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Messages</h2>
      <Card>
        <CardHeader>
          <CardTitle>Recent Conversations</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">
            No messages yet. <Link to="/messages" className="text-primary hover:underline">Start a conversation</Link> with a vendor.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MessagesTab;
