import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronDown,
  Plus,
  Minus,
  Check,
  Maximize2,
  X,
  AlertCircle
} from 'lucide-react';
import { PRODUCTS, getProductBySlug, formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const product = useMemo(() => getProductBySlug(slug || ''), [slug]);
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Component state
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [activeAccordion, setActiveAccordion] = useState<'description' | 'materials' | 'shipping'>('description');
  const [isFullScreenZoom, setIsFullScreenZoom] = useState(false);

  // Initialize selected color and size when product changes
  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]?.name || '');
      setSelectedSize(product.sizes ? product.sizes[0] : '');
      setSelectedImageIndex(0);
      setQuantity(1);
      setFeedback(null);
      window.scrollTo(0, 0);
    }
  }, [product]);

  // Determine current variant and stock
  const currentVariant = useMemo(() => {
    if (!product) return null;
    return product.variants.find(
      v => v.color.toLowerCase() === selectedColor.toLowerCase() &&
           (!product.sizes || v.size === selectedSize)
    );
  }, [product, selectedColor, selectedSize]);

  const maxStock = currentVariant ? currentVariant.stock : (product?.inStock ? 20 : 0);
  const isOutOfStock = maxStock <= 0;

  // Related products
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    if (product.relatedProductIds && product.relatedProductIds.length > 0) {
      return PRODUCTS.filter(p => product.relatedProductIds?.includes(p.id)).slice(0, 4);
    }
    return PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <h2 className="font-editorial text-3xl font-medium text-[#171717] mb-2">Piece Not Found</h2>
        <p className="text-sm text-[#73716C] mb-6">The piece you are looking for does not exist or has been archived.</p>
        <button
          onClick={() => navigate('/shop')}
          className="bg-[#171717] text-white text-xs uppercase tracking-[0.08em] px-6 py-3 rounded-xs"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();

    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      setFeedback({ type: 'error', message: 'Please select a size.' });
      return;
    }

    if (!selectedColor) {
      setFeedback({ type: 'error', message: 'Please select a color option.' });
      return;
    }

    if (isOutOfStock) {
      setFeedback({ type: 'error', message: 'This variant is currently out of stock.' });
      return;
    }

    const res = addToCart(product, selectedColor, selectedSize || undefined, quantity);
    if (res.success) {
      setFeedback({ type: 'success', message: res.message });
      setTimeout(() => setFeedback(null), 3500);
    } else {
      setFeedback({ type: 'error', message: res.message });
    }
  };

  const toggleAccordion = (tab: 'description' | 'materials' | 'shipping') => {
    setActiveAccordion(prev => prev === tab ? 'description' : tab);
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] py-8 lg:py-14">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">

        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-[#73716C] mb-8" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-[#171717] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[#171717] transition-colors">Shop</Link>
          <span>/</span>
          <Link to={`/shop/${product.category}`} className="hover:text-[#171717] transition-colors capitalize">
            {product.categoryLabel}
          </Link>
          <span>/</span>
          <span className="text-[#171717] font-medium truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </nav>

        {/* Product Details Section (Desktop: 58% Gallery / 42% Info) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-24">

          {/* Gallery Container (approx 58% width on desktop) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4">

            {/* Thumbnails (vertical on desktop/tablet, horizontal on mobile) */}
            {product.images.length > 1 && (
              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto flex-shrink-0">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-16 h-20 sm:w-20 sm:h-24 rounded-xs overflow-hidden border transition-all flex-shrink-0 ${
                      selectedImageIndex === idx
                        ? 'border-[#171717] ring-1 ring-[#171717]'
                        : 'border-[#E5E1DA] opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Main Image with Zoom Trigger */}
            <div className="flex-1 relative aspect-square sm:aspect-4/5 bg-white border border-[#E5E1DA] rounded-xs overflow-hidden group">
              <img
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300"
              />

              {product.badge && (
                <div className="absolute top-4 left-4 bg-[#171717] text-white text-[11px] font-semibold uppercase tracking-[0.08em] px-2.5 py-1 rounded-xs">
                  {product.badge}
                </div>
              )}

              <button
                type="button"
                onClick={() => setIsFullScreenZoom(true)}
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-xs p-2 rounded-full text-[#171717] hover:bg-white hover:text-[#8A7658] transition-colors shadow-xs"
                aria-label="View full screen image"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Product Purchase & Details Information (approx 42% on desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-start">

            <div className="pb-6 border-b border-[#E5E1DA]">
              <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#8A7658] block mb-2">
                {product.categoryLabel}
              </span>
              <h1 className="font-editorial text-3xl sm:text-4xl font-semibold tracking-tight text-[#171717] mb-3">
                {product.name}
              </h1>
              <p className="text-xl font-semibold text-[#171717]">
                {formatPrice(product.price, product.currency)}
              </p>
            </div>

            {/* Description excerpt */}
            <p className="text-sm sm:text-base text-[#73716C] leading-relaxed py-5 border-b border-[#E5E1DA]">
              {product.description}
            </p>

            {/* Purchase Form */}
            <form onSubmit={handleAddToCart} className="py-6 space-y-6 border-b border-[#E5E1DA]">

              {/* Color Selection */}
              <div>
                <div className="flex justify-between items-center mb-2.5">
                  <span className="text-xs uppercase tracking-[0.08em] font-medium text-[#171717]">
                    Color: <span className="text-[#8A7658] font-semibold">{selectedColor}</span>
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  {product.colors.map((c) => {
                    const isSelected = selectedColor === c.name;
                    return (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => {
                          setSelectedColor(c.name);
                          if (c.imageIndex !== undefined && product.images[c.imageIndex]) {
                            setSelectedImageIndex(c.imageIndex);
                          }
                        }}
                        className={`group relative p-1 rounded-full border transition-all ${
                          isSelected ? 'border-[#171717] ring-1 ring-[#171717]' : 'border-transparent hover:border-[#E5E1DA]'
                        }`}
                        title={c.name}
                      >
                        <span
                          className="w-6 h-6 rounded-full block border border-black/15"
                          style={{ backgroundColor: c.hex }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size Selection (if applicable) */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <div className="flex justify-between items-center mb-2.5">
                    <span className="text-xs uppercase tracking-[0.08em] font-medium text-[#171717]">
                      Select Size: <span className="text-[#8A7658] font-semibold">{selectedSize}</span>
                    </span>
                    <span className="text-[11px] text-[#73716C] uppercase tracking-[0.05em]">
                      True to Size
                    </span>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {product.sizes.map((s) => {
                      const isSelected = selectedSize === s;
                      // Check variant stock for this specific size
                      const variantForSize = product.variants.find(
                        v => v.color.toLowerCase() === selectedColor.toLowerCase() && v.size === s
                      );
                      const isSizeOOS = variantForSize ? variantForSize.stock <= 0 : false;

                      return (
                        <button
                          key={s}
                          type="button"
                          disabled={isSizeOOS}
                          onClick={() => setSelectedSize(s)}
                          className={`py-3 text-xs uppercase font-medium rounded-xs border transition-colors relative ${
                            isSizeOOS
                              ? 'bg-[#EEEAE2]/60 text-[#A3A19D] border-[#E5E1DA] cursor-not-allowed line-through'
                              : isSelected
                              ? 'bg-[#171717] text-white border-[#171717]'
                              : 'bg-white text-[#171717] border-[#E5E1DA] hover:border-[#171717]'
                          }`}
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Stock availability indicator */}
              <div className="flex items-center space-x-2 text-xs">
                <span className={`w-2 h-2 rounded-full ${isOutOfStock ? 'bg-red-500' : 'bg-emerald-600'}`} />
                <span className={isOutOfStock ? 'text-red-700 font-medium' : 'text-emerald-800 font-medium'}>
                  {isOutOfStock ? 'Currently Out of Stock' : maxStock < 5 ? `Low Stock: Only ${maxStock} pieces left` : 'In Stock & Ready to Ship'}
                </span>
              </div>

              {/* Quantity & Add to Cart button */}
              <div className="flex gap-3">
                {/* Quantity selector */}
                <div className="flex items-center border border-[#E5E1DA] rounded-xs bg-white h-12">
                  <button
                    type="button"
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    disabled={quantity <= 1 || isOutOfStock}
                    className="px-3 h-full text-[#73716C] hover:text-[#171717] disabled:opacity-40 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-xs font-semibold text-[#171717]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(prev => Math.min(maxStock, prev + 1))}
                    disabled={quantity >= maxStock || isOutOfStock}
                    className="px-3 h-full text-[#73716C] hover:text-[#171717] disabled:opacity-40 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Main Add To Cart CTA */}
                <button
                  type="submit"
                  disabled={isOutOfStock}
                  className="flex-1 bg-[#171717] hover:bg-[#333333] text-white h-12 px-6 rounded-xs text-xs uppercase tracking-[0.08em] font-medium flex items-center justify-center space-x-2 transition-colors disabled:opacity-40 disabled:hover:bg-[#171717] disabled:cursor-not-allowed"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isOutOfStock ? 'Sold Out' : 'Add To Bag'}</span>
                </button>

                {/* Wishlist Button */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  className={`w-12 h-12 border border-[#E5E1DA] rounded-xs flex items-center justify-center transition-colors bg-white ${
                    isFavorited ? 'text-[#8A7658] border-[#8A7658]' : 'text-[#171717] hover:text-[#8A7658]'
                  }`}
                  aria-label="Save to wishlist"
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-[#8A7658]' : ''}`} />
                </button>
              </div>

              {/* Feedback Alert */}
              {feedback && (
                <div
                  className={`p-3 rounded-xs text-xs flex items-center space-x-2 ${
                    feedback.type === 'success'
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      : 'bg-rose-50 text-rose-800 border border-rose-200'
                  }`}
                  role="status"
                >
                  {feedback.type === 'success' ? <Check className="w-4 h-4 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
                  <span>{feedback.message}</span>
                </div>
              )}
            </form>

            {/* Accordion Information Section */}
            <div className="divide-y divide-[#E5E1DA] border-b border-[#E5E1DA]">
              {/* Accordion 1: Description & Details */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleAccordion('description')}
                  className="w-full py-4 flex items-center justify-between text-left text-xs uppercase tracking-[0.08em] font-medium text-[#171717]"
                  aria-expanded={activeAccordion === 'description'}
                >
                  <span>Product Specifications</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeAccordion === 'description' ? 'rotate-180' : ''}`} />
                </button>
                {activeAccordion === 'description' && (
                  <div className="pb-5 text-xs text-[#73716C] space-y-2 leading-relaxed">
                    <p><strong className="text-[#171717]">Fit:</strong> {product.details.fit || 'Contemporary relaxed cut'}</p>
                    <p><strong className="text-[#171717]">Features:</strong></p>
                    <ul className="list-disc list-inside space-y-1 pl-1">
                      {product.features.map((feat, i) => (
                        <li key={i}>{feat}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Accordion 2: Materials & Care */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleAccordion('materials')}
                  className="w-full py-4 flex items-center justify-between text-left text-xs uppercase tracking-[0.08em] font-medium text-[#171717]"
                  aria-expanded={activeAccordion === 'materials'}
                >
                  <span>Materials & Ethical Care</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeAccordion === 'materials' ? 'rotate-180' : ''}`} />
                </button>
                {activeAccordion === 'materials' && (
                  <div className="pb-5 text-xs text-[#73716C] space-y-2 leading-relaxed">
                    <p><strong className="text-[#171717]">Material:</strong> {product.details.material}</p>
                    <p><strong className="text-[#171717]">Care Instructions:</strong> {product.details.care}</p>
                    <p><strong className="text-[#171717]">Origin:</strong> {product.details.origin}</p>
                  </div>
                )}
              </div>

              {/* Accordion 3: Shipping & Returns */}
              <div>
                <button
                  type="button"
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full py-4 flex items-center justify-between text-left text-xs uppercase tracking-[0.08em] font-medium text-[#171717]"
                  aria-expanded={activeAccordion === 'shipping'}
                >
                  <span>Shipping & Returns</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeAccordion === 'shipping' ? 'rotate-180' : ''}`} />
                </button>
                {activeAccordion === 'shipping' && (
                  <div className="pb-5 text-xs text-[#73716C] space-y-2 leading-relaxed">
                    <p>• Nationwide delivery across Malawi within 2–4 business days via verified couriers.</p>
                    <p>• Free shipping on all orders over MWK 75,000.</p>
                    <p>• Hassle-free exchanges within 7 days for unworn pieces with tags attached.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Guarantees */}
            <div className="grid grid-cols-3 gap-2 pt-6 text-center text-[#73716C]">
              <div className="flex flex-col items-center">
                <Truck className="w-4 h-4 mb-1 text-[#171717]" />
                <span className="text-[10px] uppercase tracking-[0.05em]">Reliable Delivery</span>
              </div>
              <div className="flex flex-col items-center">
                <RotateCcw className="w-4 h-4 mb-1 text-[#171717]" />
                <span className="text-[10px] uppercase tracking-[0.05em]">7-Day Exchange</span>
              </div>
              <div className="flex flex-col items-center">
                <ShieldCheck className="w-4 h-4 mb-1 text-[#171717]" />
                <span className="text-[10px] uppercase tracking-[0.05em]">Authentic Quality</span>
              </div>
            </div>

          </div>

        </div>

        {/* SECTION: Related Products ("You May Also Like") */}
        {relatedProducts.length > 0 && (
          <section className="pt-16 border-t border-[#E5E1DA]">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E5E1DA]">
              <h2 className="font-editorial text-2xl sm:text-3xl font-medium tracking-tight text-[#171717]">
                You May Also Like
              </h2>
              <Link
                to={`/shop/${product.category}`}
                className="text-xs uppercase tracking-[0.08em] font-medium text-[#171717] hover:text-[#8A7658] transition-colors"
              >
                More in {product.categoryLabel}
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </section>
        )}

      </div>

      {/* Full Screen Image Modal */}
      {isFullScreenZoom && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button
            type="button"
            onClick={() => setIsFullScreenZoom(false)}
            className="absolute top-6 right-6 text-white hover:text-[#8A7658] p-2"
            aria-label="Close full screen view"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={product.images[selectedImageIndex] || product.images[0]}
            alt={product.name}
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-xs"
          />
        </div>
      )}

    </div>
  );
};
