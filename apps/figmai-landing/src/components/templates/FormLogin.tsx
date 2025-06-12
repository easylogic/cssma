import React, { useState } from 'react';

interface FormLoginProps {
  title?: string;
  onSubmit?: (email: string, password: string) => void;
}

export default function FormLogin({ 
  title = 'Welcome Back',
  onSubmit
}: FormLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(email, password);
  };

  return (
    <div className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm p-8 gap-6 w-[360px]">
      <h2 className="text-2xl font-bold text-gray-900 text-center">
        {title}
      </h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="px-3 py-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
          />
        </div>
        
        <button
          type="submit"
          className="flex items-center justify-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors"
        >
          Sign In
        </button>
      </form>
    </div>
  );
} 