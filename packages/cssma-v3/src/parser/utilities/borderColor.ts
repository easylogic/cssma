// Tailwind border-color utility parser
// https://tailwindcss.com/docs/border-color

import { extractArbitraryValue, isColorValue } from '../utils';

const presets = [
  'inherit', 'current', 'transparent', 'black', 'white',
  // 주요 색상 프리셋 (대표적으로 red, blue, green 등)
  'slate', 'gray', 'zinc', 'neutral', 'stone', 'red', 'orange', 'amber', 'yellow', 'lime', 'green', 'emerald', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose', 'lime', 'amber', 'emerald', 'teal', 'cyan', 'sky', 'indigo', 'violet', 'purple', 'fuchsia', 'pink', 'rose', 'neutral', 'stone', 'regal-blue'
];

export function parseBorderColor(token: string): any | null {
  // border-inherit, border-current, border-transparent, border-black, border-white
  if (token === 'border-inherit') return { type: 'border-color', side: 'all', preset: 'inherit', raw: token, arbitrary: false };
  if (token === 'border-current') return { type: 'border-color', side: 'all', preset: 'current', raw: token, arbitrary: false };
  if (token === 'border-transparent') return { type: 'border-color', side: 'all', preset: 'transparent', raw: token, arbitrary: false };
  if (token === 'border-black') return { type: 'border-color', side: 'all', preset: 'black', raw: token, arbitrary: false };
  if (token === 'border-white') return { type: 'border-color', side: 'all', preset: 'white', raw: token, arbitrary: false };

  // border-{color}-{shade}(/opacity)
  const palette = token.match(/^border-([a-z-]+)-(\d{2,3})(?:\/(\d{1,3}))?$/);
  if (palette && presets.includes(palette[1])) {
    return {
      type: 'border-color',
      side: 'all',
      preset: `${palette[1]}-${palette[2]}` + (palette[3] ? `/${palette[3]}` : ''),
      raw: token,
      arbitrary: false
    };
  }

  // border-x-{color}-{shade}(/opacity)
  const xPalette = token.match(/^border-x-([a-z-]+)-(\d{2,3})(?:\/(\d{1,3}))?$/);
  if (xPalette && presets.includes(xPalette[1])) {
    return {
      type: 'border-color',
      side: 'x',
      preset: `${xPalette[1]}-${xPalette[2]}` + (xPalette[3] ? `/${xPalette[3]}` : ''),
      raw: token,
      arbitrary: false
    };
  }

  // border-t-{color}-{shade}(/opacity) 등
  const sidePalette = token.match(/^border-([trblse])-([a-z-]+)-(\d{2,3})(?:\/(\d{1,3}))?$/);
  if (sidePalette && presets.includes(sidePalette[2])) {
    return {
      type: 'border-color',
      side: sidePalette[1],
      preset: `${sidePalette[2]}-${sidePalette[3]}` + (sidePalette[4] ? `/${sidePalette[4]}` : ''),
      raw: token,
      arbitrary: false
    };
  }

  // border-[#243c5a] (arbitrary value, 컬러 패턴만 허용)
  const arbVal = extractArbitraryValue(token, 'border');
  if (arbVal && isColorValue(arbVal)) {
    return { type: 'border-color', side: 'all', value: arbVal, raw: token, arbitrary: true };
  }
  // border-(--my-border) (custom property)
  const custom = token.match(/^border-\((--[a-zA-Z0-9-_]+)\)$/);
  if (custom) return { type: 'border-color', side: 'all', value: `var(${custom[1]})`, raw: token, arbitrary: true };

  // border-x-[#243c5a], border-x-(--my-border)
  const xArbVal = extractArbitraryValue(token, 'border-x');
  if (xArbVal && isColorValue(xArbVal)) {
    return { type: 'border-color', side: 'x', value: xArbVal, raw: token, arbitrary: true };
  }
  const xCustom = token.match(/^border-x-\((--[a-zA-Z0-9-_]+)\)$/);
  if (xCustom) return { type: 'border-color', side: 'x', value: `var(${xCustom[1]})`, raw: token, arbitrary: true };

  // border-t-[#243c5a], border-t-(--my-border) 등
  const sideArbVal = token.match(/^border-([trblse])-\[(.+)\]$/);
  if (sideArbVal) {
    const v = sideArbVal[2].trim();
    if (isColorValue(v)) {
      return { type: 'border-color', side: sideArbVal[1], value: v, raw: token, arbitrary: true };
    }
    return null;
  }
  const sideCustom = token.match(/^border-([trblse])-\((--[a-zA-Z0-9-_]+)\)$/);
  if (sideCustom) return { type: 'border-color', side: sideCustom[1], value: `var(${sideCustom[2]})`, raw: token, arbitrary: true };

  return null;
} 