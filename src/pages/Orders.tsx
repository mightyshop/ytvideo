import React from 'react';
import { Package, Truck, CheckCircle, Clock, ArrowLeft } from 'lucide-react';
import { products } from '../data/products';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

const Orders: React.FC = () => {
  const navigate = useNavigate();
  const orders = [
    {
      id: 'ORD001',
      date: '2024-03-15',
      status: 'delivered',
      items: [products[0]],
      total: products[0].price
    },
    {
      id: 'ORD002',
      date: '2024-03-18',
      status: 'shipping',
      items: [products[1], products[2]],
      total: products[1].price + products[2].price
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'shipping':
        return <Truck className="w-5 h-5 text-blue-500" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'Delivered';
      case 'shipping':
        return 'In Transit';
      default:
        return 'Processing';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 pb-24 md:pb-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-500 rounded-full">
              <Package className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold">My Orders</h1>
          </div>
          <button 
            onClick={() => navigate('/shop')}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Shop</span>
          </button>
        </div>

        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="p-4 bg-gray-700 flex items-center justify-between">
                  <div>
                    <span className="text-sm text-gray-400">Order ID: {order.id}</span>
                    <p className="text-sm text-gray-400">
                      Placed on {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(order.status)}
                    <span className="text-sm">{getStatusText(order.status)}</span>
                  </div>
                </div>

                <div className="p-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 py-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-gray-400">{item.seller.name}</p>
                        <p className="text-green-500 mt-1">${item.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}

                  <div className="border-t border-gray-700 mt-4 pt-4 flex justify-between items-center">
                    <span className="text-gray-400">Total</span>
                    <span className="text-xl font-semibold">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-800 rounded-lg">
            <p className="text-gray-400">No orders found</p>
          </div>
        )}
      </div>
      
      <BottomNav />
    </div>
  );
};

export default Orders;