# CSSMA Figma Plugin

A powerful Figma plugin that brings the cssma library directly into the Figma interface, enabling seamless conversion between CSS/Tailwind and Figma styles.

## 🚀 Features

### ⚡ **Real-time CSS Preview**
- **Live Preview System**: See CSS changes instantly as you type
- **Error Handling**: Real-time validation with helpful error messages
- **Style Inspector**: View applied styles in a detailed breakdown
- **Toggle Control**: Enable/disable preview for better performance

### 🔄 **Bidirectional Conversion**
- **CSS → Figma**: Convert CSS/Tailwind classes to Figma styles
- **Figma → CSS**: Extract clean CSS code from selected elements
- **Bulk Operations**: Apply styles to multiple elements simultaneously

### 🎨 **Design System Integration**
- **Component Creation**: Generate Figma components from CSS specifications
- **Variable Support**: Work with Figma variables and design tokens
- **Style Analysis**: Analyze existing designs and extract patterns

### 🤖 **AI-Powered Generation**
- **Smart Design Creation**: Generate designs from natural language descriptions
- **Template Library**: Pre-built templates for common UI patterns
- **Context-Aware Suggestions**: Intelligent recommendations based on current selection

## 📖 Usage

### Live Preview

The live preview system provides real-time feedback as you write CSS:

1. **Enable Preview**: Click the eye icon to enable live preview
2. **Type CSS**: Enter CSS or Tailwind classes in the text area
3. **See Changes**: Watch your styles update instantly in the preview area
4. **Debug Issues**: Error messages appear immediately for invalid CSS

```css
/* Example: Try typing these classes */
w-64 h-32 bg-blue-500 text-white rounded-lg p-4 shadow-lg

/* Or custom CSS */
width: 200px;
height: 100px;
background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
border-radius: 12px;
```

### CSS Converter

1. **Select Element**: Choose a Figma element you want to style
2. **Enter CSS**: Type CSS or Tailwind classes in the input area
3. **Preview Changes**: See live preview of your styles (if enabled)
4. **Apply Styles**: Click "Apply Styles" to update the selected element

### Component Creator

1. **Choose Template**: Select from pre-built examples or create custom
2. **Edit Specification**: Modify the JSON specification as needed
3. **Generate Component**: Click "Create Component" to generate in Figma

### AI Generator

1. **Describe Design**: Enter a natural language description
2. **Generate**: Let AI create the design specification
3. **Customize**: Modify the generated design as needed
4. **Create**: Generate the final component in Figma

## 🛠️ Development

### Prerequisites

- Node.js 16+
- pnpm
- Figma Desktop App

### Setup

```bash
# Install dependencies
pnpm install

# Build the plugin
pnpm build

# Development mode with watch
pnpm dev
```

### Project Structure

```
src/
├── components/
│   ├── LivePreview.tsx      # Real-time CSS preview
│   ├── CssConverter.tsx     # CSS conversion interface
│   ├── ComponentEditor.tsx  # Component creation
│   └── ui/                  # Shared UI components
├── hooks/
│   └── useLocalStorage.ts   # Local storage utilities
├── services/
│   └── anthropic.ts         # AI integration
└── types/
    └── index.ts             # Type definitions
```

## 🎯 Key Features in Detail

### Live Preview System

The live preview system offers several advanced features:

- **Debounced Updates**: Prevents excessive re-renders while typing
- **Error Boundaries**: Graceful error handling with user-friendly messages
- **Style Conversion**: Automatic conversion between Figma and web styles
- **Performance Optimized**: Efficient rendering with minimal impact

### Supported CSS Properties

| Category | Properties | Example |
|----------|------------|---------|
| **Layout** | width, height, display, flex | `w-64 h-32 flex` |
| **Colors** | background, text, border colors | `bg-blue-500 text-white` |
| **Spacing** | padding, margin, gap | `p-4 m-2 gap-4` |
| **Typography** | font-size, weight, family | `text-lg font-bold` |
| **Effects** | shadows, blur, opacity | `shadow-lg blur-sm opacity-75` |
| **Borders** | radius, width, style | `rounded-lg border-2` |

## 🔧 Configuration

### Preview Settings

The live preview can be configured through the UI:

- **Enable/Disable**: Toggle preview on/off for performance
- **Auto-refresh**: Automatic updates as you type (300ms debounce)
- **Error Display**: Show/hide detailed error information

### Local Storage

User preferences are automatically saved:

- Preview enabled state
- Last used CSS input
- Selected templates and examples

## 🚀 Performance

### Optimization Features

- **Debounced Input**: 300ms delay prevents excessive processing
- **Memoized Rendering**: React.memo and useMemo for efficient updates
- **Lazy Loading**: Components load only when needed
- **Error Boundaries**: Prevent crashes from invalid CSS

### Best Practices

1. **Use Preview Sparingly**: Disable for complex operations
2. **Batch Operations**: Apply styles to multiple elements at once
3. **Cache Results**: Leverage local storage for repeated operations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.

## 🔗 Links

- **[Main Repository](../../README.md)**
- **[CSSMA Library](../../packages/cssma/README.md)**
- **[Documentation](../../docs/)**
- **[Figma Community](https://www.figma.com/community/plugin/cssma)** 