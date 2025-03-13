# Tailwind CSS to Figma Style Conversion Specification

## Layout Properties

```typescript
// Flex Layout
flex-row        → layoutMode: "HORIZONTAL"
flex-col        → layoutMode: "VERTICAL"

// Size
w-full          → layoutSizingHorizontal: "FILL"
w-auto          → layoutSizingHorizontal: "HUG"
w-[100]         → width: 100
h-full          → layoutSizingVertical: "FILL"
h-auto          → layoutSizingVertical: "HUG"
h-[100]         → height: 100

// Alignment
justify-start   → primaryAxisAlignItems: "MIN"
justify-center  → primaryAxisAlignItems: "CENTER"
justify-end     → primaryAxisAlignItems: "MAX"
justify-between → primaryAxisAlignItems: "SPACE_BETWEEN"

items-start     → counterAxisAlignItems: "MIN"
items-center    → counterAxisAlignItems: "CENTER"
items-end       → counterAxisAlignItems: "MAX"
items-baseline  → counterAxisAlignItems: "BASELINE"

// Spacing
gap-[16]        → itemSpacing: 16
gap-x-[16]      → itemSpacing: 16 (in HORIZONTAL layout)
gap-y-[16]      → counterAxisSpacing: 16 (in VERTICAL layout)
p-[16]          → padding: 16
px-[16]         → paddingLeft: 16, paddingRight: 16
py-[16]         → paddingTop: 16, paddingBottom: 16
pt-[16]         → paddingTop: 16
pr-[16]         → paddingRight: 16
pb-[16]         → paddingBottom: 16
pl-[16]         → paddingLeft: 16
```

## Position Properties

```typescript
// Position Type
absolute       → layoutPositioning: "ABSOLUTE"
relative       → layoutPositioning: "AUTO"

// Basic Positioning
// Omit when x=0 or y=0 (default values)
left-[10]      → x: 10, constraints: { horizontal: "MIN" }
top-[10]       → y: 10, constraints: { vertical: "MIN" }

// Always include even when x=0 or y=0
right-[10]     → x: 10, constraints: { horizontal: "MAX" }
bottom-[10]    → y: 10, constraints: { vertical: "MAX" }

// Center Positioning
center-x       → constraints: { horizontal: "CENTER" }
center-y       → constraints: { vertical: "CENTER" }

// Center with Offset
// Include left/right or top/bottom only when offset exists
center-x left-[10]  → constraints: { horizontal: "CENTER" }, x: 10
center-y top-[10]   → constraints: { vertical: "CENTER" }, y: 10

// Stretch Positioning
stretch-x      → constraints: { horizontal: "STRETCH" }
stretch-y      → constraints: { vertical: "STRETCH" }

// Stretch with Margins
// Omit left/top when 0, always include right/bottom
stretch-x left-[10]  → constraints: { horizontal: "STRETCH" }, x: 10
stretch-y top-[10]   → constraints: { vertical: "STRETCH" }, y: 10

// Scale Positioning
scale-x        → constraints: { horizontal: "SCALE" }
scale-y        → constraints: { vertical: "SCALE" }

// Scale with Margins
// Omit left/top when 0, always include right/bottom
scale-x left-[10]   → constraints: { horizontal: "SCALE" }, x: 10
scale-y top-[10]    → constraints: { vertical: "SCALE" }, y: 10

// Z-index (omit when 0)
z-[10]         → order: 10
```

### Position Value Rules

1. **Default Value Handling**
   - `left`/`top`: Omit class when value is 0 (default)
   - `right`/`bottom`: Always include class even when value is 0
   - `z-index`: Omit class when value is 0

2. **Center Alignment (CENTER)**
   - Basic: Only include `center-x`, `center-y` classes
   - With offset: Add `left`/`right` or `top`/`bottom` classes

3. **Stretch Behavior (STRETCH)**
   - Basic: Only include `stretch-x`, `stretch-y` classes
   - With margins: 
     - Omit `left`/`top` when value is 0
     - Always include `right`/`bottom`

4. **Scale Behavior (SCALE)**
   - Basic: Only include `scale-x`, `scale-y` classes
   - With margins:
     - Omit `left`/`top` when value is 0
     - Always include `right`/`bottom`

### Examples

```typescript
// Basic positioning (omit left/top when 0)
"absolute left-[10px] top-[20px]"
→ {
  layoutPositioning: "ABSOLUTE",
  x: 10,
  y: 20,
  constraints: { 
    horizontal: "MIN",
    vertical: "MIN"
  }
}

// Center alignment (no offset)
"absolute center-x center-y"
→ {
  layoutPositioning: "ABSOLUTE",
  constraints: { 
    horizontal: "CENTER",
    vertical: "CENTER"
  }
}

// Center alignment (with offset)
"absolute center-x left-[50px] right-[50px]"
→ {
  layoutPositioning: "ABSOLUTE",
  x: 50,
  constraints: { 
    horizontal: "CENTER",
    vertical: "AUTO"
  }
}

// Stretch (no margins)
"absolute stretch-x stretch-y"
→ {
  layoutPositioning: "ABSOLUTE",
  constraints: { 
    horizontal: "STRETCH",
    vertical: "STRETCH"
  }
}

// Stretch (with margins)
"absolute stretch-x left-[10px] right-[10px]"
→ {
  layoutPositioning: "ABSOLUTE",
  x: 10,
  constraints: { 
    horizontal: "STRETCH",
    vertical: "AUTO"
  }
}
```

## Color Properties

```typescript
// Solid Colors
bg-[#FF0000]    → fills: [{ type: "SOLID", color: { r: 1, g: 0, b: 0 } }]
text-[#FF0000]  → fills: [{ type: "SOLID", color: { r: 1, g: 0, b: 0 } }]
bg-transparent  → fills: []
bg-white        → fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 } }]
bg-black        → fills: [{ type: "SOLID", color: { r: 0, g: 0, b: 0 } }]

// Opacity
bg-white/50     → fills: [{ type: "SOLID", color: { r: 1, g: 1, b: 1 }, opacity: 0.5 }]
bg-[#FF0000]/75 → fills: [{ type: "SOLID", color: { r: 1, g: 0, b: 0 }, opacity: 0.75 }]

// Gradients
bg-gradient-to-r from-[#FF0000] to-[#0000FF] →
fills: [{
  type: "GRADIENT_LINEAR",
  gradientStops: [
    { position: 0, color: { r: 1, g: 0, b: 0 } },
    { position: 1, color: { r: 0, g: 0, b: 1 } }
  ],
  gradientTransform: [[1, 0, 0], [0, 1, 0]]
}]
```

## Typography Properties

```typescript
// Font Size
text-xs        → fontSize: 12
text-sm        → fontSize: 14
text-base      → fontSize: 16
text-lg        → fontSize: 18
text-xl        → fontSize: 20
text-2xl       → fontSize: 24
text-3xl       → fontSize: 30
text-[20]      → fontSize: 20

// Font Weight
font-thin      → fontName: { family: "Inter", style: "Thin" }
font-normal    → fontName: { family: "Inter", style: "Regular" }
font-medium    → fontName: { family: "Inter", style: "Medium" }
font-bold      → fontName: { family: "Inter", style: "Bold" }

// Text Alignment
text-left      → textAlignHorizontal: "LEFT"
text-center    → textAlignHorizontal: "CENTER"
text-right     → textAlignHorizontal: "RIGHT"
text-justify   → textAlignHorizontal: "JUSTIFIED"

// Text Transform
uppercase      → textCase: "UPPER"
lowercase      → textCase: "LOWER"
capitalize     → textCase: "TITLE"
normal-case    → textCase: "ORIGINAL"

// Line Height
leading-none   → lineHeight: { value: 100, unit: "PERCENT" }
leading-tight  → lineHeight: { value: 125, unit: "PERCENT" }
leading-normal → lineHeight: { value: 150, unit: "PERCENT" }
leading-[24px] → lineHeight: { value: 24, unit: "PIXELS" }

// Letter Spacing
tracking-tight  → letterSpacing: -0.4
tracking-normal → letterSpacing: 0
tracking-wide   → letterSpacing: 0.4
tracking-[0.5]  → letterSpacing: 0.5

// Text Auto Resize
text-auto-none → textAutoResize: "NONE"
text-auto      → textAutoResize: "WIDTH_AND_HEIGHT"
text-auto-h    → textAutoResize: "HEIGHT"
text-truncate  → textAutoResize: "TRUNCATE"
```

## Border Properties

```typescript
// Border Width
border         → strokeWeight: 1
border-2       → strokeWeight: 2
border-[3]     → strokeWeight: 3

// Border Color
border-[#FF0000] → strokes: [{ type: "SOLID", color: { r: 1, g: 0, b: 0 } }]

// Border Style
border-solid   → strokeAlign: "CENTER", dashPattern: []
border-dashed  → strokeAlign: "CENTER", dashPattern: [4, 4]
border-dotted  → strokeAlign: "CENTER", dashPattern: [1, 2]

// Border Radius
rounded-none   → cornerRadius: 0
rounded-sm     → cornerRadius: 2
rounded        → cornerRadius: 4
rounded-lg     → cornerRadius: 8
rounded-full   → cornerRadius: 9999
rounded-[10]   → cornerRadius: 10

// Individual Corner Radius
rounded-t-lg   → topLeftRadius: 8, topRightRadius: 8
rounded-r-lg   → topRightRadius: 8, bottomRightRadius: 8
rounded-b-lg   → bottomLeftRadius: 8, bottomRightRadius: 8
rounded-l-lg   → topLeftRadius: 8, bottomLeftRadius: 8
```

## Effect Properties

```typescript
// Shadows
shadow-sm      → effects: [{ type: "DROP_SHADOW", radius: 2, offset: { x: 0, y: 1 }, color: { r: 0, g: 0, b: 0, a: 0.05 } }]
shadow-md      → effects: [{ type: "DROP_SHADOW", radius: 6, offset: { x: 0, y: 3 }, color: { r: 0, g: 0, b: 0, a: 0.1 } }]
shadow-lg      → effects: [{ type: "DROP_SHADOW", radius: 15, offset: { x: 0, y: 4 }, color: { r: 0, g: 0, b: 0, a: 0.15 } }]

// Opacity
opacity-[0.5]  → opacity: 0.5
```

## Variable References

```typescript
// Color Variables
bg-$[colors/primary]    → fills: setBoundVariableForPaint("fills", variable)
text-$[colors/text]     → fills: setBoundVariableForPaint("fills", variable)
border-$[colors/border] → strokes: setBoundVariableForPaint("strokes", variable)

// Number Variables
p-$[spacing/sm]        → padding: setBoundVariableForNumber("padding", variable)
gap-$[spacing/md]      → itemSpacing: setBoundVariableForNumber("itemSpacing", variable)
text-$[size/body]      → fontSize: setBoundVariableForNumber("fontSize", variable)

// Boolean Variables
hidden-$[state/isHidden] → visible: setBoundVariableForBoolean("visible", variable)
``` 