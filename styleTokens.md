# Figma Plugin Style Token Conversion Rules

## Overview
This document explains how to implement a Figma node styling system using syntax similar to Tailwind CSS. Style tokens help maintain consistency in design systems and efficiently style design elements in Figma.

## Layout-Related Styles

### Layout Direction
| Style Token | Figma Property | Description |
|------------|-----------|------|
| `flex-col` | `layoutMode: "VERTICAL"` | Vertical layout |
| `flex-row` | `layoutMode: "HORIZONTAL"` | Horizontal layout |
| `wrap` | `layoutWrap: "WRAP"` | Wraps elements to the next line |
| `no-wrap` | `layoutWrap: "NO_WRAP"` | Prevents wrapping |

### Overflow
| Style Token | Figma Property | Description |
|------------|-----------|------|
| `overflow-visible` | `clipsContent: false` | Content can overflow container |
| `overflow-hidden` | `clipsContent: true` | Content is clipped to container |

### Rotation
| Style Token | Figma Property | Description |
|------------|-----------|------|
| `rotate-45` | `rotation: 45` | Rotates element 45 degrees |
| `rotate-90` | `rotation: 90` | Rotates element 90 degrees |
| `rotate-180` | `rotation: 180` | Rotates element 180 degrees |
| `rotate-270` | `rotation: 270` | Rotates element 270 degrees |

### Alignment
| Style Token | Figma Property | Description |
|------------|-----------|------|
| `items-start` | `counterAxisAlignItems: "MIN"` | Cross-axis start alignment |
| `items-center` | `counterAxisAlignItems: "CENTER"` | Cross-axis center alignment |
| `items-end` | `counterAxisAlignItems: "MAX"` | Cross-axis end alignment |
| `items-baseline` | `counterAxisAlignItems: "BASELINE"` | Cross-axis baseline alignment |
| `justify-start` | `primaryAxisAlignItems: "MIN"` | Main-axis start alignment |
| `justify-center` | `primaryAxisAlignItems: "CENTER"` | Main-axis center alignment |
| `justify-end` | `primaryAxisAlignItems: "MAX"` | Main-axis end alignment |
| `justify-between` | `primaryAxisAlignItems: "SPACE_BETWEEN"` | Main-axis space-between alignment |

### Size
| Style Token | Figma Property | Description |
|------------|-----------|------|
| `w-full` | `layoutSizingHorizontal: "FILL"` | Fill parent width (requires layout mode) |
| `w-auto` | `layoutSizingHorizontal: "HUG"` | Width that fits content (requires layout mode) |
| `w-hug` | `layoutSizingHorizontal: "HUG"` | Width that fits content (requires layout mode) |
| `h-full` | `layoutSizingVertical: "FILL"` | Fill parent height (requires layout mode) |
| `h-auto` | `layoutSizingVertical: "HUG"` | Height that fits content (requires layout mode) |
| `h-hug` | `layoutSizingVertical: "HUG"` | Height that fits content (requires layout mode) |
| `w-[number]` | Fixed width (pixels) | Example: `w-[390]` = 390px width |
| `h-[number]` | Fixed height (pixels) | Example: `h-[100]` = 100px height |

## Spacing and Padding

### Spacing (Gap)
| Style Token | Figma Property | Description |
|------------|-----------|------|
| `gap-2` | `itemSpacing: 8` | 8px spacing |
| `gap-4` | `itemSpacing: 16` | 16px spacing |
| `gap-6` | `itemSpacing: 24` | 24px spacing |
| `gap-8` | `itemSpacing: 32` | 32px spacing |
| `gap-[number]` | `itemSpacing: number` | Custom spacing (pixels) |

### Padding
| Style Token | Figma Property | Description |
|------------|-----------|------|
| `p-2` | 8px padding in all directions | 8px padding on all sides |
| `p-4` | 16px padding in all directions | 16px padding on all sides |
| `p-6` | 24px padding in all directions | 24px padding on all sides |
| `p-8` | 32px padding in all directions | 32px padding on all sides |
| `px-2` | 8px horizontal padding | 8px padding on left and right |
| `px-4` | 16px horizontal padding | 16px padding on left and right |
| `px-6` | 24px horizontal padding | 24px padding on left and right |
| `px-8` | 32px horizontal padding | 32px padding on left and right |
| `py-2` | 8px vertical padding | 8px padding on top and bottom |
| `py-4` | 16px vertical padding | 16px padding on top and bottom |
| `py-6` | 24px vertical padding | 24px padding on top and bottom |
| `py-8` | 32px vertical padding | 32px padding on top and bottom |
| `p-[number]` | Custom padding in all directions | Example: `p-[16]` = 16px padding |
| `px-[number]` | Custom horizontal padding | Example: `px-[16]` = 16px padding on left and right |
| `py-[number]` | Custom vertical padding | Example: `py-[16]` = 16px padding on top and bottom |
| `pt-[number]` | Custom top padding | Example: `pt-[12]` = 12px top padding |
| `pb-[number]` | Custom bottom padding | Example: `pb-[8]` = 8px bottom padding |

## Colors and Backgrounds

### Background Colors
| Style Token | Figma Property | Description |
|------------|-----------|------|
| `bg-white` | White background | RGB(1, 1, 1) |
| `bg-black` | Black background | RGB(0, 0, 0) |
| `bg-gray` | Gray background | RGB(0.95, 0.95, 0.95) |
| `bg-blue` | Blue background | RGB(0.9, 0.95, 1) |
| `bg-red` | Red background | RGB(1, 0.9, 0.9) |
| `bg-green` | Green background | RGB(0.9, 1, 0.9) |
| `bg-transparent` | Transparent background | No background fill |
| `bg-[#colorcode]` | Custom color background | Example: `bg-[#FF4D4D]` |

### Text Colors
| Style Token | Figma Property | Description |
|------------|-----------|------|
| `text-white` | White text | RGB(1, 1, 1) |
| `text-black` | Black text | RGB(0, 0, 0) |
| `text-[#colorcode]` | Custom color text | Example: `text-[#111827]` |

## Border Styles

### Border Width
| Style Token | Figma Property | Description |
|------------|-----------|------|
| `border-none` | `strokes: []` | Removes all borders |
| `border-sm` | `strokeWeight: 1` | 1px border width |
| `border-md` | `strokeWeight: 2` | 2px border width |
| `border-lg` | `strokeWeight: 3` | 3px border width |

### Border Color
| Style Token | Figma Property | Description |
|------------|-----------|------|
| `border-white` | `strokes: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }]` | White border |
| `border-black` | `strokes: [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }]` | Black border |
| `border-transparent` | `strokes: [{ type: 'SOLID', color: { r: 0, g: 0, b: 0, a: 0 } }]` | Transparent border |
| `border-[#color]` | `strokes: [{ type: 'SOLID', color: parsed }]` | Custom color border |

### Arbitrary Border Values
You can use arbitrary values for border properties using square brackets:

```css
border-[#FF0000]     /* Custom border color */
border-[rgb(255,0,0)] /* RGB border color */
border-[2px]         /* Custom border width */
border-[10]          /* Border width in pixels (divided by 10) */
```

## Text Styles

### Font Size
| Style Token | Figma Property | Description |
|------------|-----------|------|
| `text-sm` | `fontSize: 14` | 14px font size |
| `text-md` | `fontSize: 16` | 16px font size |
| `text-lg` | `fontSize: 20` | 20px font size |
| `text-xl` | `fontSize: 24` | 24px font size |
| `text-2xl` | `fontSize: 32` | 32px font size |

### Font Weight
| Style Token | Figma Property | Description |
|------------|-----------|------|
| `text-normal` | `fontName: { family: 'Inter', style: 'Regular' }` | Regular weight |
| `font-bold` | `fontName: { family: 'Inter', style: 'Bold' }` | Bold weight |

### Text Decoration
| Style Token | Figma Property | Description |
|------------|-----------|------|
| `underline` | `textDecoration: "UNDERLINE"` | Underlined text |
| `line-through` | `textDecoration: "STRIKETHROUGH"` | Strikethrough text |
| `no-underline` | `textDecoration: "NONE"` | Remove text decoration |

### Text Alignment
| Style Token | Figma Property | Description |
|------------|-----------|------|
| `text-left` | `textAlignHorizontal: "LEFT"` | Left alignment |
| `text-center` | `textAlignHorizontal: "CENTER"` | Center alignment |
| `text-right` | `textAlignHorizontal: "RIGHT"` | Right alignment |

## Corners and Shadows

### Corner Radius
| Style Token | Figma Property | Description |
|------------|-----------|------|
| `rounded-sm` | `cornerRadius: 4` | 4px corner radius |
| `rounded-md` | `cornerRadius: 8` | 8px corner radius |
| `rounded-lg` | `cornerRadius: 12` | 12px corner radius |
| `rounded-full` | `cornerRadius: 9999` | Circular corners |
| `rounded-[number]` | `cornerRadius: number` | Custom corner radius |

### Shadows
| Style Token | Figma Property | Description |
|------------|-----------|------|
| `shadow-sm` | Small shadow | 4px blur, 0.05 opacity |
| `shadow-md` | Medium shadow | 8px blur, 0.1 opacity |

## Notes and Constraints

1. **Layout Mode Required Styles**
   - `w-full`, `h-full`, `w-auto`, `h-auto` styles require the parent frame to have a layout mode applied.
   - If the parent doesn't have a layout mode, a warning will be displayed and the style will automatically change to `w-auto` or `h-auto`.
   - It's recommended to add `flex-row` or `flex-col` style to all frames.

2. **Using Transparent Backgrounds**
   - Apply `bg-transparent` to frames that don't need a background color, especially for nested frames.
   - This is useful for organizational frames that only serve as containers for layout but should not have a visual background.
   - Frames with `bg-transparent` will show the parent frame's background, creating a cleaner visual hierarchy.

3. **Using Padding Instead of Margin**
   - Since margin tokens are not supported, use padding tokens instead.
   - For top margin, use `pt-[number]` on the element or parent container.
   - For bottom margin, use `pb-[number]` on the element or parent container.
   - For spacing between elements in a column layout, use `gap-[number]` on the parent.

4. **Differences from Tailwind CSS**
   - Use `wrap` instead of `flex-wrap`.
   - Specify arbitrary values in the format `[number]` (e.g., `w-[390]`, `p-[16]`).
   - Use color codes in the format `bg-[#FF4D4D]`, `text-[#111827]`.
   - Use padding (`pt-[number]`, `pb-[number]`) instead of margin (`mt-[number]`, `mb-[number]`).

5. **Style Conversion Examples**
   - Tailwind: `px-4 py-2` → Figma: `p-[16]`
   - Tailwind: `gap-2` → Figma: `gap-[8]`
   - Tailwind: `flex-wrap` → Figma: `wrap`
   - Tailwind: `text-white` → Figma: `text-[#FFFFFF]`
   - Tailwind: `mt-4` → Figma: `pt-[16]` (applied to element or its container)

6. **Pixel Conversion Rules**
   - 1 = 4px (e.g., `gap-1` = 4px, `gap-2` = 8px)
   - Therefore, `p-4` means 16px padding.

7. **Setting Layout Direction**
   - Apply `flex-row` or `flex-col` style to frames to set the layout direction.
   - `w-full`, `h-full`, `w-auto`, `h-auto` styles only work properly in frames with a layout direction set.
   - The `gap` property only applies in frames with a layout direction set.

Use this document as a reference to prevent errors when using style tokens in the Figma plugin and to help build a consistent design system. 