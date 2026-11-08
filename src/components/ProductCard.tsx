import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Plus, Check } from 'lucide-react';
import type { Product } from '../types';
import { formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface ProductCardProps {
  product: Product;
  onQuickAddSuccess?: (msg: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickAddSuccess }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);
  const [quickAdded, setQuickAdded] = useState(false);

  const isFavorited = isInWishlist(product.id);
  const primaryImage = product.images[0] || '/images/hero/hero-model.jpg';
  const secondaryImage = product.images[1] || primaryImage;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Default to first available color and size
    const defaultColor = product.colors[0]?.name || 'Standard';
    const defaultSize = product.sizes ? product.sizes[0] : undefined;

    const res = addToCart(product, defaultColor, defaultSize, 1);
    if (res.success) {
      setQuickAdded(true);
      if (onQuickAddSuccess) onQuickAddSuccess(res.message);
      setTimeout(() => setQuickAdded(false), 1800);
    }
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      className="group flex flex-col relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <div className="relative aspect-square w-full bg-white overflow-hidden border border-[#E5E1DA] rounded-xs">
        <Link to={`/product/${product.slug}`} className="block w-full h-full">
          <img
            src={isHovered && secondaryImage ? secondaryImage : primaryImage}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            loading="lazy"
          />
        </Link>

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-2.5 left-2.5 bg-[#171717] text-white text-[10px] font-semibold uppercase tracking-[0.08em] px-2 py-0.5 rounded-xs pointer-events-none">
            {product.badge}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlistToggle}
          aria-label={isFavorited ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-[#171717] hover:text-[#8A7658] transition-colors shadow-xs"
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-[#8A7658] text-[#8A7658]' : ''}`} />
        </button>

        {/* Quick Add Button: subtle overlay on hover for desktop, persistent small bottom button for mobile */}
        <div className="absolute inset-x-2 bottom-2 transition-all duration-200">
          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={!product.inStock}
            className={`w-full py-2.5 px-3 text-xs uppercase tracking-[0.08em] font-medium rounded-xs flex items-center justify-center space-x-1.5 transition-all shadow-sm ${
              quickAdded
                ? 'bg-emerald-800 text-white'
                : !product.inStock
                ? 'bg-[#E5E1DA] text-[#73716C] cursor-not-allowed'
                : 'bg-[#171717]/90 text-white hover:bg-[#171717] md:opacity-0 md:group-hover:opacity-100'
            }`}
          >
            {quickAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added to Bag</span>
              </>
            ) : !product.inStock ? (
              <span>Out of Stock</span>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="pt-3 pb-1 flex flex-col">
        {/* Color Swatches */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center space-x-1.5 mb-1.5">
            {product.colors.map((c) => (
              <span
                key={c.name}
                title={c.name}
                className="w-2.5 h-2.5 rounded-full border border-black/20"
                style={{ backgroundColor: c.hex }}
              />
            ))}
            <span className="text-[10px] text-[#73716C] ml-1 uppercase">
              {product.colors.length} {product.colors.length === 1 ? 'color' : 'colors'}
            </span>
          </div>
        )}

        {/* Name */}
        <h3 className="text-[15px] sm:text-[16px] font-medium text-[#171717] leading-snug">
          <Link to={`/product/${product.slug}`} className="hover:underline">
            {product.name}
          </Link>
        </h3>

        {/* Price */}
        <p className="text-sm font-semibold text-[#171717] mt-1">
          {formatPrice(product.price, product.currency)}
        </p>
      </div>
    </div>
  );
};
