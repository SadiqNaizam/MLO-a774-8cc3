import React from 'react';
import { Badge } from '@/components/ui/badge'; // Using Badge for chip-like appearance

interface CuisineFilterChipProps {
  cuisineName: string;
  isSelected: boolean;
  onClick: (cuisineName: string) => void;
  className?: string;
}

const CuisineFilterChip: React.FC<CuisineFilterChipProps> = ({
  cuisineName,
  isSelected,
  onClick,
  className = '',
}) => {
  console.log("Rendering CuisineFilterChip:", cuisineName, "Selected:", isSelected);

  return (
    <Badge
      variant={isSelected ? 'default' : 'outline'}
      onClick={() => onClick(cuisineName)}
      className={`cursor-pointer transition-all px-3 py-1.5 text-sm ${className} ${isSelected ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'hover:bg-accent'}`}
    >
      {cuisineName}
    </Badge>
  );
};

export default CuisineFilterChip;