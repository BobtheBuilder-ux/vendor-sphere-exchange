
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Save, Upload, Star, MapPin, Phone, Mail, Globe } from "lucide-react";

const VendorProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    storeName: "TechGear Pro",
    description: "We specialize in high-quality tech gadgets and accessories for modern professionals.",
    address: "123 Tech Street, Silicon Valley, CA 94025",
    phone: "+1 (555) 123-4567",
    email: "contact@techgearpro.com",
    website: "https://techgearpro.com",
    isVerified: true,
    rating: 4.8,
    totalReviews: 234,
    memberSince: "2022",
    businessLicense: "TG-2022-001",
    taxId: "12-3456789"
  });

  const handleSave = () => {
    setIsEditing(false);
    // Save profile data
    console.log("Saving profile data:", profileData);
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-primary/10 rounded-lg flex items-center justify-center">
                <span className="text-2xl font-bold text-primary">TG</span>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-2xl font-bold">{profileData.storeName}</h2>
                  {profileData.isVerified && (
                    <Badge className="bg-green-100 text-green-800">
                      ✓ Verified
                    </Badge>
                  )}
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 text-yellow-400" />
                    {profileData.rating} ({profileData.totalReviews} reviews)
                  </div>
                  <div>Member since {profileData.memberSince}</div>
                </div>
              </div>
            </div>
            <Button
              variant={isEditing ? "default" : "outline"}
              onClick={isEditing ? handleSave : () => setIsEditing(true)}
            >
              {isEditing ? (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </>
              ) : (
                "Edit Profile"
              )}
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="storeName">Store Name</Label>
              <Input
                id="storeName"
                value={profileData.storeName}
                onChange={(e) => setProfileData({...profileData, storeName: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={profileData.description}
                onChange={(e) => setProfileData({...profileData, description: e.target.value})}
                disabled={!isEditing}
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="address">Business Address</Label>
              <div className="flex">
                <MapPin className="h-4 w-4 mt-3 mr-2 text-gray-400" />
                <Textarea
                  id="address"
                  value={profileData.address}
                  onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                  disabled={!isEditing}
                  rows={2}
                  className="flex-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <div className="flex">
                <Phone className="h-4 w-4 mt-3 mr-2 text-gray-400" />
                <Input
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                  disabled={!isEditing}
                  className="flex-1"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="email">Email Address</Label>
              <div className="flex">
                <Mail className="h-4 w-4 mt-3 mr-2 text-gray-400" />
                <Input
                  id="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  disabled={!isEditing}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="website">Website</Label>
              <div className="flex">
                <Globe className="h-4 w-4 mt-3 mr-2 text-gray-400" />
                <Input
                  id="website"
                  value={profileData.website}
                  onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                  disabled={!isEditing}
                  className="flex-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Business Information */}
        <Card>
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="businessLicense">Business License</Label>
              <Input
                id="businessLicense"
                value={profileData.businessLicense}
                onChange={(e) => setProfileData({...profileData, businessLicense: e.target.value})}
                disabled={!isEditing}
              />
            </div>
            
            <div>
              <Label htmlFor="taxId">Tax ID</Label>
              <Input
                id="taxId"
                value={profileData.taxId}
                onChange={(e) => setProfileData({...profileData, taxId: e.target.value})}
                disabled={!isEditing}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <Label>Verification Status</Label>
                <p className="text-sm text-gray-600">Account verification helps build trust</p>
              </div>
              <Switch
                checked={profileData.isVerified}
                disabled={true}
              />
            </div>
          </CardContent>
        </Card>

        {/* Store Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Store Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-gray-600">Receive email for new orders</p>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto-reply Messages</Label>
                  <p className="text-sm text-gray-600">Automatically respond to customer messages</p>
                </div>
                <Switch />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Public Profile</Label>
                  <p className="text-sm text-gray-600">Show your store in vendor directory</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VendorProfile;
