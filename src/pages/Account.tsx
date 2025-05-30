import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, CreditCard, Lock, LogOut, Edit, Camera, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  avatar: string;
}

const Account: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345',
      country: 'United States'
    },
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);

  const handleSaveProfile = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logging out');
    navigate('/shop');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pb-20 md:pb-0">
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => navigate('/shop')}
              className="md:hidden p-2 hover:bg-gray-800 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl md:text-3xl font-bold">My Account</h1>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
            >
              <Edit className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          )}
        </div>

        <div className="bg-gray-800 rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="relative h-32 bg-gradient-to-r from-blue-600 to-purple-600">
            <div className="absolute -bottom-16 left-6 md:left-8">
              <div className="relative">
                <img 
                  src={profile.avatar} 
                  alt={profile.name} 
                  className="w-32 h-32 rounded-full border-4 border-gray-800 object-cover"
                />
                {isEditing && (
                  <button className="absolute bottom-0 right-0 p-2 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors">
                    <Camera className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="pt-20 px-6 pb-6 md:p-8">
            {isEditing ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={editedProfile.name}
                      onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                      className="flex-1 bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={editedProfile.email}
                      onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
                      className="flex-1 bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <div className="flex items-center space-x-2">
                    <Phone className="w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={editedProfile.phone}
                      onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
                      className="flex-1 bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Address</label>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={editedProfile.address.street}
                        onChange={(e) => setEditedProfile({ 
                          ...editedProfile, 
                          address: { ...editedProfile.address, street: e.target.value } 
                        })}
                        placeholder="Street Address"
                        className="flex-1 bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={editedProfile.address.city}
                        onChange={(e) => setEditedProfile({ 
                          ...editedProfile, 
                          address: { ...editedProfile.address, city: e.target.value } 
                        })}
                        placeholder="City"
                        className="bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        value={editedProfile.address.state}
                        onChange={(e) => setEditedProfile({ 
                          ...editedProfile, 
                          address: { ...editedProfile.address, state: e.target.value } 
                        })}
                        placeholder="State/Province"
                        className="bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={editedProfile.address.zipCode}
                        onChange={(e) => setEditedProfile({ 
                          ...editedProfile, 
                          address: { ...editedProfile.address, zipCode: e.target.value } 
                        })}
                        placeholder="ZIP/Postal Code"
                        className="bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <input
                        type="text"
                        value={editedProfile.address.country}
                        onChange={(e) => setEditedProfile({ 
                          ...editedProfile, 
                          address: { ...editedProfile.address, country: e.target.value } 
                        })}
                        placeholder="Country"
                        className="bg-gray-700 rounded-lg border border-gray-600 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">{profile.name}</h2>
                  <p className="text-gray-400">{profile.email}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <Phone className="w-5 h-5 text-blue-500" />
                      </div>
                      <div>
                        <h3 className="text-sm text-gray-400">Phone Number</h3>
                        <p>{profile.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <MapPin className="w-5 h-5 text-green-500" />
                      </div>
                      <div>
                        <h3 className="text-sm text-gray-400">Shipping Address</h3>
                        <p>{profile.address.street}</p>
                        <p>{profile.address.city}, {profile.address.state} {profile.address.zipCode}</p>
                        <p>{profile.address.country}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <button
                    onClick={() => navigate('/shop/orders')}
                    className="bg-gray-700 hover:bg-gray-600 rounded-lg p-4 text-left transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-500/20 rounded-lg">
                        <CreditCard className="w-5 h-5 text-purple-500" />
                      </div>
                      <div>
                        <h3 className="font-medium">Payment Methods</h3>
                        <p className="text-sm text-gray-400">Manage your payment options</p>
                      </div>
                    </div>
                  </button>

                  <button
                    className="bg-gray-700 hover:bg-gray-600 rounded-lg p-4 text-left transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-yellow-500/20 rounded-lg">
                        <Lock className="w-5 h-5 text-yellow-500" />
                      </div>
                      <div>
                        <h3 className="font-medium">Security</h3>
                        <p className="text-sm text-gray-400">Update password and security settings</p>
                      </div>
                    </div>
                  </button>
                </div>

                <button
                  onClick={handleLogout}
                  className="w-full mt-6 px-4 py-3 bg-red-500 hover:bg-red-600 rounded-lg transition-colors flex items-center justify-center space-x-2"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Log Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
};

export default Account;