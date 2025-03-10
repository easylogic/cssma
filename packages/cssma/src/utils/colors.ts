import { FigmaColor } from '../types';
import { COLORS } from '../config/tokens';
import { round } from './math';

export function parseHexColor(hex: string): FigmaColor | null {
  if (!isValidHexColor(hex)) return null;

  
  if (hex.length === 4) {
    const r = round(parseInt(hex[1] + hex[1], 16) / 255);
    const g = round(parseInt(hex[2] + hex[2], 16) / 255);
    const b = round(parseInt(hex[3] + hex[3], 16) / 255);
    return { r, g, b };
  }
  
  
  if (hex.length === 5) {
    const r = round(parseInt(hex[1] + hex[1], 16) / 255);
    const g = round(parseInt(hex[2] + hex[2], 16) / 255);
    const b = round(parseInt(hex[3] + hex[3], 16) / 255);
    const a = round(parseInt(hex[4] + hex[4], 16) / 255);
    return { r, g, b, a };
  }
  
  
  if (hex.length === 7) {
    const r = round(parseInt(hex.slice(1, 3), 16) / 255);
    const g = round(parseInt(hex.slice(3, 5), 16) / 255);
    const b = round(parseInt(hex.slice(5, 7), 16) / 255);
    return { r, g, b };
  }
  
  
  if (hex.length === 9) {
    const r = round(parseInt(hex.slice(1, 3), 16) / 255);
    const g = round(parseInt(hex.slice(3, 5), 16) / 255);
    const b = round(parseInt(hex.slice(5, 7), 16) / 255);
    const a = round(parseInt(hex.slice(7, 9), 16) / 255);
    return { r, g, b, a };
  }

  return null;
}

export function parseRgbColor(rgb: string): FigmaColor | null {
  const rgbaMatch = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (!rgbaMatch) {
    return null;
  }

  const [, r, g, b, a] = rgbaMatch;
  const values = [r, g, b].map(v => round(parseInt(v) / 255));
  
  if (values.some(v => isNaN(v) || v < 0 || v > 1)) {
    return null;
  }

  if (a !== undefined) {
    const alpha = round(parseFloat(a));
    if (isNaN(alpha) || alpha < 0 || alpha > 1) {
      return null;
    }
    return { r: values[0], g: values[1], b: values[2], a: alpha };
  }

  return { r: values[0], g: values[1], b: values[2] };
}

export function parseColor(color: string): FigmaColor | null {
  if (color.startsWith('#')) {
    return parseHexColor(color);
  }
  if (color.startsWith('rgb')) {
    return parseRgbColor(color);
  }
  return COLORS[color] || null;
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