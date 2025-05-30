import { Category } from '../types';
import { Leaf, Tv, Shirt, Sofa, Headphones, Laptop, Watch, Smartphone, Camera, Gamepad } from 'lucide-react';
import React from 'react';

export const categories: Category[] = [
  {
    id: 'groceries',
    name: 'Groceries',
    icon: <Leaf className="w-6 h-6" />
  },
  {
    id: 'appliances',
    name: 'Appliances',
    icon: <Tv className="w-6 h-6" />
  },
  {
    id: 'fashion',
    name: 'Fashion',
    icon: <Shirt className="w-6 h-6" />
  },
  {
    id: 'furniture',
    name: 'Furniture',
    icon: <Sofa className="w-6 h-6" />
  },
  {
    id: 'audio',
    name: 'Audio',
    icon: <Headphones className="w-6 h-6" />
  },
  {
    id: 'electronics',
    name: 'Electronics',
    icon: <Laptop className="w-6 h-6" />
  },
  {
    id: 'wearables',
    name: 'Wearables',
    icon: <Watch className="w-6 h-6" />
  },
  {
    id: 'phones',
    name: 'Phones',
    icon: <Smartphone className="w-6 h-6" />
  },
  {
    id: 'cameras',
    name: 'Cameras',
    icon: <Camera className="w-6 h-6" />
  },
  {
    id: 'gaming',
    name: 'Gaming',
    icon: <Gamepad className="w-6 h-6" />
  }
];