import type { CartItem, DeliveryDetails, Order } from '../types';

export interface OrderSubmissionResult {
  success: boolean;
  order?: Order;
  error?: string;
  isSimulated: boolean;
}

export const orderService = {
  /**
   * Submits an order through the checkout workflow.
   * Clearly identifies simulated status while adhering to production boundary practices.
   */
  async submitOrder(
    items: CartItem[],
    subtotal: number,
    deliveryFee: number,
    deliveryDetails: DeliveryDetails
  ): Promise<OrderSubmissionResult> {
    // Artificial slight network latency for realistic UX feedback
    await new Promise(resolve => setTimeout(resolve, 800));

    if (!items || items.length === 0) {
      return { success: false, error: 'Your cart is empty.', isSimulated: true };
    }

    const orderNumber = `JITS-${Date.now().toString().slice(-6)}-${Math.floor(100 + Math.random() * 900)}`;
    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      orderNumber,
      date: new Date().toISOString(),
      items: [...items],
      subtotal,
      deliveryFee,
      total: subtotal + deliveryFee,
      currency: 'MWK',
      deliveryDetails,
      status: 'confirmed',
      isSimulated: true
    };

    // Store latest completed order in session/local storage for the confirmation page
    try {
      sessionStorage.setItem('jits_last_order', JSON.stringify(newOrder));
    } catch (e) {
      console.warn('Session storage write failed:', e);
    }

    return {
      success: true,
      order: newOrder,
      isSimulated: true
    };
  },

  getLastOrder(): Order | null {
    try {
      const data = sessionStorage.getItem('jits_last_order');
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }
};

export const newsletterService = {
  async subscribe(email: string): Promise<{ success: boolean; message: string }> {
    await new Promise(resolve => setTimeout(resolve, 600));
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return { success: false, message: 'Please enter a valid email address.' };
    }
    // Record simulated newsletter subscriber
    try {
      const existing = JSON.parse(localStorage.getItem('jits_newsletter_subscribers') || '[]');
      if (!existing.includes(email.toLowerCase())) {
        existing.push(email.toLowerCase());
        localStorage.setItem('jits_newsletter_subscribers', JSON.stringify(existing));
      }
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }

    return { success: true, message: 'Welcome to the community. You are subscribed.' };
  }
};
