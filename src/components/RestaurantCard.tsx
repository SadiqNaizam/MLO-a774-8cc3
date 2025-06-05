import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Clock } from 'lucide-react';

interface RestaurantCardProps {
  id: string;
  name: string;
  imageUrl: string;
  rating: number; // e.g., 4.5
  reviewCount?: number;
  deliveryTime: string; // e.g., "25-35 min"
  cuisineTypes: string[];
  onClick: (id: string) => void;
  className?: string;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  imageUrl,
  rating,
  reviewCount,
  deliveryTime,
  cuisineTypes,
  onClick,
  className = '',
}) => {
  console.log("Rendering RestaurantCard:", name);

  return (
    <Card
      className={`w-full overflow-hidden transition-shadow duration-300 hover:shadow-lg cursor-pointer ${className}`}
      onClick={() => onClick(id)}
    >
      <CardHeader className="p-0">
        <div className="aspect-[16/9] bg-gray-100">
          <img
            src={imageUrl || '/placeholder.svg'}
            alt={name}
            className="object-cover w-full h-full"
            onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 space-y-1">
        <CardTitle className="text-lg font-semibold truncate">{name}</CardTitle>
        <div className="flex items-center text-sm text-muted-foreground space-x-2">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
            <span>{rating.toFixed(1)}</span>
            {reviewCount && <span>({reviewCount})</span>}
          </div>
          <span className="text-gray-400">•</span>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{deliveryTime}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="flex flex-wrap gap-1">
          {cuisineTypes.slice(0, 3).map((cuisine) => (
            <Badge key={cuisine} variant="secondary" className="text-xs">
              {cuisine}
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
};

export default RestaurantCard;