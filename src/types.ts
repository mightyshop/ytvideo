import React from 'react';

export interface Video {
  id: string;
  videoUrl: string;
  username: string;
  description: string;
  likes: number;
  comments: number;
  shares: number;
  avatarUrl: string;
}

export interface Campaign {
  id: string;
  type: 'watch_video' | 'social_media' | 'h5_game' | 'website' | 'app_install' | 'social_engagement' | 'ugc_video' | 'freestyle_music' | 'review';
  name: string;
  budget: number;
  targetCountries: string[];
  status: 'draft' | 'active' | 'paused' | 'completed';
  mediaUrl?: string;
  thumbnailUrl?: string;
  requirements?: string[];
  reward?: number;
}

export interface Wallet {
  id: string;
  balance: number;
  currency: string;
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'campaign_spend';
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  images: string[];
  description: string;
  rating: number;
  reviews: number;
  features: string[];
  category: string;
  type: 'digital' | 'physical';
  seller: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
  };
  // Digital product specific fields
  downloadUrl?: string;
  fileSize?: string;
  fileFormat?: string;
  // Physical product specific fields
  weight?: string;
  dimensions?: string;
  shippingTime?: string;
  stock?: number;
}

export interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
}