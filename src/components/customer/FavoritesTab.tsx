
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";

const FavoritesTab = () => {
  const favorites = [
    {
      id: 1,
      name: "Smart Fitness Watch",
      vendor: "HealthTech Solutions",
      price: "$199.99",
      originalPrice: "$249.99",
      image: "/placeholder.svg",
      inStock: true
    },
    {
      id: 2,
      name: "Premium Coffee Beans",
      vendor: "Mountain Roasters",
      price: "$24.99",
      image: "/placeholder.svg",
      inStock: true
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Favorites</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {favorites.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold mb-2">{item.name}</h3>
              <p className="text-sm text-gray-600 mb-2">by {item.vendor}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="font-bold">{item.price}</span>
                  {item.originalPrice && (
                    <span className="text-sm text-gray-500 line-through">{item.originalPrice}</span>
                  )}
                </div>
                <Button size="sm">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FavoritesTab;
