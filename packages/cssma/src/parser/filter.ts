import { ParsedStyle } from '../types';

const BLUR_SIZES = {
  'none': 0,
  'sm': 4,
  'DEFAULT': 8,
  'md': 12,
  'lg': 16,
  'xl': 24,
  '2xl': 40,
  '3xl': 64
} as const;

export function parseFilterStyleValue(className: string): ParsedStyle | null {
  
  // Layer Blur
  if (className === 'blur' || className.startsWith('blur-')) {
    
    if (className === 'blur-none') {
      return {
        property: 'blur',
        value: 0,
        variant: 'preset'
      };
    }

    
    if (className.startsWith('blur-[') && className.endsWith(']')) {
      const value = className.slice(6, -1); 
      const radius = parseInt(value);
      if (!isNaN(radius) && radius >= 0) {
        return {
          property: 'blur',
          value: radius,
          variant: 'arbitrary'
        };
      }
      return null;
    }

    
    const size = className === 'blur' ? 'DEFAULT' : className.replace('blur-', '');
    const radius = BLUR_SIZES[size as keyof typeof BLUR_SIZES];
    
    if (radius !== undefined) {
      return {
        property: 'blur',
        value: radius,
        variant: 'preset'
      };
    }
  }

  // Backdrop Blur (Background Blur in Figma)
  if (className === 'backdrop-blur' || className.startsWith('backdrop-blur-')) {
    
    if (className === 'backdrop-blur-none') {
      return {
        property: 'backdropBlur',
        value: 0,
        variant: 'preset'
      };
    }

    
    if (className.startsWith('backdrop-blur-[') && className.endsWith(']')) {
      const value = className.slice(15, -1); // 'backdrop-blur-[' = 15 chars
      const radius = parseInt(value);
      if (!isNaN(radius) && radius >= 0) {
        return {
          property: 'backdropBlur',
          value: radius,
          variant: 'arbitrary'
        };
      }
      return null;
    }

    
    const size = className === 'backdrop-blur' ? 'DEFAULT' : className.replace('backdrop-blur-', '');
    const radius = BLUR_SIZES[size as keyof typeof BLUR_SIZES];
    
    if (radius !== undefined) {
      return {
        property: 'backdropBlur',
        value: radius,
        variant: 'preset'
      };
    }
  }

  // Drop Shadow (via filter: drop-shadow())
  if (className.startsWith('drop-shadow')) {
    
    // Preset drop shadows
    const presetMap: Record<string, { offsetX: number; offsetY: number; blur: number; color: string }> = {
      'drop-shadow': { offsetX: 0, offsetY: 1, blur: 2, color: 'rgba(0,0,0,0.1)' },
      'drop-shadow-sm': { offsetX: 0, offsetY: 1, blur: 1, color: 'rgba(0,0,0,0.05)' },
      'drop-shadow-md': { offsetX: 0, offsetY: 4, blur: 6, color: 'rgba(0,0,0,0.1)' },
      'drop-shadow-lg': { offsetX: 0, offsetY: 10, blur: 15, color: 'rgba(0,0,0,0.1)' },
      'drop-shadow-xl': { offsetX: 0, offsetY: 20, blur: 25, color: 'rgba(0,0,0,0.1)' },
      'drop-shadow-2xl': { offsetX: 0, offsetY: 25, blur: 50, color: 'rgba(0,0,0,0.25)' },
      'drop-shadow-none': { offsetX: 0, offsetY: 0, blur: 0, color: 'transparent' }
    };
    
    if (presetMap[className]) {
      return {
        property: 'dropShadow',
        value: presetMap[className],
        variant: 'preset'
      };
    }

    // Arbitrary drop shadows: drop-shadow-[0_4px_8px_rgba(0,0,0,0.1)]
    if (className.startsWith('drop-shadow-[') && className.endsWith(']')) {
      const value = className.slice(13, -1); // 'drop-shadow-[' = 13 chars
      
      // Parse the shadow string format: "offsetX_offsetY_blur_color"
      const parts = value.split('_');
      if (parts.length >= 4) {
        const offsetX = parseFloat(parts[0]);
        const offsetY = parseFloat(parts[1]); 
        const blur = parseFloat(parts[2].replace('px', ''));
        const color = parts.slice(3).join('_'); // rejoin color parts
        
        if (!isNaN(offsetX) && !isNaN(offsetY) && !isNaN(blur)) {
          return {
            property: 'dropShadow',
            value: {
              offsetX,
              offsetY,
              blur,
              color
            },
            variant: 'arbitrary'
          };
        }
      }
    }
  }

  return null;
} 