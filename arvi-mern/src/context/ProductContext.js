import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { productAPI } from '../services/api';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider');
  }
  return context;
};

// Fallback products for when API is unavailable
const fallbackProducts = [
  {
    _id: 'prod_1',
    id: 1,
    name: 'Silicone Bowl Set',
    subtitle: 'Suction Base • Food-Grade Silicone',
    slug: 'silicone-bowl-set',
    description: 'Soft, stable bowls that stay put — great for toddlers learning to scoop. Made with 100% food-grade silicone, these bowls feature a strong suction base to minimize spills and encourage independent eating.',
    shortDescription: 'Soft, stable bowls that stay put — great for toddlers learning to scoop.',
    price: 24.99,
    comparePrice: 32.99,
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80'],
    category: 'bowls',
    materials: ['Food-Grade Silicone', 'BPA-Free'],
    colors: [{ name: 'Dusty Pink', hex: '#d58a94' }],
    features: ['Strong suction base', 'Microwave & dishwasher safe', 'BPA, PVC & Phthalate free', 'Soft rounded edges', 'Stackable design'],
    stock: 48,
    sku: 'ARVI-BOWL-001',
    isFeatured: true,
    rating: 4.8,
    numReviews: 124,
  },
  {
    _id: 'prod_2',
    id: 2,
    name: 'Plate + Cutlery Set',
    subtitle: 'Stainless Steel • Silicone Grip',
    slug: 'plate-cutlery-set',
    description: 'Stainless cutlery with a comfortable silicone grip — built to last and easy to hold. Our divided plate keeps foods separate and makes mealtimes more manageable.',
    shortDescription: 'Stainless cutlery with a comfortable silicone grip — built to last and easy to hold.',
    price: 34.99,
    comparePrice: 44.99,
    image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=800&q=80'],
    category: 'sets',
    materials: ['304 Stainless Steel', 'Food-Grade Silicone'],
    features: ['Divided sections', 'Non-slip base', 'Ergonomic handles', 'Dishwasher safe'],
    stock: 32,
    sku: 'ARVI-SET-001',
    isFeatured: true,
    rating: 4.9,
    numReviews: 89,
  },
  {
    _id: 'prod_3',
    id: 3,
    name: 'Sippy Cup',
    subtitle: 'Leak-Proof • Easy Transition',
    slug: 'sippy-cup',
    description: 'Designed for little hands transitioning from bottle to cup. Leak-proof, easy to clean, and perfectly sized for toddler grip.',
    shortDescription: 'Leak-proof cup designed for easy transition and tiny hands.',
    price: 18.99,
    comparePrice: 24.99,
    image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=800&q=80'],
    category: 'accessories',
    features: ['Leak-proof lid', 'Soft spout', 'Easy-grip handles', 'BPA free'],
    stock: 65,
    sku: 'ARVI-CUP-001',
    isFeatured: true,
    rating: 4.7,
    numReviews: 56,
  },
  {
    _id: 'prod_4',
    id: 4,
    name: 'Complete Mealtime Kit',
    subtitle: 'Bowl + Plate + Cutlery + Cup',
    slug: 'complete-mealtime-kit',
    description: 'Everything you need for stress-free mealtimes. Our complete kit includes bowl set, plate with cutlery, and sippy cup — all in matching Dusty Pink.',
    shortDescription: 'The ultimate starter kit for modern families.',
    price: 69.99,
    comparePrice: 89.99,
    image: 'https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=800&q=80'],
    category: 'sets',
    features: ['Complete 4-piece set', 'Gift-ready packaging', 'Saves 20% vs individual'],
    stock: 20,
    sku: 'ARVI-KIT-001',
    isFeatured: true,
    rating: 5.0,
    numReviews: 34,
  },
];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 });

  const fetchProducts = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await productAPI.getAll(params);
      const data = response.data.data;
      setProducts(data);
      if (response.data.pagination) {
        setPagination(response.data.pagination);
      }
      // Set featured
      setFeatured(data.filter((p) => p.isFeatured));
      return data;
    } catch (err) {
      console.warn('API not available, using fallback products', err.message);
      setProducts(fallbackProducts);
      setFeatured(fallbackProducts.filter((p) => p.isFeatured));
      setError(null); // Don't show error, use fallback
      return fallbackProducts;
    } finally {
      setLoading(false);
    }
  }, []);

  const getProductById = useCallback(async (id) => {
    try {
      const response = await productAPI.getById(id);
      return response.data.data;
    } catch (err) {
      // Fallback search
      return fallbackProducts.find((p) => p._id === id || String(p.id) === String(id) || p.slug === id) || null;
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const value = {
    products,
    featured,
    loading,
    error,
    pagination,
    fetchProducts,
    getProductById,
    fallbackProducts,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};
