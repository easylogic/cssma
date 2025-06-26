// Tailwind box-border and box-content utility parser
// https://tailwindcss.com/docs/box-sizing

export function parseBoxUtility(token: string): any | null {
  if (token === 'box-border') return { type: 'box', preset: 'border', raw: token, arbitrary: false };
  if (token === 'box-content') return { type: 'box', preset: 'content', raw: token, arbitrary: false };
  return null;
} 