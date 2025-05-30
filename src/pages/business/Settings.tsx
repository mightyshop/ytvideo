import React, { useState } from 'react';
import { Settings as SettingsIcon, Building, Globe, Key, Copy, CheckCircle, Link as LinkIcon, Code, ExternalLink, Eye } from 'lucide-react';
import BusinessLayout from '../../components/BusinessLayout';
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';

interface BusinessProfile {
  companyName: string;
  website: string;
  email: string;
  phone: string;
  address: string;
}

interface DomainSettings {
  customDomain: string;
  sslEnabled: boolean;
}

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'domain' | 'api'>('profile');
  const [profile, setProfile] = useState<BusinessProfile>({
    companyName: 'Example Company',
    website: 'https://example.com',
    email: 'contact@example.com',
    phone: '+1 234 567 890',
    address: '123 Business St, City, Country'
  });

  const [domain, setDomain] = useState<DomainSettings>({
    customDomain: '',
    sslEnabled: false
  });

  const [showApiKey, setShowApiKey] = useState(false);
  const [copied, setCopied] = useState<'key' | null>(null);
  const apiKey = 'sk_test_1234567890abcdefghijklmnopqrstuvwxyz';

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updated profile:', profile);
    // Here you would typically update the profile in your backend
  };

  const handleDomainSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updated domain settings:', domain);
    // Here you would typically update the domain settings in your backend
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied('key');
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <BusinessLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-3 bg-blue-500 rounded-full">
            <SettingsIcon className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold">Settings</h1>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-gray-800 p-1 rounded-lg mb-8">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'profile'
                ? 'bg-blue-500 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            Business Profile
          </button>
          <button
            onClick={() => setActiveTab('domain')}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'domain'
                ? 'bg-blue-500 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            Domain Settings
          </button>
          <button
            onClick={() => setActiveTab('api')}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'api'
                ? 'bg-blue-500 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            API Settings
          </button>
        </div>

        {/* Profile Settings */}
        {activeTab === 'profile' && (
          <div className="bg-gray-800 rounded-lg p-6">
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <FormInput
                label="Company Name"
                value={profile.companyName}
                onChange={(e) => setProfile({ ...profile, companyName: e.target.value })}
                icon={<Building className="w-5 h-5" />}
                required
              />

              <FormInput
                label="Website"
                type="url"
                value={profile.website}
                onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                icon={<Globe className="w-5 h-5" />}
                required
              />

              <FormInput
                label="Business Email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                icon={<LinkIcon className="w-5 h-5" />}
                required
              />

              <FormInput
                label="Phone Number"
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                required
              />

              <FormInput
                label="Business Address"
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                required
              />

              <FormButton type="submit">
                Save Changes
              </FormButton>
            </form>
          </div>
        )}

        {/* Domain Settings */}
        {activeTab === 'domain' && (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Custom Domain</h2>
              <form onSubmit={handleDomainSubmit} className="space-y-6">
                <FormInput
                  label="Domain Name"
                  value={domain.customDomain}
                  onChange={(e) => setDomain({ ...domain, customDomain: e.target.value })}
                  placeholder="your-domain.com"
                  icon={<Globe className="w-5 h-5" />}
                />

                <div className="bg-gray-700 rounded-lg p-4">
                  <h3 className="font-medium mb-4">DNS Configuration</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-400 mb-2">Add these records to your DNS settings:</p>
                      <div className="bg-gray-800 rounded-lg p-4">
                        <p className="font-mono text-sm">
                          Type: CNAME<br />
                          Name: www<br />
                          Value: your-subdomain.example.com
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <FormButton type="submit">
                  Save Domain Settings
                </FormButton>
              </form>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">SSL Certificate</h2>
              <p className="text-gray-400 mb-4">
                SSL certificates are automatically provisioned and renewed for your custom domain.
              </p>
              <div className="flex items-center space-x-2 text-green-500">
                <CheckCircle className="w-5 h-5" />
                <span>SSL is enabled and active</span>
              </div>
            </div>
          </div>
        )}

        {/* API Settings */}
        {activeTab === 'api' && (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">API Keys</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Secret API Key
                  </label>
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-700 rounded-lg p-3 font-mono">
                      {showApiKey ? apiKey : '•'.repeat(48)}
                    </div>
                    <button
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={copyApiKey}
                      className="p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      {copied === 'key' ? <CheckCircle className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="bg-yellow-500/10 text-yellow-500 rounded-lg p-4">
                  <p className="text-sm">
                    Keep your API keys secure! Never share them in publicly accessible places.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">API Documentation</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">REST API Reference</h3>
                    <p className="text-sm text-gray-400">
                      Complete API documentation for developers
                    </p>
                  </div>
                  <a
                    href="https://docs.example.com/api"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-400 hover:text-blue-300"
                  >
                    <span>View Docs</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">API Status</h3>
                    <p className="text-sm text-gray-400">
                      Check current API status and incidents
                    </p>
                  </div>
                  <a
                    href="https://status.example.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-blue-400 hover:text-blue-300"
                  >
                    <span>View Status</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Code Examples</h2>
              <div className="space-y-4">
                <div className="bg-gray-700 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">JavaScript/Node.js</h3>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(`const api = require('api-client');
const client = new api.Client('YOUR_API_KEY');

client.products.list()
  .then(products => console.log(products))
  .catch(error => console.error(error));`);
                      }}
                      className="text-gray-400 hover:text-white"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <pre className="text-sm overflow-x-auto">
                    <code className="text-blue-400">const</code>{" "}
                    <code className="text-white">api = require(</code>
                    <code className="text-green-400">'api-client'</code>
                    <code className="text-white">);</code>
                    <br />
                    <code className="text-blue-400">const</code>{" "}
                    <code className="text-white">client = new api.Client(</code>
                    <code className="text-green-400">'YOUR_API_KEY'</code>
                    <code className="text-white">);</code>
                    <br />
                    <br />
                    <code className="text-white">client.products.list()</code>
                    <br />
                    <code className="text-white">&nbsp;&nbsp;.then(products =&gt; console.log(products))</code>
                    <br />
                    <code className="text-white">&nbsp;&nbsp;.catch(error =&gt; console.error(error));</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </BusinessLayout>
  );
};

export default Settings;