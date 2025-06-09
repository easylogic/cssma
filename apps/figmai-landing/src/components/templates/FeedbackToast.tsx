import React, { useEffect, useState } from 'react';

interface FeedbackToastProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  message?: string;
  duration?: number;
  onClose?: () => void;
  show?: boolean;
}

const toastStyles = {
  success: {
    container: 'bg-green-600 text-white',
    icon: '✅'
  },
  error: {
    container: 'bg-red-600 text-white',
    icon: '❌'
  },
  warning: {
    container: 'bg-yellow-600 text-white',
    icon: '⚠️'
  },
  info: {
    container: 'bg-blue-600 text-white',
    icon: 'ℹ️'
  }
};

export default function FeedbackToast({ 
  type = 'info',
  message = 'Toast notification message',
  duration = 4000,
  onClose,
  show = true
}: FeedbackToastProps) {
  const [visible, setVisible] = useState(show);
  const [progressWidth, setProgressWidth] = useState(100);
  const styles = toastStyles[type];

  useEffect(() => {
    if (show && duration > 0) {
      // 프로그레스 바 애니메이션
      const progressInterval = setInterval(() => {
        setProgressWidth((prev) => {
          const newWidth = prev - (100 / (duration / 100));
          return newWidth <= 0 ? 0 : newWidth;
        });
      }, 100);

      // 자동 닫기 타이머
      const timer = setTimeout(() => {
        setVisible(false);
        onClose?.();
      }, duration);

      return () => {
        clearTimeout(timer);
        clearInterval(progressInterval);
      };
    }
  }, [show, duration, onClose]);

  useEffect(() => {
    setProgressWidth(100);
  }, [show]);

  if (!visible) return null;

  return (
    <div className={`fixed top-4 right-4 max-w-sm rounded-lg shadow-lg p-4 ${styles.container} transform transition-all duration-300 z-50`}>
      <div className="flex items-center">
        <div className="flex-shrink-0 text-lg mr-3">
          {styles.icon}
        </div>
        
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        
        <button
          onClick={() => {
            setVisible(false);
            onClose?.();
          }}
          className="flex-shrink-0 ml-3 text-white hover:text-gray-200 transition-colors"
        >
          ✕
        </button>
      </div>
      
      {duration > 0 && (
        <div className="mt-2 w-full bg-white bg-opacity-30 rounded-full h-1">
          <div 
            className="bg-white h-1 rounded-full transition-all duration-100 ease-linear"
            style={{ width: `${progressWidth}%` }}
          />
        </div>
      )}
    </div>
  );
} 