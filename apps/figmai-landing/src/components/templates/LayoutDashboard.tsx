import React from 'react';

interface LayoutDashboardProps {
  title?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  sidebar?: React.ReactNode;
}

export default function LayoutDashboard({ 
  title = 'Dashboard',
  children,
  actions,
  sidebar
}: LayoutDashboardProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      {sidebar ? (
        sidebar
      ) : (
        <div className="w-64 bg-gray-900 text-white p-4">
          <div className="text-xl font-bold text-center pb-6 border-b border-gray-700">
            FigmaikR
          </div>
          <nav className="space-y-2">
            <a href="#" className="block px-3 py-2 rounded-lg bg-blue-600 text-white">
              Dashboard
            </a>
            <a href="#" className="block px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white">
              Projects
            </a>
            <a href="#" className="block px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white">
              Team
            </a>
            <a href="#" className="block px-3 py-2 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white">
              Settings
            </a>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            {actions && (
              <div className="flex items-center space-x-3">
                {actions}
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          {children || (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Widget 1</h3>
                <p className="text-gray-600 text-sm">Sample dashboard widget content</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Widget 2</h3>
                <p className="text-gray-600 text-sm">Sample dashboard widget content</p>
              </div>
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Widget 3</h3>
                <p className="text-gray-600 text-sm">Sample dashboard widget content</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
} 