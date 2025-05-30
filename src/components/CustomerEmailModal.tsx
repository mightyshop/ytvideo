import React, { useState } from 'react';
import { X, Send, CheckCircle } from 'lucide-react';
import FormInput from './FormInput';
import RichTextEditor from './RichTextEditor';

interface CustomerEmailModalProps {
  customerName: string;
  customerEmail: string;
  onClose: () => void;
  onSend: (data: { to: string; subject: string; content: string }) => void;
}

const CustomerEmailModal: React.FC<CustomerEmailModalProps> = ({
  customerName,
  customerEmail,
  onClose,
  onSend
}) => {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSend({ to: customerEmail, subject, content });
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-gray-800 rounded-lg max-w-2xl w-full">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">Email to {customerName}</h3>
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
              <p className="text-xl font-semibold">Email Sent Successfully!</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <FormInput
              label="To"
              value={customerEmail}
              onChange={() => {}}
              disabled
            />

            <FormInput
              label="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter email subject"
              required
            />

            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <RichTextEditor
                value={content}
                onChange={setContent}
                placeholder="Write your message..."
                minHeight="250px"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors flex items-center space-x-2"
                disabled={!subject || !content}
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

export default CustomerEmailModal;