# FigmAI - AI-Powered Design Tools

A powerful Figma plugin that revolutionizes design workflow with AI-powered tools for CSS conversion, component creation, and intelligent design generation.

## ✨ Features

- **🔄 CSS Converter**: Convert Figma elements to CSS/TailwindCSS classes instantly
- **🎨 Component Creator**: Generate complete Figma components from JSON specifications  
- **🤖 AI Generator**: Create professional designs automatically using Claude AI
- **⚡ Real-time Preview**: See CSS changes applied to Figma elements immediately
- **📋 Copy to Clipboard**: One-click copying of generated CSS code

## 🚀 Quick Start

### Installation

#### Option 1: Figma Community (Recommended)
1. Search for **"FigmAI"** in the Figma Community
2. Click **"Install"** to add it to your plugins

#### Option 2: Manual Installation (Development)
1. Clone this repository
2. Run `pnpm install && pnpm run build`
3. In Figma: **Plugins** → **Development** → **Import plugin from manifest**
4. Select the `manifest.json` file from the plugin directory

### Basic Usage

1. **Open the plugin**: Right-click in Figma → **Plugins** → **FigmAI**
2. **Select any element** in your Figma design
3. **Choose a tab**:
   - **CSS Converter**: View generated CSS/TailwindCSS
   - **Component Creator**: Build components from JSON
   - **AI Generator**: Create designs with natural language

## 🛠️ Setup for AI Features

To unlock AI-powered design generation, you'll need an Anthropic API key:

### 1. Get Your API Key
1. Visit [Anthropic Console](https://console.anthropic.com/)
2. Sign up or log in to your account
3. Navigate to **API Keys** and create a new key

### 2. Configure Environment
Create a `.env` file in the project root:

```bash
# .env
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

### 3. Build & Deploy
```bash
pnpm install
pnpm run build
```

## 📖 How to Use

### CSS Converter Tab
- **Select** any Figma element (frame, text, shape, etc.)
- **View** the automatically generated CSS/TailwindCSS code
- **Copy** the code to your clipboard with one click
- **Apply** CSS classes back to selected elements

### Component Creator Tab
- **Write** JSON specifications for complex components
- **Generate** complete Figma components with proper structure
- **Analyze** existing designs to extract component specs
- **Supports** nested layouts, styling, and interactions

### AI Generator Tab
- **Describe** your design needs in plain English
- **Generate** complete, professional designs automatically
- **Customize** generated designs with follow-up requests
- **Export** as organized Figma components

#### Example AI Prompts:
```
Create a modern SaaS landing page with:
- Hero section with compelling headline and CTA
- Feature showcase with 3 cards highlighting key benefits  
- Social proof section with customer testimonials
- Clean design with blue accent colors and generous spacing
```

```
Design a mobile app onboarding flow:
- Welcome screen with app logo and tagline
- 3 feature introduction screens with illustrations
- Sign up form with email and password fields
- Modern, friendly design with purple gradient accents
```

## 🔧 Development

```bash
# Start development server
pnpm run dev

# Build for production  
pnpm run build

# Watch mode (rebuilds on changes)
pnpm run dev
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](../../CONTRIBUTING.md) for details.

## 📄 License

This plugin is part of the **FigmaikR** project and is licensed under the MIT License.

---

**Made with ❤️ by the FigmaikR team** 