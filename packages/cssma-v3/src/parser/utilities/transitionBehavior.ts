// Tailwind transition-behavior utility parser
// https://tailwindcss.com/docs/transition-behavior

const presetMap: Record<string, string> = {
  'transition-normal': 'normal',
  'transition-discrete': 'allow-discrete',
};

const presetRe = /^(transition-normal|transition-discrete)$/;

export function parseTransitionBehavior(token: string): any | null {
  if (presetRe.test(token)) {
    return {
      type: 'transition-behavior',
      value: presetMap[token],
      raw: token,
      preset: token,
    };
  }
  return null;
} 