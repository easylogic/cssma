// Tailwind text color utility parser
// https://tailwindcss.com/docs/color

import type { CssmaContext, ParsedUtility } from '../../types';
import { extractArbitraryValue, isColorValue } from '../utils';

export function parseTextColor(token: string, context?: CssmaContext): ParsedUtility | null {
  // 1. text-<color> 또는 text-<color-shade> 패턴 추출 (context 기반 preset)
  const match = token.match(/^text-([a-zA-Z0-9_.-]+)$/);
  if (match && context?.theme) {
    const colorKey = match[1].replace(/-/g, '.'); // "red-500" → "red.500"
    const themePath = `colors.${colorKey}`;
    const themeValue = context.theme(themePath);
    // console.log("[parseTextColor]", { themePath, themeValue, typeofThemeValue: typeof themeValue });
    if (typeof themeValue === 'string') {
      return {
        type: 'color',
        value: match[1],
        raw: token,
        arbitrary: false,
        customProperty: false,
        preset: themePath
      };
    }
  }

  // 2. custom property 패턴: text-(--my-color)만 지원
  const customProp = token.match(/^text-\((--[a-zA-Z0-9-_]+)\)$/);
  if (customProp) {
    return {
      type: 'color',
      value: customProp[1],
      raw: token,
      arbitrary: true,
      customProperty: true
    };
  }

  // 3. text-[value] (arbitrary value, utils 사용)
  const arbitrary = extractArbitraryValue(token, 'text');
  if (arbitrary && isColorValue(arbitrary)) {
    return {
      type: 'color',
      value: arbitrary,
      raw: token,
      arbitrary: true,
      customProperty: false
    };
  }

  return null;
} 