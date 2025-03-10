import type { BaseNode, SceneNode } from '@figma/plugin-typings';


export function validateLayoutStyles(parent: BaseNode | null, child: SceneNode, styles: string[]): string[] {
  
  if (!parent || !('layoutMode' in parent)) {
    return styles.map(style => {
      
      if (style === 'w-full' || style === 'h-full') {
        return style.replace('full', 'auto');
      }
      return style;
    });
  }

  
  return styles;
}


export function isValidRotation(value: any): value is number {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
}


export function isValidHexColor(value: string): boolean {
  return /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{4}|[A-Fa-f0-9]{6}|[A-Fa-f0-9]{8})$/.test(value);
}


export function isValidRgbColor(value: string): boolean {
  const rgbRegex = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/;
  const rgbaRegex = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(0|1|0?\.\d+)\s*\)$/;
  
  if (rgbRegex.test(value)) {
    const [, r, g, b] = value.match(rgbRegex) || [];
    return Number(r) <= 255 && Number(g) <= 255 && Number(b) <= 255;
  }
  
  if (rgbaRegex.test(value)) {
    const [, r, g, b, a] = value.match(rgbaRegex) || [];
    return Number(r) <= 255 && Number(g) <= 255 && Number(b) <= 255 && Number(a) <= 1;
  }
  
  return false;
}


export function isValidNumber(value: any, options: { min?: number; max?: number; allowNegative?: boolean } = {}): value is number {
  if (typeof value !== 'number' || isNaN(value) || !isFinite(value)) {
    return false;
  }

  const { min, max, allowNegative = true } = options;

  if (!allowNegative && value < 0) {
    return false;
  }

  if (min !== undefined && value < min) {
    return false;
  }

  if (max !== undefined && value > max) {
    return false;
  }

  return true;
}
