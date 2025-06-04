# Typography Specification

This specification covers text styling, fonts, and text alignment for Figma text nodes.

## Font Properties

### Font Family
```typescript
// System fonts
font-sans      → fontName: { family: "Inter", style: "Regular" }
font-serif     → fontName: { family: "Times New Roman", style: "Regular" }
font-mono      → fontName: { family: "SF Mono", style: "Regular" }

// Custom fonts
font-['Inter'] → fontName: { family: "Inter", style: "Regular" }
font-['Helvetica_Neue'] → fontName: { family: "Helvetica Neue", style: "Regular" }
```

### Font Weight
```typescript
// Numeric weights
font-[100]     → fontName: { family: currentFamily, style: "Thin" }
font-[200]     → fontName: { family: currentFamily, style: "Extra Light" }
font-[300]     → fontName: { family: currentFamily, style: "Light" }
font-[400]     → fontName: { family: currentFamily, style: "Regular" }
font-[500]     → fontName: { family: currentFamily, style: "Medium" }
font-[600]     → fontName: { family: currentFamily, style: "Semi Bold" }
font-[700]     → fontName: { family: currentFamily, style: "Bold" }
font-[800]     → fontName: { family: currentFamily, style: "Extra Bold" }
font-[900]     → fontName: { family: currentFamily, style: "Black" }

// Named weights
font-thin      → fontName: { family: currentFamily, style: "Thin" }
font-light     → fontName: { family: currentFamily, style: "Light" }
font-normal    → fontName: { family: currentFamily, style: "Regular" }
font-medium    → fontName: { family: currentFamily, style: "Medium" }
font-semibold  → fontName: { family: currentFamily, style: "Semi Bold" }
font-bold      → fontName: { family: currentFamily, style: "Bold" }
font-extrabold → fontName: { family: currentFamily, style: "Extra Bold" }
font-black     → fontName: { family: currentFamily, style: "Black" }
```

### Font Size
```typescript
// Arbitrary values (numbers and colors both handled by text-[...])
text-[14]      → fontSize: 14  (if value is numeric)
text-[16px]    → fontSize: 16  (if value is numeric with px)

// Preset sizes (from FONT_SIZES config)
text-xs        → fontSize: 12
text-sm        → fontSize: 14
text-base      → fontSize: 16
text-lg        → fontSize: 18
text-xl        → fontSize: 20
text-2xl       → fontSize: 24
text-3xl       → fontSize: 30
text-4xl       → fontSize: 36
text-5xl       → fontSize: 48
text-6xl       → fontSize: 60

// Note: text-[...] can handle both fontSize (numbers) and color (color values)
// The parser automatically detects the value type
```

### Line Height
```typescript
// Relative line heights
leading-none      → lineHeight: { unit: "PERCENT", value: 100 }
leading-tight     → lineHeight: { unit: "PERCENT", value: 125 }
leading-snug      → lineHeight: { unit: "PERCENT", value: 137.5 }
leading-normal    → lineHeight: { unit: "PERCENT", value: 150 }
leading-relaxed   → lineHeight: { unit: "PERCENT", value: 162.5 }
leading-loose     → lineHeight: { unit: "PERCENT", value: 200 }

// Absolute line heights
leading-[20px]    → lineHeight: { unit: "PIXELS", value: 20 }
leading-[1.5]     → lineHeight: { unit: "PERCENT", value: 150 }
```

## Text Color

### Solid Colors
```typescript
// Direct colors
text-[#FF0000]    → fills: [{ type: "SOLID", color: { r: 1, g: 0, b: 0 } }]
text-[rgb(255,0,0)] → fills: [{ type: "SOLID", color: { r: 1, g: 0, b: 0 } }]

// Preset colors
text-black        → fills: [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }]
text-white        → fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }]
text-gray-500     → fills: [{ type: "SOLID", color: { r: 0.42, g: 0.45, b: 0.51 } }]

// With opacity
text-red-500/50   → fills: [{ 
  type: "SOLID", 
  color: { r: 0.94, g: 0.27, b: 0.27 },
  opacity: 0.5 
}]
```

## Text Alignment

### Horizontal Alignment
```typescript
text-left      → textAlignHorizontal: "LEFT"
text-center    → textAlignHorizontal: "CENTER"
text-right     → textAlignHorizontal: "RIGHT"
text-justify   → textAlignHorizontal: "JUSTIFIED"
```

### Vertical Alignment
```typescript
text-top       → textAlignVertical: "TOP"
text-middle    → textAlignVertical: "CENTER"
text-bottom    → textAlignVertical: "BOTTOM"
```

## Text Decoration

### Text Decoration Line
```typescript
underline      → textDecoration: "UNDERLINE"
line-through   → textDecoration: "STRIKETHROUGH"
no-underline   → textDecoration: "NONE"
```

### Text Transform
```typescript
uppercase      → textCase: "UPPER"
lowercase      → textCase: "LOWER"
capitalize     → textCase: "TITLE"
normal-case    → textCase: "ORIGINAL"
```

## Text Styling

### Font Style
```typescript
italic         → fontName: { family: currentFamily, style: currentStyle + " Italic" }
not-italic     → fontName: { family: currentFamily, style: currentStyle.replace(" Italic", "") }
```

### Letter Spacing
```typescript
// Relative spacing
tracking-tighter  → letterSpacing: { unit: "PERCENT", value: -5 }
tracking-tight    → letterSpacing: { unit: "PERCENT", value: -2.5 }
tracking-normal   → letterSpacing: { unit: "PERCENT", value: 0 }
tracking-wide     → letterSpacing: { unit: "PERCENT", value: 2.5 }
tracking-wider    → letterSpacing: { unit: "PERCENT", value: 5 }
tracking-widest   → letterSpacing: { unit: "PERCENT", value: 10 }

// Absolute spacing
tracking-[0.5px]  → letterSpacing: { unit: "PIXELS", value: 0.5 }
tracking-[2em]    → letterSpacing: { unit: "PERCENT", value: 200 }
```

## Text Layout

### Text Auto Resize
```typescript
// Auto resize behavior
resize-none    → textAutoResize: "NONE"
resize-width   → textAutoResize: "WIDTH_AND_HEIGHT"
resize-height  → textAutoResize: "HEIGHT"
```

### Text Truncation
```typescript
// Text overflow
truncate       → textTruncation: "ENDING"
text-ellipsis  → textTruncation: "ENDING"
text-clip      → textTruncation: "DISABLED"
```

## Variable Binding

### Font Variables
```typescript
// Font family binding (actual implementation)
font-$[typography/heading] → boundVariables: {
  fontFamily: { type: "VARIABLE_ALIAS", id: "typography/heading" }
}

// Font size binding  
text-$[typography/size/lg] → boundVariables: {
  fontSize: { type: "VARIABLE_ALIAS", id: "typography/size/lg" }
}

// Color binding
text-$[color/primary]      → boundVariables: {
  color: { type: "VARIABLE_ALIAS", id: "color/primary" }
}
```

## Usage Examples

### Basic Text Styling
```typescript
{
  "type": "TEXT",
  "name": "Heading",
  "styles": "text-2xl font-bold text-gray-900"
}
// Result:
// fontSize: 24
// fontName: { family: "Inter", style: "Bold" }
// fills: [{ type: "SOLID", color: { r: 0.07, g: 0.09, b: 0.11 } }]
```

### Centered Text with Custom Font
```typescript
{
  "type": "TEXT",
  "name": "Title",
  "styles": "font-['Helvetica'] font-medium text-center text-lg leading-tight"
}
// Result:
// fontName: { family: "Helvetica", style: "Medium" }
// textAlignHorizontal: "CENTER"
// fontSize: 18
// lineHeight: { unit: "PERCENT", value: 125 }
```

### Text with Letter Spacing
```typescript
{
  "type": "TEXT",
  "name": "Label",
  "styles": "text-sm uppercase tracking-wider text-gray-600"
}
// Result:
// fontSize: 14
// textCase: "UPPER"
// letterSpacing: { unit: "PERCENT", value: 5 }
// fills: [{ type: "SOLID", color: { r: 0.29, g: 0.33, b: 0.38 } }]
```

### Variable-bound Typography
```typescript
{
  "type": "TEXT",
  "name": "Dynamic Text",
  "styles": "text-{typography.body} font-{typography.weight.medium} text-{color.text.primary}"
}
// Result:
// boundVariables: {
//   fontSize: { type: "VARIABLE_ALIAS", id: "fontSizeVar" },
//   fontFamily: { type: "VARIABLE_ALIAS", id: "fontWeightVar" },
//   color: { type: "VARIABLE_ALIAS", id: "colorVar" }
// }
```

## Notes and Constraints

### Font Processing Rules
1. **Font Loading**: Fonts must be available in Figma
2. **Style Mapping**: Weight names are mapped to available styles
3. **Fallbacks**: System fonts are used when custom fonts are unavailable
4. **Case Sensitivity**: Font names are case-sensitive

### Text Layout Rules
1. **Auto Resize**: Default behavior is WIDTH_AND_HEIGHT
2. **Text Bounds**: Text bounds adjust based on auto resize setting
3. **Overflow**: Truncation only works with fixed-width text boxes
4. **Alignment**: Vertical alignment requires fixed height

### Variable Binding Rules
1. **Type Matching**: Variable types must match property types
2. **Scope**: Variables must be available in current context
3. **Fallbacks**: Default values used when variables are unavailable
4. **Dynamic Updates**: Text updates when bound variables change

### Performance Considerations
1. **Font Caching**: Use system fonts for better performance
2. **Text Rendering**: Avoid excessive text styling combinations
3. **Variable Resolution**: Minimize variable binding depth
4. **Layout Calculation**: Fixed sizes perform better than auto-resize

### Figma Limitations
1. **Font Styles**: Limited to available font styles in Figma
2. **Text Features**: No support for advanced typography features
3. **Unicode**: Limited support for complex text rendering
4. **Embedding**: Custom fonts must be embedded or available locally 