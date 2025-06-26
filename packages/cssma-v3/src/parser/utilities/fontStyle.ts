// Tailwind font-style utility parser
// https://tailwindcss.com/docs/font-style

export function parseFontStyle(token: string): any | null {
  if (token === 'italic') {
    return { type: 'font-style', value: 'italic', raw: token };
  }
  if (token === 'not-italic') {
    return { type: 'font-style', value: 'normal', raw: token };
  }
  return null;
} 