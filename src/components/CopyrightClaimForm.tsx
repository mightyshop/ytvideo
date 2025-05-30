import React, { useState } from 'react';
import { FileText, X, AlertTriangle } from 'lucide-react';
import FormInput from './FormInput';
import FormTextArea from './FormTextArea';

interface CopyrightClaimFormProps {
  movieTitle?: string;
  movieUrl?: string;
  onClose: () => void;
}

const CopyrightClaimForm: React.FC<CopyrightClaimFormProps> = ({ movieTitle = '', movieUrl = '', onClose }) => {
  const [form, setForm] = useState({
    movieTitle: movieTitle,
    contentUrl: movieUrl,
    releaseDate: '',
    fullName: '',
    companyName: '',
    email: '',
    phone: '',
    username: '',
    registrationNumber: '',
    proofUrl: '',
    claimType: '',
    otherClaimType: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Copyright claim submitted:', form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-gray-800 rounded-lg max-w-2xl w-full my-8">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="w-6 h-6 text-red-500" />
              <h2 className="text-xl font-semibold">Copyright Claim Form</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-700 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="bg-yellow-500/10 text-yellow-500 rounded-lg p-4 flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <p className="text-sm">
              False claims may result in account termination and legal consequences. 
              Investigation process typically takes 5-7 business days.
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold">1. Content Information</h3>
            <FormInput
              label="Movie Title*"
              value={form.movieTitle}
              onChange={(e) => setForm({ ...form, movieTitle: e.target.value })}
              required
            />

            <FormInput
              label="URL of the infringing content*"
              value={form.contentUrl}
              onChange={(e) => setForm({ ...form, contentUrl: e.target.value })}
              required
            />

            <FormInput
              label="Original release date"
              type="date"
              value={form.releaseDate}
              onChange={(e) => setForm({ ...form, releaseDate: e.target.value })}
            />
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold">2. Claimant Details</h3>
            <FormInput
              label="Full Name*"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              required
            />

            <FormInput
              label="Company Name (if applicable)"
              value={form.companyName}
              onChange={(e) => setForm({ ...form, companyName: e.target.value })}
            />

            <FormInput
              label="Email Address*"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />

            <FormInput
              label="Phone Number*"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />

            <FormInput
              label="Creator Account Username (if existing)"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold">3. Proof of Ownership</h3>
            <FormInput
              label="Copyright Registration Number"
              value={form.registrationNumber}
              onChange={(e) => setForm({ ...form, registrationNumber: e.target.value })}
            />

            <FormInput
              label="Proof of ownership URL* (PDF, JPG, PNG)"
              type="url"
              value={form.proofUrl}
              onChange={(e) => setForm({ ...form, proofUrl: e.target.value })}
              required
            />
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold">4. Type of Claim*</h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="claimType"
                  value="copyright"
                  checked={form.claimType === 'copyright'}
                  onChange={(e) => setForm({ ...form, claimType: e.target.value })}
                  className="form-radio text-blue-500 focus:ring-blue-500"
                  required
                />
                <span>Copyright Infringement</span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="claimType"
                  value="unauthorized"
                  checked={form.claimType === 'unauthorized'}
                  onChange={(e) => setForm({ ...form, claimType: e.target.value })}
                  className="form-radio text-blue-500 focus:ring-blue-500"
                />
                <span>Unauthorized Distribution</span>
              </label>

              <label className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="claimType"
                  value="other"
                  checked={form.claimType === 'other'}
                  onChange={(e) => setForm({ ...form, claimType: e.target.value })}
                  className="form-radio text-blue-500 focus:ring-blue-500"
                />
                <span>Other</span>
              </label>

              {form.claimType === 'other' && (
                <FormInput
                  value={form.otherClaimType}
                  onChange={(e) => setForm({ ...form, otherClaimType: e.target.value })}
                  placeholder="Please specify"
                  required
                />
              )}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold">5. Additional Information</h3>
            <FormTextArea
              label="Detailed description of the claim*"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            />
          </div>

          <div className="bg-gray-700 rounded-lg p-4 space-y-2 text-sm">
            <p>Upon verification of your claim:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              <li>The content will be transferred to your creator account</li>
              <li>You will be eligible to receive earnings generated from the date of your claim submission</li>
            </ul>
          </div>

          <div className="flex items-center space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
            >
              Submit Claim
            </button>
          </div>

          <p className="text-sm text-gray-400 text-center">
            By submitting this form, you declare that all information provided is true and accurate to the best of your knowledge.
          </p>
        </form>
      </div>
    </div>
  );
};

export default CopyrightClaimForm;