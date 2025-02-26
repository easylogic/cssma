import { FigmaColor } from '../types';
import { COLORS, round } from '../config/tokens';

/**
 * HEX 색상 문자열을 Figma 색상 객체로 변환합니다.
 */
export function parseHexColor(hex: string): FigmaColor {
  // #RGB 형식 처리
  if (hex.length === 4) {
    const r = round(parseInt(hex[1] + hex[1], 16) / 255);
    const g = round(parseInt(hex[2] + hex[2], 16) / 255);
    const b = round(parseInt(hex[3] + hex[3], 16) / 255);
    return { r, g, b };
  }
  
  // #RGBA 형식 처리
  if (hex.length === 5) {
    const r = round(parseInt(hex[1] + hex[1], 16) / 255);
    const g = round(parseInt(hex[2] + hex[2], 16) / 255);
    const b = round(parseInt(hex[3] + hex[3], 16) / 255);
    const a = round(parseInt(hex[4] + hex[4], 16) / 255);
    return { r, g, b, a };
  }
  
  // #RRGGBB 형식 처리
  if (hex.length === 7) {
    const r = round(parseInt(hex.slice(1, 3), 16) / 255);
    const g = round(parseInt(hex.slice(3, 5), 16) / 255);
    const b = round(parseInt(hex.slice(5, 7), 16) / 255);
    return { r, g, b };
  }
  
  // #RRGGBBAA 형식 처리
  if (hex.length === 9) {
    const r = round(parseInt(hex.slice(1, 3), 16) / 255);
    const g = round(parseInt(hex.slice(3, 5), 16) / 255);
    const b = round(parseInt(hex.slice(5, 7), 16) / 255);
    const a = round(parseInt(hex.slice(7, 9), 16) / 255);
    return { r, g, b, a };
  }

  return { r: 0, g: 0, b: 0 };
}

/**
 * RGB/RGBA 색상 문자열을 Figma 색상 객체로 변환합니다.
 */
export function parseRgbColor(rgb: string): FigmaColor {
  const rgbaMatch = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (!rgbaMatch) {
    return { r: 0, g: 0, b: 0 };
  }

  const r = round(parseInt(rgbaMatch[1]) / 255);
  const g = round(parseInt(rgbaMatch[2]) / 255);
  const b = round(parseInt(rgbaMatch[3]) / 255);
  
  if (rgbaMatch[4]) {
    const a = round(parseFloat(rgbaMatch[4]));
    return { r, g, b, a };
  }
  
  return { r, g, b };
}

/**
 * 다양한 형식의 색상 문자열을 Figma 색상 객체로 변환합니다.
 * - HEX 색상 (#RGB, #RGBA, #RRGGBB, #RRGGBBAA)
 * - RGB/RGBA 색상
 * - Tailwind 프리셋 색상
 */
export function parseColor(color: string): FigmaColor {
  if (color.startsWith('#')) {
    return parseHexColor(color);
  }
  if (color.startsWith('rgb')) {
    return parseRgbColor(color);
  }
  return COLORS[color] || { r: 0, g: 0, b: 0 };
} 