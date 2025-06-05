import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner"; // shadcn Sonner
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Page Imports
import RestaurantListingPage from "./pages/RestaurantListingPage"; // HomePage
import RestaurantMenuPage from "./pages/RestaurantMenuPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderTrackingPage from "./pages/OrderTrackingPage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists in src/pages/

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner richColors /> {/* Enable rich colors for Sonner Toasts */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RestaurantListingPage />} />
          <Route path="/restaurant/:restaurantId" element={<RestaurantMenuPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order/:orderId" element={<OrderTrackingPage />} />
          
          {/* Placeholder routes for navigation that might be in Header/NavMenu */}
          <Route path="/restaurants" element={<RestaurantListingPage />} /> {/* Alias for home */}
          <Route path="/orders" element={<NotFound />} /> {/* TODO: Create an Order History Page */}
          <Route path="/profile" element={<NotFound />} /> {/* TODO: Create a User Profile Page */}

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;