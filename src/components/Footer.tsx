import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#171717] text-white pt-16 pb-12 border-t border-[#262626]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-16 pb-12 border-b border-[#2B2B2B]">

          {/* Column 1: Brand Wordmark & Ethos */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-block group mb-4">
              <span className="font-editorial text-xl font-semibold tracking-tight text-white block">
                JESUS IS THE
              </span>
              <span className="text-xs uppercase font-sans tracking-[0.2em] font-medium text-[#A3A19D]">
                REAL SATISFACTION
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-[#A3A19D] mb-4">
              True satisfaction is found in Jesus. Built on faith, worn with purpose. Contemporary Christian streetwear crafted for everyday life.
            </p>
            <div className="text-[11px] uppercase tracking-[0.08em] text-[#8A7658] font-medium">
              Malawi • Worldwide Shipping Available
            </div>
          </div>

          {/* Column 2: Collections */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.1em] font-semibold text-white mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A3A19D]">
              <li>
                <Link to="/shop" className="hover:text-white transition-colors">Shop All Pieces</Link>
              </li>
              <li>
                <Link to="/shop/t-shirts" className="hover:text-white transition-colors">Heavyweight T-shirts</Link>
              </li>
              <li>
                <Link to="/shop/hoodies" className="hover:text-white transition-colors">Boxy Fleece Hoodies</Link>
              </li>
              <li>
                <Link to="/shop/caps" className="hover:text-white transition-colors">Caps & Headwear</Link>
              </li>
              <li>
                <Link to="/shop/golf-shirts" className="hover:text-white transition-colors">Knit Golf Shirts</Link>
              </li>
              <li>
                <Link to="/shop/mugs" className="hover:text-white transition-colors">Ceramic Mugs</Link>
              </li>
              <li>
                <Link to="/shop/accessories" className="hover:text-white transition-colors">Pouches & Essentials</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: The Brand */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.1em] font-semibold text-white mb-4">
              Our Journey
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A3A19D]">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">Our Story & Manifesto</Link>
              </li>
              <li>
                <a href="#statement" className="hover:text-white transition-colors">What We Stand For</a>
              </li>
              <li>
                <Link to="/shop?sort=newest" className="hover:text-white transition-colors">Latest Drops</Link>
              </li>
              <li>
                <a href="#newsletter" className="hover:text-white transition-colors">Community Newsletter</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Customer Care & Social */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.1em] font-semibold text-white mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-[#A3A19D] mb-6">
              <li>
                <a href="mailto:support@jesusistherealsatisfaction.com" className="hover:text-white transition-colors">
                  Contact & Support
                </a>
              </li>
              <li>
                <span className="text-[#666]">Shipping: Malawi Nationwide & SADC</span>
              </li>
              <li>
                <span className="text-[#666]">Secure Checkout: Airtel, Mpamba, Card</span>
              </li>
            </ul>

            <h4 className="text-xs uppercase tracking-[0.1em] font-semibold text-white mb-2">
              Connect
            </h4>
            <div className="flex items-center space-x-3 text-xs text-[#A3A19D]">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors inline-flex items-center"
              >
                Instagram <ArrowUpRight className="w-3 h-3 ml-0.5" />
              </a>
              <span>•</span>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors inline-flex items-center"
              >
                TikTok <ArrowUpRight className="w-3 h-3 ml-0.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#73716C] gap-4">
          <p>© {currentYear} Jesus Is the real Satisfaction. All rights reserved.</p>
          <p className="font-editorial italic text-white/90">
            "True satisfaction is found in Jesus."
          </p>
          <div className="flex space-x-4 text-[11px]">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Returns</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
