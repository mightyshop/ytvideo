import React, { useState } from 'react';
import { Store, Plus, Image as ImageIcon, Globe, X, FileText, Package } from 'lucide-react';
import { categories } from '../data/categories';
import { countries } from '../data/countries';
import FormInput from '../components/FormInput';
import FormTextArea from '../components/FormTextArea';
import FormSelect from '../components/FormSelect';
import FormButton from '../components/FormButton';
import BusinessLayout from '../components/BusinessLayout';
import RegionSelect from '../components/RegionSelect';

interface ProductForm {
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  category: string;
  features: string[];
  targetCountries: string[];
  type: 'digital' | 'physical';
  // Digital product specific fields
  downloadUrl?: string;
  fileSize?: string;
  fileFormat?: string;
  // Physical product specific fields
  weight?: string;
  dimensions?: string;
  shippingTime?: string;
  stock?: string;
}

const Seller: React.FC = () => {
  const [form, setForm] = useState<ProductForm>({
    title: '',
    description: '',
    price: '',
    imageUrl: '',
    category: '',
    features: [''],
    targetCountries: [],
    type: 'physical'
  });

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...form.features];
    newFeatures[index] = value;
    setForm({ ...form, features: newFeatures });
  };

  const addFeature = () => {
    setForm({ ...form, features: [...form.features, ''] });
  };

  const removeFeature = (index: number) => {
    const newFeatures = form.features.filter((_, i) => i !== index);
    setForm({ ...form, features: newFeatures });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!form.title || !form.description || !form.price || !form.imageUrl || !form.category) {
      alert('Please fill in all required fields');
      return;
    }

    // Remove empty features
    const cleanedFeatures = form.features.filter(feature => feature.trim() !== '');
    
    const productData = {
      ...form,
      price: parseFloat(form.price),
      features: cleanedFeatures
    };

    console.log('Product data:', productData);
    
    // Reset form
    setForm({
      title: '',
      description: '',
      price: '',
      imageUrl: '',
      category: '',
      features: [''],
      targetCountries: [],
      type: 'physical'
    });
  };

  return (
    <BusinessLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Seller Dashboard</h1>

        <div className="bg-gray-800 rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Type Selection */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                type="button"
                onClick={() => setForm({ ...form, type: 'digital' })}
                className={`p-6 rounded-lg border-2 transition-colors flex flex-col items-center space-y-2 ${
                  form.type === 'digital'
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <FileText className="w-8 h-8" />
                <span className="font-medium">Digital Product</span>
                <span className="text-sm text-gray-400">Software, eBooks, media files</span>
              </button>
              
              <button
                type="button"
                onClick={() => setForm({ ...form, type: 'physical' })}
                className={`p-6 rounded-lg border-2 transition-colors flex flex-col items-center space-y-2 ${
                  form.type === 'physical'
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-gray-700 hover:border-gray-600'
                }`}
              >
                <Package className="w-8 h-8" />
                <span className="font-medium">Physical Product</span>
                <span className="text-sm text-gray-400">Tangible items that require shipping</span>
              </button>
            </div>

            <FormInput
              label="Product Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Enter product title"
              required
            />

            <FormTextArea
              label="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Enter product description"
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormInput
                label="Price (USD)"
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="Enter price"
                min="0"
                step="0.01"
                required
              />

              <FormSelect
                label="Category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                options={categories.map(cat => ({ value: cat.id, label: cat.name }))}
                required
              />
            </div>

            {/* Digital Product Fields */}
            {form.type === 'digital' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Download URL"
                  type="url"
                  value={form.downloadUrl || ''}
                  onChange={(e) => setForm({ ...form, downloadUrl: e.target.value })}
                  placeholder="Enter download URL"
                  required
                />
                
                <FormInput
                  label="File Size"
                  value={form.fileSize || ''}
                  onChange={(e) => setForm({ ...form, fileSize: e.target.value })}
                  placeholder="e.g., 500MB"
                  required
                />

                <FormInput
                  label="File Format"
                  value={form.fileFormat || ''}
                  onChange={(e) => setForm({ ...form, fileFormat: e.target.value })}
                  placeholder="e.g., PDF, MP4, ZIP"
                  required
                />
              </div>
            )}

            {/* Physical Product Fields */}
            {form.type === 'physical' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormInput
                  label="Weight"
                  value={form.weight || ''}
                  onChange={(e) => setForm({ ...form, weight: e.target.value })}
                  placeholder="e.g., 1.5 kg"
                  required
                />
                
                <FormInput
                  label="Dimensions"
                  value={form.dimensions || ''}
                  onChange={(e) => setForm({ ...form, dimensions: e.target.value })}
                  placeholder="e.g., 20x30x10 cm"
                  required
                />

                <FormInput
                  label="Shipping Time"
                  value={form.shippingTime || ''}
                  onChange={(e) => setForm({ ...form, shippingTime: e.target.value })}
                  placeholder="e.g., 3-5 business days"
                  required
                />

                <FormInput
                  label="Stock Quantity"
                  type="number"
                  value={form.stock || ''}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                  placeholder="Enter available quantity"
                  min="0"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Image URL</label>
              <div className="flex items-center space-x-2">
                <ImageIcon className="w-5 h-5 text-gray-400" />
                <input
                  type="url"
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  className="flex-1 bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter image URL"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Features</label>
              <div className="space-y-3">
                {form.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      className="flex-1 bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter feature"
                    />
                    {form.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFeature(index)}
                        className="p-2 text-red-400 hover:text-red-300 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addFeature}
                  className="flex items-center space-x-2 text-blue-400 hover:text-blue-300"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Feature</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Target Countries</label>
              <div className="max-h-96 overflow-y-auto">
                <RegionSelect
                  selectedCountries={form.targetCountries}
                  onChange={(countries) => setForm({ ...form, targetCountries: countries })}
                />
              </div>
            </div>

            <FormButton
              type="submit"
              icon={<Plus className="w-5 h-5" />}
              className="w-full"
            >
              Add Product
            </FormButton>
          </form>
        </div>
      </div>
    </BusinessLayout>
  );
};

export default Seller;