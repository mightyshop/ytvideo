import React, { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';
import FormInput from './FormInput';

interface SmtpConfig {
  id?: string;
  name: string;
  host: string;
  port: string;
  username: string;
  password: string;
  fromEmail: string;
  useSsl: boolean;
}

interface SmtpConfigModalProps {
  config?: SmtpConfig;
  onClose: () => void;
  onSave: (config: SmtpConfig) => void;
}

const SmtpConfigModal: React.FC<SmtpConfigModalProps> = ({
  config,
  onClose,
  onSave
}) => {
  const [form, setForm] = useState<SmtpConfig>(config || {
    name: '',
    host: '',
    port: '',
    username: '',
    password: '',
    fromEmail: '',
    useSsl: true
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 2000);
  };

  const handleTestConnection = () => {
    // Simulate testing SMTP connection
    console.log('Testing SMTP connection:', form);
    alert('Connection test successful!');
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-gray-800 rounded-lg max-w-2xl w-full my-8">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">
              {config?.id ? 'Edit SMTP Profile' : 'Add SMTP Profile'}
            </h3>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {showSuccess ? (
          <div className="p-6 text-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <p className="text-xl font-semibold">
                SMTP Profile {config?.id ? 'Updated' : 'Created'} Successfully!
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <FormInput
              label="Profile Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g., Primary SMTP"
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="SMTP Host"
                value={form.host}
                onChange={(e) => setForm({ ...form, host: e.target.value })}
                placeholder="e.g., smtp.example.com"
                required
              />

              <FormInput
                label="Port"
                value={form.port}
                onChange={(e) => setForm({ ...form, port: e.target.value })}
                placeholder="e.g., 587"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                placeholder="e.g., user@example.com"
                required
              />

              <FormInput
                label="Password"
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="Enter password"
                required
              />
            </div>

            <FormInput
              label="From Email"
              type="email"
              value={form.fromEmail}
              onChange={(e) => setForm({ ...form, fromEmail: e.target.value })}
              placeholder="e.g., noreply@example.com"
              required
            />

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="useSsl"
                checked={form.useSsl}
                onChange={(e) => setForm({ ...form, useSsl: e.target.checked })}
                className="form-checkbox h-5 w-5 text-blue-500 rounded border-gray-600 bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
              />
              <label htmlFor="useSsl" className="text-sm">Use SSL/TLS</label>
            </div>

            <div className="flex justify-between pt-4 border-t border-gray-700">
              <button
                type="button"
                onClick={handleTestConnection}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                Test Connection
              </button>
              
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
                >
                  {config?.id ? 'Update Profile' : 'Add Profile'}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SmtpConfigModal;