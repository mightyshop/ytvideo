import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Globe, Activity, Headphones, 
  Heart, User, Home, Gamepad, Tv, Grid,
  Megaphone, Wallet, BarChart3, Star, Video,
  Lightbulb, Trophy, ShoppingBag, Store, Share2,
  DollarSign, Film, ShoppingCart
} from 'lucide-react';

type SidebarItemProps = {
  icon: string;
  label: string;
  active?: boolean;
  count?: number;
};

const iconMap: Record<string, React.ReactNode> = {
  'home': <Home className="w-5 h-5" />,
  'users': <Users className="w-5 h-5" />,
  'heart': <Heart className="w-5 h-5" />,
  'globe': <Globe className="w-5 h-5" />,
  'apps': <Grid className="w-5 h-5" />,
  'headphones': <Headphones className="w-5 h-5" />,
  'life': <Heart className="w-5 h-5" />,
  'profile': <User className="w-5 h-5" />,
  'gamepad': <Gamepad className="w-5 h-5" />,
  'live': <Tv className="w-5 h-5" />,
  'megaphone': <Megaphone className="w-5 h-5" />,
  'wallet': <Wallet className="w-5 h-5" />,
  'reports': <BarChart3 className="w-5 h-5" />,
  'creator': <Star className="w-5 h-5" />,
  'creating': <Video className="w-5 h-5" />,
  'suggestions': <Lightbulb className="w-5 h-5" />,
  'leaderboard': <Trophy className="w-5 h-5" />,
  'shop': <ShoppingBag className="w-5 h-5" />,
  'seller': <Store className="w-5 h-5" />,
  'affiliate': <Share2 className="w-5 h-5" />,
  'dollar': <DollarSign className="w-5 h-5" />,
  'movie': <Film className="w-5 h-5" />,
  'cart': <ShoppingCart className="w-5 h-5" />,
  'bag': <ShoppingBag className="w-5 h-5" />,
  'user': <User className="w-5 h-5" />
};

const getRoutePath = (label: string): string => {
  switch (label.toLowerCase()) {
    case 'following':
      return '/following';
    case 'social':
      return '/social';
    case 'h5 games':
      return '/games';
    case 'website':
      return '/website';
    case 'apps':
      return '/apps';
    case 'audio':
      return '/audio';
    case 'live':
      return '/live';
    case 'movie':
      return '/movie';
    case 'profile':
      return '/profile';
    case 'advertise':
      return '/advertise';
    case 'reports':
      return '/reports';
    case 'creator':
      return '/creator';
    case 'creating':
      return '/creating';
    case 'suggestions':
      return '/suggestions';
    case 'leaderboard':
      return '/leaderboard';
    case 'shop':
      return '/shop';
    case 'seller':
      return '/seller';
    case 'affiliate':
      return '/affiliate';
    case 'rates':
      return '/rates';
    case 'cart':
      return '/shop/cart';
    case 'orders':
      return '/shop/orders';
    case 'account':
      return '/account';
    default:
      return '/';
  }
};

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon, 
  label, 
  active = false,
  count
}) => {
  const navigate = useNavigate();
  const path = getRoutePath(label);

  const handleClick = () => {
    navigate(path);
  };

  return (
    <div 
      className={`flex items-center p-3 hover:bg-gray-800/40 rounded-lg cursor-pointer transition-colors group ${
        active ? 'text-white font-medium bg-gray-800/40' : 'text-gray-400'
      }`}
      onClick={handleClick}
    >
      <div className="relative flex-shrink-0">
        {iconMap[icon.toLowerCase()]}
        
        {count && count > 0 && (
          <div className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 bg-red-500 text-white text-xs rounded-full">
            {count > 9 ? '9+' : count}
          </div>
        )}
      </div>
      
      <span className="ml-3 text-sm whitespace-nowrap">{label}</span>
    </div>
  );
};

export default SidebarItem;