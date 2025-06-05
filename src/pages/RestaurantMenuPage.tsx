import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import MenuItemCard from '@/components/MenuItemCard';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Star } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

// Mock data, in a real app this would come from an API
const mockRestaurantData: { [key: string]: any } = {
  '1': {
    name: 'Pizza Palace',
    logoUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEyfHx8ZW58MHx8fHx8&auto=format&fit=crop&w=100&q=60', // Placeholder logo
    rating: 4.5,
    cuisine: 'Italian',
    menu: {
      'Appetizers': [
        { id: 'a1', name: 'Garlic Bread', description: 'Crusty bread with garlic butter.', price: 5.99, imageUrl: 'https://images.unsplash.com/photo-1624938187901-900515333418?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Z2FybGljJTIwYnJlYWR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=300&q=60' },
        { id: 'a2', name: 'Caprese Salad', description: 'Fresh mozzarella, tomatoes, and basil.', price: 7.50, imageUrl: 'https://images.unsplash.com/photo-1579299613031-c0075665f490?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2FwcmVzZSUyMHNhbGFkfGVufDB8fDB8fHww&auto=format&fit=crop&w=300&q=60' },
      ],
      'Pizzas': [
        { id: 'p1', name: 'Margherita Pizza', description: 'Classic cheese and tomato.', price: 12.99, imageUrl: 'https://images.unsplash.com/photo-1593560704563-f176a2eb61db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bWFyZ2hlcml0YSUyMHBpenphfGVufDB8fDB8fHww&auto=format&fit=crop&w=300&q=60' },
        { id: 'p2', name: 'Pepperoni Pizza', description: 'Loaded with pepperoni.', price: 14.99, imageUrl: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVwcGVyb25pJTIwcGl6emF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=300&q=60' },
      ],
      'Drinks': [
        { id: 'd1', name: 'Coke', description: 'Chilled Coca-Cola.', price: 2.50, imageUrl: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29jYSUyMGNvbGElMjBjYW58ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=300&q=60' },
      ]
    }
  },
  // Add more restaurants if needed for testing other IDs
  '2': { name: 'Sushi Central', logoUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3VzaGl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=100&q=60', rating: 4.8, cuisine: 'Japanese', menu: { 'Sushi Rolls': [], 'Sashimi': [] } },
  '3': { name: 'Taco Town', logoUrl: 'https://images.unsplash.com/photo-1565299585323-BA4d69068e53?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGFjb3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=100&q=60', rating: 4.3, cuisine: 'Mexican', menu: { 'Tacos': [], 'Burritos': [] } },
  '4': { name: 'Curry Corner', logoUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aW5kaWFuJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=100&q=60', rating: 4.6, cuisine: 'Indian', menu: { 'Curries': [], 'Breads': [] } },
};

const RestaurantMenuPage = () => {
  console.log('RestaurantMenuPage loaded');
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cartItemCount, setCartItemCount] = useState(0); // Local cart count for demo

  if (!restaurantId || !mockRestaurantData[restaurantId]) {
    // In a real app, show a proper "Not Found" message or redirect
    return <div>Restaurant not found!</div>;
  }

  const restaurant = mockRestaurantData[restaurantId];

  const handleAddToCart = (itemId: string) => {
    const item = Object.values(restaurant.menu).flat().find((menuItem: any) => menuItem.id === itemId);
    console.log('Adding to cart:', item?.name);
    setCartItemCount(prev => prev + 1); // Increment local cart count
    toast({
      title: "Added to cart!",
      description: `${item?.name} has been added to your cart.`,
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        title={restaurant.name}
        showBackButton={true}
        onBackClick={() => navigate(-1)}
        showCartIcon={true}
        cartItemCount={cartItemCount}
      />
      <main className="flex-grow">
        <section className="bg-white p-4 shadow-md">
          <div className="container mx-auto flex items-center space-x-4">
            <Avatar className="h-20 w-20 border">
              <AvatarImage src={restaurant.logoUrl} alt={restaurant.name} />
              <AvatarFallback>{restaurant.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{restaurant.name}</h1>
              <div className="flex items-center text-sm text-muted-foreground">
                <Star className="h-4 w-4 mr-1 text-yellow-500 fill-yellow-500" />
                <Label>{restaurant.rating} Stars</Label>
                <span className="mx-2">•</span>
                <Label>{restaurant.cuisine}</Label>
              </div>
            </div>
          </div>
        </section>

        <Tabs defaultValue={Object.keys(restaurant.menu)[0]} className="container mx-auto py-4 px-4">
          <TabsList className="grid w-full grid-cols-3 mb-4 sm:grid-cols-none sm:flex">
            {Object.keys(restaurant.menu).map(category => (
              <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
            ))}
          </TabsList>
          {Object.entries(restaurant.menu).map(([category, items]) => (
            <TabsContent key={category} value={category}>
              <ScrollArea className="h-[calc(100vh-300px)]"> {/* Adjust height */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-1">
                  {(items as any[]).length > 0 ? (items as any[]).map(item => (
                    <MenuItemCard
                      key={item.id}
                      {...item}
                      onAddToCart={handleAddToCart}
                    />
                  )) : <p className="text-muted-foreground col-span-full text-center py-4">No items in this category yet.</p>}
                </div>
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>

        {cartItemCount > 0 && (
          <div className="sticky bottom-0 p-4 bg-white border-t shadow-lg">
            <Button className="w-full" size="lg" onClick={() => navigate('/cart')}>
              <ShoppingBag className="mr-2 h-5 w-5" /> View Cart ({cartItemCount} items)
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default RestaurantMenuPage;