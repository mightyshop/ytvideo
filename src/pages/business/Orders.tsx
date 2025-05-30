import React, { useState } from 'react';
import { Package, Truck, CheckCircle, Clock, Search, Filter, ArrowDown, ArrowUp, X, MapPin, Box, Mail, ExternalLink, User } from 'lucide-react';
import BusinessLayout from '../../components/BusinessLayout';
import { products } from '../../data/products';

interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
  };
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: {
    productId: number;
    quantity: number;
  }[];
  shippingAddress: string;
}

const Orders: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<keyof Order>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [selectedStatus, setSelectedStatus] = useState<Order['status'] | 'all'>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const orders: Order[] = [
    {
      id: 'ORD-001',
      customer: {
        name: 'John Doe',
        email: 'john.doe@example.com'
      },
      date: '2024-03-20',
      status: 'pending',
      total: 299.99,
      items: [{ productId: 1, quantity: 1 }, { productId: 2, quantity: 1 }],
      shippingAddress: '123 Main St, City, Country'
    },
    {
      id: 'ORD-002',
      customer: {
        name: 'Jane Smith',
        email: 'jane.smith@example.com'
      },
      date: '2024-03-19',
      status: 'processing',
      total: 149.99,
      items: [{ productId: 3, quantity: 1 }],
      shippingAddress: '456 Oak Ave, Town, Country'
    },
    {
      id: 'ORD-003',
      customer: {
        name: 'Mike Johnson',
        email: 'mike.johnson@example.com'
      },
      date: '2024-03-18',
      status: 'shipped',
      total: 499.99,
      items: [{ productId: 4, quantity: 2 }],
      shippingAddress: '789 Pine Rd, Village, Country'
    }
  ];

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-500';
      case 'processing':
        return 'bg-blue-500/20 text-blue-500';
      case 'shipped':
        return 'bg-purple-500/20 text-purple-500';
      case 'delivered':
        return 'bg-green-500/20 text-green-500';
      case 'cancelled':
        return 'bg-red-500/20 text-red-500';
      default:
        return 'bg-gray-500/20 text-gray-500';
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'processing':
        return <Package className="w-4 h-4" />;
      case 'shipped':
        return <Truck className="w-4 h-4" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const filteredOrders = orders
    .filter(order => 
      (selectedStatus === 'all' || order.status === selectedStatus) &&
      (order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
       order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortField === 'date') {
        return sortDirection === 'asc' 
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return 0;
    });

  const handleSort = (field: keyof Order) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleStatusChange = (orderId: string, newStatus: Order['status']) => {
    console.log(`Updating order ${orderId} status to ${newStatus}`);
    setIsModalOpen(false);
  };

  const SortIcon = ({ field }: { field: keyof Order }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />;
  };

  const OrderDetailsModal = () => {
    if (!selectedOrder) return null;

    const orderProducts = selectedOrder.items.map(item => ({
      ...products.find(p => p.id === item.productId)!,
      quantity: item.quantity
    }));

    const statusOptions: Order['status'][] = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div className="bg-gray-800 rounded-lg max-w-2xl w-full my-8">
          <div className="sticky top-0 bg-gray-800 rounded-t-lg border-b border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Order Details</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm text-gray-400 mb-1">Order ID</h3>
                <p className="font-medium">{selectedOrder.id}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-400 mb-1">Date</h3>
                <p className="font-medium">{new Date(selectedOrder.date).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="bg-gray-700 rounded-lg p-4 space-y-3">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="font-medium">{selectedOrder.customer.name}</p>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Mail className="w-4 h-4" />
                    <a href={`mailto:${selectedOrder.customer.email}`} className="text-blue-400 hover:text-blue-300">
                      {selectedOrder.customer.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm text-gray-400 mb-2">Shipping Address</h3>
              <div className="bg-gray-700 rounded-lg p-4 flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <p className="text-gray-200">{selectedOrder.shippingAddress}</p>
              </div>
            </div>

            <div>
              <h3 className="text-sm text-gray-400 mb-2">Order Items</h3>
              <div className="space-y-4">
                {orderProducts.map((product) => (
                  <div key={product.id} className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium truncate">{product.title}</h4>
                          <a
                            href={`/shop/${product.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 ml-2 flex-shrink-0"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                        <p className="text-sm text-gray-400">Quantity: {product.quantity}</p>
                        <p className="text-green-500">${(product.price * product.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm text-gray-400 mb-2">Order Status</h3>
              <select
                value={selectedOrder.status}
                onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value as Order['status'])}
                className="w-full bg-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="border-t border-gray-700 pt-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span className="text-green-500">${selectedOrder.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <BusinessLayout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Orders</h1>

        <div className="bg-gray-800 rounded-lg p-4 md:p-6">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search orders..."
                className="w-full bg-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as Order['status'] | 'all')}
                className="bg-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Mobile Order Cards */}
          <div className="md:hidden space-y-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium">{order.id}</span>
                  <div className={`px-3 py-1 rounded-full text-sm flex items-center space-x-1 ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    <span className="capitalize">{order.status}</span>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Customer</span>
                    <span>{order.customer.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Date</span>
                    <span>{new Date(order.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total</span>
                    <span className="text-green-500">${order.total.toFixed(2)}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedOrder(order);
                    setIsModalOpen(true);
                  }}
                  className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition-colors"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>

          {/* Desktop Orders Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-700">
                  <th className="pb-4 cursor-pointer" onClick={() => handleSort('id')}>
                    <div className="flex items-center space-x-2">
                      <span>Order ID</span>
                      <SortIcon field="id" />
                    </div>
                  </th>
                  <th className="pb-4">Customer</th>
                  <th className="pb-4 cursor-pointer" onClick={() => handleSort('date')}>
                    <div className="flex items-center space-x-2">
                      <span>Date</span>
                      <SortIcon field="date" />
                    </div>
                  </th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Total</th>
                  <th className="pb-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-700/50">
                    <td className="py-4">{order.id}</td>
                    <td className="py-4">{order.customer.name}</td>
                    <td className="py-4">{new Date(order.date).toLocaleDateString()}</td>
                    <td className="py-4">
                      <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="capitalize">{order.status}</span>
                      </div>
                    </td>
                    <td className="py-4">${order.total.toFixed(2)}</td>
                    <td className="py-4">
                      <button 
                        onClick={() => {
                          setSelectedOrder(order);
                          setIsModalOpen(true);
                        }}
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredOrders.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No orders found matching your criteria
              </div>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && <OrderDetailsModal />}
    </BusinessLayout>
  );
};

export default Orders;