# figm.ai.kr

A design system toolkit for Figma that bridges the gap between design and code.

## Project Structure

The project focuses on two main packages:

### @easylogic/cssma

Core library for CSS/Tailwind to Figma conversion and vice versa.

#### Supported Features

- [x] Positioning (absolute, relative, fixed)
- [x] Layout (flex, grid, etc.)
- [x] Color (background, text, border, fill)
- [x] Typography (font, font size, font weight, etc.)
- [x] Spacing (padding, margin, gap)
- [x] Border (border width, border radius, border color)
- [x] Shadow (shadow color, shadow offset, shadow blur)
- [x] Background Images (url, scale modes, positioning)
- [x] Vector Fill (fill colors for SVG/vector elements)
- [x] Node Builders (FRAME, TEXT, RECTANGLE, ELLIPSE, POLYGON, STAR, LINE, VECTOR, GROUP, COMPONENT, BOOLEAN_OPERATION, SECTION, COMPONENT_SET, INSTANCE)
- [x] Gradient Support (linear, radial, conic gradients with proper class names)

#### TODO
- [ ] Animation (transition, keyframes)
- [ ] Advanced CSS properties (transform, filter, backdrop-filter)
- [ ] Component variant management
- [ ] Design token export and import
- [ ] Component export and import
- [ ] Performance optimizations for large design systems



### cssma-plugin

Figma plugin implementation that uses the @easylogic/cssma library.

## Key Features

- Bi-directional conversion between Tailwind CSS and Figma styles
- Support for Figma's constraint system (MIN, MAX, CENTER, STRETCH, SCALE)
- Component variant management
- Design token export and import
