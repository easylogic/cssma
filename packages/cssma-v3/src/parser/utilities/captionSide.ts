// Tailwind caption-side utility parser
// https://tailwindcss.com/docs/caption-side

const topRe = /^caption-top$/;
const bottomRe = /^caption-bottom$/;

export function parseCaptionSide(token: string): any | null {
  if (topRe.test(token)) {
    return { type: 'caption-side', value: 'top', raw: token };
  }
  if (bottomRe.test(token)) {
    return { type: 'caption-side', value: 'bottom', raw: token };
  }
  return null;
} 