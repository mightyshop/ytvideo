import React, { useState } from 'react';
import { Mail, Upload, Send, Settings, Users, X, FileText, Plus } from 'lucide-react';

interface SMTPSettings {
  host: string;
  port: string;
  username: string;
  password: string;
  from: string;
}

interface EmailTemplate {
  name: string;
  subject: string;
  body: string;
}

interface Contact {
  email: string;
  name: string;
  group?: string;
}

const SendEmail: React.FC = () => {
  const [showSMTPModal, setShowSMTPModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showContactsModal, setShowContactsModal] = useState(false);
  
  const [smtpSettings, setSmtpSettings] = useState<SMTPSettings>({
    host: '',
    port: '',
    username: '',
    password: '',
    from: ''
  });

  const [emailForm, setEmailForm] = useState({
    to: '',
    subject: '',
    body: '',
    template: ''
  });

  const [templates, setTemplates] = useState<EmailTemplate[]>([
    {
      name: 'Welcome Email',
      subject: 'Welcome to our platform!',
      body: 'Dear {name},\n\nWelcome to our platform! We\'re excited to have you on board.'
    },
    {
      name: 'Newsletter',
      subject: 'Latest Updates',
      body: 'Hi {name},\n\nHere are our latest updates...'
    }
  ]);

  const [contacts, setContacts] = useState<Contact[]>([
    { email: 'john@example.com', name: 'John Doe', group: 'Customers' },
    { email: 'jane@example.com', name: 'Jane Smith', group: 'Partners' }
  ]);

  const [newTemplate, setNewTemplate] = useState<EmailTemplate>({
    name: '',
    subject: '',
    body: ''
  });

  const handleSMTPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('SMTP Settings:', smtpSettings);
    setShowSMTPModal(false);
  };

  const handleTemplateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTemplates([...templates, newTemplate]);
    setNewTemplate({ name: '', subject: '', body: '' });
    setShowTemplateModal(false);
  };

  const handleContactsUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Handle CSV file upload
      const reader = new FileReader();
      reader.onload = (event) => {
        const csvData = event.target?.result as string;
        // Parse CSV and update contacts
        const newContacts = csvData.split('\n').map(line => {
          const [email, name, group] = line.split(',');
          return { email: email.trim(), name: name.trim(), group: group?.trim() };
        });
        setContacts([...contacts, ...newContacts]);
      };
      reader.readAsText(file);
    }
  };

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sending email:', emailForm);
    // Implement email sending logic
  };

  const SMTPModal = () => (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-md w-full">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">SMTP Settings</h2>
            <button 
              onClick={() => setShowSMTPModal(false)}
              className="p-2 hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSMTPSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">SMTP Host</label>
            <input
              type="text"
              value={smtpSettings.host}
              onChange={(e) => setSmtpSettings({ ...smtpSettings, host: e.target.value })}
              className="w-full bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="smtp.example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Port</label>
            <input
              type="text"
              value={smtpSettings.port}
              onChange={(e) => setSmtpSettings({ ...smtpSettings, port: e.target.value })}
              className="w-full bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="587"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              value={smtpSettings.username}
              onChange={(e) => setSmtpSettings({ ...smtpSettings, username: e.target.value })}
              className="w-full bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={smtpSettings.password}
              onChange={(e) => setSmtpSettings({ ...smtpSettings, password: e.target.value })}
              className="w-full bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">From Email</label>
            <input
              type="email"
              value={smtpSettings.from}
              onChange={(e) => setSmtpSettings({ ...smtpSettings, from: e.target.value })}
              className="w-full bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="noreply@example.com"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Save Settings
          </button>
        </form>
      </div>
    </div>
  );

  const TemplateModal = () => (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-2xl w-full">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Create Email Template</h2>
            <button 
              onClick={() => setShowTemplateModal(false)}
              className="p-2 hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleTemplateSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Template Name</label>
            <input
              type="text"
              value={newTemplate.name}
              onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
              className="w-full bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter template name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Subject</label>
            <input
              type="text"
              value={newTemplate.subject}
              onChange={(e) => setNewTemplate({ ...newTemplate, subject: e.target.value })}
              className="w-full bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter email subject"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Body</label>
            <textarea
              value={newTemplate.body}
              onChange={(e) => setNewTemplate({ ...newTemplate, body: e.target.value })}
              className="w-full bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={8}
              placeholder="Enter email body"
              required
            />
            <p className="text-sm text-gray-400 mt-2">
              Use {'{name}'} to insert recipient's name
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Save Template
          </button>
        </form>
      </div>
    </div>
  );

  const ContactsModal = () => (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-4xl w-full">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Contact List</h2>
            <button 
              onClick={() => setShowContactsModal(false)}
              className="p-2 hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Upload Contacts (CSV)</label>
            <div className="flex items-center space-x-2">
              <label className="flex-1 cursor-pointer">
                <div className="bg-gray-700 rounded-lg border border-gray-600 p-8 text-center hover:bg-gray-600 transition-colors">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-400">Click to upload CSV file</p>
                  <p className="text-sm text-gray-500 mt-1">Format: email,name,group</p>
                </div>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleContactsUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-700">
                  <th className="pb-4">Email</th>
                  <th className="pb-4">Name</th>
                  <th className="pb-4">Group</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {contacts.map((contact, index) => (
                  <tr key={index}>
                    <td className="py-4">{contact.email}</td>
                    <td className="py-4">{contact.name}</td>
                    <td className="py-4">{contact.group}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Send Email</h1>
        <p className="text-gray-400">Send emails to your contacts</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <button
          onClick={() => setShowSMTPModal(true)}
          className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700/50 transition-colors text-left"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <Settings className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-lg font-semibold">SMTP Settings</h3>
          </div>
          <p className="text-gray-400">Configure your email server settings</p>
        </button>

        <button
          onClick={() => setShowTemplateModal(true)}
          className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700/50 transition-colors text-left"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <FileText className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-lg font-semibold">Email Templates</h3>
          </div>
          <p className="text-gray-400">Create and manage email templates</p>
        </button>

        <button
          onClick={() => setShowContactsModal(true)}
          className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700/50 transition-colors text-left"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <Users className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-lg font-semibold">Contact List</h3>
          </div>
          <p className="text-gray-400">Manage your email contacts</p>
        </button>
      </div>

      <div className="bg-gray-800 rounded-lg p-6">
        <form onSubmit={handleSendEmail} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Template</label>
            <select
              value={emailForm.template}
              onChange={(e) => {
                const template = templates.find(t => t.name === e.target.value);
                if (template) {
                  setEmailForm({
                    ...emailForm,
                    template: template.name,
                    subject: template.subject,
                    body: template.body
                  });
                }
              }}
              className="w-full bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a template</option>
              {templates.map((template, index) => (
                <option key={index} value={template.name}>{template.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">To</label>
            <select
              value={emailForm.to}
              onChange={(e) => setEmailForm({ ...emailForm, to: e.target.value })}
              className="w-full bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select recipient</option>
              {contacts.map((contact, index) => (
                <option key={index} value={contact.email}>{contact.name} ({contact.email})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Subject</label>
            <input
              type="text"
              value={emailForm.subject}
              onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })}
              className="w-full bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter email subject"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Message</label>
            <textarea
              value={emailForm.body}
              onChange={(e) => setEmailForm({ ...emailForm, body: e.target.value })}
              className="w-full bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={8}
              placeholder="Enter your message"
              required
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setEmailForm({ to: '', subject: '', body: '', template: '' })}
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              Clear
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center space-x-2"
            >
              <Send className="w-5 h-5" />
              <span>Send Email</span>
            </button>
          </div>
        </form>
      </div>

      {showSMTPModal && <SMTPModal />}
      {showTemplateModal && <TemplateModal />}
      {showContactsModal && <ContactsModal />}
    </div>
  );
};

export default SendEmail;