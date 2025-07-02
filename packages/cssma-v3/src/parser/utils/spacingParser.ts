import type { CssmaContext } from '../../types';

const directions = {
  '': 'all',
  'x': 'inline',
  'y': 'block',
  's': 'inline-start',
  'e': 'inline-end',
  't': 'top',
  'r': 'right',
  'b': 'bottom',
  'l': 'left',
};

export interface ContextSpacingResult {
  type: string;
  value?: string | number;
  direction: string;
  raw: string;
  arbitrary: boolean;
  negative?: boolean;
  preset?: string;
}

/**
 * Context-based spacing preset parser (margin, padding 등)
 * @param token - m-4, mx-2, -mb-8 등 theme.spacing preset만 처리
 * @param prefix - 'm' | 'p' 등
 * @param type - 'margin' | 'padding' 등
 * @param context - CssmaContext (theme.spacing lookup)
 */
export function parseContextSpacingUtility({
  token,
  prefix,
  type,
  context
}: {
  token: string;
  prefix: string;
  type: string;
  context?: CssmaContext;
}): ContextSpacingResult | null {
  // 음수 처리
  const negative = token.startsWith('-');
  const t = negative ? token.slice(1) : token;
  // m-*, mx-*, my-*, ms-*, me-*, mt-*, mr-*, mb-*, ml-* (숫자 preset만)
  const regex = new RegExp(`^${prefix}([xysetrbl]?)-([\\w-]+)$`);
  const match = t.match(regex);
  if (!match) {
    return null;
  }
  const [, dir, val] = match;
  const direction = directions[dir] || 'all';
  // theme.spacing lookup (context 기반)
  const themePath = `spacing.${val}`;
  const themeValue = context?.theme?.(themePath);
  if (themeValue !== undefined) {
    const result = {
      type,
      value: themeValue,
      direction,
      raw: token,
      arbitrary: false,
      negative,
      preset: themePath
    };
    return result;
  }
  return null;
}

/**
 * Context-based gap preset parser (gap, gap-x, gap-y)
 * @param token - gap-4, gap-x-2, gap-y-1 등 theme.spacing preset만 처리
 * @param type - 'gap'
 * @param context - CssmaContext (theme.spacing lookup)
 */
export function parseContextGapUtility({
  token,
  type,
  context
}: {
  token: string;
  type: string;
  context?: CssmaContext;
}): any | null {
  const match = token.match(/^gap(?:-([xy]))?-(.+)$/);
  if (!match) return null;
  const [, axis, valRaw] = match;
  const val = valRaw.trim();
  const direction = axis === 'x' ? 'inline' : axis === 'y' ? 'block' : 'all';
  const themePath = `spacing.${val}`;
  const themeValue = context?.theme?.(themePath);
  if (themeValue !== undefined) {
    return {
      type,
      value: themeValue,
      direction,
      raw: token,
      arbitrary: false,
      customProperty: false,
      preset: themePath,
    };
  }
  return null;
}

/**
 * Context-based scroll-margin preset parser (scroll-m, scroll-mt, scroll-mx, ...)
 * @param token - scroll-mt-4, -scroll-mx-2, scroll-m-4 등 theme.spacing preset만 처리
 * @param type - 'scroll-margin'
 * @param context - CssmaContext (theme.spacing lookup)
 */
export function parseContextScrollMarginUtility({
  token,
  type,
  context
}: {
  token: string;
  type: string;
  context?: CssmaContext;
}): any | null {
  const propMap = {
    '': 'scroll-margin',
    'x': 'scroll-margin-inline',
    'y': 'scroll-margin-block',
    't': 'scroll-margin-top',
    'r': 'scroll-margin-right',
    'b': 'scroll-margin-bottom',
    'l': 'scroll-margin-left',
    's': 'scroll-margin-inline-start',
    'e': 'scroll-margin-inline-end',
  };
  // scroll-m-4, -scroll-mt-2, scroll-mx-1, etc.
  const m = token.match(/^(-?)scroll-m([a-z]*)-(.+)$/);
  if (!m || !(m[2] in propMap)) return null;
  const negative = m[1] === '-';
  const dir = m[2];
  const val = m[3].trim();
  const direction = dir || '';
  const property = propMap[dir];
  const themePath = `spacing.${val}`;
  const themeValue = context?.theme?.(themePath);
  if (themeValue !== undefined) {
    return {
      type,
      property,
      value: negative ? (typeof themeValue === 'string' && /^-?\d/.test(themeValue) ? '-' + themeValue : `calc(-1 * ${themeValue})`) : themeValue,
      direction,
      raw: token,
      arbitrary: false,
      customProperty: false,
      negative,
      preset: themePath,
    };
  }
  return null;
}

/**
 * Context-based scroll-padding preset parser (scroll-p, scroll-pt, scroll-px, ...)
 * @param token - scroll-pt-4, -scroll-px-2, scroll-p-4 등 theme.spacing preset만 처리
 * @param type - 'scroll-padding'
 * @param context - CssmaContext (theme.spacing lookup)
 */
export function parseContextScrollPaddingUtility({
  token,
  type,
  context
}: {
  token: string;
  type: string;
  context?: CssmaContext;
}): any | null {
  const propMap = {
    '': 'scroll-padding',
    'x': 'scroll-padding-inline',
    'y': 'scroll-padding-block',
    't': 'scroll-padding-top',
    'r': 'scroll-padding-right',
    'b': 'scroll-padding-bottom',
    'l': 'scroll-padding-left',
    's': 'scroll-padding-inline-start',
    'e': 'scroll-padding-inline-end',
  };
  // scroll-p-4, -scroll-pt-2, scroll-px-1, etc.
  const m = token.match(/^(-?)scroll-p([a-z]*)-(.+)$/);
  if (!m || !(m[2] in propMap)) return null;
  const negative = m[1] === '-';
  const dir = m[2];
  const val = m[3].trim();
  const direction = dir || '';
  const property = propMap[dir as keyof typeof propMap];
  const themePath = `spacing.${val}`;
  const themeValue = context?.theme?.(themePath);
  if (themeValue !== undefined) {
    return {
      type,
      property,
      value: themeValue,
      direction,
      raw: token,
      arbitrary: false,
      customProperty: false,
      negative,
      preset: themePath,
    };
  }
  return null;
}

/**
 * 공통 숫자 spacing 파서 (context와 무관, 단순 숫자 추출)
 * @param token - 예: border-spacing-2, border-spacing-x-3
 * @param prefix - 'border-spacing', 'border-spacing-x', ...
 * @param type - 'border-spacing' 등
 * @param axis - 'both' | 'x' | 'y'
 * @param raw - 원본 토큰
 */
export function parseNumericSpacingToken(token: string, {
  prefix,
  type,
  axis,
  raw,
}: { prefix: string, type: string, axis: string, raw: string }) {
  const re = new RegExp(`^${prefix}-(\\d+)$`);
  const m = token.match(re);
  if (m) {
    return {
      type,
      axis,
      value: m[1],
      raw,
      arbitrary: false,
    };
  }
  return null;
}

/**
 * Context-based z-index preset parser (z-10, z-20 등)
 * @param token - z-10, z-50 등 theme.zIndex preset만 처리
 * @param context - CssmaContext (theme.zIndex lookup)
 */
export function parseContextZIndexUtility({
  token,
  context
}: {
  token: string;
  context?: CssmaContext;
}): any | null {
  // z-{preset}만 처리
  const m = token.match(/^z-([\w-]+)$/);
  if (!m) return null;
  const val = m[1];
  const themePath = `zIndex.${val}`;
  const themeValue = context?.theme?.(themePath);
  if (themeValue !== undefined) {
    return {
      type: 'z-index',
      value: themeValue,
      raw: token,
      arbitrary: false,
      customProperty: false,
      preset: themePath,
    };
  }
  return null;
}

interface ContextBorderRadiusResult {
  type: string;
  value?: string | number;
  direction?: string;
  raw: string;
  arbitrary: boolean;
  customProperty: boolean;
  preset: string;
}

/**
 * Context-based border-radius preset parser (rounded, rounded-t, rounded-tr 등)
 * @param token - rounded-lg, rounded-t-md, rounded-5xl 등 theme.borderRadius preset만 처리
 * @param prefix - 'rounded'
 * @param type - 'border-radius'
 * @param context - CssmaContext (theme.borderRadius lookup)
 */
export function parseContextBorderRadiusUtility({
  token,
  prefix,
  type,
  context
}: {
  token: string;
  prefix: string;
  type: string;
  context?: CssmaContext;
}): ContextBorderRadiusResult | null {
  // 논리 prefix: t, tr, tl, b, br, bl, l, r, s, e, se, ee, es, ss 등 1~3글자
  const regex = new RegExp(`^${prefix}(?:-([tblres]{1,3}))?-(.+)$`);
  const match = token.match(regex);
  if (match) {
    const dir = match[1] || 'all'; // 논리 prefix (t, tr, s, se 등) 없으면 'all'
    const key = match[2]; // preset key (none, full, 5xl, foo, xs, sm, ...)
    const themePath = `borderRadius.${key}`;
    const themeValue = context?.theme?.(themePath);
    if (themeValue !== undefined) {
      return {
        type,
        direction: dir,
        value: key,
        raw: token,
        arbitrary: false,
        customProperty: false,
        preset: themePath,
      };
    }
  }
  // 기본 preset (rounded, rounded-none, rounded-full 등)
  if (token === 'rounded') {
    const themeValue = context?.theme?.('borderRadius.md');
    if (themeValue !== undefined) {
      return {
        type,
        value: 'md',
        direction: 'all',
        raw: token,
        arbitrary: false,
        customProperty: false,
        preset: 'borderRadius.md',
      };
    }
  }
  return null;
} 