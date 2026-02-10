import { createContext, useContext, useEffect, useState, useRef } from 'react';

const CartContext = createContext(null);

// Function to load cart from localStorage
const loadCartFromStorage = () => {
  try {
    const raw = localStorage.getItem('toy_cart');
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    // ignore
  }
  return [];
};

export const CartProvider = ({ children }) => {
  // Initialize state from localStorage immediately
  const [cartItems, setCartItems] = useState(loadCartFromStorage);
  const isFirstRender = useRef(true);

  // Persist to localStorage (skip on first render to avoid overwriting)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    
    try {
      localStorage.setItem('toy_cart', JSON.stringify(cartItems));
    } catch (e) {
      // ignore
    }
  }, [cartItems]);

  const addItem = (item, qty = 1) => {
    setCartItems((prev) => {
      const found = prev.find((p) => p.id === item.id);
      if (found) {
        return prev.map((p) => (p.id === item.id ? { ...p, quantity: p.quantity + qty } : p));
      }
      return [...prev, { ...item, quantity: qty }];
    });
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((p) => p.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCartItems((prev) => prev.map((p) => (p.id === id ? { ...p, quantity } : p)));
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((s, i) => s + (i.quantity || 0), 0);

  const cartTotal = cartItems.reduce((s, i) => s + (i.quantity || 0) * (i.price || 0), 0);

  return (
    <CartContext.Provider value={{ cartItems, addItem, removeItem, updateQuantity, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};

export default CartContext;
