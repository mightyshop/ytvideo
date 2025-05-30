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

interface SellerVerificationProps {
  onVerified: () => void;
}

const SellerVerification: React.FC<SellerVerificationProps> = ({ onVerified }) => {
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
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Seller Verification</h1>
          <p className="text-gray-400">Complete verification to start selling products</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
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

            <FormButton
              type="submit"
              className="w-full"
            >
              Submit Verification
            </FormButton>
          </form>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Why Verify?</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Access to seller dashboard</li>
              <li>• Verified seller badge</li>
              <li>• Priority support</li>
              <li>• Advanced analytics</li>
            </ul>
          </div>

          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Requirements</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Valid business registration</li>
              <li>• Active company website</li>
              <li>• Business email domain</li>
              <li>• Clear contact information</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerVerification;