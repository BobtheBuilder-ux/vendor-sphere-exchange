
import { useState } from "react";
import Navigation from "@/components/Navigation";
import DashboardSidebar from "@/components/customer/DashboardSidebar";
import OrdersTab from "@/components/customer/OrdersTab";
import FavoritesTab from "@/components/customer/FavoritesTab";
import MessagesTab from "@/components/customer/MessagesTab";
import ProfileSettings from "@/components/customer/ProfileSettings";
import PaymentMethods from "@/components/customer/PaymentMethods";
import AddressManagement from "@/components/customer/AddressManagement";

const CustomerDashboard = () => {
  const [activeTab, setActiveTab] = useState("orders");

  const renderTabContent = () => {
    switch (activeTab) {
      case "orders":
        return <OrdersTab />;
      case "favorites":
        return <FavoritesTab />;
      case "addresses":
        return <AddressManagement />;
      case "payments":
        return <PaymentMethods />;
      case "messages":
        return <MessagesTab />;
      case "profile":
        return <ProfileSettings />;
      default:
        return <OrdersTab />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Account</h1>
            <p className="text-gray-600 mt-2">Manage your orders, preferences, and account settings</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <DashboardSidebar activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
