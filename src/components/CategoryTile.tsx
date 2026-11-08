import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface CategoryTileProps {
  name: string;
  slug: string;
  image: string;
  itemCount?: number;
  className?: string;
}

export const CategoryTile: React.FC<CategoryTileProps> = ({
  name,
  slug,
  image,
  itemCount,
  className = ''
}) => {
  return (
    <Link
      to={`/shop/${slug}`}
      className={`group relative overflow-hidden bg-white border border-[#E5E1DA] rounded-xs block ${className}`}
    >
      <div className="w-full h-full aspect-4/3 sm:aspect-auto overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Subtle bottom gradient overlay for legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex flex-col justify-end p-5 sm:p-6 text-white transition-opacity group-hover:from-black/70">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-editorial text-xl sm:text-2xl font-medium tracking-tight text-white group-hover:translate-x-1 transition-transform">
              {name}
            </h3>
            {itemCount !== undefined && (
              <p className="text-[11px] uppercase tracking-[0.08em] text-white/80 mt-0.5">
                {itemCount} {itemCount === 1 ? 'Piece' : 'Pieces'}
              </p>
            )}
          </div>
          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#171717] transition-all">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
};
