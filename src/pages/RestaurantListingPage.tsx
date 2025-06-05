import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { Input } from '@/components/ui/input';
import CuisineFilterChip from '@/components/CuisineFilterChip';
import { ScrollArea } from '@/components/ui/scroll-area';
import RestaurantCard from '@/components/RestaurantCard';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { Search,SlidersHorizontal } from 'lucide-react';

const placeholderCuisines = ['Italian', 'Chinese', 'Mexican', 'Indian', 'Japanese', 'Fast Food', 'Healthy'];
const placeholderRestaurants = [
  { id: '1', name: 'Pizza Palace', imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGl6emF8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60', rating: 4.5, reviewCount: 150, deliveryTime: '25-35 min', cuisineTypes: ['Italian', 'Pizza'] },
  { id: '2', name: 'Sushi Central', imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3VzaGl8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60', rating: 4.8, reviewCount: 200, deliveryTime: '30-40 min', cuisineTypes: ['Japanese', 'Sushi'] },
  { id: '3', name: 'Taco Town', imageUrl: 'https://images.unsplash.com/photo-1565299585323-BA4d69068e53?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGFjb3N8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60', rating: 4.3, reviewCount: 120, deliveryTime: '20-30 min', cuisineTypes: ['Mexican', 'Tacos'] },
  { id: '4', name: 'Curry Corner', imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aW5kaWFuJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60', rating: 4.6, reviewCount: 180, deliveryTime: '35-45 min', cuisineTypes: ['Indian', 'Curry'] },
];

const RestaurantListingPage = () => {
  console.log('RestaurantListingPage (HomePage) loaded');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRestaurantClick = (id: string) => {
    console.log('Navigating to restaurant with id:', id);
    navigate(`/restaurant/${id}`);
  };

  const filteredRestaurants = placeholderRestaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCuisine ? restaurant.cuisineTypes.includes(selectedCuisine) : true)
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header title="FoodieFind" showCartIcon={true} cartItemCount={0} />
      <main className="flex-grow container mx-auto px-4 py-6">
        <section className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search restaurants..."
              className="pl-10 pr-4 py-2 w-full text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {/* Placeholder for advanced filter button */}
            {/* <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2">
              <SlidersHorizontal className="h-5 w-5" />
            </Button> */}
          </div>
          <div className="flex overflow-x-auto space-x-2 pb-2 -mx-4 px-4">
            <CuisineFilterChip
                cuisineName="All"
                isSelected={selectedCuisine === null}
                onClick={() => setSelectedCuisine(null)}
              />
            {placeholderCuisines.map(cuisine => (
              <CuisineFilterChip
                key={cuisine}
                cuisineName={cuisine}
                isSelected={selectedCuisine === cuisine}
                onClick={setSelectedCuisine}
              />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Restaurants Near You</h2>
          {filteredRestaurants.length > 0 ? (
            <ScrollArea className="h-[calc(100vh-280px)] pr-3"> {/* Adjust height as needed */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRestaurants.map(restaurant => (
                  <RestaurantCard
                    key={restaurant.id}
                    {...restaurant}
                    onClick={handleRestaurantClick}
                  />
                ))}
              </div>
            </ScrollArea>
          ) : (
            <p className="text-center text-muted-foreground py-10">No restaurants found matching your criteria. Try a different search or filter!</p>
          )}
        </section>
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

export default RestaurantListingPage;