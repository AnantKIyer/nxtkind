"use client";

import { useNotification } from "@/context/NotificationContext";
import { useEffect, useState } from "react";

const NotificationBanner = () => {
  const { notifications, removeNotification } = useNotification();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(notifications.length > 0);
  }, [notifications]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification, index) => (
        <div
          key={notification.id}
          className={`
            bg-white border-l-4 shadow-lg rounded-lg px-4 py-3 min-w-80 max-w-sm
            transform transition-all duration-300 ease-in-out
            ${notification.type === 'success' ? 'border-green-500' : 
              notification.type === 'error' ? 'border-red-500' : 'border-blue-500'}
            ${index === 0 ? 'translate-x-0' : 'translate-x-2'}
          `}
          style={{
            animation: 'slideIn 0.3s ease-out',
            marginTop: `${index * 8}px`
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`
                w-2 h-2 rounded-full mr-3
                ${notification.type === 'success' ? 'bg-green-500' : 
                  notification.type === 'error' ? 'bg-red-500' : 'bg-blue-500'}
              `} />
              <p className="text-sm font-medium text-gray-900">
                {notification.message}
              </p>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      ))}
      
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default NotificationBanner; 