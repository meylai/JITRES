import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { CategoryTile } from '../components/CategoryTile';
import { NewsletterSection } from '../components/NewsletterSection';

export const HomePage: React.FC = () => {
  // Section 4: 4 Featured Products (1 per category: T-shirts, Hoodies, Caps, Golf Shirts)
  const featuredProducts = [
    PRODUCTS.find(p => p.id === 'tee-001')!,
    PRODUCTS.find(p => p.id === 'hoodie-001')!,
    PRODUCTS.find(p => p.id === 'cap-001')!,
    PRODUCTS.find(p => p.id === 'golf-001')!
  ].filter(Boolean);

  // Section 6: 5 Category tiles (Caps, T-shirts, Hoodies, Golf Shirts, Mugs)
  const categoryTiles = [
    CATEGORIES.find(c => c.slug === 'caps')!,
    CATEGORIES.find(c => c.slug === 't-shirts')!,
    CATEGORIES.find(c => c.slug === 'hoodies')!,
    CATEGORIES.find(c => c.slug === 'golf-shirts')!,
    CATEGORIES.find(c => c.slug === 'mugs')!
  ].filter(Boolean);

  return (
    <div className="flex flex-col min-h-screen">

      {/* SECTION 3: Hero Campaign */}
      <section className="border-b border-[#E5E1DA] overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-10 lg:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* Left Content (approx 42% on desktop) */}
            <div className="lg:col-span-5 flex flex-col justify-center order-1">
              <span className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.12em] text-[#8A7658] mb-3">
                Christian Streetwear
              </span>

              <h1 className="font-editorial text-[42px] sm:text-[54px] lg:text-[72px] leading-[0.98] font-semibold text-[#171717] tracking-[-0.03em] mb-6">
                True Satisfaction. <br />
                <span className="italic font-normal">Found in Jesus.</span>
              </h1>

              <p className="text-[15px] sm:text-[17px] text-[#73716C] leading-relaxed max-w-lg mb-8 font-light">
                Faith is more than what you believe. It's how you live, move, and show up.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8">
                <Link
                  to="/shop"
                  className="bg-[#171717] hover:bg-[#333333] text-white px-8 py-4 text-xs uppercase tracking-[0.08em] font-medium rounded-xs text-center transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Shop The Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  to="/about"
                  className="bg-transparent hover:bg-[#EEEAE2] text-[#171717] border border-[#171717] px-8 py-4 text-xs uppercase tracking-[0.08em] font-medium rounded-xs text-center transition-colors"
                >
                  Our Story
                </Link>
              </div>

              <div className="pt-4 border-t border-[#E5E1DA]">
                <p className="text-[11px] uppercase tracking-[0.1em] text-[#73716C] font-medium">
                  Built On Faith. Worn With Purpose.
                </p>
              </div>
            </div>

            {/* Right Side: Editorial Fashion Image (approx 58% on desktop) */}
            <div className="lg:col-span-7 order-2">
              <div className="relative aspect-4/5 w-full bg-white overflow-hidden rounded-xs border border-[#E5E1DA] shadow-xs">
                <img
                  src="/images/hero/hero-model.jpg"
                  alt="Model wearing Jesus Is the Satisfaction contemporary apparel"
                  className="w-full h-full object-cover object-center"
                  loading="eager"
                />
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-xs px-3 py-1.5 text-[10px] uppercase tracking-[0.08em] font-medium text-[#171717] rounded-xs border border-[#E5E1DA]">
                  Autumn / Winter Capsule
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: Featured Collection */}
      <section className="py-16 lg:py-24 border-b border-[#E5E1DA]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">

          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-[#E5E1DA]">
            <div>
              <span className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.1em] text-[#8A7658] block mb-2">
                Curated Selection
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#171717]">
                Pieces With Purpose
              </h2>
            </div>
            <div className="mt-4 md:mt-0 flex items-center justify-between md:justify-end gap-6">
              <p className="text-xs sm:text-sm text-[#73716C]">
                Everyday essentials. An eternal message.
              </p>
              <Link
                to="/shop"
                className="text-xs uppercase tracking-[0.08em] font-semibold text-[#171717] hover:text-[#8A7658] transition-colors inline-flex items-center"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>
          </div>

          {/* 4-column large desktop / 3-column tablet / 2-column mobile */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 5: Brand Statement / Editorial Break */}
      <section id="statement" className="bg-[#EEEAE2] py-20 lg:py-28 border-b border-[#E5E1DA]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

            <div className="lg:col-span-8 lg:col-start-2 text-center lg:text-left">
              <span className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.14em] text-[#8A7658] block mb-4">
                What We Stand For
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171717] leading-tight mb-6">
                In a world searching for more, we stand on a timeless truth:{" "}
                <span className="font-semibold italic underline decoration-1 underline-offset-8 text-[#171717]">
                  Jesus is enough.
                </span>
              </h2>
              <p className="text-sm sm:text-base text-[#73716C] max-w-2xl leading-relaxed mb-8">
                Not just a message printed on clothing. A truth carried into everyday life. Our pieces are designed with architectural streetwear silhouettes and uncompromised craftsmanship so you can carry your faith confidently.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center text-xs uppercase tracking-[0.08em] font-medium text-[#171717] hover:text-[#8A7658] transition-colors border-b border-[#171717] pb-1"
              >
                <span>Read The Brand Manifesto</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </div>

            <div className="lg:col-span-2 hidden lg:block">
              <div className="aspect-3/4 bg-white border border-[#E5E1DA] rounded-xs overflow-hidden shadow-xs">
                <img
                  src="/images/campaign/brand-lookbook.jpg"
                  alt="Streetwear Lookbook Editorial"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 6: Shop by Category */}
      <section className="py-16 lg:py-24 border-b border-[#E5E1DA]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">

          <div className="mb-10 text-center max-w-xl mx-auto">
            <span className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.1em] text-[#8A7658] block mb-2">
              Explore By Category
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-[#171717]">
              Find Your Everyday Essential
            </h2>
          </div>

          {/* Desktop: First row 3 tiles, second row 2 wider tiles; Mobile: 2-column layout */}
          <div className="space-y-4 sm:space-y-6">
            {/* Row 1: 3 tiles */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {categoryTiles.slice(0, 3).map((cat) => (
                <CategoryTile
                  key={cat.id}
                  name={cat.name}
                  slug={cat.slug}
                  image={cat.image}
                  itemCount={cat.itemCount}
                  className="h-64 sm:h-80"
                />
              ))}
            </div>

            {/* Row 2: 2 wider tiles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {categoryTiles.slice(3, 5).map((cat) => (
                <CategoryTile
                  key={cat.id}
                  name={cat.name}
                  slug={cat.slug}
                  image={cat.image}
                  itemCount={cat.itemCount}
                  className="h-64 sm:h-80"
                />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 7: Campaign / Editorial Image */}
      <section className="relative h-[480px] lg:h-[600px] overflow-hidden border-b border-[#E5E1DA]">
        <img
          src="/images/campaign/campaign-editorial.jpg"
          alt="Models in contemporary Christian streetwear collection"
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
        {/* Subtle dark tint for text contrast */}
        <div className="absolute inset-0 bg-black/35 flex items-center justify-center text-center p-6">
          <div className="max-w-2xl text-white">
            <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.16em] font-medium text-white/90 block mb-3">
              Autumn / Winter Editorial
            </span>
            <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white mb-6">
              Faith. Worn Daily.
            </h2>
            <Link
              to="/shop"
              className="inline-flex items-center bg-white text-[#171717] hover:bg-[#F7F5F0] px-8 py-4 text-xs uppercase tracking-[0.08em] font-medium rounded-xs transition-colors"
            >
              <span>Explore The Collection</span>
              <ArrowRight className="w-3.5 h-3.5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 8: Brand Manifesto */}
      <section className="py-20 lg:py-28 bg-[#F7F5F0] border-b border-[#E5E1DA]">
        <div className="max-w-3xl mx-auto px-4 sm:px-8 text-center">
          <span className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.14em] text-[#8A7658] block mb-4">
            The Brand Manifesto
          </span>
          <div className="space-y-6">
            <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl font-medium text-[#171717] leading-tight">
              More than clothing. <br />
              <span className="italic font-normal">A reminder of the One who satisfies.</span>
            </h2>

            <p className="font-editorial text-xl sm:text-2xl italic text-[#171717] leading-relaxed max-w-xl mx-auto">
              "In a world searching for more, we stand on a timeless truth: Jesus is enough."
            </p>

            <p className="text-sm sm:text-base text-[#73716C] leading-relaxed max-w-xl mx-auto">
              Every piece is a statement of faith, a reflection of identity, and a reminder of where true satisfaction is found.
            </p>

            <div className="pt-4">
              <span className="inline-block text-xs uppercase tracking-[0.14em] font-bold text-[#171717] border-y border-[#171717] py-2 px-6">
                Wear the message. Live the truth.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 9: Newsletter */}
      <NewsletterSection />

    </div>
  );
};
