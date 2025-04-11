'use client';
import { useUser } from '@clerk/nextjs';
import { useState, useEffect } from 'react';

export default function Orders() {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);

  // In a real application, you would fetch orders from your backend
  // This is just a mock implementation
  useEffect(() => {
    // Simulated orders data
    const mockOrders = [
      {
        id: 1,
        date: '2024-02-20',
        total: 299.99,
        status: 'Delivered',
        items: [
          {
            id: 1,
            title: 'Sample Product 1',
            price: 199.99,
            quantity: 1,
            image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'
          },
          {
            id: 2,
            title: 'Sample Product 2',
            price: 100.00,
            quantity: 1,
            image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg'
          }
        ]
      },
      {
        id: 2,
        date: '2024-02-18',
        total: 149.99,
        status: 'Processing',
        items: [
          {
            id: 3,
            title: 'Sample Product 3',
            price: 149.99,
            quantity: 1,
            image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg'
          }
        ]
      }
    ];

    setOrders(mockOrders);
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please sign in to view your orders</h1>
          <p className="text-gray-600">You need to be authenticated to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
        
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">Order #{order.id}</h2>
                    <p className="text-sm text-gray-600">Placed on {order.date}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
                
                <div className="border-t border-gray-200 -mx-6 px-6 py-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center py-4 border-b last:border-b-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-contain rounded"
                      />
                      <div className="ml-4 flex-1">
                        <h3 className="text-sm font-medium text-gray-900">{item.title}</h3>
                        <p className="text-sm text-gray-600">
                          Quantity: {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        ${(item.quantity * item.price).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-200 mt-4 pt-4">
                  <div className="flex justify-between">
                    <span className="text-base font-semibold text-gray-900">Total</span>
                    <span className="text-base font-semibold text-gray-900">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {orders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">You haven't placed any orders yet.</p>
          </div>
        )}
      </div>
    </div>
  );
} 