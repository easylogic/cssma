// Tailwind background-attachment utility parser
// https://tailwindcss.com/docs/background-attachment

export function parseBackgroundAttachment(token: string): any | null {
  if (token === 'bg-fixed') {
    return { type: 'background-attachment', preset: 'fixed', raw: token, arbitrary: false };
  }
  if (token === 'bg-local') {
    return { type: 'background-attachment', preset: 'local', raw: token, arbitrary: false };
  }
  if (token === 'bg-scroll') {
    return { type: 'background-attachment', preset: 'scroll', raw: token, arbitrary: false };
  }
  return null;
} 