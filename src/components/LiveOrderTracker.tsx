import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress"; // For visual progress
import { CheckCircle, Package, Truck, Home } from 'lucide-react'; // Icons for steps

type OrderStatus = 'placed' | 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled';

interface LiveOrderTrackerProps {
  orderStatus: OrderStatus;
  estimatedDeliveryTime?: string; // e.g., "5:30 PM - 5:45 PM" or "in 20 minutes"
  orderNumber?: string;
  className?: string;
}

const statusSteps: { status: OrderStatus; label: string; icon: React.ElementType }[] = [
  { status: 'placed', label: 'Order Placed', icon: CheckCircle },
  { status: 'confirmed', label: 'Order Confirmed', icon: CheckCircle },
  { status: 'preparing', label: 'Preparing Food', icon: Package },
  { status: 'out_for_delivery', label: 'Out for Delivery', icon: Truck },
  { status: 'delivered', label: 'Delivered', icon: Home },
];

const LiveOrderTracker: React.FC<LiveOrderTrackerProps> = ({
  orderStatus,
  estimatedDeliveryTime,
  orderNumber,
  className = '',
}) => {
  console.log("Rendering LiveOrderTracker with status:", orderStatus);

  const currentStepIndex = statusSteps.findIndex(step => step.status === orderStatus);
  const progressValue = currentStepIndex >= 0 && orderStatus !== 'cancelled'
    ? ((currentStepIndex + 1) / (statusSteps.length - (statusSteps.some(s => s.status === 'cancelled') ? 1: 0) )) * 100 // Exclude 'cancelled' from total steps for progress
    : (orderStatus === 'cancelled' ? 0 : 0); // Or handle cancelled progress differently

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader>
        <CardTitle className="text-lg">
            {orderNumber ? `Order #${orderNumber} Status` : 'Order Status'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {orderStatus === 'cancelled' ? (
          <div className="text-center py-4">
            <p className="text-destructive text-xl font-semibold">Order Cancelled</p>
            {/* Optionally provide a reason or next steps */}
          </div>
        ) : (
          <>
            <div className="flex justify-between text-sm text-muted-foreground mb-1">
              <span>{statusSteps[currentStepIndex]?.label || 'Processing...'}</span>
              {estimatedDeliveryTime && <span>Est. Delivery: {estimatedDeliveryTime}</span>}
            </div>
            <Progress value={progressValue} className="w-full h-2" />
            <div className="grid grid-cols-5 gap-2 text-center text-xs mt-2">
              {statusSteps.filter(s => s.status !== 'cancelled').map((step, index) => {
                const isActive = currentStepIndex >= index;
                const Icon = step.icon;
                return (
                  <div key={step.status} className={`flex flex-col items-center ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${isActive ? 'bg-primary border-primary text-primary-foreground' : 'bg-accent border-gray-300'}`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="mt-1">{step.label}</span>
                  </div>
                );
              })}
            </div>
            {/* Could add a map component here if location data is available for 'out_for_delivery' */}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default LiveOrderTracker;