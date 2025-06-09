import React from 'react';

interface FeedbackAlertProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message?: string;
  onClose?: () => void;
  dismissible?: boolean;
}

const alertStyles = {
  success: {
    container: 'bg-green-50 border-green-200 text-green-800',
    icon: '✅',
    closeBtn: 'text-green-500 hover:text-green-700'
  },
  error: {
    container: 'bg-red-50 border-red-200 text-red-800',
    icon: '❌',
    closeBtn: 'text-red-500 hover:text-red-700'
  },
  warning: {
    container: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    icon: '⚠️',
    closeBtn: 'text-yellow-500 hover:text-yellow-700'
  },
  info: {
    container: 'bg-blue-50 border-blue-200 text-blue-800',
    icon: 'ℹ️',
    closeBtn: 'text-blue-500 hover:text-blue-700'
  }
};

export default function FeedbackAlert({ 
  type = 'info',
  title = 'Alert Title',
  message = 'This is an alert message.',
  onClose,
  dismissible = true
}: FeedbackAlertProps) {
  const styles = alertStyles[type];

  return (
    <div className={`border rounded-lg p-4 ${styles.container}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0 text-lg mr-3">
          {styles.icon}
        </div>
        
        <div className="flex-1">
          <h4 className="font-medium">{title}</h4>
          <p className="text-sm opacity-90">{message}</p>
        </div>
        
        {dismissible && (
          <button
            onClick={onClose}
            className={`flex-shrink-0 ml-3 ${styles.closeBtn} transition-colors`}
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
} 