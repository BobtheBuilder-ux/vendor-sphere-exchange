
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    name: "Electronics",
    description: "Gadgets, computers, and tech accessories",
    image: "/placeholder.svg",
    itemCount: "15,230",
    slug: "electronics"
  },
  {
    id: 2,
    name: "Fashion",
    description: "Clothing, shoes, and accessories",
    image: "/placeholder.svg",
    itemCount: "23,450",
    slug: "fashion"
  },
  {
    id: 3,
    name: "Home & Garden",
    description: "Furniture, decor, and outdoor items",
    image: "/placeholder.svg",
    itemCount: "12,890",
    slug: "home-garden"
  },
  {
    id: 4,
    name: "Health & Beauty",
    description: "Skincare, makeup, and wellness products",
    image: "/placeholder.svg",
    itemCount: "8,670",
    slug: "health-beauty"
  },
  {
    id: 5,
    name: "Services",
    description: "Professional services and consultations",
    image: "/placeholder.svg",
    itemCount: "5,430",
    slug: "services"
  },
  {
    id: 6,
    name: "Automotive",
    description: "Car parts, accessories, and services",
    image: "/placeholder.svg",
    itemCount: "9,120",
    slug: "automotive"
  }
];

const FeaturedCategories = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our diverse range of categories and discover amazing products from trusted vendors
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link key={category.id} to={`/categories/${category.slug}`}>
              <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="aspect-video bg-primary/10 rounded-lg mb-4 flex items-center justify-center">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-3">{category.description}</p>
                  <p className="text-sm text-primary font-medium">
                    {category.itemCount} items available
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
