import React, { useState } from 'react';
import { Users, Mail, Search, Filter, X, Send, FileText, Download, Upload, CheckCircle } from 'lucide-react';
import BusinessLayout from '../../components/BusinessLayout';
import FormInput from '../../components/FormInput';
import FormTextArea from '../../components/FormTextArea';

interface Customer {
  id: string;
  name: string;
  email: string;
  totalPurchases: number;
  lastPurchase: string;
  totalSpent: number;
  status: 'active' | 'inactive';
}

interface EmailComposition {
  to: string;
  subject: string;
  content: string;
}

const Customers: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [emailForm, setEmailForm] = useState<EmailComposition>({
    to: '',
    subject: '',
    content: ''
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const customers: Customer[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      totalPurchases: 5,
      lastPurchase: '2024-03-15',
      totalSpent: 499.95,
      status: 'active'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      totalPurchases: 3,
      lastPurchase: '2024-03-10',
      totalSpent: 299.97,
      status: 'active'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      totalPurchases: 1,
      lastPurchase: '2024-02-28',
      totalSpent: 99.99,
      status: 'inactive'
    }
  ];

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = 
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || customer.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sending email:', emailForm);
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      setShowEmailModal(false);
      setEmailForm({ to: '', subject: '', content: '' });
      setSelectedCustomer(null);
    }, 2000);
  };

  const handleExportCustomers = () => {
    const csvContent = [
      ['Name', 'Email', 'Total Purchases', 'Last Purchase', 'Total Spent', 'Status'],
      ...customers.map(customer => [
        customer.name,
        customer.email,
        customer.totalPurchases.toString(),
        customer.lastPurchase,
        customer.totalSpent.toFixed(2),
        customer.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'customers.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const EmailModal = () => {
    if (!selectedCustomer) return null;

    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-800 rounded-lg max-w-2xl w-full">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Send Email</h3>
              <button 
                onClick={() => setShowEmailModal(false)}
                className="p-2 hover:bg-gray-700 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {showSuccessMessage ? (
            <div className="p-6 text-center">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <p className="text-xl font-semibold">Email Sent Successfully!</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSendEmail} className="p-6 space-y-6">
              <FormInput
                label="To"
                value={selectedCustomer.email}
                onChange={() => {}}
                disabled
              />

              <FormInput
                label="Subject"
                value={emailForm.subject}
                onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })}
                placeholder="Enter email subject"
                required
              />

              <FormTextArea
                label="Message"
                value={emailForm.content}
                onChange={(e) => setEmailForm({ ...emailForm, content: e.target.value })}
                placeholder="Write your message..."
                required
              />

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowEmailModal(false)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Email</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  };

  return (
    <BusinessLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-500 rounded-full">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold">Customers</h1>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleExportCustomers}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>
            <label className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors flex items-center space-x-2 cursor-pointer">
              <Upload className="w-4 h-4" />
              <span>Import CSV</span>
              <input type="file" accept=".csv" className="hidden" onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  // Handle CSV import
                  console.log('Importing file:', file);
                }
              }} />
            </label>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search customers..."
                className="w-full bg-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as 'all' | 'active' | 'inactive')}
                className="bg-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Customers Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-700">
                  <th className="pb-4">Customer</th>
                  <th className="pb-4">Total Purchases</th>
                  <th className="pb-4">Last Purchase</th>
                  <th className="pb-4">Total Spent</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-700/50">
                    <td className="py-4">
                      <div>
                        <p className="font-medium">{customer.name}</p>
                        <p className="text-sm text-gray-400">{customer.email}</p>
                      </div>
                    </td>
                    <td className="py-4">{customer.totalPurchases}</td>
                    <td className="py-4">{new Date(customer.lastPurchase).toLocaleDateString()}</td>
                    <td className="py-4">${customer.totalSpent.toFixed(2)}</td>
                    <td className="py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        customer.status === 'active' 
                          ? 'bg-green-500/20 text-green-500' 
                          : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setSelectedCustomer(customer);
                            setEmailForm({ 
                              to: customer.email,
                              subject: '',
                              content: ''
                            });
                            setShowEmailModal(true);
                          }}
                          className="p-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            // View customer details
                            console.log('View customer:', customer);
                          }}
                          className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                        >
                          <FileText className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredCustomers.length === 0 && (
              <div className="text-center py-8 text-gray-400">
                No customers found matching your criteria
              </div>
            )}
          </div>
        </div>
      </div>

      {showEmailModal && <EmailModal />}
    </BusinessLayout>
  );
};

export default Customers;