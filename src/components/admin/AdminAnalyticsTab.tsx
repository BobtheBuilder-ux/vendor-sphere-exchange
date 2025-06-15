
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const AdminAnalyticsTab = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Analytics & Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Analytics dashboard will be implemented here.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAnalyticsTab;
