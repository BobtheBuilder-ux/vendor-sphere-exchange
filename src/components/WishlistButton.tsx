
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlist";
import { cn } from "@/lib/utils";

interface WishlistButtonProps {
  productId: string;
  variant?: "default" | "ghost" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  showText?: boolean;
}

const WishlistButton = ({ 
  productId, 
  variant = "ghost", 
  size = "icon",
  className,
  showText = false
}: WishlistButtonProps) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const inWishlist = isInWishlist(productId);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (inWishlist) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleToggle}
      className={cn(
        "transition-colors",
        inWishlist && "text-red-500 hover:text-red-600",
        className
      )}
    >
      <Heart 
        className={cn(
          "h-4 w-4",
          inWishlist && "fill-current",
          showText && "mr-2"
        )} 
      />
      {showText && (inWishlist ? "Remove from Wishlist" : "Add to Wishlist")}
    </Button>
  );
};

export default WishlistButton;
