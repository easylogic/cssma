import { Template } from '@/types/template';
import { getCategoryById } from '../categories';

const formsCategory = getCategoryById('forms')!;

export const formTemplates: Template[] = [
  {
    id: 'form-login',
    name: 'Login Form',
    description: 'Simple login form with email and password',
    category: formsCategory,
    tags: ['form', 'login', 'authentication', 'input'],
    nodeData: {
      type: 'FRAME',
      name: 'Login Form',
      styles: 'flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm p-[32px] gap-[24px] w-[360px] h-[420px]',
      children: [
        {
          type: 'TEXT',
          name: 'Form Title',
          styles: 'text-2xl font-bold text-gray-900 text-center w-full',
          text: 'Welcome Back'
        },
        {
          type: 'FRAME',
          name: 'Form Fields',
          styles: 'flex flex-col gap-[16px] w-full',
          children: [
            {
              type: 'FRAME',
              name: 'Email Field',
              styles: 'flex flex-col gap-[8px] w-full',
              children: [
                {
                  type: 'TEXT',
                  name: 'Email Label',
                  styles: 'text-sm font-medium text-gray-700 w-full',
                  text: 'Email'
                },
                {
                  type: 'FRAME',
                  name: 'Email Input',
                  styles: 'flex items-center px-[12px] py-[10px] border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-full h-[40px]',
                  children: [
                    {
                      type: 'TEXT',
                      name: 'Email Placeholder',
                      styles: 'text-base text-gray-400',
                      text: 'Enter your email'
                    }
                  ]
                }
              ]
            },
            {
              type: 'FRAME',
              name: 'Password Field',
              styles: 'flex flex-col gap-[8px] w-full',
              children: [
                {
                  type: 'TEXT',
                  name: 'Password Label',
                  styles: 'text-sm font-medium text-gray-700 w-full',
                  text: 'Password'
                },
                {
                  type: 'FRAME',
                  name: 'Password Input',
                  styles: 'flex items-center px-[12px] py-[10px] border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-full h-[40px]',
                  children: [
                    {
                      type: 'TEXT',
                      name: 'Password Placeholder',
                      styles: 'text-base text-gray-400',
                      text: 'Enter your password'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          type: 'FRAME',
          name: 'Submit Button',
          styles: 'flex items-center justify-center px-[16px] py-[12px] bg-blue-600 hover:bg-blue-700 rounded-md w-full h-[48px]',
          children: [
            {
              type: 'TEXT',
              name: 'Submit Text',
              styles: 'text-base font-semibold text-white',
              text: 'Sign In'
            }
          ]
        }
      ]
    },
    complexity: 'intermediate',
    createdAt: '2024-01-20',
    updatedAt: '2024-01-20',
    author: { name: 'FigmaikR Team' },
    usageCount: 3400,
    featured: true
  },
  {
    id: 'form-contact',
    name: 'Contact Form',
    description: 'Contact form with name, email and message fields',
    category: formsCategory,
    tags: ['form', 'contact', 'textarea', 'message'],
    nodeData: {
      type: 'FRAME',
      name: 'Contact Form',
      styles: 'flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm p-[32px] gap-[24px] w-[480px] h-[520px]',
      children: [
        {
          type: 'TEXT',
          name: 'Form Title',
          styles: 'text-2xl font-bold text-gray-900 w-full',
          text: 'Get in Touch'
        },
        {
          type: 'FRAME',
          name: 'Form Fields',
          styles: 'flex flex-col gap-[16px] w-full',
          children: [
            {
              type: 'FRAME',
              name: 'Name Row',
              styles: 'flex flex-row gap-[16px] w-full',
              children: [
                {
                  type: 'FRAME',
                  name: 'First Name Field',
                  styles: 'flex flex-col gap-[8px] flex-1 w-full',
                  children: [
                    {
                      type: 'TEXT',
                      name: 'First Name Label',
                      styles: 'text-sm font-medium text-gray-700 w-full',
                      text: 'First Name'
                    },
                    {
                      type: 'FRAME',
                      name: 'First Name Input',
                      styles: 'flex items-center px-[12px] py-[10px] border border-gray-300 rounded-md w-full h-[40px]',
                      children: [
                        {
                          type: 'TEXT',
                          name: 'First Name Placeholder',
                          styles: 'text-base text-gray-400',
                          text: 'John'
                        }
                      ]
                    }
                  ]
                },
                {
                  type: 'FRAME',
                  name: 'Last Name Field',
                  styles: 'flex flex-col gap-[8px] flex-1 w-full',
                  children: [
                    {
                      type: 'TEXT',
                      name: 'Last Name Label',
                      styles: 'text-sm font-medium text-gray-700 w-full',
                      text: 'Last Name'
                    },
                    {
                      type: 'FRAME',
                      name: 'Last Name Input',
                      styles: 'flex items-center px-[12px] py-[10px] border border-gray-300 rounded-md w-full h-[40px]',
                      children: [
                        {
                          type: 'TEXT',
                          name: 'Last Name Placeholder',
                          styles: 'text-base text-gray-400',
                          text: 'Doe'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              type: 'FRAME',
              name: 'Email Field',
              styles: 'flex flex-col gap-[8px] w-full',
              children: [
                {
                  type: 'TEXT',
                  name: 'Email Label',
                  styles: 'text-sm font-medium text-gray-700 w-full',
                  text: 'Email'
                },
                {
                  type: 'FRAME',
                  name: 'Email Input',
                  styles: 'flex items-center px-[12px] py-[10px] border border-gray-300 rounded-md w-full h-[40px]',
                  children: [
                    {
                      type: 'TEXT',
                      name: 'Email Placeholder',
                      styles: 'text-base text-gray-400',
                      text: 'john@example.com'
                    }
                  ]
                }
              ]
            },
            {
              type: 'FRAME',
              name: 'Message Field',
              styles: 'flex flex-col gap-[8px] w-full',
              children: [
                {
                  type: 'TEXT',
                  name: 'Message Label',
                  styles: 'text-sm font-medium text-gray-700 w-full',
                  text: 'Message'
                },
                {
                  type: 'FRAME',
                  name: 'Message Textarea',
                  styles: 'flex items-start px-[12px] py-[10px] border border-gray-300 rounded-md w-full h-[120px]',
                  children: [
                    {
                      type: 'TEXT',
                      name: 'Message Placeholder',
                      styles: 'text-base text-gray-400',
                      text: 'Tell us about your project...'
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          type: 'FRAME',
          name: 'Submit Button',
          styles: 'flex items-center justify-center px-[16px] py-[12px] bg-blue-600 hover:bg-blue-700 rounded-md w-full h-[48px]',
          children: [
            {
              type: 'TEXT',
              name: 'Submit Text',
              styles: 'text-base font-semibold text-white',
              text: 'Send Message'
            }
          ]
        }
      ]
    },
    complexity: 'intermediate',
    createdAt: '2024-01-21',
    updatedAt: '2024-01-21',
    author: { name: 'FigmaikR Team' },
    usageCount: 2100
  },
  {
    id: 'form-newsletter',
    name: 'Newsletter Signup',
    description: 'Simple newsletter subscription form',
    category: formsCategory,
    tags: ['form', 'newsletter', 'subscription', 'email'],
    nodeData: {
      type: 'FRAME',
      name: 'Newsletter Form',
      styles: 'flex flex-col bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-[32px] gap-[16px] w-[400px] h-[240px] text-center',
      children: [
        {
          type: 'TEXT',
          name: 'Newsletter Title',
          styles: 'text-2xl font-bold text-white w-full',
          text: 'Stay Updated'
        },
        {
          type: 'TEXT',
          name: 'Newsletter Description',
          styles: 'text-base text-blue-100 w-full',
          text: 'Subscribe to our newsletter for the latest updates'
        },
        {
          type: 'FRAME',
          name: 'Email Row',
          styles: 'flex flex-row gap-[12px] w-full',
          children: [
            {
              type: 'FRAME',
              name: 'Email Input',
              styles: 'flex items-center flex-1 px-[16px] py-[12px] bg-white border border-gray-300 rounded-md h-[48px]',
              children: [
                {
                  type: 'TEXT',
                  name: 'Email Placeholder',
                  styles: 'text-base text-gray-400',
                  text: 'Enter your email'
                }
              ]
            },
            {
              type: 'FRAME',
              name: 'Subscribe Button',
              styles: 'flex items-center justify-center px-[24px] py-[12px] bg-white hover:bg-gray-50 rounded-md h-[48px]',
              children: [
                {
                  type: 'TEXT',
                  name: 'Subscribe Text',
                  styles: 'text-base font-semibold text-blue-600',
                  text: 'Subscribe'
                }
              ]
            }
          ]
        }
      ]
    },
    complexity: 'beginner',
    createdAt: '2024-01-22',
    updatedAt: '2024-01-22',
    author: { name: 'FigmaikR Team' },
    usageCount: 1800
  },
  {
    id: 'form-search',
    name: 'Search Form',
    description: 'Search form with filters and advanced options',
    category: formsCategory,
    tags: ['form', 'search', 'filter', 'input'],
    nodeData: {
      type: 'FRAME',
      name: 'Search Form',
      styles: 'flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm p-[24px] gap-[16px] w-[500px] h-[180px]',
      children: [
        {
          type: 'FRAME',
          name: 'Search Row',
          styles: 'flex flex-row gap-[12px] w-full',
          children: [
            {
              type: 'FRAME',
              name: 'Search Input Container',
              styles: 'flex flex-1 relative w-full',
              children: [
                {
                  type: 'FRAME',
                  name: 'Search Input',
                  styles: 'flex items-center pl-[40px] pr-[16px] py-[12px] border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-full h-[48px]',
                  children: [
                    {
                      type: 'TEXT',
                      name: 'Search Placeholder',
                      styles: 'text-base text-gray-400',
                      text: 'Search templates...'
                    }
                  ]
                },
                {
                  type: 'FRAME',
                  name: 'Search Icon',
                  styles: 'absolute left-[12px] top-1/2 transform -translate-y-1/2 w-[20px] h-[20px] flex items-center justify-center',
                  children: [
                    {
                      type: 'TEXT',
                      name: 'Search Icon Text',
                      styles: 'text-gray-400',
                      text: '🔍'
                    }
                  ]
                }
              ]
            },
            {
              type: 'FRAME',
              name: 'Search Button',
              styles: 'flex items-center justify-center px-[24px] py-[12px] bg-blue-600 hover:bg-blue-700 rounded-lg h-[48px]',
              children: [
                {
                  type: 'TEXT',
                  name: 'Search Button Text',
                  styles: 'text-base font-medium text-white',
                  text: 'Search'
                }
              ]
            }
          ]
        },
        {
          type: 'FRAME',
          name: 'Filters Row',
          styles: 'flex flex-row gap-[16px] w-full pt-[16px] border-t border-gray-200',
          children: [
            {
              type: 'FRAME',
              name: 'Category Filter',
              styles: 'flex items-center px-[12px] py-[8px] border border-gray-300 rounded-lg h-[36px]',
              children: [
                {
                  type: 'TEXT',
                  name: 'Category Text',
                  styles: 'text-sm text-gray-700',
                  text: 'All Categories'
                }
              ]
            },
            {
              type: 'FRAME',
              name: 'Sort Filter',
              styles: 'flex items-center px-[12px] py-[8px] border border-gray-300 rounded-lg h-[36px]',
              children: [
                {
                  type: 'TEXT',
                  name: 'Sort Text',
                  styles: 'text-sm text-gray-700',
                  text: 'Relevance'
                }
              ]
            }
          ]
        }
      ]
    },
    complexity: 'intermediate',
    createdAt: '2024-01-23',
    updatedAt: '2024-01-23',
    author: { name: 'FigmaikR Team' },
    usageCount: 950
  }
]; 