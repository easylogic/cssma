import type { NodeData } from '../types';

export interface CSSGeneratorOptions {
  format?: 'css' | 'scss' | 'less' | 'stylus';
  useClasses?: boolean;
  prefix?: string;
  minify?: boolean;
  includeComments?: boolean;
}

/**
 * Convert NodeData to CSS string
 */
export function generateCSS(
  nodeData: NodeData,
  options: CSSGeneratorOptions = {}
): string {
  const {
    format = 'css',
    useClasses = true,
    prefix = '',
    minify = false,
    includeComments = true
  } = options;

  const cssRules = new Map<string, string[]>();
  const classNames = new Set<string>();

  // Extract CSS rules from NodeData
  extractCSSRules(nodeData, cssRules, classNames, prefix);

  // Generate CSS string
  let css = '';
  
  if (includeComments && !minify) {
    css += `/* Generated CSS from NodeData */\n`;
    css += `/* Format: ${format} */\n\n`;
  }

  // Convert rules to CSS
  for (const [selector, rules] of cssRules) {
    if (minify) {
      css += `${selector}{${rules.join(';')}}`;
    } else {
      css += `${selector} {\n`;
      rules.forEach(rule => {
        css += `  ${rule};\n`;
      });
      css += `}\n\n`;
    }
  }

  return css;
}

/**
 * Extract CSS rules from NodeData recursively
 */
function extractCSSRules(
  nodeData: NodeData,
  cssRules: Map<string, string[]>,
  classNames: Set<string>,
  prefix: string,
  parentSelector: string = ''
): void {
  const { type, name, styles, children } = nodeData;
  
  if (!styles) return;

  // Generate class name
  const className = generateClassName(name || type, prefix);
  classNames.add(className);
  
  const selector = `.${className}`;
  
  // Convert Tailwind classes to CSS properties
  const cssProperties = convertTailwindToCSS(styles);
  
  if (cssProperties.length > 0) {
    cssRules.set(selector, cssProperties);
  }

  // Process children
  if (children && Array.isArray(children)) {
    children.forEach(child => {
      extractCSSRules(child, cssRules, classNames, prefix, selector);
    });
  }
}

/**
 * Generate CSS class name from node name
 */
function generateClassName(name: string, prefix: string): string {
  const cleanName = name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  
  return prefix ? `${prefix}-${cleanName}` : cleanName;
}

/**
 * Convert Tailwind CSS classes to CSS properties
 */
function convertTailwindToCSS(tailwindClasses: string): string[] {
  const classes = tailwindClasses.split(' ').filter(Boolean);
  const cssProperties: string[] = [];

  classes.forEach(className => {
    const property = tailwindToCSSProperty(className);
    if (property) {
      cssProperties.push(property);
    }
  });

  return cssProperties;
}

/**
 * Convert individual Tailwind class to CSS property
 */
function tailwindToCSSProperty(className: string): string | null {
  // Basic mappings - extend as needed
  const mappings: { [key: string]: string } = {
    // Display
    'flex': 'display: flex',
    'block': 'display: block',
    'inline': 'display: inline',
    'inline-block': 'display: inline-block',
    'grid': 'display: grid',
    'hidden': 'display: none',
    
    // Flex
    'flex-col': 'flex-direction: column',
    'flex-row': 'flex-direction: row',
    'items-center': 'align-items: center',
    'items-start': 'align-items: flex-start',
    'items-end': 'align-items: flex-end',
    'justify-center': 'justify-content: center',
    'justify-start': 'justify-content: flex-start',
    'justify-end': 'justify-content: flex-end',
    'justify-between': 'justify-content: space-between',
    
    // Text
    'text-center': 'text-align: center',
    'text-left': 'text-align: left',
    'text-right': 'text-align: right',
    'font-bold': 'font-weight: bold',
    'font-semibold': 'font-weight: 600',
    'font-medium': 'font-weight: 500',
    
    // Border radius
    'rounded': 'border-radius: 0.25rem',
    'rounded-lg': 'border-radius: 0.5rem',
    'rounded-xl': 'border-radius: 0.75rem',
    'rounded-full': 'border-radius: 9999px',
  };

  // Check direct mappings
  if (mappings[className]) {
    return mappings[className];
  }

  // Handle dynamic values
  // Padding
  if (className.startsWith('p-')) {
    const value = className.substring(2);
    return `padding: ${convertSpacingValue(value)}`;
  }
  if (className.startsWith('px-')) {
    const value = className.substring(3);
    return `padding-left: ${convertSpacingValue(value)}; padding-right: ${convertSpacingValue(value)}`;
  }
  if (className.startsWith('py-')) {
    const value = className.substring(3);
    return `padding-top: ${convertSpacingValue(value)}; padding-bottom: ${convertSpacingValue(value)}`;
  }

  // Margin
  if (className.startsWith('m-')) {
    const value = className.substring(2);
    return `margin: ${convertSpacingValue(value)}`;
  }
  if (className.startsWith('mx-')) {
    const value = className.substring(3);
    return `margin-left: ${convertSpacingValue(value)}; margin-right: ${convertSpacingValue(value)}`;
  }
  if (className.startsWith('my-')) {
    const value = className.substring(3);
    return `margin-top: ${convertSpacingValue(value)}; margin-bottom: ${convertSpacingValue(value)}`;
  }

  // Width/Height
  if (className.startsWith('w-')) {
    const value = className.substring(2);
    return `width: ${convertSizeValue(value)}`;
  }
  if (className.startsWith('h-')) {
    const value = className.substring(2);
    return `height: ${convertSizeValue(value)}`;
  }

  // Background colors
  if (className.startsWith('bg-')) {
    const color = className.substring(3);
    return `background-color: ${convertColorValue(color)}`;
  }

  // Text colors
  if (className.startsWith('text-')) {
    const color = className.substring(5);
    if (color.includes('-')) {
      return `color: ${convertColorValue(color)}`;
    }
  }

  return null;
}

/**
 * Convert Tailwind spacing value to CSS
 */
function convertSpacingValue(value: string): string {
  const spacingMap: { [key: string]: string } = {
    '0': '0',
    '1': '0.25rem',
    '2': '0.5rem',
    '3': '0.75rem',
    '4': '1rem',
    '5': '1.25rem',
    '6': '1.5rem',
    '8': '2rem',
    '10': '2.5rem',
    '12': '3rem',
    '16': '4rem',
    '20': '5rem',
    '24': '6rem',
  };

  return spacingMap[value] || value;
}

/**
 * Convert Tailwind size value to CSS
 */
function convertSizeValue(value: string): string {
  if (value === 'full') return '100%';
  if (value === 'auto') return 'auto';
  if (value.includes('/')) {
    const [num, den] = value.split('/');
    return `${(parseInt(num) / parseInt(den)) * 100}%`;
  }
  
  return convertSpacingValue(value);
}

/**
 * Convert Tailwind color value to CSS
 */
function convertColorValue(color: string): string {
  const colorMap: { [key: string]: string } = {
    'white': '#ffffff',
    'black': '#000000',
    'gray-50': '#f9fafb',
    'gray-100': '#f3f4f6',
    'gray-200': '#e5e7eb',
    'gray-300': '#d1d5db',
    'gray-400': '#9ca3af',
    'gray-500': '#6b7280',
    'gray-600': '#4b5563',
    'gray-700': '#374151',
    'gray-800': '#1f2937',
    'gray-900': '#111827',
    'blue-500': '#3b82f6',
    'blue-600': '#2563eb',
    'purple-500': '#8b5cf6',
    'purple-600': '#7c3aed',
    'green-500': '#10b981',
    'red-500': '#ef4444',
  };

  return colorMap[color] || color;
}

/**
 * Generate SCSS from NodeData
 */
export function generateSCSS(
  nodeData: NodeData,
  options: Omit<CSSGeneratorOptions, 'format'> = {}
): string {
  return generateCSS(nodeData, { ...options, format: 'scss' });
}

/**
 * Generate CSS variables from NodeData
 */
export function generateCSSVariables(
  nodeData: NodeData,
  options: { prefix?: string } = {}
): string {
  const { prefix = 'cssma' } = options;
  
  const variables = new Set<string>();
  extractCSSVariables(nodeData, variables, prefix);
  
  let css = ':root {\n';
  variables.forEach(variable => {
    css += `  ${variable}\n`;
  });
  css += '}\n';
  
  return css;
}

/**
 * Extract CSS variables from NodeData
 */
function extractCSSVariables(
  nodeData: NodeData,
  variables: Set<string>,
  prefix: string
): void {
  const { styles, children } = nodeData;
  
  if (styles) {
    const classes = styles.split(' ').filter(Boolean);
    classes.forEach(className => {
      if (className.startsWith('bg-') || className.startsWith('text-')) {
        const color = className.includes('-') ? className.split('-').slice(1).join('-') : '';
        if (color) {
          variables.add(`--${prefix}-color-${color}: ${convertColorValue(color)};`);
        }
      }
    });
  }

  if (children && Array.isArray(children)) {
    children.forEach(child => {
      extractCSSVariables(child, variables, prefix);
    });
  }
} 