import React, { useState } from 'react';
import { Building, Globe, Link as LinkIcon, User, Mail, CheckCircle } from 'lucide-react';
import FormInput from './FormInput';
import FormButton from './FormButton';

interface VerificationFormData {
  companyName: string;
  website: string;
  contactName: string;
  email: string;
  businessId: string;
}

interface BusinessVerificationProps {
  onVerified: () => void;
}

const BusinessVerification: React.FC<BusinessVerificationProps> = ({ onVerified }) => {
  const [form, setForm] = useState<VerificationFormData>({
    companyName: '',
    website: '',
    contactName: '',
    email: '',
    businessId: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the verification data to your backend
    console.log('Verification data:', form);
    onVerified();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
      
      <div className="relative bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 md:p-6 border-b border-gray-700 flex-shrink-0">
          <h2 className="text-xl md:text-2xl font-bold">Business Verification</h2>
          <p className="text-gray-400 mt-1 text-sm md:text-base">Complete verification to activate your business account</p>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-4 md:p-6">
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <FormInput
              label="Company Name"
              value={form.companyName}
              onChange={(e) => setForm({ ...form, companyName: e.target.value })}
              placeholder="Enter your company name"
              icon={<Building className="w-5 h-5" />}
              required
            />

            <FormInput
              label="Company Website"
              type="url"
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
              placeholder="https://"
              icon={<Globe className="w-5 h-5" />}
              required
            />

            <FormInput
              label="Contact Name"
              value={form.contactName}
              onChange={(e) => setForm({ ...form, contactName: e.target.value })}
              placeholder="Enter your full name"
              icon={<User className="w-5 h-5" />}
              required
            />

            <FormInput
              label="Business Email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Enter your business email"
              icon={<Mail className="w-5 h-5" />}
              required
            />

            <FormInput
              label="Business ID/Registration Number"
              value={form.businessId}
              onChange={(e) => setForm({ ...form, businessId: e.target.value })}
              placeholder="Enter your business registration number"
              icon={<LinkIcon className="w-5 h-5" />}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4">Why Verify?</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>Access to business tools</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>Verified business badge</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span>Advanced analytics</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-4">Requirements</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <span>Valid business registration</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <span>Active company website</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <span>Business email domain</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <span>Clear contact information</span>
                  </li>
                </ul>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="p-4 md:p-6 border-t border-gray-700 flex-shrink-0">
          <div className="flex flex-col sm:flex-row justify-end gap-3">
            <button
              type="button"
              onClick={() => onVerified()}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm md:text-base w-full sm:w-auto"
            >
              Cancel
            </button>
            <FormButton
              type="submit"
              className="w-full sm:w-auto"
              onClick={handleSubmit}
            >
              Submit Verification
            </FormButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessVerification;