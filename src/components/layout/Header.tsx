import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, ArrowLeft, Menu } from 'lucide-react'; // Added Menu for mobile

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
  showCartIcon?: boolean;
  cartItemCount?: number;
  // In a real app, you might have props for user state, onLogout, etc.
}

const Header: React.FC<HeaderProps> = ({
  title = "FoodApp",
  showBackButton = false,
  onBackClick,
  showCartIcon = true,
  cartItemCount = 0,
}) => {
  console.log("Rendering Header with title:", title);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {showBackButton && (
              <Button variant="ghost" size="icon" onClick={onBackClick} className="mr-2 lg:mr-4">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            )}
            <Link to="/" className="text-2xl font-bold text-primary">
              {title}
            </Link>
          </div>

          {/* Desktop Navigation (Example) */}
          <nav className="hidden md:flex space-x-4">
            <Link to="/restaurants" className="text-sm font-medium text-gray-500 hover:text-primary">Restaurants</Link>
            <Link to="/orders" className="text-sm font-medium text-gray-500 hover:text-primary">My Orders</Link>
            {/* Add more navigation links as needed */}
          </nav>

          <div className="flex items-center space-x-2">
            {showCartIcon && (
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </Button>
              </Link>
            )}
            <Link to="/profile">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                {/* Add logic for mobile menu toggle */}
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Menu Panel (to be implemented) */}
      {/* <div className="md:hidden"> ... mobile menu content ... </div> */}
    </header>
  );
};

export default Header;