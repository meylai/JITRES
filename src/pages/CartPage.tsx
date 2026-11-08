import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';

export const CartPage: React.FC = () => {
  const { items, updateQuantity, removeFromCart, subtotal, deliveryFee, total, totalItems } = useCart();

  return (
    <div className="min-h-screen bg-[#F7F5F0] py-10 lg:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">

        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-[#73716C] mb-8" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-[#171717] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-[#171717] font-medium">Shopping Bag</span>
        </nav>

        <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#171717] mb-8 pb-4 border-b border-[#E5E1DA]">
          Your Shopping Bag
        </h1>

        {items.length === 0 ? (
          /* Empty Bag State */
          <div className="bg-white border border-[#E5E1DA] rounded-xs p-12 lg:p-20 text-center max-w-2xl mx-auto my-8">
            <ShoppingBag className="w-16 h-16 text-[#8A7658] stroke-[1] mx-auto mb-6" />
            <h2 className="font-editorial text-2xl sm:text-3xl font-medium text-[#171717] mb-3">
              Your bag is waiting.
            </h2>
            <p className="text-sm text-[#73716C] max-w-md mx-auto mb-8 leading-relaxed">
              Discover pieces that carry a purpose. Explore our collection of premium tees, boxy hoodies, caps, and accessories.
            </p>
            <Link
              to="/shop"
              className="inline-flex items-center space-x-2 bg-[#171717] hover:bg-[#333333] text-white text-xs uppercase tracking-[0.08em] font-medium px-8 py-4 rounded-xs transition-colors"
            >
              <span>Explore The Collection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          /* Cart with Items: Desktop 2-column layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* Left: Cart Items List (approx 65% width) */}
            <div className="lg:col-span-8 bg-white border border-[#E5E1DA] rounded-xs p-6 sm:p-8">
              <div className="flex justify-between items-center pb-4 border-b border-[#E5E1DA] text-xs font-semibold uppercase tracking-[0.08em] text-[#73716C]">
                <span>Piece ({totalItems})</span>
                <span className="hidden sm:inline">Quantity & Price</span>
              </div>

              <div className="divide-y divide-[#E5E1DA]">
                {items.map((item) => (
                  <div key={item.id} className="py-6 flex flex-col sm:flex-row gap-5 items-start sm:items-center">
                    {/* Item Image */}
                    <Link
                      to={`/product/${item.slug}`}
                      className="w-24 h-28 bg-[#F7F5F0] border border-[#E5E1DA] rounded-xs overflow-hidden flex-shrink-0"
                    >
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </Link>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/product/${item.slug}`}
                        className="font-editorial text-lg font-medium text-[#171717] hover:underline block truncate"
                      >
                        {item.name}
                      </Link>
                      <div className="text-xs text-[#73716C] mt-1 space-x-3">
                        <span>Color: <strong className="text-[#171717]">{item.color}</strong></span>
                        {item.size && <span>• Size: <strong className="text-[#171717]">{item.size}</strong></span>}
                      </div>
                      <p className="text-xs font-semibold text-[#8A7658] mt-2">
                        Unit: {formatPrice(item.price, item.currency)}
                      </p>
                    </div>

                    {/* Quantity controls & Subtotal */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0">
                      <div className="flex items-center border border-[#E5E1DA] rounded-xs bg-[#F7F5F0]">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-[#73716C] hover:text-[#171717] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-medium text-[#171717]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.maxStock}
                          className="px-2.5 py-1 text-[#73716C] hover:text-[#171717] disabled:opacity-30 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right min-w-[90px]">
                        <p className="text-sm font-semibold text-[#171717]">
                          {formatPrice(item.price * item.quantity, item.currency)}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#73716C] hover:text-red-700 p-1.5 transition-colors"
                        aria-label={`Remove ${item.name} from bag`}
                      >
                        <Trash2 className="w-4 h-4 stroke-[1.5]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-[#E5E1DA] flex justify-between items-center">
                <Link
                  to="/shop"
                  className="text-xs uppercase tracking-[0.08em] font-medium text-[#73716C] hover:text-[#171717] transition-colors inline-flex items-center"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>

            {/* Right: Order Summary Sidebar (approx 35% width) */}
            <div className="lg:col-span-4 bg-white border border-[#E5E1DA] rounded-xs p-6 sm:p-8">
              <h2 className="text-xs uppercase tracking-[0.1em] font-semibold text-[#171717] pb-4 border-b border-[#E5E1DA]">
                Order Summary
              </h2>

              <div className="py-4 space-y-3 text-sm">
                <div className="flex justify-between text-[#73716C]">
                  <span>Subtotal ({totalItems} items)</span>
                  <span className="font-medium text-[#171717]">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#73716C]">
                  <span>Estimated Delivery</span>
                  <span className="font-medium text-[#171717]">
                    {deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}
                  </span>
                </div>
                {deliveryFee === 0 && (
                  <p className="text-[11px] text-emerald-700">
                    ✓ Free delivery applied for orders over MWK 75,000
                  </p>
                )}
              </div>

              <div className="pt-4 pb-6 border-t border-[#E5E1DA] flex justify-between items-baseline">
                <span className="text-base font-semibold text-[#171717]">Total</span>
                <span className="font-editorial text-2xl font-semibold text-[#171717]">
                  {formatPrice(total)}
                </span>
              </div>

              <Link
                to="/checkout"
                className="w-full bg-[#171717] hover:bg-[#333333] text-white py-4 px-6 rounded-xs text-xs uppercase tracking-[0.08em] font-medium flex items-center justify-center space-x-2 transition-colors mb-4"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="flex items-center space-x-2 text-xs text-[#73716C] justify-center">
                <ShieldCheck className="w-4 h-4 text-[#8A7658]" />
                <span>Encrypted & secure checkout flow</span>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
