import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    title: 'Premium Wireless Headphones',
    price: 299.99,
    image: 'https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3587477/pexels-photo-3587477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3587473/pexels-photo-3587473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3587476/pexels-photo-3587476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    description: 'High-quality wireless headphones with noise cancellation and premium sound quality.',
    rating: 4.8,
    reviews: 245,
    category: 'audio',
    type: 'physical',
    features: [
      'Active Noise Cancellation',
      '40-hour battery life',
      'Premium sound quality',
      'Comfortable fit',
      'Voice assistant support'
    ],
    weight: '250g',
    dimensions: '18 x 15 x 8 cm',
    shippingTime: '3-5 business days',
    stock: 50,
    seller: {
      id: 's1',
      name: 'AudioTech Pro',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      rating: 4.9
    }
  },
  {
    id: 2,
    title: 'Smart Fitness Watch',
    price: 199.99,
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/437038/pexels-photo-437038.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/437036/pexels-photo-437036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/437035/pexels-photo-437035.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    description: 'Track your fitness goals with this advanced smartwatch.',
    rating: 4.6,
    reviews: 189,
    category: 'wearables',
    type: 'physical',
    features: [
      'Heart rate monitoring',
      'GPS tracking',
      'Water resistant',
      'Sleep tracking',
      'Multiple sport modes'
    ],
    weight: '45g',
    dimensions: '4.2 x 3.6 x 1.2 cm',
    shippingTime: '2-4 business days',
    stock: 75,
    seller: {
      id: 's2',
      name: 'FitGear',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      rating: 4.7
    }
  },
  {
    id: 3,
    title: 'Productivity App Bundle',
    price: 49.99,
    image: 'https://images.pexels.com/photos/5499254/pexels-photo-5499254.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/5499254/pexels-photo-5499254.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/5499253/pexels-photo-5499253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/5499252/pexels-photo-5499252.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/5499251/pexels-photo-5499251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    description: 'Suite of productivity apps to boost your workflow.',
    rating: 4.5,
    reviews: 312,
    category: 'software',
    type: 'digital',
    features: [
      'Task management',
      'Calendar integration',
      'Cloud sync',
      'Cross-platform',
      'Lifetime updates'
    ],
    downloadUrl: 'https://example.com/download',
    fileSize: '250MB',
    fileFormat: 'ZIP',
    seller: {
      id: 's3',
      name: 'PowerPlus',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      rating: 4.6
    }
  },
  {
    id: 4,
    title: 'Professional DSLR Camera',
    price: 1299.99,
    image: 'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1203803/pexels-photo-1203803.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/243757/pexels-photo-243757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1203819/pexels-photo-1203819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    description: 'Professional-grade DSLR camera for stunning photography.',
    rating: 4.9,
    reviews: 156,
    category: 'cameras',
    type: 'physical',
    features: [
      '24.2MP Full-Frame Sensor',
      '4K Video Recording',
      'Advanced Autofocus',
      'Weather-Sealed Body',
      'Dual Memory Card Slots'
    ],
    weight: '765g',
    dimensions: '14.6 x 11.1 x 7.5 cm',
    shippingTime: '3-5 business days',
    stock: 20,
    seller: {
      id: 's4',
      name: 'Pro Camera Shop',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      rating: 4.8
    }
  },
  {
    id: 5,
    title: 'Gaming Laptop',
    price: 1999.99,
    image: 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1229862/pexels-photo-1229862.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1038916/pexels-photo-1038916.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    description: 'High-performance gaming laptop with RTX graphics.',
    rating: 4.7,
    reviews: 203,
    category: 'electronics',
    type: 'physical',
    features: [
      'NVIDIA RTX 4070',
      'Intel Core i9 Processor',
      '32GB RAM',
      '1TB NVMe SSD',
      '165Hz QHD Display'
    ],
    weight: '2.3kg',
    dimensions: '35.5 x 26.5 x 2.3 cm',
    shippingTime: '3-5 business days',
    stock: 15,
    seller: {
      id: 's5',
      name: 'Tech Haven',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      rating: 4.8
    }
  },
  {
    id: 6,
    title: 'Smart Home Security System',
    price: 399.99,
    image: 'https://images.pexels.com/photos/3841338/pexels-photo-3841338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/3841338/pexels-photo-3841338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3841339/pexels-photo-3841339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3841340/pexels-photo-3841340.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/3841341/pexels-photo-3841341.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    description: 'Complete smart home security system with cameras and sensors.',
    rating: 4.6,
    reviews: 178,
    category: 'electronics',
    type: 'physical',
    features: [
      'HD Security Cameras',
      'Motion Sensors',
      'Smart Door Locks',
      'Mobile App Control',
      '24/7 Monitoring'
    ],
    weight: '4.5kg',
    dimensions: '30 x 25 x 15 cm',
    shippingTime: '4-6 business days',
    stock: 30,
    seller: {
      id: 's6',
      name: 'Smart Home Solutions',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      rating: 4.7
    }
  },
  {
    id: 7,
    title: 'Professional Video Editing Software',
    price: 299.99,
    image: 'https://images.pexels.com/photos/1474158/pexels-photo-1474158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/1474158/pexels-photo-1474158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1474157/pexels-photo-1474157.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1474156/pexels-photo-1474156.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/1474155/pexels-photo-1474155.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    description: 'Professional video editing software with advanced features.',
    rating: 4.8,
    reviews: 245,
    category: 'software',
    type: 'digital',
    features: [
      '8K Video Support',
      'AI-Powered Tools',
      'Advanced Color Grading',
      'Motion Graphics',
      'Audio Editing'
    ],
    downloadUrl: 'https://example.com/video-editor',
    fileSize: '4.2GB',
    fileFormat: 'EXE/DMG',
    seller: {
      id: 's7',
      name: 'Creative Software',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      rating: 4.9
    }
  },
  {
    id: 8,
    title: 'Mechanical Gaming Keyboard',
    price: 149.99,
    image: 'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    images: [
      'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2115255/pexels-photo-2115255.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      'https://images.pexels.com/photos/2115254/pexels-photo-2115254.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    ],
    description: 'RGB mechanical gaming keyboard with custom switches.',
    rating: 4.7,
    reviews: 167,
    category: 'gaming',
    type: 'physical',
    features: [
      'Mechanical Switches',
      'RGB Backlighting',
      'N-Key Rollover',
      'Macro Keys',
      'Detachable Wrist Rest'
    ],
    weight: '1.2kg',
    dimensions: '44 x 14 x 4 cm',
    shippingTime: '2-4 business days',
    stock: 45,
    seller: {
      id: 's8',
      name: 'Gaming Gear Pro',
      avatar: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=60&h=60&dpr=2',
      rating: 4.8
    }
  }
];