import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, PackageCheck, ArrowRight, Truck, Info } from 'lucide-react';
import { orderService } from '../services/api';
import { formatPrice } from '../data/products';

export const OrderConfirmationPage: React.FC = () => {
  const order = useMemo(() => orderService.getLastOrder(), []);

  if (!order) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-editorial text-3xl font-medium text-[#171717] mb-2">No Recent Order Found</h2>
        <p className="text-sm text-[#73716C] mb-6">You do not have any active order confirmation in this browser session.</p>
        <Link
          to="/shop"
          className="bg-[#171717] text-white text-xs uppercase tracking-[0.08em] font-medium px-8 py-3.5 rounded-xs"
        >
          Explore Pieces
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(order.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-[#F7F5F0] py-12 lg:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-8">

        {/* Success Card */}
        <div className="bg-white border border-[#E5E1DA] rounded-xs p-6 sm:p-10 shadow-xs">

          <div className="text-center pb-8 border-b border-[#E5E1DA]">
            <div className="w-14 h-14 bg-[#EEEAE2] text-[#8A7658] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 stroke-[1.75]" />
            </div>

            <span className="text-[11px] uppercase tracking-[0.12em] font-semibold text-[#8A7658] block mb-2">
              Order Received With Thanks
            </span>
            <h1 className="font-editorial text-3xl sm:text-4xl font-medium text-[#171717] mb-2">
              May True Satisfaction Be With You
            </h1>
            <p className="text-sm text-[#73716C]">
              A confirmation email has been dispatched to <strong className="text-[#171717]">{order.deliveryDetails.email}</strong>.
            </p>
          </div>

          {/* Sandbox Notice */}
          {order.isSimulated && (
            <div className="my-6 p-4 bg-[#EEEAE2]/70 border border-[#E5E1DA] rounded-xs text-xs text-[#73716C] flex items-start space-x-3">
              <Info className="w-4 h-4 text-[#8A7658] flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-[#171717]">Development Simulation Mode</p>
                <p>
                  This order has been processed in our mock/sandbox environment. No real funds were charged, and an order record has been created for end-to-end verification.
                </p>
              </div>
            </div>
          )}

          {/* Order Details Metadata */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6 border-b border-[#E5E1DA] text-xs">
            <div>
              <span className="text-[#73716C] block uppercase tracking-[0.05em]">Order Reference</span>
              <strong className="text-[#171717] font-semibold mt-1 block">{order.orderNumber}</strong>
            </div>
            <div>
              <span className="text-[#73716C] block uppercase tracking-[0.05em]">Order Date</span>
              <span className="text-[#171717] font-medium mt-1 block">{formattedDate}</span>
            </div>
            <div>
              <span className="text-[#73716C] block uppercase tracking-[0.05em]">Total Paid</span>
              <strong className="text-[#171717] font-semibold mt-1 block">{formatPrice(order.total, order.currency)}</strong>
            </div>
            <div>
              <span className="text-[#73716C] block uppercase tracking-[0.05em]">Payment Method</span>
              <span className="text-[#171717] font-medium mt-1 block capitalize">{order.deliveryDetails.paymentMethod.replace('-', ' ')}</span>
            </div>
          </div>

          {/* Itemized summary */}
          <div className="py-6 border-b border-[#E5E1DA]">
            <h3 className="text-xs uppercase tracking-[0.1em] font-semibold text-[#171717] mb-4">
              Ordered Pieces ({order.items.reduce((s, it) => s + it.quantity, 0)})
            </h3>
            <div className="divide-y divide-[#E5E1DA]">
              {order.items.map((it) => (
                <div key={it.id} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-3">
                    <img src={it.image} alt={it.name} className="w-12 h-14 object-cover border border-[#E5E1DA] rounded-xs" />
                    <div>
                      <p className="font-medium text-[#171717]">{it.name}</p>
                      <p className="text-[#73716C]">{it.color} {it.size ? `• ${it.size}` : ''} × {it.quantity}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-[#171717]">{formatPrice(it.price * it.quantity, it.currency)}</span>
                </div>
              ))}
            </div>

            {/* Price breakdown */}
            <div className="mt-4 pt-4 border-t border-[#E5E1DA] space-y-2 text-xs">
              <div className="flex justify-between text-[#73716C]">
                <span>Subtotal</span>
                <span className="font-medium text-[#171717]">{formatPrice(order.subtotal, order.currency)}</span>
              </div>
              <div className="flex justify-between text-[#73716C]">
                <span>Delivery Fee</span>
                <span className="font-medium text-[#171717]">{order.deliveryFee === 0 ? 'FREE' : formatPrice(order.deliveryFee, order.currency)}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-[#171717] pt-2 border-t border-[#E5E1DA]">
                <span>Total</span>
                <span>{formatPrice(order.total, order.currency)}</span>
              </div>
            </div>
          </div>

          {/* Customer & Delivery Information */}
          <div className="py-6 border-b border-[#E5E1DA] grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-[#73716C]">
            <div>
              <h4 className="uppercase tracking-[0.08em] font-semibold text-[#171717] mb-2">Delivery Address</h4>
              <p className="text-[#171717] font-medium">{order.deliveryDetails.fullName}</p>
              <p>{order.deliveryDetails.address}</p>
              <p>{order.deliveryDetails.district}, {order.deliveryDetails.city}</p>
              <p>{order.deliveryDetails.country}</p>
              <p className="mt-1">Phone: {order.deliveryDetails.phone}</p>
            </div>
            <div>
              <h4 className="uppercase tracking-[0.08em] font-semibold text-[#171717] mb-2">Delivery Schedule</h4>
              <div className="flex items-start space-x-2 text-[#171717] font-medium">
                <Truck className="w-4 h-4 text-[#8A7658] flex-shrink-0 mt-0.5" />
                <div>
                  <p>Estimated 2–4 Business Days</p>
                  <p className="text-xs text-[#73716C] font-normal mt-1">
                    Courier dispatch will initiate shortly. You will receive SMS alerts at {order.deliveryDetails.phone}.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-xs text-[#73716C]">
              <PackageCheck className="w-4 h-4 text-[#8A7658]" />
              <span>Reference saved to your session</span>
            </div>

            <Link
              to="/shop"
              className="w-full sm:w-auto bg-[#171717] hover:bg-[#333333] text-white text-xs uppercase tracking-[0.08em] font-medium px-8 py-3.5 rounded-xs transition-colors flex items-center justify-center space-x-2"
            >
              <span>Continue Shopping</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
};
