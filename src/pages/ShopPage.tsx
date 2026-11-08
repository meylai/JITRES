import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { SlidersHorizontal, X, ChevronDown, RotateCcw } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { useWishlist } from '../context/WishlistContext';
import type { Product } from '../types';

export const ShopPage: React.FC = () => {
  const { category: routeCategory } = useParams<{ category?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const { wishlistIds } = useWishlist();

  // Mobile filter drawer state
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  // Active filters from URL search params
  const activeSort = searchParams.get('sort') || 'featured';
  const activeCategory = routeCategory || searchParams.get('category') || 'all';
  const activeSize = searchParams.get('size') || 'all';
  const activeColor = searchParams.get('color') || 'all';
  const activeMaxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : 60000;
  const inStockOnly = searchParams.get('inStock') === 'true';
  const wishlistFilterOnly = searchParams.get('filter') === 'wishlist';

  // Available unique sizes and colors across catalog
  const allSizes = useMemo(() => {
    const set = new Set<string>();
    PRODUCTS.forEach(p => p.sizes?.forEach(s => set.add(s)));
    return Array.from(set);
  }, []);

  const allColors = useMemo(() => {
    const map = new Map<string, string>();
    PRODUCTS.forEach(p => p.colors?.forEach(c => {
      if (!map.has(c.name)) map.set(c.name, c.hex);
    }));
    return Array.from(map.entries()).map(([name, hex]) => ({ name, hex }));
  }, []);

  // Update URL search parameters
  const updateFilter = (key: string, value: string | null) => {
    const nextParams = new URLSearchParams(searchParams);
    if (!value || value === 'all' || value === '') {
      nextParams.delete(key);
    } else {
      nextParams.set(key, value);
    }
    setSearchParams(nextParams);
  };

  const clearAllFilters = () => {
    const nextParams = new URLSearchParams();
    if (activeSort && activeSort !== 'featured') {
      nextParams.set('sort', activeSort);
    }
    setSearchParams(nextParams);
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category match
      if (activeCategory !== 'all' && product.category !== activeCategory) {
        return false;
      }
      // Wishlist match
      if (wishlistFilterOnly && !wishlistIds.includes(product.id)) {
        return false;
      }
      // Size match
      if (activeSize !== 'all' && (!product.sizes || !product.sizes.includes(activeSize))) {
        return false;
      }
      // Color match
      if (activeColor !== 'all' && !product.colors.some(c => c.name.toLowerCase() === activeColor.toLowerCase())) {
        return false;
      }
      // Price match
      if (product.price > activeMaxPrice) {
        return false;
      }
      // Stock match
      if (inStockOnly && !product.inStock) {
        return false;
      }
      return true;
    }).sort((a: Product, b: Product) => {
      if (activeSort === 'newest') return (b.newArrival ? 1 : 0) - (a.newArrival ? 1 : 0);
      if (activeSort === 'price-low') return a.price - b.price;
      if (activeSort === 'price-high') return b.price - a.price;
      // Default: featured
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [activeCategory, wishlistFilterOnly, wishlistIds, activeSize, activeColor, activeMaxPrice, inStockOnly, activeSort]);

  // Current category info
  const currentCategoryInfo = useMemo(() => {
    if (wishlistFilterOnly) {
      return {
        name: 'My Saved Pieces',
        description: 'Pieces you have marked to remember or purchase later.'
      };
    }
    if (activeCategory === 'all') {
      return {
        name: 'All Pieces',
        description: 'Contemporary Christian streetwear engineered for comfort, presence, and faith.'
      };
    }
    const cat = CATEGORIES.find(c => c.slug === activeCategory);
    return cat || {
      name: activeCategory.replace('-', ' '),
      description: 'Everyday essentials. An eternal message.'
    };
  }, [activeCategory, wishlistFilterOnly]);

  // Close mobile filter drawer on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsFilterDrawerOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F5F0] py-8 lg:py-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">

        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-[#73716C] mb-6" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-[#171717] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[#171717] transition-colors">Shop</Link>
          {activeCategory !== 'all' && (
            <>
              <span>/</span>
              <span className="text-[#171717] font-medium capitalize">{currentCategoryInfo.name}</span>
            </>
          )}
        </nav>

        {/* Page Header */}
        <div className="mb-8 pb-6 border-b border-[#E5E1DA]">
          <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#171717] capitalize mb-2">
            {currentCategoryInfo.name}
          </h1>
          <p className="text-sm sm:text-base text-[#73716C] max-w-2xl">
            {currentCategoryInfo.description}
          </p>
        </div>

        {/* Toolbar: Count, Filter button (mobile/tablet), Sort */}
        <div className="flex items-center justify-between py-3 mb-8 border-b border-[#E5E1DA]">
          <div className="flex items-center space-x-4">
            <span className="text-xs uppercase tracking-[0.08em] font-medium text-[#73716C]">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'Piece' : 'Pieces'}
            </span>

            {/* Clear filters trigger if filters applied */}
            {(activeCategory !== 'all' || activeSize !== 'all' || activeColor !== 'all' || inStockOnly || wishlistFilterOnly) && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="hidden sm:inline-flex items-center space-x-1 text-xs text-[#8A7658] hover:text-[#171717] transition-colors font-medium"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          <div className="flex items-center space-x-3">
            {/* Filter Toggle Button for Mobile / Small Screens */}
            <button
              type="button"
              onClick={() => setIsFilterDrawerOpen(true)}
              className="lg:hidden inline-flex items-center space-x-1.5 px-3 py-2 border border-[#E5E1DA] rounded-xs text-xs font-medium text-[#171717] hover:bg-white transition-colors"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>

            {/* Sort Dropdown */}
            <div className="relative inline-flex items-center">
              <label htmlFor="sort-select" className="sr-only">Sort by</label>
              <select
                id="sort-select"
                value={activeSort}
                onChange={(e) => updateFilter('sort', e.target.value)}
                className="appearance-none bg-white border border-[#E5E1DA] rounded-xs px-3 py-2 pr-8 text-xs font-medium text-[#171717] focus:outline-none focus:border-[#171717] cursor-pointer"
              >
                <option value="featured">Sort: Featured</option>
                <option value="newest">Sort: Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-[#73716C] absolute right-2.5 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Main Layout: Sidebar Filters (Desktop) + Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 space-y-8 pr-4">
            {/* Categories */}
            <div>
              <h3 className="text-xs uppercase tracking-[0.1em] font-semibold text-[#171717] mb-3">
                Category
              </h3>
              <div className="space-y-1.5">
                <Link
                  to="/shop"
                  className={`block text-xs py-1 transition-colors ${
                    activeCategory === 'all' && !routeCategory ? 'font-semibold text-[#171717]' : 'text-[#73716C] hover:text-[#171717]'
                  }`}
                >
                  All Pieces ({PRODUCTS.length})
                </Link>
                {CATEGORIES.map((c) => (
                  <Link
                    key={c.id}
                    to={`/shop/${c.slug}`}
                    className={`block text-xs py-1 transition-colors ${
                      activeCategory === c.slug ? 'font-semibold text-[#171717]' : 'text-[#73716C] hover:text-[#171717]'
                    }`}
                  >
                    {c.name} ({c.itemCount})
                  </Link>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div>
              <h3 className="text-xs uppercase tracking-[0.1em] font-semibold text-[#171717] mb-3">
                Size
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {allSizes.map((s) => {
                  const isSelected = activeSize === s;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => updateFilter('size', isSelected ? null : s)}
                      className={`text-xs px-2.5 py-1.5 border rounded-xs transition-colors ${
                        isSelected
                          ? 'border-[#171717] bg-[#171717] text-white'
                          : 'border-[#E5E1DA] bg-white text-[#171717] hover:border-[#171717]'
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Color Filter */}
            <div>
              <h3 className="text-xs uppercase tracking-[0.1em] font-semibold text-[#171717] mb-3">
                Color
              </h3>
              <div className="space-y-1.5">
                {allColors.map((c) => {
                  const isSelected = activeColor.toLowerCase() === c.name.toLowerCase();
                  return (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => updateFilter('color', isSelected ? null : c.name)}
                      className="flex items-center space-x-2 text-xs w-full py-1 text-left group"
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-black/20 flex-shrink-0"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className={`${isSelected ? 'font-semibold text-[#171717]' : 'text-[#73716C] group-hover:text-[#171717]'}`}>
                        {c.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xs uppercase tracking-[0.1em] font-semibold text-[#171717]">
                  Max Price
                </h3>
                <span className="text-xs font-semibold text-[#8A7658]">
                  MWK {activeMaxPrice.toLocaleString()}
                </span>
              </div>
              <input
                type="range"
                min="10000"
                max="60000"
                step="2000"
                value={activeMaxPrice}
                onChange={(e) => updateFilter('maxPrice', e.target.value)}
                className="w-full accent-[#171717] cursor-pointer"
              />
            </div>

            {/* Availability */}
            <div className="pt-2">
              <label className="flex items-center space-x-2 text-xs text-[#171717] cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => updateFilter('inStock', e.target.checked ? 'true' : null)}
                  className="rounded-xs text-[#171717] accent-[#171717] focus:ring-0"
                />
                <span>In Stock Only</span>
              </label>
            </div>
          </aside>

          {/* Product Grid Area (3 cols desktop, 3 cols tablet, 2 cols mobile) */}
          <main className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20 bg-white border border-[#E5E1DA] rounded-xs p-8">
                <h3 className="font-editorial text-2xl font-normal text-[#171717] mb-2">
                  No pieces found.
                </h3>
                <p className="text-sm text-[#73716C] max-w-sm mx-auto mb-6">
                  Try adjusting your filters or search keywords to discover pieces in our collection.
                </p>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="bg-[#171717] text-white px-6 py-2.5 text-xs uppercase tracking-[0.08em] font-medium rounded-xs hover:bg-[#333333] transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </main>

        </div>

      </div>

      {/* Mobile Filter Drawer */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsFilterDrawerOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-sm bg-[#F7F5F0] border-l border-[#E5E1DA] shadow-xl flex flex-col">

              <div className="h-[64px] px-6 border-b border-[#E5E1DA] flex items-center justify-between">
                <h2 className="text-sm uppercase tracking-[0.08em] font-medium text-[#171717]">
                  Filter Pieces
                </h2>
                <button
                  type="button"
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="p-2 text-[#73716C] hover:text-[#171717]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                {/* Categories */}
                <div>
                  <h4 className="text-xs uppercase tracking-[0.1em] font-semibold text-[#171717] mb-2">Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    {['all', 'caps', 't-shirts', 'hoodies', 'golf-shirts', 'mugs', 'accessories'].map(cat => (
                      <button
                        key={cat}
                        onClick={() => updateFilter('category', cat === 'all' ? null : cat)}
                        className={`text-xs px-3 py-1.5 rounded-xs capitalize border transition-colors ${
                          (activeCategory === cat) || (cat === 'all' && activeCategory === 'all')
                            ? 'bg-[#171717] text-white border-[#171717]'
                            : 'bg-white text-[#171717] border-[#E5E1DA]'
                        }`}
                      >
                        {cat.replace('-', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div>
                  <h4 className="text-xs uppercase tracking-[0.1em] font-semibold text-[#171717] mb-2">Sizes</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {allSizes.map(s => (
                      <button
                        key={s}
                        onClick={() => updateFilter('size', activeSize === s ? null : s)}
                        className={`text-xs px-2.5 py-1.5 rounded-xs border transition-colors ${
                          activeSize === s ? 'bg-[#171717] text-white border-[#171717]' : 'bg-white text-[#171717] border-[#E5E1DA]'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* In Stock */}
                <div>
                  <label className="flex items-center space-x-2 text-xs text-[#171717]">
                    <input
                      type="checkbox"
                      checked={inStockOnly}
                      onChange={(e) => updateFilter('inStock', e.target.checked ? 'true' : null)}
                      className="rounded-xs text-[#171717] accent-[#171717]"
                    />
                    <span>In Stock Only</span>
                  </label>
                </div>
              </div>

              <div className="p-6 border-t border-[#E5E1DA] bg-white flex gap-3">
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="flex-1 py-3 border border-[#E5E1DA] text-xs uppercase tracking-[0.08em] font-medium text-[#171717] hover:bg-[#F7F5F0]"
                >
                  Clear All
                </button>
                <button
                  type="button"
                  onClick={() => setIsFilterDrawerOpen(false)}
                  className="flex-1 py-3 bg-[#171717] text-white text-xs uppercase tracking-[0.08em] font-medium hover:bg-[#333]"
                >
                  Apply ({filteredProducts.length})
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
