import type { CssmaContext } from '../../types';

/**
 * Shared utility for context-based color parsing (e.g. bg, border, accent, caret, etc.)
 * @param token - the utility class token (e.g. bg-red-500, border-blue-200/75)
 * @param prefix - the utility prefix (e.g. 'bg', 'border', 'accent', 'caret')
 * @param type - the return type string (e.g. 'background-color')
 * @param context - CssmaContext with theme getter
 * @param allowOpacity - whether to support /opacity syntax
 */
export function parseContextColorUtility({
  token,
  prefix,
  type,
  context,
  allowOpacity = false
}: {
  token: string,
  prefix: string,
  type: string,
  context?: CssmaContext,
  allowOpacity?: boolean
}) {
  const re = allowOpacity
    ? new RegExp(`^${prefix}-([a-zA-Z0-9-]+)(?:\/(\\d{1,3}))?$`)
    : new RegExp(`^${prefix}-([a-zA-Z0-9-]+)$`);
  const match = token.match(re);
  if (match && context?.theme) {
    const paletteKey = match[1];
    const opacity = allowOpacity && match[2] ? parseInt(match[2], 10) : undefined;
    const themePath = `colors.${paletteKey.replace(/-/g, '.')}`;
    const themeValue = context.theme(themePath);
    if (typeof themeValue === 'string') {
      return {
        type,
        value: paletteKey,
        raw: token,
        arbitrary: false,
        customProperty: false,
        preset: themePath,
        ...(opacity !== undefined ? { opacity } : {})
      };
    }
  }
  return null;
} 