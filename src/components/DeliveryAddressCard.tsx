import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroupItem } from "@/components/ui/radio-group"; // For selection
import { Label } from "@/components/ui/label";
import { Edit2, Trash2 } from 'lucide-react';

interface DeliveryAddressCardProps {
  id: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  postalCode: string;
  country?: string; // e.g. "USA"
  isDefault?: boolean;
  isSelected?: boolean;
  onSelect: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  className?: string;
}

const DeliveryAddressCard: React.FC<DeliveryAddressCardProps> = ({
  id,
  addressLine1,
  addressLine2,
  city,
  postalCode,
  country = "USA",
  isDefault = false,
  isSelected = false,
  onSelect,
  onEdit,
  onDelete,
  className = '',
}) => {
  console.log("Rendering DeliveryAddressCard for ID:", id, "Selected:", isSelected);

  return (
    <Card
      className={`w-full transition-all ${isSelected ? 'border-primary ring-2 ring-primary' : ''} ${className}`}
    >
      <CardHeader className="flex flex-row items-start justify-between pb-2">
        <div className="flex items-center space-x-2">
           {/* Assuming RadioGroup is outside, this card becomes part of an item */}
           <RadioGroupItem value={id} id={`address-${id}`} checked={isSelected} onClick={() => onSelect(id)} />
           <Label htmlFor={`address-${id}`} className="cursor-pointer">
                <CardTitle className="text-md font-semibold">
                    {addressLine1} {isDefault && <span className="text-xs font-normal text-muted-foreground"> (Default)</span>}
                </CardTitle>
           </Label>
        </div>
        <div className="flex space-x-1">
            {onEdit && <Button variant="ghost" size="icon" onClick={() => onEdit(id)} aria-label="Edit address"><Edit2 className="h-4 w-4" /></Button>}
            {onDelete && !isDefault && <Button variant="ghost" size="icon" onClick={() => onDelete(id)} aria-label="Delete address"><Trash2 className="h-4 w-4 text-destructive" /></Button>}
        </div>
      </CardHeader>
      <CardContent className="pl-10 pb-4 text-sm text-muted-foreground">
        {addressLine2 && <p>{addressLine2}</p>}
        <p>{city}, {postalCode}</p>
        <p>{country}</p>
      </CardContent>
    </Card>
  );
};

export default DeliveryAddressCard;