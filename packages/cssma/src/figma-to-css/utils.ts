import { FigmaColor } from '../types';

export function isMixedValue(value: any): boolean {
    return typeof value === 'symbol' && String(value) === 'Symbol(figma.mixed)';
}

export function colorToHex(color: FigmaColor): string {
  const r = Math.round(color.r * 255);
  const g = Math.round(color.g * 255);
  const b = Math.round(color.b * 255);
  
  const toHex = (n: number) => n.toString(16).padStart(2, '0');
  
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
} 