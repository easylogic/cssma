// Tailwind pointer-events utility parser
// https://tailwindcss.com/docs/pointer-events

export function parsePointerEvents(token: string): any | null {
  if (token === 'pointer-events-auto') {
    return { type: 'pointer-events', value: 'auto', raw: token, preset: 'auto' };
  }
  if (token === 'pointer-events-none') {
    return { type: 'pointer-events', value: 'none', raw: token, preset: 'none' };
  }
  return null;
} 