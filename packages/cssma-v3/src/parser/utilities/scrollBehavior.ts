// Tailwind scroll-behavior utility parser
// https://tailwindcss.com/docs/scroll-behavior

export function parseScrollBehavior(token: string): any | null {
  if (token === 'scroll-auto') {
    return { type: 'scroll-behavior', value: 'auto', raw: token, preset: 'auto' };
  }
  if (token === 'scroll-smooth') {
    return { type: 'scroll-behavior', value: 'smooth', raw: token, preset: 'smooth' };
  }
  return null;
} 