# CSSMA React

React hooks and components for dynamic CSS processing using the CSSMA library.

[![npm version](https://badge.fury.io/js/cssma-react.svg)](https://badge.fury.io/js/cssma-react)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚀 Features

- **Real-time CSS Processing**: Dynamic Tailwind CSS class processing with caching
- **Performance Optimized**: Automatic style caching, hash-based deduplication, memory management
- **React Integration**: Custom hooks and components designed for React applications
- **TypeScript Support**: Full TypeScript support with comprehensive type definitions
- **SSR Compatible**: Server-side rendering support out of the box
- **Flexible API**: Support for both simple and complex styling scenarios

## 📦 Installation

```bash
npm install cssma-react cssma react react-dom
# or
yarn add cssma-react cssma react react-dom
# or
pnpm add cssma-react cssma react react-dom
```

## 🔧 Quick Start

### Basic Hook Usage

```tsx
import React from 'react';
import { useCssma } from 'cssma-react';

function MyComponent() {
  const { className } = useCssma('w-[400px] bg-blue-500 hover:bg-blue-600 rounded-lg p-4');
  
  return (
    <div className={className}>
      Dynamically styled content with hover effects!
    </div>
  );
}

export default MyComponent;
```

> **Note**: Styles are automatically injected into the document head - no need to manually add `<style>` tags!

### NodeRenderer Component

```tsx
import React from 'react';
import { NodeRenderer } from 'cssma-react';

const nodeData = {
  type: 'FRAME',
  styles: 'w-full h-64 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6',
  children: [
    {
      type: 'TEXT',
      text: 'Welcome to CSSMA React',
      styles: 'text-white text-3xl font-bold text-center mb-4'
    }
  ]
};

function App() {
  return <NodeRenderer data={nodeData} />;
}
```

## 📚 API Reference

### Hooks

#### `useCssma(styles: string)`

Main hook for dynamic CSS class processing with caching and optimization.

**Parameters:**
- `styles` (string): Tailwind CSS classes to process

**Returns:**
```typescript
{
  className: string;        // Generated class name for element
  staticClassName: string;  // Static portion of classes
  dynamicClassName: string; // Dynamic portion of classes
  styleContent: string;     // CSS content (automatically injected)
  hash: string;            // Unique hash for this style combination
}
```

**Features:**
- ✅ **Automatic Style Injection**: Styles are automatically injected into `<head>`
- ✅ **Caching**: Identical styles are cached and reused
- ✅ **SSR Safe**: Works with server-side rendering
- ✅ **Cleanup**: Automatically manages style lifecycle

**Example:**
```tsx
const { className } = useCssma('w-[400px] bg-blue-500 hover:bg-blue-600');
// Styles are automatically injected - just use the className!
```

#### `useCssmaMultiple(classGroups: string[] | Record<string, string>)`

Processes multiple class groups for complex components with multiple styled elements.

**Parameters:**
- `classGroups` (string[] | Record<string, string>): Array of class strings or object with named class groups

**Returns:**
- Array of style objects (when input is array)
- Object with same keys containing style objects (when input is object)

**Example (Array - Legacy):**
```tsx
const [containerStyles, headerStyles, contentStyles] = useCssmaMultiple([
  'w-full h-screen bg-gray-100',
  'text-2xl font-bold text-gray-800 mb-4',
  'p-6 bg-white rounded-lg shadow-md'
]);
```

**Example (Object - Recommended):**
```tsx
const styles = useCssmaMultiple({
  container: 'w-full h-screen bg-gray-100',
  header: 'text-2xl font-bold text-gray-800 mb-4',
  content: 'p-6 bg-white rounded-lg shadow-md'
});

// Much clearer and maintainable!
return (
  <div className={styles.container.className}>
    <h1 className={styles.header.className}>Header</h1>
    <div className={styles.content.className}>Content</div>
  </div>
);
```

#### Legacy Compatibility Hooks

- `useTailwind(tailwindClasses: string)` (Deprecated - use `useCssma`)
- `useDynamicTailwind(tailwindClasses: string)` (Deprecated - use `useCssma`)

### Components

#### `NodeRenderer`

React component for rendering NodeData structures with dynamic styling.

**Props:**
```typescript
interface NodeRendererProps {
  data: NodeData;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}
```

## 🎨 Advanced Usage

### Complex Component with Multiple Styles (Object Approach)

```tsx
import React from 'react';
import { useCssmaMultiple } from 'cssma-react';

function Dashboard() {
  const styles = useCssmaMultiple({
    container: 'min-h-screen bg-gray-50 flex',
    sidebar: 'w-64 bg-white shadow-lg p-6',
    main: 'flex-1 p-8',
    card: 'bg-white rounded-lg shadow-md p-6 mb-6',
    navigation: 'space-y-2 mb-8',
    navItem: 'block w-full text-left px-3 py-2 rounded hover:bg-gray-100'
  });
  
  return (
    <div className={styles.container.className}>
      <aside className={styles.sidebar.className}>
        <nav className={styles.navigation.className}>
          <button className={styles.navItem.className}>Dashboard</button>
          <button className={styles.navItem.className}>Profile</button>
          <button className={styles.navItem.className}>Settings</button>
        </nav>
      </aside>
      <main className={styles.main.className}>
        <div className={styles.card.className}>
          <h1>Dashboard</h1>
          <p>Welcome to your dashboard!</p>
        </div>
        <div className={styles.card.className}>
          <h2>Statistics</h2>
          <p>Your latest metrics and data.</p>
        </div>
      </main>
    </div>
  );
}
```

### Legacy Array Approach (Still Supported)

```tsx
import React from 'react';
import { useCssmaMultiple } from 'cssma-react';

function Dashboard() {
  const [containerStyles, sidebarStyles, mainStyles, cardStyles] = useCssmaMultiple([
    'min-h-screen bg-gray-50 flex',
    'w-64 bg-white shadow-lg p-6',
    'flex-1 p-8',
    'bg-white rounded-lg shadow-md p-6 mb-6'
  ]);
  
  return (
    <div className={containerStyles.className}>
      <aside className={sidebarStyles.className}>
        <h2>Sidebar</h2>
      </aside>
      <main className={mainStyles.className}>
        <div className={cardStyles.className}>
          <h1>Dashboard</h1>
          <p>Welcome to your dashboard!</p>
        </div>
      </main>
    </div>
  );
}
```

### Dynamic Conditional Styles

```tsx
import React, { useState } from 'react';
import { useCssmaMultiple } from 'cssma-react';

function ConditionalCard({ isHighlighted, size = 'medium' }) {
  const styles = useCssmaMultiple({
    card: `
      p-6 rounded-lg transition-all duration-300
      ${isHighlighted ? 'bg-blue-50 border-2 border-blue-200' : 'bg-white border border-gray-200'}
      ${size === 'small' ? 'p-4' : size === 'large' ? 'p-8' : 'p-6'}
    `,
    title: `
      font-bold mb-2
      ${isHighlighted ? 'text-blue-900' : 'text-gray-900'}
      ${size === 'small' ? 'text-lg' : size === 'large' ? 'text-2xl' : 'text-xl'}
    `,
    content: `
      ${isHighlighted ? 'text-blue-700' : 'text-gray-600'}
      ${size === 'small' ? 'text-sm' : 'text-base'}
    `
  });
  
  return (
    <div className={styles.card.className}>
      <h3 className={styles.title.className}>Card Title</h3>
      <p className={styles.content.className}>Card content goes here.</p>
    </div>
  );
}
```

### Dynamic Theme Support

```tsx
import React, { useState } from 'react';
import { useCssma } from 'cssma-react';

function ThemedButton() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  const buttonStyles = theme === 'light' 
    ? 'bg-blue-500 text-white hover:bg-blue-600'
    : 'bg-gray-800 text-gray-100 hover:bg-gray-700';
    
  const { className } = useCssma(
    `px-4 py-2 rounded font-medium transition-colors ${buttonStyles}`
  );
  
  return (
    <button 
      className={className}
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      Toggle Theme (Current: {theme})
    </button>
  );
}
```

### Accessing Style Information

```tsx
import React from 'react';
import { useCssma } from 'cssma-react';

function StyleDebugger() {
  const { 
    className, 
    staticClassName, 
    dynamicClassName, 
    styleContent, 
    hash 
  } = useCssma('w-[400px] bg-gradient-to-r from-blue-500 to-purple-600 hover:scale-105');
  
  return (
    <div>
      <div className={className}>
        Styled Element
      </div>
      
      {/* Debug Information */}
      <pre style={{ fontSize: '12px', marginTop: '10px' }}>
        Hash: {hash}
        Static: {staticClassName}
        Dynamic: {dynamicClassName}
        CSS Length: {styleContent.length} chars
      </pre>
    </div>
  );
}
```

## 📄 Supported CSS Features

### Arbitrary Values
- `w-[400px]` - Custom width values
- `bg-[#FF0000]` - Custom color values  
- `text-[1.5rem]` - Custom font sizes
- `m-[calc(100%-20px)]` - Complex calculations

### Responsive Design
- `sm:w-full` - Responsive width
- `md:bg-blue-500` - Responsive background
- `lg:text-xl` - Responsive typography
- `xl:grid-cols-4` - Responsive grid layouts

### State Modifiers
- `hover:bg-blue-600` - Hover states
- `focus:ring-2` - Focus states  
- `active:scale-95` - Active states
- `disabled:opacity-50` - Disabled states

### Complex Gradients
- `bg-gradient-to-r from-blue-500 to-purple-600`
- `bg-gradient-to-br via-pink-500`
- `bg-gradient-radial from-center`

### Animations & Transforms
- `transition-all duration-300`
- `transform hover:rotate-180`
- `animate-pulse`
- `scale-110 rotate-45`

## ⚡ Performance Features

- **Automatic Caching**: Styles are cached to prevent reprocessing
- **Hash-based Deduplication**: Identical styles share resources
- **Memory Management**: Automatic cleanup of unused styles
- **Optimized DOM Updates**: Debounced style injection

### Performance Details

#### Automatic Style Injection
```typescript
// cssma-react handles this automatically:
// 1. Processes Tailwind classes
// 2. Generates unique hash
// 3. Checks if already injected
// 4. Injects only if needed
// 5. Returns className for use

const { className } = useCssma('w-[400px] bg-blue-500');
// CSS is automatically in <head>, no manual work needed!
```

#### Caching Strategy
- **Hash-based**: Identical class combinations share the same hash
- **Global Registry**: Prevents duplicate injections across components
- **Memory Efficient**: Automatic cleanup of unused styles
- **SSR Safe**: Works without DOM in server environments

#### Performance Monitoring
```tsx
import { getStyleStats } from 'cssma';

function DevTools() {
  const stats = getStyleStats();
  
  return (
    <div>
      <p>Injected Styles: {stats.count}</p>
      <p>Cache Hits: {stats.hashes.length}</p>
    </div>
  );
}
```

## 🌐 Browser Support

- **Modern Browsers**: Full support (Chrome 80+, Firefox 75+, Safari 13+)
- **Legacy Support**: Graceful degradation with polyfills
- **Server-Side Rendering**: Full SSR compatibility
- **Mobile**: Optimized for mobile performance

## 🛠️ Development

### Building the Package

```bash
# Build the package
pnpm build

# Development mode with watch
pnpm dev

# Type checking
pnpm type-check
```

### Testing

```bash
# Run tests
pnpm test

# Run tests with coverage
pnpm test:coverage

# E2E tests
pnpm test:e2e
```

### Debug Mode

Enable debug mode for development insights:

```tsx
// Set environment variable or use in development
const { className, hash } = useCssma('w-full bg-blue-500');

// Check injected styles in DevTools:
// Look for <style data-cssma-hash="..."> in <head>
```

## 🎯 Best Practices

### 1. Reuse Style Combinations
```tsx
// ✅ Good: Consistent class usage benefits from caching
const buttonClass = 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600';

function Button1() {
  const { className } = useCssma(buttonClass);
  return <button className={className}>Button 1</button>;
}

function Button2() {
  const { className } = useCssma(buttonClass); // Uses cached result!
  return <button className={className}>Button 2</button>;
}
```

### 2. Use Object Approach for Multiple Styles (Recommended)
```tsx
// ✅ Good: Object approach is more maintainable
const styles = useCssmaMultiple({
  container: 'w-full max-w-4xl mx-auto p-6',
  header: 'text-3xl font-bold mb-6',
  content: 'prose prose-lg',
  sidebar: 'w-64 bg-gray-50 p-4'
});

// Clear, self-documenting usage
<div className={styles.container.className}>
  <h1 className={styles.header.className}>Title</h1>
  <div className={styles.content.className}>Content</div>
</div>

// ❌ Avoid: Array approach (harder to maintain)
const [container, header, content] = useCssmaMultiple([
  'w-full max-w-4xl mx-auto p-6', // What is index 0?
  'text-3xl font-bold mb-6',       // What is index 1?
  'prose prose-lg'                 // Easy to mix up order
]);
```

### 3. Create Reusable Style Objects
```tsx
// ✅ Good: Define common style combinations
const commonStyles = {
  button: 'px-4 py-2 rounded font-medium transition-colors',
  card: 'bg-white rounded-lg shadow-md p-6',
  input: 'w-full px-3 py-2 border border-gray-300 rounded focus:ring-2',
  layout: 'min-h-screen bg-gray-50'
};

function MyComponent() {
  const styles = useCssmaMultiple({
    container: commonStyles.layout,
    submitButton: `${commonStyles.button} bg-blue-500 text-white hover:bg-blue-600`,
    cancelButton: `${commonStyles.button} bg-gray-500 text-white hover:bg-gray-600`,
    formCard: commonStyles.card
  });
  
  // Usage is clear and consistent
  return (
    <div className={styles.container.className}>
      <div className={styles.formCard.className}>
        <button className={styles.submitButton.className}>Submit</button>
        <button className={styles.cancelButton.className}>Cancel</button>
      </div>
    </div>
  );
}
```

### 4. Minimize Dynamic Classes
```tsx
// ✅ Good: Prefer standard Tailwind when possible
const { className } = useCssma('w-full bg-blue-500 p-4');

// ❌ Avoid: Unnecessary arbitrary values
const { className: bad } = useCssma('w-[100%] bg-[#3b82f6] p-[1rem]');
```

### 5. Component Composition with Named Styles
```tsx
// ✅ Good: Break complex styles into smaller, named components
function Card({ children, variant = 'default' }) {
  const styles = useCssmaMultiple({
    base: 'p-6 rounded-lg transition-all duration-200',
    default: 'bg-white shadow-md border border-gray-200',
    highlighted: 'bg-blue-50 shadow-lg border-2 border-blue-200',
    danger: 'bg-red-50 shadow-lg border-2 border-red-200'
  });
  
  const variantStyle = styles[variant] || styles.default;
  
  return (
    <div className={`${styles.base.className} ${variantStyle.className}`}>
      {children}
    </div>
  );
}
```

### 6. TypeScript Benefits with Object Approach
```tsx
// ✅ Good: TypeScript autocomplete and type safety
const styles = useCssmaMultiple({
  container: 'w-full',
  header: 'text-2xl',
  content: 'p-4'
});

// TypeScript will provide autocomplete for:
styles.container.className  // ✅ Autocomplete available
styles.header.className     // ✅ Autocomplete available  
styles.content.className    // ✅ Autocomplete available
// styles.nonExistent       // ❌ TypeScript error!
```

## 🔗 Related Packages

- **[cssma](../cssma)** - Core library for CSS ↔ Figma conversion
- **[cssma-plugin](../../apps/cssma-plugin)** - Figma plugin for design system integration

## 📖 Documentation

- [API Documentation](../../docs/specs/cssma-react.md)
- [Dynamic Conversion Guide](../../docs/specs/dynamic-conversion.md)
- [Main Documentation](../../docs/README.md)

## 📄 License

MIT License - see [LICENSE](../../LICENSE) file for details.

---

Made with ❤️ by the CSSMA team 