import React from 'react';
import { FileText, Globe, Smartphone, Mail, Send, Code, FileCode, Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Tools: React.FC = () => {
  const navigate = useNavigate();

  const tools = [
    {
      id: 'api',
      name: 'API',
      description: 'Access our API documentation and integration tools',
      icon: Code,
      color: 'bg-blue-500',
      url: '/creator/tools/api',
      buttonText: 'Use API'
    },
    {
      id: 'email',
      name: 'Email',
      description: 'Send emails to your subscribers and customers',
      icon: Mail,
      color: 'bg-red-500',
      url: '/creator/tools/sendemail',
      buttonText: 'Use Email'
    },
    {
      id: 'telegram',
      name: 'Telegram',
      description: 'Connect and automate your Telegram bot messaging',
      icon: Send,
      color: 'bg-blue-400',
      url: '/creator/tools/botsend',
      buttonText: 'Use Telegram'
    },
    {
      id: 'domains',
      name: 'Domains',
      description: 'Connect custom domains and choose website templates',
      icon: Globe,
      color: 'bg-purple-500',
      url: '/creator/tools/domains',
      buttonText: 'Use Domains'
    }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Creator Tools</h1>
        <p className="text-gray-400">Professional tools to enhance your content creation</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map(tool => {
          const Icon = tool.icon;
          return (
            <div
              key={tool.id}
              className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className={`p-3 ${tool.color} rounded-lg group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold">{tool.name}</h3>
              </div>
              <p className="text-gray-400 mb-6">{tool.description}</p>
              <button 
                onClick={() => navigate(tool.url)}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
              >
                <span>{tool.buttonText}</span>
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg p-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">Need Custom Tools?</h2>
          <p className="text-white/80 mb-6">
            We can build custom tools tailored to your specific content creation needs.
            Get in touch with our development team to discuss your requirements.
          </p>
          <button className="bg-white text-blue-500 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium">
            Contact Development Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tools;