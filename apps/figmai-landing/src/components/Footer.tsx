import { Github, Twitter, Youtube, MessageCircle } from 'lucide-react'

export default function Footer() {
  const navigation = {
    product: [
      { name: 'CSS Converter', href: '#' },
      { name: 'AI Generator', href: '#' },
      { name: 'Component Creator', href: '#' },
      { name: 'Template Gallery', href: '#' },
      { name: 'Design System', href: '#' },
    ],
    resources: [
      { name: 'Documentation', href: '#' },
      { name: 'API Reference', href: '#' },
      { name: 'Tutorials', href: '#' },
      { name: 'Case Studies', href: '#' },
      { name: 'Maker Academy', href: '#' },
    ],
    community: [
      { name: 'Maker Forum', href: '#' },
      { name: 'Discord Community', href: '#' },
      { name: 'Showcase Gallery', href: '#' },
      { name: 'Maker Events', href: '#' },
      { name: 'Newsletter', href: '#' },
    ],
    company: [
      { name: 'About Us', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Press Kit', href: '#' },
      { name: 'Contact', href: '#' },
      { name: 'Partnership', href: '#' },
    ],
  }

  const social = [
    {
      name: 'Twitter',
      href: '#',
      icon: Twitter,
    },
    {
      name: 'GitHub',
      href: '#',
      icon: Github,
    },
    {
      name: 'YouTube',
      href: '#',
      icon: Youtube,
    },
    {
      name: 'Discord',
      href: '#',
      icon: MessageCircle,
    },
  ]

  return (
    <footer className="bg-gray-900" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-20 sm:pt-24 lg:px-8 lg:pt-32">
        {/* Main Footer Content */}
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Brand Section */}
          <div className="grid grid-cols-1 gap-8 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              {/* Brand Info */}
              <div className="md:col-span-2 mb-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                    <span className="text-xl font-bold text-white">F</span>
                  </div>
                  <span className="text-2xl font-bold text-white">
                    Figm.ai
                  </span>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                  The Figma Maker Platform. Transform designs into reality with AI-powered tools.
                  <span className="block mt-2 text-purple-400 font-semibold">
                    Where Designers Become Makers.
                  </span>
                </p>
              </div>
            </div>
            
            {/* Navigation Links */}
            <div className="md:grid md:grid-cols-4 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Product</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.product.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Resources</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.resources.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Community</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.community.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="mt-10 xl:mt-0">
            <h3 className="text-sm font-semibold leading-6 text-white">Join the Maker Revolution</h3>
            <p className="mt-2 text-sm leading-6 text-gray-300">
              Get weekly insights, new features, and maker spotlights delivered to your inbox.
            </p>
            <form className="mt-6 sm:flex sm:max-w-md">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                name="email-address"
                id="email-address"
                autoComplete="email"
                required
                className="w-full min-w-0 appearance-none rounded-md border-0 bg-white/5 px-3 py-1.5 text-base text-white shadow-sm ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-purple-500 sm:w-64 sm:text-sm sm:leading-6 xl:w-full"
                placeholder="Enter your email"
              />
              <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-md bg-gradient-to-r from-purple-500 to-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:from-purple-400 hover:to-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 md:flex md:items-center md:justify-between lg:mt-24">
          <div className="flex space-x-6 md:order-2">
            {social.map((item) => (
              <a key={item.name} href={item.href} className="text-gray-500 hover:text-gray-300">
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-6 w-6" aria-hidden="true" />
              </a>
            ))}
          </div>
          <div className="mt-8 md:order-1 md:mt-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <p className="text-xs leading-5 text-gray-400">
                &copy; 2024 Figm.ai. All rights reserved.
              </p>
              <div className="flex gap-4 text-xs">
                <a href="#" className="text-gray-400 hover:text-gray-300">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-gray-300">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-gray-300">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
