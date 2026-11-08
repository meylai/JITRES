import React, { createContext, useContext, useState, useEffect } from 'react';
import type { CartItem, Product } from '../types';

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, color: string, size?: string, quantity?: number) => { success: boolean; message: string };
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQuantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CART_STORAGE_KEY = 'jits_cart_items_v1';
const FREE_SHIPPING_THRESHOLD = 75000;
const STANDARD_DELIVERY_FEE = 3500;

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to parse cart from localStorage:', e);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [items]);

  const addToCart = (product: Product, color: string, size?: string, quantity: number = 1) => {
    // Check variant stock
    const variant = product.variants.find(
      v => v.color.toLowerCase() === color.toLowerCase() && (!size || v.size === size)
    );

    const maxStock = variant ? variant.stock : (product.inStock ? 50 : 0);

    if (maxStock <= 0) {
      return { success: false, message: 'This variant is currently out of stock.' };
    }

    const cartItemId = `${product.id}-${color}-${size || 'default'}`;

    let addedSuccessfully = true;
    let message = `Added ${product.name} (${color}${size ? `, ${size}` : ''}) to your bag.`;

    setItems(prevItems => {
      const existing = prevItems.find(item => item.id === cartItemId);
      if (existing) {
        const nextQty = existing.quantity + quantity;
        if (nextQty > maxStock) {
          addedSuccessfully = false;
          message = `Cannot add more. Maximum available stock is ${maxStock}.`;
          return prevItems;
        }
        return prevItems.map(item =>
          item.id === cartItemId ? { ...item, quantity: nextQty } : item
        );
      } else {
        if (quantity > maxStock) {
          addedSuccessfully = false;
          message = `Cannot add ${quantity}. Maximum available stock is ${maxStock}.`;
          return prevItems;
        }
        const newItem: CartItem = {
          id: cartItemId,
          productId: product.id,
          name: product.name,
          slug: product.slug,
          category: product.category,
          price: product.price,
          currency: product.currency,
          image: product.images[0] || '/images/hero/hero-model.jpg',
          color,
          size,
          quantity,
          maxStock
        };
        return [...prevItems, newItem];
      }
    });

    if (addedSuccessfully) {
      setIsCartOpen(true);
    }

    return { success: addedSuccessfully, message };
  };

  const removeFromCart = (cartItemId: string) => {
    setItems(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    setItems(prev =>
      prev.map(item => {
        if (item.id === cartItemId) {
          const qty = Math.min(newQuantity, item.maxStock);
          return { ...item, quantity: qty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_DELIVERY_FEE;
  const total = subtotal + deliveryFee;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        deliveryFee,
        total,
        isCartOpen,
        setIsCartOpen
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
