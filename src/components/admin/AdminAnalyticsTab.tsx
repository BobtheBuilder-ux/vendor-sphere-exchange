
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PlatformAnalytics from "./PlatformAnalytics";
import ConversionTracking from "./ConversionTracking";

const AdminAnalyticsTab = () => {
  return (
    <div className="space-y-6">
      <Tabs defaultValue="platform" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="platform">Platform Analytics</TabsTrigger>
          <TabsTrigger value="conversion">Conversion Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="platform">
          <PlatformAnalytics />
        </TabsContent>

        <TabsContent value="conversion">
          <ConversionTracking />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminAnalyticsTab;
