# CSSMA Plugin

A powerful Figma plugin that provides bidirectional conversion between Figma and TailwindCSS.

## Features

- **CSS Converter**: Convert Figma elements to CSS/TailwindCSS
- **Component Creator**: Generate Figma components from JSON specifications
- **AI Generator**: Automatic design generation powered by Claude AI

## Setup for AI Features

To use the AI Generator tab, you need an Anthropic API key.

### 1. Get Anthropic API Key
1. Visit [Anthropic Console](https://console.anthropic.com/)
2. Create an account or login
3. Generate a new API key from the API Keys menu

### 2. Environment Variables
Create a `.env` file in the project root:

```bash
# .env file
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

### 3. Build and Run
```bash
pnpm install
pnpm run build
```

## Development

```bash
# Start development server
pnpm run dev

# Build for production
pnpm run build
```

## Using AI Generator

1. Click the **AI Generator** tab
2. Select a sample design from the dropdown, or
3. Enter your design request in the chat box below
4. AI will generate the design and automatically place it on the Figma canvas

### Example Prompts:
```
Create a clean SaaS landing page.
Include a hero section with a large title and description,
below that add a 3-card section showcasing key features,
and finally a customer testimonials section.
Use a bright tone with blue accents throughout,
and ensure generous spacing for improved readability.
```

## Installation

### From Figma Community
1. Search for "CSSMA" in the Figma Community
2. Install the plugin directly

### Manual Installation (Development)
1. Clone this repository
2. Run `pnpm install` and `pnpm run build`
3. In Figma, go to Plugins → Development → Import plugin from manifest
4. Select the `manifest.json` file from the plugin directory

## Usage

### CSS Converter Tab
- Select any Figma element
- View the generated CSS/TailwindCSS code
- Copy code to clipboard for use in your project

### Component Creator Tab
- Write JSON specifications for your components
- Generate complete Figma components with proper structure
- Supports complex layouts and styling

### AI Generator Tab
- Describe your design needs in natural language
- AI generates complete designs with proper styling
- Automatically creates organized component structures

## License

This plugin is part of the FigmaikR project and is licensed under the MIT License. 