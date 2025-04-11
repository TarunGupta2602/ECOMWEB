'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Category images (since the API doesn't provide images for categories)
  const categoryImages = {
    "electronics": "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=500",
    "jewelery": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=500",
    "men's clothing": "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?q=80&w=500",
    "women's clothing": "https://images.unsplash.com/photo-1493655161922-ef98929de9d8?q=80&w=500"
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gray-900 h-[70vh]">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200"
            alt="Shopping"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Welcome to Our Store
            </h1>
            <p className="text-xl text-gray-200 mb-8">
              Discover amazing products across various categories
            </p>
            <Link 
              href="/products"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Shop All Products
            </Link>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
        
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-600">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category) => (
              <Link
                href={`/products?category=${category}`}
                key={category}
                className="group"
              >
                <div className="relative overflow-hidden rounded-lg shadow-lg aspect-[4/3]">
                  <img
                    src={categoryImages[category]}
                    alt={category}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-xl font-semibold text-white capitalize">
                        {category.replace("'s", 's')}
                      </h3>
                      <p className="text-gray-200 mt-2">
                        Explore Collection →
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Quality Products</h3>
              <p className="text-gray-600">Curated selection of the finest products</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8 4-8-4m16 0l-8 4m8 4l-8 4m8-4l-8 4m8-4v10M4 7l8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Fast Shipping</h3>
              <p className="text-gray-600">Quick delivery to your doorstep</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Secure Shopping</h3>
              <p className="text-gray-600">Safe and secure payment options</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
