
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp } from "lucide-react";
import Navigation from "@/components/Navigation";
import VendorApprovalSystem from "@/components/admin/VendorApprovalSystem";
import AdminOverviewTab from "@/components/admin/AdminOverviewTab";
import AdminVendorsTab from "@/components/admin/AdminVendorsTab";
import AdminUsersTab from "@/components/admin/AdminUsersTab";
import AdminOrdersTab from "@/components/admin/AdminOrdersTab";
import AdminAnalyticsTab from "@/components/admin/AdminAnalyticsTab";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your marketplace platform</p>
          </div>
          <Button>
            <TrendingUp className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="vendors">Vendors</TabsTrigger>
            <TabsTrigger value="vendor-approval">Approvals</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <AdminOverviewTab />
          </TabsContent>

          <TabsContent value="vendors">
            <AdminVendorsTab />
          </TabsContent>

          <TabsContent value="vendor-approval">
            <VendorApprovalSystem />
          </TabsContent>

          <TabsContent value="users">
            <AdminUsersTab />
          </TabsContent>

          <TabsContent value="orders">
            <AdminOrdersTab />
          </TabsContent>

          <TabsContent value="analytics">
            <AdminAnalyticsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
