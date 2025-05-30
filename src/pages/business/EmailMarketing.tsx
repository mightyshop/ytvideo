import React, { useState } from 'react';
import { Mail, Users, Calendar, Settings, Send, Upload, X, CheckCircle, FileText, Download, Plus, Edit, Trash2, Clock } from 'lucide-react';
import BusinessLayout from '../../components/BusinessLayout';
import FormInput from '../../components/FormInput';
import FormTextArea from '../../components/FormTextArea';
import FormSelect from '../../components/FormSelect';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  lastModified: string;
}

interface ContactGroup {
  id: string;
  name: string;
  count: number;
  lastUpdated: string;
}

interface Campaign {
  id: string;
  name: string;
  template: string;
  group: string;
  schedule: string;
  status: 'draft' | 'scheduled' | 'sent' | 'failed';
  sentCount?: number;
  openRate?: number;
  clickRate?: number;
}

interface SmtpProfile {
  id: string;
  name: string;
  host: string;
  port: string;
  username: string;
  password: string;
  fromEmail: string;
  useSsl: boolean;
}

const EmailMarketing: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'templates' | 'campaigns' | 'contacts' | 'settings'>('templates');
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showSmtpModal, setShowSmtpModal] = useState(false);
  const [showCampaignModal, setShowCampaignModal] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [templates, setTemplates] = useState<EmailTemplate[]>([
    {
      id: '1',
      name: 'Welcome Email',
      subject: 'Welcome to our platform!',
      content: 'Dear {name},\n\nWelcome to our platform! We\'re excited to have you on board.',
      lastModified: '2024-03-15'
    },
    {
      id: '2',
      name: 'Newsletter',
      subject: 'Latest Updates',
      content: 'Hi {name},\n\nHere are our latest updates...',
      lastModified: '2024-03-14'
    }
  ]);

  const [contactGroups, setContactGroups] = useState<ContactGroup[]>([
    {
      id: '1',
      name: 'All Customers',
      count: 1250,
      lastUpdated: '2024-03-15'
    },
    {
      id: '2',
      name: 'Active Buyers',
      count: 850,
      lastUpdated: '2024-03-14'
    },
    {
      id: '3',
      name: 'Newsletter Subscribers',
      count: 2100,
      lastUpdated: '2024-03-13'
    }
  ]);

  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: '1',
      name: 'March Newsletter',
      template: 'Newsletter',
      group: 'All Customers',
      schedule: '2024-03-20T10:00:00Z',
      status: 'scheduled'
    },
    {
      id: '2',
      name: 'Welcome Series',
      template: 'Welcome Email',
      group: 'New Customers',
      schedule: '2024-03-15T09:00:00Z',
      status: 'sent',
      sentCount: 150,
      openRate: 45.5,
      clickRate: 12.3
    }
  ]);

  const [smtpProfiles, setSmtpProfiles] = useState<SmtpProfile[]>([
    {
      id: '1',
      name: 'Primary SMTP',
      host: 'smtp.example.com',
      port: '587',
      username: 'user@example.com',
      password: '********',
      fromEmail: 'noreply@example.com',
      useSsl: true
    }
  ]);

  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [templateForm, setTemplateForm] = useState({
    name: '',
    subject: '',
    content: ''
  });

  const [smtpForm, setSmtpForm] = useState<SmtpProfile>({
    id: '',
    name: '',
    host: '',
    port: '',
    username: '',
    password: '',
    fromEmail: '',
    useSsl: true
  });

  const [campaignForm, setCampaignForm] = useState({
    name: '',
    template: '',
    group: '',
    schedule: ''
  });

  const handleTemplateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTemplate) {
      
      // Update existing template
      setTemplates(prev => prev.map(t => 
        t.id === selectedTemplate.id 
          ? { 
              ...t, 
              name: templateForm.name, 
              subject: templateForm.subject, 
              content: templateForm.content,
              lastModified: new Date().toISOString().split('T')[0]
            } 
          : t
      ));
    } else {
      // Create new template
      const newTemplate: EmailTemplate = {
        id: Date.now().toString(),
        name: templateForm.name,
        subject: templateForm.subject,
        content: templateForm.content,
        lastModified: new Date().toISOString().split('T')[0]
      };
      setTemplates(prev => [...prev, newTemplate]);
    }

    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      setShowTemplateModal(false);
      setSelectedTemplate(null);
      setTemplateForm({ name: '', subject: '', content: '' });
    }, 2000);
  };

  const handleSmtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (smtpForm.id) {
      // Update existing profile
      setSmtpProfiles(prev => prev.map(p => 
        p.id === smtpForm.id ? smtpForm : p
      ));
    } else {
      // Create new profile
      const newProfile: SmtpProfile = {
        ...smtpForm,
        id: Date.now().toString()
      };
      setSmtpProfiles(prev => [...prev, newProfile]);
    }

    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      setShowSmtpModal(false);
      setSmtpForm({
        id: '',
        name: '',
        host: '',
        port: '',
        username: '',
        password: '',
        fromEmail: '',
        useSsl: true
      });
    }, 2000);
  };

  const handleCampaignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCampaign: Campaign = {
      id: Date.now().toString(),
      name: campaignForm.name,
      template: campaignForm.template,
      group: campaignForm.group,
      schedule: campaignForm.schedule,
      status: 'scheduled'
    };
    setCampaigns(prev => [...prev, newCampaign]);

    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      setShowCampaignModal(false);
      setCampaignForm({
        name: '',
        template: '',
        group: '',
        schedule: ''
      });
    }, 2000);
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(prev => prev.filter(t => t.id !== id));
  };

  const handleEditTemplate = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setTemplateForm({
      name: template.name,
      subject: template.subject,
      content: template.content
    });
    setShowTemplateModal(true);
  };

  const handleEditSmtp = (profile: SmtpProfile) => {
    setSmtpForm(profile);
    setShowSmtpModal(true);
  };

  const handleDeleteSmtp = (id: string) => {
    setSmtpProfiles(prev => prev.filter(p => p.id !== id));
  };

  const TemplateModal = () => (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-gray-800 rounded-lg max-w-4xl w-full my-8">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">
              {selectedTemplate ? 'Edit Template' : 'Create Template'}
            </h3>
            <button 
              onClick={() => setShowTemplateModal(false)}
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
              <p className="text-xl font-semibold">
                Template {selectedTemplate ? 'Updated' : 'Created'} Successfully!
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleTemplateSubmit} className="p-6 space-y-6">
            <FormInput
              label="Template Name"
              value={templateForm.name}
              onChange={(e) => setTemplateForm({ ...templateForm, name: e.target.value })}
              placeholder="Enter template name"
              required
            />

            <FormInput
              label="Subject Line"
              value={templateForm.subject}
              onChange={(e) => setTemplateForm({ ...templateForm, subject: e.target.value })}
              placeholder="Enter email subject"
              required
            />

            <div>
              <label className="block text-sm font-medium mb-2">Email Content</label>
              <div className="bg-gray-700 rounded-lg p-2 mb-2">
                <div className="flex space-x-2 border-b border-gray-600 pb-2 mb-2">
                  <button type="button" className="p-2 hover:bg-gray-600 rounded">B</button>
                  <button type="button" className="p-2 hover:bg-gray-600 rounded italic">I</button>
                  <button type="button" className="p-2 hover:bg-gray-600 rounded underline">U</button>
                  <div className="border-r border-gray-600 mx-1"></div>
                  <button type="button" className="p-2 hover:bg-gray-600 rounded">
                    <span className="text-sm">H1</span>
                  </button>
                  <button type="button" className="p-2 hover:bg-gray-600 rounded">
                    <span className="text-sm">H2</span>
                  </button>
                </div>
                <textarea
                  value={templateForm.content}
                  onChange={(e) => setTemplateForm({ ...templateForm, content: e.target.value })}
                  className="w-full bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[300px]"
                  placeholder="Write your email content..."
                  required
                />
              </div>
              <p className="text-sm text-gray-400">
                Use {'{name}'} to insert recipient's name
              </p>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setShowTemplateModal(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
              >
                {selectedTemplate ? 'Update Template' : 'Create Template'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );

  const SmtpModal = () => (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-gray-800 rounded-lg max-w-2xl w-full my-8">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">
              {smtpForm.id ? 'Edit SMTP Profile' : 'Add SMTP Profile'}
            </h3>
            <button 
              onClick={() => setShowSmtpModal(false)}
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
              <p className="text-xl font-semibold">
                SMTP Profile {smtpForm.id ? 'Updated' : 'Created'} Successfully!
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSmtpSubmit} className="p-6 space-y-6">
            <FormInput
              label="Profile Name"
              value={smtpForm.name}
              onChange={(e) => setSmtpForm({ ...smtpForm, name: e.target.value })}
              placeholder="e.g., Primary SMTP"
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="SMTP Host"
                value={smtpForm.host}
                onChange={(e) => setSmtpForm({ ...smtpForm, host: e.target.value })}
                placeholder="e.g., smtp.example.com"
                required
              />

              <FormInput
                label="Port"
                value={smtpForm.port}
                onChange={(e) => setSmtpForm({ ...smtpForm, port: e.target.value })}
                placeholder="e.g., 587"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Username"
                value={smtpForm.username}
                onChange={(e) => setSmtpForm({ ...smtpForm, username: e.target.value })}
                placeholder="e.g., user@example.com"
                required
              />

              <FormInput
                label="Password"
                type="password"
                value={smtpForm.password}
                onChange={(e) => setSmtpForm({ ...smtpForm, password: e.target.value })}
                placeholder="Enter password"
                required
              />
            </div>

            <FormInput
              label="From Email"
              type="email"
              value={smtpForm.fromEmail}
              onChange={(e) => setSmtpForm({ ...smtpForm, fromEmail: e.target.value })}
              placeholder="e.g., noreply@example.com"
              required
            />

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="useSsl"
                checked={smtpForm.useSsl}
                onChange={(e) => setSmtpForm({ ...smtpForm, useSsl: e.target.checked })}
                className="form-checkbox h-5 w-5 text-blue-500 rounded border-gray-600 bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
              />
              <label htmlFor="useSsl" className="text-sm">Use SSL/TLS</label>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setShowSmtpModal(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
              >
                {smtpForm.id ? 'Update Profile' : 'Add Profile'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );

  const CampaignModal = () => (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-gray-800 rounded-lg max-w-2xl w-full my-8">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Create Email Campaign</h3>
            <button 
              onClick={() => setShowCampaignModal(false)}
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
              <p className="text-xl font-semibold">Campaign Created Successfully!</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleCampaignSubmit} className="p-6 space-y-6">
            <FormInput
              label="Campaign Name"
              value={campaignForm.name}
              onChange={(e) => setCampaignForm({ ...campaignForm, name: e.target.value })}
              placeholder="Enter campaign name"
              required
            />

            <FormSelect
              label="Email Template"
              value={campaignForm.template}
              onChange={(e) => setCampaignForm({ ...campaignForm, template: e.target.value })}
              options={templates.map(t => ({ value: t.name, label: t.name }))}
              required
            />

            <FormSelect
              label="Contact Group"
              value={campaignForm.group}
              onChange={(e) => setCampaignForm({ ...campaignForm, group: e.target.value })}
              options={contactGroups.map(g => ({ value: g.name, label: `${g.name} (${g.count})` }))}
              required
            />

            <div>
              <label className="block text-sm font-medium mb-2">Schedule</label>
              <input
                type="datetime-local"
                value={campaignForm.schedule}
                onChange={(e) => setCampaignForm({ ...campaignForm, schedule: e.target.value })}
                className="w-full bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setShowCampaignModal(false)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
              >
                Create Campaign
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );

  return (
    <BusinessLayout>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-500 rounded-full">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold">Email Marketing</h1>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg mb-8">
          <div className="flex border-b border-gray-700">
            <button
              onClick={() => setActiveTab('templates')}
              className={`px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'templates'
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Templates
            </button>
            <button
              onClick={() => setActiveTab('campaigns')}
              className={`px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'campaigns'
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Campaigns
            </button>
            <button
              onClick={() => setActiveTab('contacts')}
              className={`px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'contacts'
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Contacts
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-6 py-4 text-sm font-medium transition-colors ${
                activeTab === 'settings'
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              SMTP Settings
            </button>
          </div>

          <div className="p-6">
            {/* Templates Tab */}
            {activeTab === 'templates' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Email Templates</h2>
                  <button
                    onClick={() => {
                      setSelectedTemplate(null);
                      setTemplateForm({ name: '', subject: '', content: '' });
                      setShowTemplateModal(true);
                    }}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Template</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {templates.map(template => (
                    <div key={template.id} className="bg-gray-700 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">{template.name}</h3>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditTemplate(template)}
                            className="p-2 hover:bg-gray-600 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteTemplate(template.id)}
                            className="p-2 hover:bg-gray-600 rounded-lg transition-colors text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">Subject: {template.subject}</p>
                      <p className="text-sm text-gray-400 mb-4 line-clamp-3">{template.content}</p>
                      <p className="text-xs text-gray-500">Last modified: {template.lastModified}</p>
                    </div>
                  ))}
                </div>

                {templates.length === 0 && (
                  <div className="text-center py-12 bg-gray-700 rounded-lg">
                    <Mail className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400">No templates found</p>
                    <button
                      onClick={() => {
                        setSelectedTemplate(null);
                        setTemplateForm({ name: '', subject: '', content: '' });
                        setShowTemplateModal(true);
                      }}
                      className="mt-4 text-blue-400 hover:text-blue-300"
                    >
                      Create your first template
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Campaigns Tab */}
            {activeTab === 'campaigns' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Email Campaigns</h2>
                  <button
                    onClick={() => setShowCampaignModal(true)}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Create Campaign</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b border-gray-700">
                        <th className="pb-4">Campaign</th>
                        <th className="pb-4">Template</th>
                        <th className="pb-4">Audience</th>
                        <th className="pb-4">Schedule</th>
                        <th className="pb-4">Status</th>
                        <th className="pb-4">Performance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {campaigns.map(campaign => (
                        <tr key={campaign.id} className="hover:bg-gray-700/50">
                          <td className="py-4">{campaign.name}</td>
                          <td className="py-4">{campaign.template}</td>
                          <td className="py-4">{campaign.group}</td>
                          <td className="py-4">
                            {new Date(campaign.schedule).toLocaleString()}
                          </td>
                          <td className="py-4">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              campaign.status === 'sent' ? 'bg-green-500/20 text-green-500' :
                              campaign.status === 'scheduled' ? 'bg-blue-500/20 text-blue-500' :
                              campaign.status === 'draft' ? 'bg-gray-500/20 text-gray-400' :
                              'bg-red-500/20 text-red-500'
                            }`}>
                              {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                            </span>
                          </td>
                          <td className="py-4">
                            {campaign.status === 'sent' ? (
                              <div className="text-sm">
                                <p>Sent: {campaign.sentCount}</p>
                                <p>Opens: {campaign.openRate}%</p>
                                <p>Clicks: {campaign.clickRate}%</p>
                              </div>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {campaigns.length === 0 && (
                    <div className="text-center py-12 bg-gray-700 rounded-lg">
                      <Mail className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                      <p className="text-gray-400">No campaigns found</p>
                      <button
                        onClick={() => setShowCampaignModal(true)}
                        className="mt-4 text-blue-400 hover:text-blue-300"
                      >
                        Create your first campaign
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Contacts Tab */}
            {activeTab === 'contacts' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Contact Groups</h2>
                  <div className="flex space-x-4">
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
                    <button
                      onClick={() => {
                        // Export contacts
                        console.log('Export contacts');
                      }}
                      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors flex items-center space-x-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>Export CSV</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {contactGroups.map(group => (
                    <div key={group.id} className="bg-gray-700 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">{group.name}</h3>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              // Edit group
                              console.log('Edit group:', group);
                            }}
                            className="p-2 hover:bg-gray-600 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              // Delete group
                              console.log('Delete group:', group);
                            }}
                            className="p-2 hover:bg-gray-600 rounded-lg transition-colors text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Contacts:</span>
                        <span className="font-medium">{group.count}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Last Updated:</span>
                        <span className="text-sm">{group.lastUpdated}</span>
                      </div>
                    </div>
                  ))}

                  <div className="bg-gray-700 rounded-lg p-6 border-2 border-dashed border-gray-600 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-600/50 transition-colors">
                    <Plus className="w-8 h-8 text-gray-400 mb-2" />
                    <p className="font-medium">Create New Group</p>
                    <p className="text-sm text-gray-400 mt-1">Segment your contacts</p>
                  </div>
                </div>
              </div>
            )}

            {/* SMTP Settings Tab */}
            {activeTab === 'settings' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">SMTP Settings</h2>
                  <button
                    onClick={() => {
                      setSmtpForm({
                        id: '',
                        name: '',
                        host: '',
                        port: '',
                        username: '',
                        password: '',
                        fromEmail: '',
                        useSsl: true
                      });
                      setShowSmtpModal(true);
                    }}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add SMTP Profile</span>
                  </button>
                </div>

                <div className="space-y-6">
                  {smtpProfiles.map(profile => (
                    <div key={profile.id} className="bg-gray-700 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">{profile.name}</h3>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditSmtp(profile)}
                            className="p-2 hover:bg-gray-600 rounded-lg transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteSmtp(profile.id)}
                            className="p-2 hover:bg-gray-600 rounded-lg transition-colors text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-400">Host:</p>
                          <p>{profile.host}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Port:</p>
                          <p>{profile.port}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Username:</p>
                          <p>{profile.username}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">From Email:</p>
                          <p>{profile.fromEmail}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">SSL/TLS:</p>
                          <p>{profile.useSsl ? 'Enabled' : 'Disabled'}</p>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-600">
                        <button
                          onClick={() => {
                            // Test SMTP connection
                            console.log('Testing SMTP connection:', profile);
                          }}
                          className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors text-sm"
                        >
                          Test Connection
                        </button>
                      </div>
                    </div>
                  ))}

                  {smtpProfiles.length === 0 && (
                    <div className="text-center py-12 bg-gray-700 rounded-lg">
                      <Settings className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                      <p className="text-gray-400">No SMTP profiles found</p>
                      <button
                        onClick={() => {
                          setSmtpForm({
                            id: '',
                            name: '',
                            host: '',
                            port: '',
                            username: '',
                            password: '',
                            fromEmail: '',
                            useSsl: true
                          });
                          setShowSmtpModal(true);
                        }}
                        className="mt-4 text-blue-400 hover:text-blue-300"
                      >
                        Add your first SMTP profile
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showTemplateModal && <TemplateModal />}
      {showSmtpModal && <SmtpModal />}
      {showCampaignModal && <CampaignModal />}
    </BusinessLayout>
  );
};

export default EmailMarketing;