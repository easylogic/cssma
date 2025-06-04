# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Comprehensive documentation system in `docs/specs/`
- Technical specifications for all CSS/Figma conversion features
- Bidirectional conversion documentation (Figma → CSS)

### Changed
- Reorganized project documentation structure
- Improved README navigation and clarity
- Updated plugin documentation to English

## [0.3.0] - 2024-01-15

### Added
- **Filter Effects Support**
  - `blur-*` classes with full preset and arbitrary value support
  - `backdrop-blur-*` classes for background blur effects
  - `drop-shadow-*` classes with complex shadow definitions
- **Advanced Position System**
  - Constraint-based positioning (`center-x`, `center-y`, `stretch-x`, `stretch-y`, `scale-x`, `scale-y`)
  - Absolute positioning with MIN/MAX/CENTER/STRETCH/SCALE constraints
- **Component System**
  - `COMPONENT_SET` support with variant properties
  - `INSTANCE` creation and management
  - Advanced component variant system
- **Variable Integration**
  - Figma variables binding with `$[variable/path]` syntax
  - Support for color, number, string, and boolean variables

### Improved
- Enhanced color system with full Tailwind color palette
- Better gradient support (linear, radial, conic)
- Improved text styling with auto-sizing support
- More robust border and corner radius handling

### Fixed
- Border alignment issues with Figma's border positioning
- Gradient stop calculation accuracy
- Text auto-sizing behavior consistency

## [0.2.0] - 2023-12-10

### Added
- **Figma Plugin**
  - Real-time CSS/Figma conversion interface
  - Bulk operations for multiple elements
  - AI-powered design generation
- **Advanced Layout System**
  - Auto Layout support (`layoutMode`, `itemSpacing`, `padding`)
  - Flexbox alignment properties
  - Gap property support
- **Typography System**
  - Font family, size, weight support
  - Text alignment and case transformations
  - Line height and letter spacing

### Changed
- Improved parser performance for complex class strings
- Better error handling and validation
- Enhanced TypeScript type definitions

## [0.1.0] - 2023-11-20

### Added
- **Core Library (`@easylogic/cssma`)**
  - Basic CSS to Figma conversion (`processCssStyles`)
  - Figma to CSS conversion (`figmaToCss`)
  - Node creation with styles (`createNodeForData`)
- **Basic Property Support**
  - Layout properties (width, height, flex)
  - Color properties (background, text colors)
  - Border properties (width, radius, style)
  - Basic spacing (padding, margin)
- **Node Types**
  - FRAME, TEXT, RECTANGLE, ELLIPSE support
  - Basic GROUP and COMPONENT support
- **Documentation**
  - Initial API documentation
  - Basic usage examples

### Technical Details
- TypeScript implementation
- Jest testing framework
- ESLint and Prettier configuration
- Monorepo structure with pnpm

---

## Version History Summary

| Version | Release Date | Key Features |
|---------|-------------|--------------|
| **0.3.0** | 2024-01-15 | Filter effects, advanced positioning, components, variables |
| **0.2.0** | 2023-12-10 | Figma plugin, auto layout, typography, AI features |
| **0.1.0** | 2023-11-20 | Core library, basic properties, node creation |

## Migration Guides

### Upgrading to 0.3.0
- Variable syntax changed from `{variable.name}` to `$[variable/path]`
- Filter effects now use Figma's native effects API
- Position classes now use constraint system instead of basic positioning

### Upgrading to 0.2.0
- Auto Layout properties restructured for better Figma compatibility
- Text properties consolidated for consistency
- Plugin installation required for UI features

## Future Roadmap

### Planned Features
- [ ] Animation system (transitions, keyframes)
- [ ] Advanced transforms (rotate, scale, skew)
- [ ] Design token management
- [ ] Component documentation generation
- [ ] React/Vue.js integration
- [ ] Enhanced AI capabilities

### Community Requests
- [ ] Figma Dev Mode integration
- [ ] Design system analytics
- [ ] Custom property extensions
- [ ] Batch processing improvements

---

**Note**: This changelog follows semantic versioning. Breaking changes are clearly marked and include migration instructions. 