import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, ArrowRight } from 'lucide-react';
import { PRODUCTS, formatPrice } from '../data/products';
import type { Product } from '../types';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase().trim();
    const filtered = PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.features.some(f => f.toLowerCase().includes(q))
    );
    setResults(filtered.slice(0, 6));
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/50 backdrop-blur-xs transition-opacity">
      <div
        className="w-full max-w-2xl bg-[#F7F5F0] rounded-xs shadow-2xl border border-[#E5E1DA] overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        role="dialog"
        aria-modal="true"
        aria-label="Search Catalog"
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-6 py-4 border-b border-[#E5E1DA] bg-white">
          <Search className="w-5 h-5 text-[#73716C] mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search collections, tees, hoodies, caps, mugs..."
            className="w-full bg-transparent text-[#171717] placeholder-[#73716C] text-[15px] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#73716C] hover:text-[#171717] mr-2 text-xs uppercase"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-[#73716C] hover:text-[#171717] transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto p-6">
          {query.trim() === '' ? (
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#8A7658] mb-3">
                Suggested Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {['Faith Over Fear Tee', 'Satisfied Boxy Hoodie', 'Signature Cap', 'Knit Golf Shirt', 'Morning Manna Mug', 'Canvas Pouch'].map(term => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="text-xs bg-[#EEEAE2] hover:bg-[#E5E1DA] text-[#171717] px-3 py-1.5 rounded-xs transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#73716C]">
                {results.length} Pieces Found
              </p>
              <div className="divide-y divide-[#E5E1DA]">
                {results.map(product => (
                  <Link
                    key={product.id}
                    to={`/product/${product.slug}`}
                    onClick={onClose}
                    className="flex items-center gap-4 py-3 group hover:bg-[#EEEAE2]/40 -mx-3 px-3 rounded-xs transition-colors"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-14 h-14 object-cover rounded-xs border border-[#E5E1DA] flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[#8A7658] uppercase font-medium">{product.categoryLabel}</p>
                      <h4 className="text-sm font-medium text-[#171717] truncate group-hover:underline">
                        {product.name}
                      </h4>
                      <p className="text-xs text-[#73716C]">{formatPrice(product.price, product.currency)}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#73716C] group-hover:translate-x-1 group-hover:text-[#171717] transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-sm text-[#171717] font-medium">No pieces found matching "{query}"</p>
              <p className="text-xs text-[#73716C] mt-1">Try checking your spelling or explore the categories above.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
