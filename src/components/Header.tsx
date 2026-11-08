import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { QuickSearchModal } from './QuickSearchModal';

interface HeaderProps {
  onOpenCart?: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
  const { totalItems, setIsCartOpen } = useCart();
  const { wishlistIds } = useWishlist();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

  // Close mobile drawer on route transition
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Handle ESC key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navLinks = [
    { label: 'Shop All', to: '/shop' },
    { label: 'Caps', to: '/shop/caps' },
    { label: 'T-shirts', to: '/shop/t-shirts' },
    { label: 'Hoodies', to: '/shop/hoodies' },
    { label: 'Golf Shirts', to: '/shop/golf-shirts' },
    { label: 'Mugs', to: '/shop/mugs' },
    { label: 'Accessories', to: '/shop/accessories' },
    { label: 'Our Story', to: '/about' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#F7F5F0] border-b border-[#E5E1DA] transition-shadow duration-200">
        <div className="max-w-[1440px] mx-auto h-[76px] px-4 sm:px-8 lg:px-12 flex items-center justify-between">

          {/* Left: Brand Wordmark */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="group flex flex-col tracking-tight text-[#171717] focus:outline-none focus:ring-1 focus:ring-[#171717]"
              aria-label="Jesus Is the real Satisfaction Home"
            >
              <span className="font-editorial text-[18px] sm:text-[20px] font-semibold tracking-[-0.02em] leading-tight group-hover:text-[#8A7658] transition-colors">
                JESUS IS THE
              </span>
              <span className="text-[11px] sm:text-[12px] uppercase font-sans tracking-[0.2em] font-medium leading-none text-[#73716C] group-hover:text-[#171717] transition-colors">
                REAL SATISFACTION
              </span>
            </Link>
          </div>

          {/* Center: Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center space-x-7" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-[12px] uppercase tracking-[0.04em] font-medium transition-colors py-1 relative ${
                    isActive
                      ? 'text-[#171717] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-[#171717]'
                      : 'text-[#73716C] hover:text-[#171717]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Search Icon */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#171717] hover:text-[#8A7658] transition-colors rounded-sm focus:outline-none focus:ring-1 focus:ring-[#171717]"
              aria-label="Open search"
            >
              <Search className="w-5 h-5 stroke-[1.75]" />
            </button>

            {/* Wishlist Link / Count */}
            <Link
              to="/shop?filter=wishlist"
              className="relative p-2 text-[#171717] hover:text-[#8A7658] transition-colors rounded-sm focus:outline-none focus:ring-1 focus:ring-[#171717]"
              aria-label={`Wishlist (${wishlistIds.length} items)`}
            >
              <Heart className={`w-5 h-5 stroke-[1.75] ${wishlistIds.length > 0 ? 'fill-[#8A7658] text-[#8A7658]' : ''}`} />
              {wishlistIds.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#8A7658]" />
              )}
            </Link>

            {/* Cart Button with Count Badge */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-[#171717] hover:text-[#8A7658] transition-colors rounded-sm focus:outline-none focus:ring-1 focus:ring-[#171717] flex items-center"
              aria-label={`Shopping Bag, ${totalItems} items`}
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#171717] text-white text-[10px] font-medium w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="xl:hidden p-2 text-[#171717] hover:text-[#8A7658] transition-colors rounded-sm focus:outline-none focus:ring-1 focus:ring-[#171717]"
              aria-label="Open mobile navigation menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Menu className="w-6 h-6 stroke-[1.75]" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 xl:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer Content */}
      <aside
        className={`fixed top-0 right-0 bottom-0 w-[85%] max-w-[360px] bg-[#F7F5F0] z-50 shadow-2xl xl:hidden transform transition-transform duration-300 ease-in-out flex flex-col ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-label="Mobile Navigation Menu"
        aria-modal="true"
      >
        <div className="h-[76px] px-6 border-b border-[#E5E1DA] flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-editorial text-[16px] font-semibold tracking-tight">
              JESUS IS THE
            </span>
            <span className="text-[10px] uppercase font-sans tracking-[0.16em] text-[#73716C]">
              REAL SATISFACTION
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 text-[#171717] hover:text-[#8A7658] transition-colors"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5 stroke-[1.75]" />
          </button>
        </div>

        <nav className="flex-1 px-6 py-8 overflow-y-auto space-y-5" aria-label="Mobile Navigation">
          <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8A7658]">Collections</p>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <div key={link.to}>
                <Link
                  to={link.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block text-[16px] font-medium transition-colors ${
                    isActive ? 'text-[#171717] font-semibold pl-2 border-l-2 border-[#171717]' : 'text-[#73716C] hover:text-[#171717]'
                  }`}
                >
                  {link.label}
                </Link>
              </div>
            );
          })}
        </nav>

        <div className="p-6 border-t border-[#E5E1DA] bg-[#EEEAE2]/50">
          <p className="font-editorial text-[14px] italic text-[#171717] mb-2">
            "True satisfaction is found in Jesus."
          </p>
          <p className="text-[11px] uppercase tracking-[0.08em] text-[#73716C]">
            Faith in every thread
          </p>
        </div>
      </aside>

      {/* Quick Search Modal */}
      <QuickSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};
