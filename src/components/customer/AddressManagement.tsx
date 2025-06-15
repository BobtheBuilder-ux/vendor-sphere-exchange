
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Plus, Edit, Trash2 } from "lucide-react";

interface Address {
  id: string;
  type: "Home" | "Work" | "Other";
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

const AddressManagement = () => {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      type: "Home",
      name: "John Doe",
      address: "123 Main St, Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
      isDefault: true
    },
    {
      id: "2",
      type: "Work",
      name: "John Doe",
      address: "456 Business Ave, Suite 200",
      city: "New York",
      state: "NY",
      zipCode: "10002",
      country: "United States",
      isDefault: false
    }
  ]);

  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [newAddress, setNewAddress] = useState<Omit<Address, 'id' | 'isDefault'>>({
    type: "Home",
    name: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States"
  });

  const handleAddAddress = () => {
    const address: Address = {
      ...newAddress,
      id: Date.now().toString(),
      isDefault: addresses.length === 0
    };
    setAddresses([...addresses, address]);
    setIsAddingAddress(false);
    resetForm();
  };

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
    setNewAddress({
      type: address.type,
      name: address.name,
      address: address.address,
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country
    });
  };

  const handleUpdateAddress = () => {
    if (!editingAddress) return;
    
    setAddresses(addrs =>
      addrs.map(addr =>
        addr.id === editingAddress.id
          ? { ...newAddress, id: editingAddress.id, isDefault: editingAddress.isDefault }
          : addr
      )
    );
    setEditingAddress(null);
    resetForm();
  };

  const handleRemoveAddress = (id: string) => {
    setAddresses(addrs => addrs.filter(addr => addr.id !== id));
  };

  const handleSetDefault = (id: string) => {
    setAddresses(addrs =>
      addrs.map(addr => ({
        ...addr,
        isDefault: addr.id === id
      }))
    );
  };

  const resetForm = () => {
    setNewAddress({
      type: "Home",
      name: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States"
    });
  };

  const isDialogOpen = isAddingAddress || editingAddress !== null;
  
  const handleDialogClose = () => {
    setIsAddingAddress(false);
    setEditingAddress(null);
    resetForm();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Saved Addresses</h2>
        <Dialog open={isDialogOpen} onOpenChange={handleDialogClose}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsAddingAddress(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add New Address
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingAddress ? "Edit Address" : "Add New Address"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="addressType">Address Type</Label>
                <Select
                  value={newAddress.type}
                  onValueChange={(value: "Home" | "Work" | "Other") =>
                    setNewAddress({ ...newAddress, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Home">Home</SelectItem>
                    <SelectItem value="Work">Work</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={newAddress.name}
                  onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <Label htmlFor="address">Street Address</Label>
                <Input
                  id="address"
                  value={newAddress.address}
                  onChange={(e) => setNewAddress({ ...newAddress, address: e.target.value })}
                  placeholder="123 Main St, Apt 4B"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                    placeholder="New York"
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={newAddress.state}
                    onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                    placeholder="NY"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input
                    id="zipCode"
                    value={newAddress.zipCode}
                    onChange={(e) => setNewAddress({ ...newAddress, zipCode: e.target.value })}
                    placeholder="10001"
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={newAddress.country}
                    onChange={(e) => setNewAddress({ ...newAddress, country: e.target.value })}
                    placeholder="United States"
                  />
                </div>
              </div>
              <Button
                onClick={editingAddress ? handleUpdateAddress : handleAddAddress}
                className="w-full"
              >
                {editingAddress ? "Update Address" : "Add Address"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {addresses.map((address) => (
          <Card key={address.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-start space-x-4">
                  <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge variant={address.isDefault ? "default" : "outline"}>
                        {address.type}
                      </Badge>
                      {address.isDefault && (
                        <Badge variant="secondary">Default</Badge>
                      )}
                    </div>
                    <p className="font-semibold">{address.name}</p>
                    <p className="text-gray-600">{address.address}</p>
                    <p className="text-gray-600">
                      {address.city}, {address.state} {address.zipCode}
                    </p>
                    <p className="text-gray-600">{address.country}</p>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  {!address.isDefault && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSetDefault(address.id)}
                    >
                      Set as Default
                    </Button>
                  )}
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditAddress(address)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveAddress(address.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AddressManagement;
