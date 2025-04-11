'use client';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { UserButton, SignInButton, SignUpButton, useUser } from '@clerk/nextjs';

export default function Header() {
  const { cart } = useCart();
  const { user, isLoaded } = useUser();
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-blue-600">
            Store
          </Link>
          
          <nav className="flex items-center space-x-8">
            <Link href="/products" className="text-gray-600 hover:text-blue-600">
              Products
            </Link>
            {isLoaded && (
              <>
                {!user ? (
                  <div className="flex items-center space-x-4">
                    <SignInButton mode="modal">
                      <button className="text-gray-600 hover:text-blue-600">
                        Sign In
                      </button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Sign Up
                      </button>
                    </SignUpButton>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    <Link href="/orders" className="text-gray-600 hover:text-blue-600">
                      My Orders
                    </Link>
                    <UserButton afterSignOutUrl="/" />
                  </div>
                )}
              </>
            )}
            <Link href="/cart" className="relative">
              <span className="sr-only">Cart</span>
              <svg
                className="w-6 h-6 text-gray-600 hover:text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
} 