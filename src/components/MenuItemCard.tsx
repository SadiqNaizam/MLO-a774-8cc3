import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from 'lucide-react';

interface MenuItemCardProps {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  onAddToCart: (id: string) => void; // Consider passing quantity too or handling internally
  className?: string;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  id,
  name,
  description,
  price,
  imageUrl,
  onAddToCart,
  className = '',
}) => {
  console.log("Rendering MenuItemCard:", name);

  const handleAddToCartClick = () => {
    console.log("Add to cart clicked for MenuItem:", name, id);
    onAddToCart(id);
    // In a real app, show a toast notification: toast({ title: "Added to cart!", description: name });
  };

  return (
    <Card className={`w-full flex flex-col sm:flex-row overflow-hidden ${className}`}>
      {imageUrl && (
        <div className="sm:w-1/3 aspect-video sm:aspect-square bg-gray-100 flex-shrink-0">
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={name}
            className="object-cover w-full h-full"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </div>
      )}
      <div className="flex flex-col justify-between flex-grow">
        <CardHeader className="pb-2">
          <CardTitle className="text-md font-semibold">{name}</CardTitle>
          {description && (
            <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
          )}
        </CardHeader>
        <CardContent className="py-2 flex-grow">
          {/* Can add more details like ingredients, dietary tags, etc. */}
        </CardContent>
        <CardFooter className="flex items-center justify-between pt-2">
          <span className="text-lg font-bold text-primary">${price.toFixed(2)}</span>
          <Button size="sm" onClick={handleAddToCartClick}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default MenuItemCard;