
import { useState } from "react";

interface ProductImageGalleryProps {
  product: {
    name: string;
    imageUrl?: string;
    images?: string[];
  };
}

const ProductImageGallery = ({ product }: ProductImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4">
      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
        <img 
          src={product.imageUrl || product.images?.[selectedImage] || "/placeholder.svg"} 
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      {product.images && product.images.length > 1 && (
        <div className="grid grid-cols-3 gap-2">
          {product.images.map((image, index) => (
            <button
              key={index}
              className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 ${
                selectedImage === index ? 'border-primary' : 'border-transparent'
              }`}
              onClick={() => setSelectedImage(index)}
            >
              <img 
                src={image} 
                alt={`${product.name} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;
