import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleOverlayClick = () => {
    setSidebarOpen(false);
  };
  
  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Mobile sidebar toggle */}
      {isMobile && (
        <button
          className={`fixed top-4 left-4 z-[60] p-2 rounded-full bg-black/50 text-white shadow-lg ${
            sidebarOpen ? 'hidden' : 'block'
          }`}
          onClick={() => setSidebarOpen(true)}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 6h16M4 12h16M4 18h16" 
            />
          </svg>
        </button>
      )}
      
      {/* Sidebar */}
      <aside 
        className={`${
          isMobile
            ? `fixed inset-y-0 left-0 z-[70] w-64 transform transition-transform duration-300 ease-in-out ${
                sidebarOpen ? 'translate-x-0' : '-translate-x-full'
              }`
            : 'w-60 flex-shrink-0 sticky top-0 h-screen overflow-y-auto'
        }`}
      >
        {isMobile && (
          <button
            className="absolute top-4 right-4 p-2 text-white z-[80]"
            onClick={() => setSidebarOpen(false)}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M6 18L18 6M6 6l12 12" 
              />
            </svg>
          </button>
        )}
        <Sidebar />
      </aside>
      
      {/* Mobile overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-[65] backdrop-blur-sm"
          onClick={handleOverlayClick}
        ></div>
      )}
      
      {/* Main content */}
      <main className="flex-1 relative overflow-y-auto">
        <div className="min-h-screen">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;