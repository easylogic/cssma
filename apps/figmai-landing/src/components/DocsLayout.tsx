"use client";

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Search, Menu, ChevronRight, BookOpen, Code, Lightbulb, Rocket, Settings, FileText } from 'lucide-react';
import Header from './Header';

interface DocsLayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  title: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: NavItem[];
}

const navigation: NavItem[] = [
  {
    title: 'Getting Started',
    href: '/docs',
    icon: Rocket,
    children: [
      { title: 'Introduction', href: '/docs' },
      { title: 'Quick Start', href: '/docs/quickstart' },
      { title: 'Installation', href: '/docs/installation' },
      { title: 'Configuration', href: '/docs/configuration' },
    ]
  },
  {
    title: 'API Reference',
    href: '/docs/api',
    icon: Code,
    children: [
      { title: 'Core Functions', href: '/docs/api' },
      { title: 'convertToFigma', href: '/docs/api/convert-to-figma' },
      { title: 'generateReact', href: '/docs/api/generate-react' },
      { title: 'generateVue', href: '/docs/api/generate-vue' },
      { title: 'generateAngular', href: '/docs/api/generate-angular' },
      { title: 'generateCSS', href: '/docs/api/generate-css' },
    ]
  },
  {
    title: 'Examples',
    href: '/docs/examples',
    icon: Lightbulb,
    children: [
      { title: 'Basic Usage', href: '/docs/examples' },
      { title: 'React Components', href: '/docs/examples/react' },
      { title: 'Vue Components', href: '/docs/examples/vue' },
      { title: 'Angular Components', href: '/docs/examples/angular' },
      { title: 'Complex Layouts', href: '/docs/examples/layouts' },
    ]
  },
  {
    title: 'Guides',
    href: '/docs/guides',
    icon: BookOpen,
    children: [
      { title: 'Best Practices', href: '/docs/guides/best-practices' },
      { title: 'Performance Tips', href: '/docs/guides/performance' },
      { title: 'Troubleshooting', href: '/docs/guides/troubleshooting' },
      { title: 'Migration Guide', href: '/docs/guides/migration' },
    ]
  },
  {
    title: 'Advanced',
    href: '/docs/advanced',
    icon: Settings,
    children: [
      { title: 'Custom Plugins', href: '/docs/advanced/plugins' },
      { title: 'Theming System', href: '/docs/advanced/theming' },
      { title: 'Build Integration', href: '/docs/advanced/build' },
    ]
  }
];

export default function DocsLayout({ children }: DocsLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/docs') {
      return pathname === '/docs';
    }
    return pathname.startsWith(href);
  };

  const isParentActive = (item: NavItem) => {
    if (isActive(item.href)) return true;
    return item.children?.some(child => isActive(child.href)) || false;
  };

  // Filter navigation based on search query
  const filteredNavigation = searchQuery 
    ? navigation.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.children?.some(child => 
          child.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      )
    : navigation;

  return (
    <>
      <Header />
      <div className="flex min-h-screen pt-16 bg-gray-50">
        {/* Mobile sidebar backdrop */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`
          fixed inset-y-0 left-0 z-50 w-80 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <div className="flex flex-col h-full pt-16">
            {/* Search */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search docs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              {searchQuery && (
                <div className="mt-2 text-xs text-gray-500">
                  {filteredNavigation.length} section(s) found
                </div>
              )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-4">
              <div className="space-y-2">
                {filteredNavigation.map((item) => (
                  <div key={item.href}>
                    <a
                      href={item.href}
                      className={`
                        flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                        ${isParentActive(item) 
                          ? 'bg-purple-100 text-purple-700' 
                          : 'text-gray-700 hover:bg-gray-100'
                        }
                      `}
                    >
                      {item.icon && <item.icon className="w-4 h-4" />}
                      {item.title}
                      {item.children && (
                        <ChevronRight className={`w-4 h-4 ml-auto transition-transform ${
                          isParentActive(item) ? 'rotate-90' : ''
                        }`} />
                      )}
                    </a>
                    
                    {/* Sub-navigation */}
                    {item.children && isParentActive(item) && (
                      <div className="ml-7 mt-2 space-y-1">
                        {item.children
                          .filter(child => 
                            !searchQuery || 
                            child.title.toLowerCase().includes(searchQuery.toLowerCase())
                          )
                          .map((child) => (
                          <a
                            key={child.href}
                            href={child.href}
                            className={`
                              block px-3 py-2 rounded-lg text-sm transition-colors
                              ${isActive(child.href)
                                ? 'bg-purple-50 text-purple-600 font-medium'
                                : 'text-gray-600 hover:bg-gray-50'
                              }
                            `}
                          >
                            {child.title}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Quick Links */}
              <div className="mt-8 pt-4 border-t border-gray-200">
                <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Quick Links
                </h4>
                <div className="space-y-1">
                  <a 
                    href="/playground" 
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <Code className="w-4 h-4" />
                    Playground
                  </a>
                  <a 
                    href="/community" 
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    Community
                  </a>
                  <a 
                    href="https://github.com/easylogic/cssma" 
                    className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <BookOpen className="w-4 h-4" />
                    GitHub
                  </a>
                </div>
              </div>
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200">
              <div className="text-xs text-gray-500">
                <p className="font-medium">CSSMA Documentation</p>
                <p>Version 1.0.0</p>
                <p className="mt-2">
                  <a href="/docs/guides/troubleshooting" className="text-purple-600 hover:text-purple-700">
                    Need help?
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Mobile header */}
          <div className="lg:hidden flex items-center gap-4 p-4 bg-white border-b border-gray-200">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="font-semibold text-gray-900">Documentation</h1>
          </div>

          {/* Content */}
          <main className="flex-1 overflow-y-auto">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}