// Tailwind color-scheme utility parser
// https://tailwindcss.com/docs/color-scheme

const schemes = {
  'scheme-normal': 'normal',
  'scheme-dark': 'dark',
  'scheme-light': 'light',
  'scheme-light-dark': 'light dark',
  'scheme-only-dark': 'only dark',
  'scheme-only-light': 'only light',
};

export function parseColorScheme(token: string): any | null {
  if (schemes[token]) {
    return { type: 'color-scheme', value: schemes[token], raw: token, preset: schemes[token] };
  }
  return null;
} 