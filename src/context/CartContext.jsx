'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast'; // ⬅️ Add this at top


const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) setCart(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    const exists = cart.find((i) => i.id === item.id);
    if (exists) {
      setCart(cart.map((i) => i.id === item.id ? { ...i, qty: i.qty + 1 } : i));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const removeFromCart = (id) => {
  const item = cart.find((i) => i.id === id);
  setCart(cart.filter((item) => item.id !== id));
  if (item) toast.error(`${item.name} removed from cart`);
};


  const changeQty = (id, qty) => {
  if (qty < 1) {
    removeFromCart(id);
    return;
  }
  setCart(cart.map((item) => item.id === id ? { ...item, qty } : item));
};


  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, changeQty, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
