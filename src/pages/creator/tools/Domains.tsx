import React, { useState } from 'react';
import { Globe, Plus, Check, X, ExternalLink, Code, Copy, CheckCircle } from 'lucide-react';

interface DomainConfig {
  domain: string;
  template: string;
  status: 'pending' | 'active' | 'error';
  sslEnabled: boolean;
}

const Domains: React.FC = () => {
  const [showAddDomain, setShowAddDomain] = useState(false);
  const [newDomain, setNewDomain] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [copiedRecord, setCopiedRecord] = useState<'cname' | 'txt' | null>(null);

  const [domains, setDomains] = useState<DomainConfig[]>([
    {
      domain: 'example.com',
      template: 'modern-portfolio',
      status: 'active',
      sslEnabled: true
    }
  ]);

  const templates = [
    {
      id: 'modern-portfolio',
      name: 'Modern Portfolio',
      description: 'Clean and minimal portfolio design',
      preview: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 'business-landing',
      name: 'Business Landing',
      description: 'Professional business landing page',
      preview: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: 'ecommerce-store',
      name: 'E-commerce Store',
      description: 'Full-featured online store template',
      preview: 'https://images.pexels.com/photos/264547/pexels-photo-264547.jpeg?auto=compress&cs=tinysrgb&w=800'
    }
  ];

  const handleAddDomain = () => {
    if (!newDomain || !selectedTemplate) return;

    setDomains(prev => [...prev, {
      domain: newDomain,
      template: selectedTemplate,
      status: 'pending',
      sslEnabled: false
    }]);

    setShowAddDomain(false);
    setNewDomain('');
    setSelectedTemplate('');
  };

  const handleRemoveDomain = (domain: string) => {
    setDomains(prev => prev.filter(d => d.domain !== domain));
  };

  const copyToClipboard = (text: string, type: 'cname' | 'txt') => {
    navigator.clipboard.writeText(text);
    setCopiedRecord(type);
    setTimeout(() => setCopiedRecord(null), 2000);
  };

  const AddDomainModal = () => (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-2xl w-full">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Add Custom Domain</h3>
            <button 
              onClick={() => setShowAddDomain(false)}
              className="p-2 hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Domain Name</label>
              <input
                type="text"
                value={newDomain}
                onChange={(e) => setNewDomain(e.target.value)}
                className="w-full bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Select Template</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {templates.map(template => (
                  <div
                    key={template.id}
                    onClick={() => setSelectedTemplate(template.id)}
                    className={`relative rounded-lg overflow-hidden cursor-pointer transition-all ${
                      selectedTemplate === template.id
                        ? 'ring-2 ring-blue-500'
                        : 'hover:ring-2 hover:ring-gray-500'
                    }`}
                  >
                    <img
                      src={template.preview}
                      alt={template.name}
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="text-center">
                        <h4 className="font-medium text-white">{template.name}</h4>
                        <p className="text-sm text-gray-300">{template.description}</p>
                      </div>
                    </div>
                    {selectedTemplate === template.id && (
                      <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-1">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-700 rounded-lg p-4">
              <h4 className="font-medium mb-4">DNS Configuration</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                    <span>CNAME Record</span>
                    <button
                      onClick={() => copyToClipboard('your-subdomain.example.com', 'cname')}
                      className="text-blue-400 hover:text-blue-300 flex items-center space-x-1"
                    >
                      {copiedRecord === 'cname' ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      <span>Copy</span>
                    </button>
                  </div>
                  <code className="block bg-gray-800 rounded p-2 text-sm">
                    your-subdomain.example.com
                  </code>
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                    <span>TXT Record</span>
                    <button
                      onClick={() => copyToClipboard('verify=your-domain-verification', 'txt')}
                      className="text-blue-400 hover:text-blue-300 flex items-center space-x-1"
                    >
                      {copiedRecord === 'txt' ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      <span>Copy</span>
                    </button>
                  </div>
                  <code className="block bg-gray-800 rounded p-2 text-sm">
                    verify=your-domain-verification
                  </code>
                </div>
              </div>
            </div>

            <button
              onClick={handleAddDomain}
              disabled={!newDomain || !selectedTemplate}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Add Domain
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Custom Domains</h1>
            <p className="text-gray-400">Connect your domains and choose website templates</p>
          </div>
          <button
            onClick={() => setShowAddDomain(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Domain</span>
          </button>
        </div>

        <div className="grid gap-6 mt-8">
          {domains.map(domain => (
            <div key={domain.domain} className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-500/10 rounded-lg">
                    <Globe className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{domain.domain}</h3>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${
                        domain.status === 'active' ? 'bg-green-500/20 text-green-500' :
                        domain.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' :
                        'bg-red-500/20 text-red-500'
                      }`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        <span className="capitalize">{domain.status}</span>
                      </span>
                      {domain.sslEnabled && (
                        <span className="inline-flex items-center space-x-1 px-2 py-1 bg-purple-500/20 text-purple-500 rounded-full text-xs">
                          <span>SSL Active</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <a
                    href={`https://${domain.domain}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                  <button
                    onClick={() => handleRemoveDomain(domain.domain)}
                    className="p-2 text-red-400 hover:text-red-300 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Template</span>
                    <span className="text-sm">{templates.find(t => t.id === domain.template)?.name}</span>
                  </div>
                  <div className="h-1 bg-gray-700 rounded-full">
                    <div
                      className={`h-full rounded-full ${
                        domain.status === 'active' ? 'bg-green-500' :
                        domain.status === 'pending' ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: domain.status === 'active' ? '100%' : '60%' }}
                    />
                  </div>
                </div>

                <button
                  onClick={() => setShowAddDomain(true)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-sm"
                >
                  Change Template
                </button>
              </div>
            </div>
          ))}

          {domains.length === 0 && (
            <div className="text-center py-12 bg-gray-800 rounded-lg">
              <Globe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-400">No domains added yet</p>
              <button
                onClick={() => setShowAddDomain(true)}
                className="mt-4 text-blue-400 hover:text-blue-300 transition-colors"
              >
                Add your first domain
              </button>
            </div>
          )}
        </div>

        {showAddDomain && <AddDomainModal />}
      </div>
    </div>
  );
};

export default Domains;