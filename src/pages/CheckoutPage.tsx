import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShieldCheck, Truck, ArrowRight, Loader2, CreditCard, Smartphone, Building, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../data/products';
import { orderService } from '../services/api';
import type { DeliveryDetails } from '../types';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, subtotal, deliveryFee, total, clearCart } = useCart();

  const [formData, setFormData] = useState<DeliveryDetails>({
    fullName: '',
    email: '',
    phone: '',
    country: 'Malawi',
    city: 'Lilongwe',
    district: '',
    address: '',
    instructions: '',
    paymentMethod: 'mobile-money',
    provider: 'Airtel Money'
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate form
  const validateForm = () => {
    const errs: Record<string, string> = {};

    if (!formData.fullName.trim()) errs.fullName = 'Full name is required.';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      errs.email = 'A valid email address is required for order updates.';
    }

    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!phoneDigits || phoneDigits.length < 8) {
      errs.phone = 'Valid contact phone number is required (e.g. +265 999 123 456).';
    }

    if (!formData.city.trim()) errs.city = 'City is required.';
    if (!formData.district.trim()) errs.district = 'Area, suburb, or district is required.';
    if (!formData.address.trim()) errs.address = 'Street address or delivery description is required.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    if (items.length === 0) {
      setErrors({ global: 'Your shopping bag is currently empty.' });
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await orderService.submitOrder(items, subtotal, deliveryFee, formData);
      if (result.success && result.order) {
        clearCart();
        navigate('/order-confirmation');
      } else {
        setErrors({ global: result.error || 'Failed to submit order. Please retry.' });
        setIsSubmitting(false);
      }
    } catch {
      setErrors({ global: 'An unexpected error occurred. Please try again.' });
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-editorial text-3xl font-medium text-[#171717] mb-2">Your Bag is Empty</h2>
        <p className="text-sm text-[#73716C] mb-6">Add items to your bag before proceeding to checkout.</p>
        <Link
          to="/shop"
          className="bg-[#171717] text-white text-xs uppercase tracking-[0.08em] font-medium px-8 py-3.5 rounded-xs"
        >
          Discover Pieces
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F5F0] py-10 lg:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">

        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-[#73716C] mb-8" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-[#171717] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/cart" className="hover:text-[#171717] transition-colors">Bag</Link>
          <span>/</span>
          <span className="text-[#171717] font-medium">Checkout</span>
        </nav>

        <h1 className="font-editorial text-3xl sm:text-4xl font-medium tracking-tight text-[#171717] mb-8 pb-4 border-b border-[#E5E1DA]">
          Guest Checkout
        </h1>

        {errors.global && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 rounded-xs text-xs text-rose-800 flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errors.global}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* Left: Checkout Forms (approx 65% width) */}
            <div className="lg:col-span-8 space-y-8">

              {/* Step 1: Customer Information */}
              <div className="bg-white border border-[#E5E1DA] rounded-xs p-6 sm:p-8">
                <div className="flex items-center space-x-3 pb-4 border-b border-[#E5E1DA] mb-6">
                  <span className="w-6 h-6 rounded-full bg-[#171717] text-white text-xs font-semibold flex items-center justify-center">1</span>
                  <h2 className="text-xs uppercase tracking-[0.1em] font-semibold text-[#171717]">
                    Customer Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs uppercase tracking-[0.05em] font-medium text-[#171717] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Tendai Banda"
                      className={`w-full bg-[#F7F5F0] border px-4 py-2.5 text-sm rounded-xs focus:outline-none focus:ring-1 focus:ring-[#171717] ${
                        errors.fullName ? 'border-rose-500' : 'border-[#E5E1DA]'
                      }`}
                    />
                    {errors.fullName && <p className="text-[11px] text-rose-600 mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-[0.05em] font-medium text-[#171717] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="tendai@example.com"
                      className={`w-full bg-[#F7F5F0] border px-4 py-2.5 text-sm rounded-xs focus:outline-none focus:ring-1 focus:ring-[#171717] ${
                        errors.email ? 'border-rose-500' : 'border-[#E5E1DA]'
                      }`}
                    />
                    {errors.email && <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-[0.05em] font-medium text-[#171717] mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+265 999 123 456"
                      className={`w-full bg-[#F7F5F0] border px-4 py-2.5 text-sm rounded-xs focus:outline-none focus:ring-1 focus:ring-[#171717] ${
                        errors.phone ? 'border-rose-500' : 'border-[#E5E1DA]'
                      }`}
                    />
                    {errors.phone && <p className="text-[11px] text-rose-600 mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Step 2: Delivery Address */}
              <div className="bg-white border border-[#E5E1DA] rounded-xs p-6 sm:p-8">
                <div className="flex items-center space-x-3 pb-4 border-b border-[#E5E1DA] mb-6">
                  <span className="w-6 h-6 rounded-full bg-[#171717] text-white text-xs font-semibold flex items-center justify-center">2</span>
                  <h2 className="text-xs uppercase tracking-[0.1em] font-semibold text-[#171717]">
                    Delivery Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-[0.05em] font-medium text-[#171717] mb-1.5">
                      Country
                    </label>
                    <select
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full bg-[#F7F5F0] border border-[#E5E1DA] px-4 py-2.5 text-sm rounded-xs focus:outline-none"
                    >
                      <option value="Malawi">Malawi</option>
                      <option value="Zambia">Zambia</option>
                      <option value="Zimbabwe">Zimbabwe</option>
                      <option value="South Africa">South Africa</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-[0.05em] font-medium text-[#171717] mb-1.5">
                      City *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Lilongwe / Blantyre / Mzuzu / Zomba"
                      className={`w-full bg-[#F7F5F0] border px-4 py-2.5 text-sm rounded-xs focus:outline-none ${
                        errors.city ? 'border-rose-500' : 'border-[#E5E1DA]'
                      }`}
                    />
                    {errors.city && <p className="text-[11px] text-rose-600 mt-1">{errors.city}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs uppercase tracking-[0.05em] font-medium text-[#171717] mb-1.5">
                      Area / District / Neighborhood *
                    </label>
                    <input
                      type="text"
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      placeholder="e.g. Area 47 Sector 3, Sunnyside, City Centre"
                      className={`w-full bg-[#F7F5F0] border px-4 py-2.5 text-sm rounded-xs focus:outline-none ${
                        errors.district ? 'border-rose-500' : 'border-[#E5E1DA]'
                      }`}
                    />
                    {errors.district && <p className="text-[11px] text-rose-600 mt-1">{errors.district}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs uppercase tracking-[0.05em] font-medium text-[#171717] mb-1.5">
                      Delivery Address / Landmark *
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="House / Plot number, street name, or nearby prominent landmark"
                      className={`w-full bg-[#F7F5F0] border px-4 py-2.5 text-sm rounded-xs focus:outline-none ${
                        errors.address ? 'border-rose-500' : 'border-[#E5E1DA]'
                      }`}
                    />
                    {errors.address && <p className="text-[11px] text-rose-600 mt-1">{errors.address}</p>}
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs uppercase tracking-[0.05em] font-medium text-[#171717] mb-1.5">
                      Special Delivery Instructions (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.instructions}
                      onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                      placeholder="e.g. Call upon arrival at gate"
                      className="w-full bg-[#F7F5F0] border border-[#E5E1DA] px-4 py-2.5 text-sm rounded-xs focus:outline-none"
                    >
                    </input>
                  </div>
                </div>
              </div>

              {/* Step 3: Payment Method Selection */}
              <div className="bg-white border border-[#E5E1DA] rounded-xs p-6 sm:p-8">
                <div className="flex items-center space-x-3 pb-4 border-b border-[#E5E1DA] mb-6">
                  <span className="w-6 h-6 rounded-full bg-[#171717] text-white text-xs font-semibold flex items-center justify-center">3</span>
                  <h2 className="text-xs uppercase tracking-[0.1em] font-semibold text-[#171717]">
                    Payment Method
                  </h2>
                </div>

                <div className="space-y-3 mb-6">
                  {/* Option 1: Mobile Money (Airtel / TNM Mpamba) */}
                  <label className={`block p-4 border rounded-xs cursor-pointer transition-all ${
                    formData.paymentMethod === 'mobile-money' ? 'border-[#171717] bg-[#F7F5F0]' : 'border-[#E5E1DA] hover:border-[#171717]'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={formData.paymentMethod === 'mobile-money'}
                          onChange={() => setFormData({ ...formData, paymentMethod: 'mobile-money', provider: 'Airtel Money' })}
                          className="accent-[#171717]"
                        />
                        <div className="flex items-center space-x-2">
                          <Smartphone className="w-4 h-4 text-[#8A7658]" />
                          <span className="text-sm font-semibold text-[#171717]">Mobile Money</span>
                        </div>
                      </div>
                      <span className="text-[11px] uppercase tracking-[0.05em] text-[#73716C] font-medium">Airtel Money / TNM Mpamba</span>
                    </div>

                    {formData.paymentMethod === 'mobile-money' && (
                      <div className="mt-4 pt-3 border-t border-[#E5E1DA] pl-6 text-xs text-[#73716C] space-y-2">
                        <p>Select your Mobile Money network:</p>
                        <div className="flex space-x-4">
                          {['Airtel Money', 'TNM Mpamba'].map((net) => (
                            <label key={net} className="flex items-center space-x-1.5 cursor-pointer">
                              <input
                                type="radio"
                                name="network"
                                checked={formData.provider === net}
                                onChange={() => setFormData({ ...formData, provider: net })}
                                className="accent-[#171717]"
                              />
                              <span className="font-medium text-[#171717]">{net}</span>
                            </label>
                          ))}
                        </div>
                        <p className="text-[11px] italic text-[#8A7658] pt-1">
                          Seamless payment prompt will be dispatched to your phone upon order confirmation.
                        </p>
                      </div>
                    )}
                  </label>

                  {/* Option 2: Card Payments (PayChangu Boundary) */}
                  <label className={`block p-4 border rounded-xs cursor-pointer transition-all ${
                    formData.paymentMethod === 'card' ? 'border-[#171717] bg-[#F7F5F0]' : 'border-[#E5E1DA] hover:border-[#171717]'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={formData.paymentMethod === 'card'}
                          onChange={() => setFormData({ ...formData, paymentMethod: 'card', provider: 'PayChangu Gateway' })}
                          className="accent-[#171717]"
                        />
                        <div className="flex items-center space-x-2">
                          <CreditCard className="w-4 h-4 text-[#8A7658]" />
                          <span className="text-sm font-semibold text-[#171717]">Debit / Credit Card</span>
                        </div>
                      </div>
                      <span className="text-[11px] uppercase tracking-[0.05em] text-[#73716C] font-medium">Visa & Mastercard</span>
                    </div>

                    {formData.paymentMethod === 'card' && (
                      <div className="mt-4 pt-3 border-t border-[#E5E1DA] pl-6 text-xs text-[#73716C]">
                        <p>
                          Securely processed via PayChangu payment gateway integration. No sensitive card details are stored directly on this storefront.
                        </p>
                      </div>
                    )}
                  </label>

                  {/* Option 3: Bank Transfer */}
                  <label className={`block p-4 border rounded-xs cursor-pointer transition-all ${
                    formData.paymentMethod === 'bank-transfer' ? 'border-[#171717] bg-[#F7F5F0]' : 'border-[#E5E1DA] hover:border-[#171717]'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <input
                          type="radio"
                          name="paymentMethod"
                          checked={formData.paymentMethod === 'bank-transfer'}
                          onChange={() => setFormData({ ...formData, paymentMethod: 'bank-transfer', provider: 'Direct Bank Transfer' })}
                          className="accent-[#171717]"
                        />
                        <div className="flex items-center space-x-2">
                          <Building className="w-4 h-4 text-[#8A7658]" />
                          <span className="text-sm font-semibold text-[#171717]">Direct Bank Transfer / EFT</span>
                        </div>
                      </div>
                      <span className="text-[11px] uppercase tracking-[0.05em] text-[#73716C] font-medium">National Bank / Standard Bank / FDH</span>
                    </div>

                    {formData.paymentMethod === 'bank-transfer' && (
                      <div className="mt-4 pt-3 border-t border-[#E5E1DA] pl-6 text-xs text-[#73716C]">
                        <p>Bank deposit account details and payment reference instructions will be supplied immediately on the confirmation page.</p>
                      </div>
                    )}
                  </label>
                </div>

                <div className="p-3 bg-[#EEEAE2]/60 rounded-xs text-[11px] text-[#73716C] flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-[#8A7658] flex-shrink-0" />
                  <span>
                    Environment Note: Secure checkout sandbox simulation mode active. Test transactions will create a confirmed test order.
                  </span>
                </div>
              </div>

            </div>

            {/* Right: Itemized Order Summary (approx 35% width) */}
            <div className="lg:col-span-4 bg-white border border-[#E5E1DA] rounded-xs p-6 sm:p-8 sticky top-28">
              <h2 className="text-xs uppercase tracking-[0.1em] font-semibold text-[#171717] pb-4 border-b border-[#E5E1DA]">
                Order Items ({items.length})
              </h2>

              <div className="divide-y divide-[#E5E1DA] max-h-60 overflow-y-auto my-4 pr-1">
                {items.map((it) => (
                  <div key={it.id} className="py-3 flex gap-3 text-xs">
                    <img src={it.image} alt={it.name} className="w-12 h-14 object-cover border border-[#E5E1DA] rounded-xs" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-[#171717] truncate">{it.name}</p>
                      <p className="text-[#73716C]">{it.color} {it.size ? `• ${it.size}` : ''} × {it.quantity}</p>
                      <p className="font-semibold text-[#171717] mt-1">{formatPrice(it.price * it.quantity, it.currency)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 py-4 border-t border-[#E5E1DA] text-xs">
                <div className="flex justify-between text-[#73716C]">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#171717]">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#73716C]">
                  <span>Delivery Fee</span>
                  <span className="font-medium text-[#171717]">
                    {deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}
                  </span>
                </div>
              </div>

              <div className="pt-4 pb-6 border-t border-[#E5E1DA] flex justify-between items-baseline">
                <span className="text-sm font-semibold text-[#171717]">Total to Pay</span>
                <span className="font-editorial text-2xl font-semibold text-[#171717]">
                  {formatPrice(total)}
                </span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#171717] hover:bg-[#333333] text-white py-4 px-6 rounded-xs text-xs uppercase tracking-[0.08em] font-medium flex items-center justify-center space-x-2 transition-colors disabled:opacity-70"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Processing Order...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm & Place Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="mt-4 flex items-center justify-center space-x-2 text-[11px] text-[#73716C]">
                <Truck className="w-3.5 h-3.5 text-[#8A7658]" />
                <span>Fast 2–4 business days delivery</span>
              </div>
            </div>

          </div>
        </form>

      </div>
    </div>
  );
};
