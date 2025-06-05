import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import LiveOrderTracker, { OrderStatus } from '@/components/LiveOrderTracker';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { FileText, MessageSquare, Search, Package, User } from 'lucide-react';

// Mock order data, in a real app this would come from an API
const mockOrderData: { [key: string]: any } = {
  'mock_order_123': {
    status: 'preparing' as OrderStatus,
    estimatedDeliveryTime: '6:30 PM - 6:45 PM',
    items: [
      { name: 'Margherita Pizza', quantity: 1 },
      { name: 'Coke', quantity: 2 },
    ],
    total: 29.87,
  },
  'mock_order_456': {
    status: 'out_for_delivery' as OrderStatus,
    estimatedDeliveryTime: 'in 15 minutes',
    items: [
      { name: 'Sushi Platter', quantity: 1 },
    ],
    total: 45.50,
  },
};


const OrderTrackingPage = () => {
  console.log('OrderTrackingPage loaded');
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();

  if (!orderId || !mockOrderData[orderId]) {
    // In a real app, show a proper "Not Found" message or redirect
    return (
        <div className="flex flex-col min-h-screen">
            <Header title="Track Order" showBackButton={true} onBackClick={() => navigate('/')} />
            <main className="flex-grow container mx-auto px-4 py-8 text-center">
                <h2 className="text-2xl font-semibold mb-4">Order Not Found</h2>
                <p className="text-muted-foreground">We couldn't find an order with ID: {orderId}</p>
                <Button onClick={() => navigate('/orders')} className="mt-6">View My Orders</Button>
            </main>
        </div>
    );
  }
  const order = mockOrderData[orderId];


  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title={`Order #${orderId.substring(0,8)}...`} showBackButton={true} onBackClick={() => navigate('/orders')} />
      <main className="flex-grow container mx-auto px-4 py-8 space-y-6">
        <LiveOrderTracker
          orderStatus={order.status}
          estimatedDeliveryTime={order.estimatedDeliveryTime}
          orderNumber={orderId}
        />

        <Card>
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
            <CardDescription>Order ID: {orderId}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {order.items.map((item: { name: string; quantity: number }, index: number) => (
                <div key={index} className="flex justify-between">
                  <Label>{item.name} (x{item.quantity})</Label>
                  {/* Price could be added here if available */}
                </div>
              ))}
            </div>
            <hr className="my-3"/>
            <div className="flex justify-between font-semibold">
                <Label>Total Paid</Label>
                <Label>${order.total.toFixed(2)}</Label>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" /> View Receipt
          </Button>
          <Button variant="outline">
            <MessageSquare className="mr-2 h-4 w-4" /> Contact Support
          </Button>
        </div>
      </main>
      <nav className="sticky bottom-0 bg-white border-t shadow-md md:hidden">
        <NavigationMenu className="max-w-full justify-around">
          <NavigationMenuList className="flex justify-around w-full">
            <NavigationMenuItem>
              <NavigationMenuLink href="/" className={navigationMenuTriggerStyle() + " flex-col h-16"}>
                <Search className="h-5 w-5" /> Discover
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/orders" className={navigationMenuTriggerStyle() + " flex-col h-16"}>
                <Package className="h-5 w-5" /> Orders
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/profile" className={navigationMenuTriggerStyle() + " flex-col h-16"}>
                <User className="h-5 w-5" /> Profile
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </div>
  );
};

export default OrderTrackingPage;