import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { cartAPI } from '../services/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const { isAuthenticated } = useAuth();

  // Local cart for guest users
  const getLocalCart = () => {
    try {
      return JSON.parse(localStorage.getItem('arvi_guest_cart') || '{"items":[],"total":0}');
    } catch {
      return { items: [], total: 0 };
    }
  };

  const setLocalCart = (newCart) => {
    localStorage.setItem('arvi_guest_cart', JSON.stringify(newCart));
    setCart(newCart);
    setCartCount(newCart.items.reduce((acc, item) => acc + item.quantity, 0));
  };

  const fetchCart = useCallback(async () => {
    if (!isAuthenticated) {
      const local = getLocalCart();
      setCart(local);
      setCartCount(local.items.reduce((acc, item) => acc + item.quantity, 0));
      return;
    }

    try {
      setLoading(true);
      const response = await cartAPI.get();
      const cartData = response.data.data;
      setCart(cartData);
      setCartCount(cartData.items.reduce((acc, item) => acc + item.quantity, 0));
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      // Fallback to local cart if API fails (e.g., server not running)
      const local = getLocalCart();
      setCart(local);
      setCartCount(local.items.reduce((acc, item) => acc + item.quantity, 0));
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = async (product, quantity = 1) => {
    const productId = product._id || product.id;

    if (!isAuthenticated) {
      // Guest cart logic
      const current = getLocalCart();
      const existingIndex = current.items.findIndex((i) => (i.product._id || i.product.id) === productId || i.product === productId);
      
      let newItems;
      if (existingIndex > -1) {
        newItems = [...current.items];
        newItems[existingIndex].quantity += quantity;
      } else {
        newItems = [...current.items, { 
          _id: `guest_${Date.now()}`, 
          product: product, 
          quantity, 
          price: product.price 
        }];
      }
      
      const total = newItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
      setLocalCart({ items: newItems, total });
      return { success: true };
    }

    try {
      setLoading(true);
      await cartAPI.add(productId, quantity);
      await fetchCart();
      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to add to cart';
      return { success: false, message };
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    if (!isAuthenticated) {
      const current = getLocalCart();
      const newItems = current.items.map((item) => 
        item._id === itemId ? { ...item, quantity } : item
      );
      const total = newItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
      setLocalCart({ items: newItems, total });
      return { success: true };
    }

    try {
      setLoading(true);
      await cartAPI.update(itemId, quantity);
      await fetchCart();
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to update' };
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId) => {
    if (!isAuthenticated) {
      const current = getLocalCart();
      const newItems = current.items.filter((item) => item._id !== itemId && item.product !== itemId);
      const total = newItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
      setLocalCart({ items: newItems, total });
      return { success: true };
    }

    try {
      setLoading(true);
      await cartAPI.remove(itemId);
      await fetchCart();
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to remove' };
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    if (!isAuthenticated) {
      setLocalCart({ items: [], total: 0 });
      return { success: true };
    }

    try {
      setLoading(true);
      await cartAPI.clear();
      setCart({ items: [], total: 0 });
      setCartCount(0);
      return { success: true };
    } catch (error) {
      return { success: false, message: 'Failed to clear cart' };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    cart,
    cartCount,
    loading,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    fetchCart,
    total: cart.total || cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
