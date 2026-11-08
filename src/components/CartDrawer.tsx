import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';

export const CartDrawer: React.FC = () => {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, subtotal, totalItems } = useCart();

  // Handle ESC key to close cart
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        setIsCartOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  // Lock body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <aside
          className="w-screen max-w-md bg-[#F7F5F0] border-l border-[#E5E1DA] shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out"
          role="dialog"
          aria-modal="true"
          aria-label="Shopping Bag Drawer"
        >
          {/* Header */}
          <div className="h-[76px] px-6 border-b border-[#E5E1DA] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-[#171717]" />
              <h2 className="text-base font-medium uppercase tracking-[0.05em] text-[#171717]">
                Your Bag ({totalItems})
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-[#73716C] hover:text-[#171717] transition-colors"
              aria-label="Close bag drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-6 divide-y divide-[#E5E1DA]">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <ShoppingBag className="w-12 h-12 text-[#8A7658] stroke-[1.25] mb-4" />
                <h3 className="font-editorial text-2xl font-normal text-[#171717] mb-2">
                  Your bag is waiting.
                </h3>
                <p className="text-sm text-[#73716C] max-w-xs mb-6">
                  Discover pieces that carry a purpose and express your faith with contemporary style.
                </p>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="bg-[#171717] text-white text-xs uppercase tracking-[0.08em] font-medium py-3 px-6 rounded-xs hover:bg-[#333333] transition-colors"
                >
                  Explore The Collection
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-4 flex gap-4">
                  <Link
                    to={`/product/${item.slug}`}
                    onClick={() => setIsCartOpen(false)}
                    className="w-20 h-24 bg-white border border-[#E5E1DA] rounded-xs overflow-hidden flex-shrink-0"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <Link
                          to={`/product/${item.slug}`}
                          onClick={() => setIsCartOpen(false)}
                          className="text-sm font-medium text-[#171717] hover:underline line-clamp-1"
                        >
                          {item.name}
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-[#73716C] hover:text-red-700 transition-colors p-1"
                          aria-label={`Remove ${item.name} from bag`}
                        >
                          <Trash2 className="w-4 h-4 stroke-[1.5]" />
                        </button>
                      </div>

                      <div className="text-xs text-[#73716C] mt-1 space-x-2">
                        <span>Color: {item.color}</span>
                        {item.size && <span>• Size: {item.size}</span>}
                      </div>

                      <p className="text-xs font-semibold text-[#171717] mt-1.5">
                        {formatPrice(item.price, item.currency)}
                      </p>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-[#E5E1DA] rounded-xs bg-white">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-[#73716C] hover:text-[#171717] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-medium text-[#171717]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.maxStock}
                          className="p-1 text-[#73716C] hover:text-[#171717] disabled:opacity-30 disabled:hover:text-[#73716C] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="text-xs text-[#73716C]">
                        {formatPrice(item.price * item.quantity, item.currency)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer / Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#E5E1DA] bg-white">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs uppercase tracking-[0.05em] text-[#73716C]">Subtotal</span>
                <span className="text-base font-semibold text-[#171717]">{formatPrice(subtotal)}</span>
              </div>
              <p className="text-[11px] text-[#73716C] mb-4">
                Delivery calculated at checkout. Free shipping on orders over MWK 75,000.
              </p>

              <div className="space-y-2">
                <Link
                  to="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full bg-[#171717] text-white py-3.5 px-4 rounded-xs text-xs uppercase tracking-[0.08em] font-medium flex items-center justify-center space-x-2 hover:bg-[#333333] transition-colors"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/cart"
                  onClick={() => setIsCartOpen(false)}
                  className="w-full bg-[#EEEAE2] text-[#171717] py-2.5 px-4 rounded-xs text-xs uppercase tracking-[0.08em] font-medium flex items-center justify-center hover:bg-[#E5E1DA] transition-colors"
                >
                  View Full Bag
                </Link>
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};
