import React from 'react';

interface ModalConfirmProps {
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  isOpen?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  variant?: 'danger' | 'primary';
}

export default function ModalConfirm({ 
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed with this action? This action cannot be undone.',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isOpen = true,
  onConfirm,
  onCancel,
  variant = 'danger'
}: ModalConfirmProps) {
  if (!isOpen) return null;

  const confirmButtonClass = variant === 'danger' 
    ? 'bg-red-600 hover:bg-red-700 text-white'
    : 'bg-blue-600 hover:bg-blue-700 text-white';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-[400px] w-full mx-4 p-6">
        <div className="flex flex-row items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {title}
          </h3>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
          >
            ×
          </button>
        </div>
        
        <p className="text-base text-gray-600 leading-relaxed mb-6">
          {message}
        </p>
        
        <div className="flex flex-row gap-3 justify-end">
          <button
            onClick={onCancel}
            className="flex items-center justify-center px-4 py-2 border border-gray-300 hover:bg-gray-50 rounded-md text-sm font-medium text-gray-700 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${confirmButtonClass}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
} 