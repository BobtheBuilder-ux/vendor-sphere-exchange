
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Package, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  Plus,
  Minus,
  Search,
  Filter,
  Download,
  Upload,
  BarChart3
} from "lucide-react";

const InventoryManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [stockAdjustment, setStockAdjustment] = useState(0);

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
      salesVelocity: 12, // units per week
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

  const getStockStatus = (product: any) => {
    if (product.currentStock === 0) {
      return { status: "Out of Stock", color: "bg-red-100 text-red-800" };
    } else if (product.currentStock <= product.minStock) {
      return { status: "Low Stock", color: "bg-yellow-100 text-yellow-800" };
    } else if (product.currentStock >= product.maxStock * 0.9) {
      return { status: "Overstock", color: "bg-blue-100 text-blue-800" };
    } else {
      return { status: "In Stock", color: "bg-green-100 text-green-800" };
    }
  };

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

  const lowStockCount = inventoryData.filter(item => item.currentStock <= item.minStock).length;
  const outOfStockCount = inventoryData.filter(item => item.currentStock === 0).length;
  const totalValue = inventoryData.reduce((sum, item) => sum + (item.currentStock * item.costPrice), 0);

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

      {/* Inventory Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-2xl font-bold">{inventoryData.length}</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Low Stock</p>
                <p className="text-2xl font-bold text-yellow-600">{lowStockCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Out of Stock</p>
                <p className="text-2xl font-bold text-red-600">{outOfStockCount}</p>
              </div>
              <TrendingDown className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-green-600">${totalValue.toFixed(2)}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

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

          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr className="text-left">
                      <th className="p-4 font-medium">Product</th>
                      <th className="p-4 font-medium">SKU</th>
                      <th className="p-4 font-medium">Current Stock</th>
                      <th className="p-4 font-medium">Status</th>
                      <th className="p-4 font-medium">Price</th>
                      <th className="p-4 font-medium">Velocity</th>
                      <th className="p-4 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredInventory.map((product) => {
                      const stockStatus = getStockStatus(product);
                      return (
                        <tr key={product.id} className="border-b">
                          <td className="p-4">
                            <div>
                              <p className="font-medium">{product.name}</p>
                              <p className="text-sm text-gray-600">{product.category}</p>
                            </div>
                          </td>
                          <td className="p-4">{product.sku}</td>
                          <td className="p-4">
                            <div>
                              <p className="font-medium">{product.currentStock}</p>
                              <p className="text-xs text-gray-500">Min: {product.minStock}</p>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge className={stockStatus.color}>
                              {stockStatus.status}
                            </Badge>
                          </td>
                          <td className="p-4">${product.price}</td>
                          <td className="p-4">
                            <div className="flex items-center">
                              <BarChart3 className="h-4 w-4 mr-1 text-gray-400" />
                              <span className="text-sm">{product.salesVelocity}/week</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" onClick={() => setSelectedProduct(product)}>
                                  Adjust Stock
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Adjust Stock - {product.name}</DialogTitle>
                                  <DialogDescription>
                                    Current stock: {product.currentStock} units
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <Label htmlFor="adjustment">Stock Adjustment</Label>
                                    <div className="flex items-center space-x-2 mt-2">
                                      <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => setStockAdjustment(Math.max(stockAdjustment - 1, -product.currentStock))}
                                      >
                                        <Minus className="h-4 w-4" />
                                      </Button>
                                      <Input
                                        id="adjustment"
                                        type="number"
                                        value={stockAdjustment}
                                        onChange={(e) => setStockAdjustment(parseInt(e.target.value) || 0)}
                                        className="w-24 text-center"
                                      />
                                      <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => setStockAdjustment(stockAdjustment + 1)}
                                      >
                                        <Plus className="h-4 w-4" />
                                      </Button>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-2">
                                      New stock level: {product.currentStock + stockAdjustment}
                                    </p>
                                  </div>
                                  <div>
                                    <Label htmlFor="reason">Reason for Adjustment</Label>
                                    <Input
                                      id="reason"
                                      placeholder="e.g., Received shipment, Damaged goods, etc."
                                    />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button variant="outline">Cancel</Button>
                                  <Button onClick={() => handleStockAdjustment(product.id, stockAdjustment, "Manual adjustment")}>
                                    Update Stock
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Stock Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {inventoryData
                  .filter(item => item.currentStock <= item.minStock)
                  .map((product) => (
                    <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg bg-yellow-50">
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-600">
                            Current: {product.currentStock} | Minimum: {product.minStock}
                          </p>
                        </div>
                      </div>
                      <Button size="sm">Reorder</Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">3.2</div>
                  <div className="text-gray-600">Avg Turnover Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">7.5</div>
                  <div className="text-gray-600">Avg Sales Velocity</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">12</div>
                  <div className="text-gray-600">Days to Reorder</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InventoryManagement;
