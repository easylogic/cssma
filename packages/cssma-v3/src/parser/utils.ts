// 파서 공통 유틸리티 함수 (추후 구현) 

/**
 * Extracts the value inside [brackets] for a given prefix (e.g. border-t-[2vw] → 2vw)
 */
export function extractArbitraryValue(token: string, prefix: string): string | null {
  const m = token.match(new RegExp(`^${prefix}-\\[(.+)\\]$`));
  return m ? m[1].trim() : null;
}

/**
 * Checks if a value is a valid CSS length (e.g. 2vw, 1.5rem, 10px, 100%)
 */
export function isLengthValue(val: string): boolean {
  return /^\d+(\.\d+)?(px|em|rem|vw|vh|%|ch|ex|cm|mm|in|pt|pc)?$/.test(val);
}

/**
 * Checks if a value is a valid CSS color (hex, rgb, hsl, oklch, okhsl)
 */
export function isColorValue(val: string): boolean {
  return (
    /^(#([0-9a-fA-F]{3,8}))$/.test(val) ||
    /^rgb(a)?\(/.test(val) ||
    /^hsl(a)?\(/.test(val) ||
    /^oklch\(/.test(val) ||
    /^okhsl\(/.test(val)
  );
}

/**
 * Checks if a value is a pure number (integer or float)
 */
export function isNumberValue(val: string): boolean {
  return /^\d+(\.\d+)?$/.test(val);
} 