import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass, Shield, Sparkles } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F7F5F0]">

      {/* 1. Editorial Hero Section */}
      <section className="border-b border-[#E5E1DA] overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

            <div className="lg:col-span-6">
              <span className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.14em] text-[#8A7658] block mb-3">
                Our Story & Purpose
              </span>
              <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight text-[#171717] mb-6 leading-[1.05]">
                More Than What <br />
                <span className="italic font-normal">You Wear.</span>
              </h1>
              <p className="text-base sm:text-lg text-[#73716C] leading-relaxed mb-6 font-light">
                Jesus Is the real Satisfaction exists to carry a timeless truth into everyday life. We build contemporary apparel for believers who desire to proclaim their faith without compromising on minimalist design, fit, or craftsmanship.
              </p>
              <div className="pt-2">
                <Link
                  to="/shop"
                  className="inline-flex items-center space-x-2 bg-[#171717] hover:bg-[#333333] text-white text-xs uppercase tracking-[0.08em] font-medium px-8 py-4 rounded-xs transition-colors"
                >
                  <span>Explore The Capsule</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="aspect-4/5 rounded-xs overflow-hidden border border-[#E5E1DA] shadow-xs">
                <img
                  src="/images/campaign/brand-lookbook.jpg"
                  alt="Jesus Is the Satisfaction Brand Editorial Lookbook"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Brand Introduction & Core Manifesto */}
      <section className="py-20 lg:py-28 bg-[#EEEAE2] border-b border-[#E5E1DA]">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center">
          <span className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.14em] text-[#8A7658] block mb-4">
            The Brand Manifesto
          </span>

          <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-normal text-[#171717] leading-tight mb-8">
            "More than clothing. A reminder of the One who satisfies. In a world searching for more, we stand on a timeless truth: <span className="font-semibold italic">Jesus is enough.</span>"
          </h2>

          <div className="h-px w-20 bg-[#8A7658] mx-auto mb-8" />

          <p className="text-sm sm:text-base text-[#73716C] leading-relaxed max-w-2xl mx-auto mb-6">
            Every piece is a statement of faith, a reflection of identity, and a reminder of where true satisfaction is found. We believe that true fulfillment is not found in fleeting trends or material acclaim, but in the living person of Jesus Christ.
          </p>
          <p className="text-xs uppercase tracking-[0.12em] font-semibold text-[#171717]">
            Wear the message. Live the truth.
          </p>
        </div>
      </section>

      {/* 3. Why The Brand Exists: Principles of Faith & Craft */}
      <section className="py-20 lg:py-28 border-b border-[#E5E1DA]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">

          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.1em] text-[#8A7658] block mb-2">
              Our Foundations
            </span>
            <h2 className="font-editorial text-3xl sm:text-4xl font-medium tracking-tight text-[#171717]">
              Why We Exist
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">

            <div className="bg-white border border-[#E5E1DA] rounded-xs p-8">
              <Compass className="w-8 h-8 text-[#8A7658] mb-4 stroke-[1.5]" />
              <h3 className="font-editorial text-xl font-medium text-[#171717] mb-3">
                Uncompromising Faith
              </h3>
              <p className="text-sm text-[#73716C] leading-relaxed">
                We reject superficial marketing clichés. Our messages reflect deep, grounding scripture and the timeless peace of Christ in modern culture.
              </p>
            </div>

            <div className="bg-white border border-[#E5E1DA] rounded-xs p-8">
              <Sparkles className="w-8 h-8 text-[#8A7658] mb-4 stroke-[1.5]" />
              <h3 className="font-editorial text-xl font-medium text-[#171717] mb-3">
                Architectural Streetwear
              </h3>
              <p className="text-sm text-[#73716C] leading-relaxed">
                Heavyweight 240 GSM organic cotton, 450 GSM boxy fleece draping, and double-mercerized knits created with the discipline of luxury fashion.
              </p>
            </div>

            <div className="bg-white border border-[#E5E1DA] rounded-xs p-8">
              <Shield className="w-8 h-8 text-[#8A7658] mb-4 stroke-[1.5]" />
              <h3 className="font-editorial text-xl font-medium text-[#171717] mb-3">
                Ethical Stewardship
              </h3>
              <p className="text-sm text-[#73716C] leading-relaxed">
                Proudly honoring dignity in production, ethical manufacturing, and community stewardship across Malawi and Southern Africa.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 4. Lookbook Showcase */}
      <section className="py-20 lg:py-28 bg-[#F7F5F0] border-b border-[#E5E1DA]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="aspect-square bg-white border border-[#E5E1DA] rounded-xs overflow-hidden">
              <img
                src="/images/campaign/campaign-editorial.jpg"
                alt="Jesus Is the Satisfaction Campaign"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4 sm:p-8">
              <span className="text-xs uppercase tracking-[0.1em] font-semibold text-[#8A7658] block mb-2">
                Editorial Lookbook
              </span>
              <h2 className="font-editorial text-3xl sm:text-4xl font-medium text-[#171717] mb-4">
                Designed for Everyday Life
              </h2>
              <p className="text-sm sm:text-base text-[#73716C] leading-relaxed mb-8">
                Whether in lecture halls, creative studios, daily errands, or Sunday gatherings, our apparel is created to move naturally with you while acting as an understated conversation starter of hope.
              </p>
              <Link
                to="/shop"
                className="inline-flex items-center space-x-2 bg-[#171717] hover:bg-[#333333] text-white text-xs uppercase tracking-[0.08em] font-medium px-8 py-4 rounded-xs transition-colors"
              >
                <span>Shop The Collection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
