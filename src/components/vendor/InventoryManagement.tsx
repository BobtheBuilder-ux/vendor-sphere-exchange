
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Package,
  Search,
  Filter,
  Download,
  Upload
} from "lucide-react";
import InventoryOverview from "./InventoryOverview";
import InventoryTable from "./InventoryTable";
import InventoryAlerts from "./InventoryAlerts";
import InventoryAnalytics from "./InventoryAnalytics";

const InventoryManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const inventoryData = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      sku: "WBH-001",
      currentStock: 45,
      minStock: 10,
      maxStock: 100,
      price: 79.99,
      costPrice: 45.00,
      category: "Electronics",
      supplier: "AudioTech Inc",
      lastRestocked: "2024-01-10",
      status: "In Stock",
      salesVelocity: 12,
      turnoverRate: 4.2,
      reorderPoint: 15
    },
    {
      id: 2,
      name: "Organic Coffee Beans",
      sku: "OCB-002",
      currentStock: 5,
      minStock: 20,
      maxStock: 200,
      price: 24.99,
      costPrice: 12.00,
      category: "Food & Beverage",
      supplier: "Green Mountain Coffee",
      lastRestocked: "2024-01-05",
      status: "Low Stock",
      salesVelocity: 8,
      turnoverRate: 6.1,
      reorderPoint: 25
    },
    {
      id: 3,
      name: "Ergonomic Office Chair",
      sku: "EOC-003",
      currentStock: 0,
      minStock: 5,
      maxStock: 25,
      price: 299.99,
      costPrice: 180.00,
      category: "Furniture",
      supplier: "Office Solutions Ltd",
      lastRestocked: "2023-12-20",
      status: "Out of Stock",
      salesVelocity: 2,
      turnoverRate: 1.8,
      reorderPoint: 3
    }
  ];

  const handleStockAdjustment = (productId: number, adjustment: number, reason: string) => {
    console.log("Stock adjustment:", { productId, adjustment, reason });
    // API call to adjust stock
  };

  const handleBulkReorder = () => {
    const lowStockItems = inventoryData.filter(item => item.currentStock <= item.minStock);
    console.log("Bulk reorder for:", lowStockItems);
  };

  const filteredInventory = inventoryData.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Inventory Management</h2>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={handleBulkReorder}>
            <Package className="h-4 w-4 mr-2" />
            Bulk Reorder
          </Button>
        </div>
      </div>

      <InventoryOverview inventoryData={inventoryData} />

      <Tabs defaultValue="inventory" className="space-y-6">
        <TabsList>
          <TabsTrigger value="inventory">Current Inventory</TabsTrigger>
          <TabsTrigger value="alerts">Stock Alerts</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search products..." 
                  className="pl-10 w-80"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          <InventoryTable 
            inventoryData={filteredInventory} 
            onStockAdjustment={handleStockAdjustment}
          />
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <InventoryAlerts inventoryData={inventoryData} />
        </TabsContent>

        <TabsContent value="analytics">
          <InventoryAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InventoryManagement;
