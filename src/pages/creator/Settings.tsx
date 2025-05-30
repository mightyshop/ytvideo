import React, { useState } from 'react';
import { User, Mail, Globe, Lock, Bell, Shield, Moon, X, CheckCircle, Link, Copy } from 'lucide-react';
import FormInput from '../../components/FormInput';
import FormButton from '../../components/FormButton';

interface SettingsForm {
  name: string;
  email: string;
  website: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const Settings: React.FC = () => {
  const [form, setForm] = useState<SettingsForm>({
    name: '@username',
    email: 'user@example.com',
    website: 'https://example.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showSavedMessage, setShowSavedMessage] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const creatorUrl = `example.com/creator/${form.name}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updated settings:', form);
    setShowSavedMessage(true);
    setTimeout(() => setShowSavedMessage(false), 3000);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Password update:', {
      current: form.currentPassword,
      new: form.newPassword
    });
    setShowPasswordForm(false);
    setForm({
      ...form,
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const copyCreatorLink = () => {
    navigator.clipboard.writeText(creatorUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const PasswordModal = () => (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-lg max-w-md w-full">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Change Password</h3>
            <button 
              onClick={() => setShowPasswordForm(false)}
              className="p-2 hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handlePasswordSubmit} className="p-6 space-y-4">
          <FormInput
            label="Current Password"
            type="password"
            value={form.currentPassword}
            onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
            required
          />

          <FormInput
            label="New Password"
            type="password"
            value={form.newPassword}
            onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
            required
          />

          <FormInput
            label="Confirm New Password"
            type="password"
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            required
          />

          <FormButton
            type="submit"
            className="w-full"
            disabled={!form.currentPassword || !form.newPassword || form.newPassword !== form.confirmPassword}
          >
            Update Password
          </FormButton>
        </form>
      </div>
    </div>
  );

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-3 mb-8">
          <div className="p-3 bg-blue-500 rounded-full">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-gray-400 mt-1">Manage your account settings</p>
          </div>
        </div>

        {showSavedMessage && (
          <div className="bg-green-500/10 text-green-500 rounded-lg p-4 mb-6 flex items-center space-x-2">
            <CheckCircle className="w-5 h-5" />
            <span>Settings saved successfully!</span>
          </div>
        )}

        <div className="grid gap-8">
          {/* Profile Settings */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-6">
              <User className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-semibold">Profile Settings</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <FormInput
                label="Username"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                icon={<User className="w-5 h-5" />}
                required
              />

              <FormInput
                label="Email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                icon={<Mail className="w-5 h-5" />}
                required
              />

              <FormInput
                label="Website"
                type="url"
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                icon={<Globe className="w-5 h-5" />}
              />

              <div>
                <label className="block text-sm font-medium mb-2">Creator Profile URL</label>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-700 rounded-lg p-3 font-mono text-sm">
                    {creatorUrl}
                  </div>
                  <button
                    onClick={copyCreatorLink}
                    className="p-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    {copiedLink ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <p className="mt-2 text-sm text-gray-400">
                  Share this link with others to help you perform tasks and earn more money
                </p>
              </div>

              <FormButton type="submit">
                Save Changes
              </FormButton>
            </form>
          </div>

          {/* Security Settings */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-semibold">Security</h2>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Password</h3>
                  <p className="text-sm text-gray-400">Change your account password</p>
                </div>
                <button
                  onClick={() => setShowPasswordForm(true)}
                  className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  Change Password
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-400">Add an extra layer of security</p>
                </div>
                <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors">
                  Enable
                </button>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Bell className="w-6 h-6 text-yellow-400" />
              <h2 className="text-xl font-semibold">Notifications</h2>
            </div>

            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <h3 className="font-medium">Email Notifications</h3>
                  <p className="text-sm text-gray-400">Receive updates via email</p>
                </div>
                <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-500 rounded border-gray-600 bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0" />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <h3 className="font-medium">Push Notifications</h3>
                  <p className="text-sm text-gray-400">Receive push notifications</p>
                </div>
                <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-500 rounded border-gray-600 bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0" />
              </label>
            </div>
          </div>

          {/* Appearance Settings */}
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Moon className="w-6 h-6 text-indigo-400" />
              <h2 className="text-xl font-semibold">Appearance</h2>
            </div>

            <div className="space-y-4">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <h3 className="font-medium">Dark Mode</h3>
                  <p className="text-sm text-gray-400">Use dark theme</p>
                </div>
                <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-500 rounded border-gray-600 bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0" checked readOnly />
              </label>
            </div>
          </div>
        </div>
      </div>

      {showPasswordForm && <PasswordModal />}
    </div>
  );
};

export default Settings;