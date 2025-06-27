// Tailwind border-radius utility parser
// https://tailwindcss.com/docs/border-radius

const presetMap: Record<string, string> = {
  'none': '0',
  'xs': 'var(--radius-xs)',
  'sm': 'var(--radius-sm)',
  'md': 'var(--radius-md)',
  'lg': 'var(--radius-lg)',
  'xl': 'var(--radius-xl)',
  '2xl': 'var(--radius-2xl)',
  '3xl': 'var(--radius-3xl)',
  '4xl': 'var(--radius-4xl)',
  'full': 'calc(infinity * 1px)',
};

export function parseBorderRadius(token: string): any | null {
  // 기본 rounded, rounded-none, rounded-full 등
  if (token === 'rounded') return { type: 'border-radius', preset: 'md', raw: token, arbitrary: false };
  if (token === 'rounded-none') return { type: 'border-radius', preset: 'none', raw: token, arbitrary: false };
  if (token === 'rounded-full') return { type: 'border-radius', preset: 'full', raw: token, arbitrary: false };
  // rounded-{preset}
  const preset = token.match(/^rounded-(xs|sm|md|lg|xl|2xl|3xl|4xl)$/);
  if (preset) return { type: 'border-radius', preset: preset[1], raw: token, arbitrary: false };
  // 논리적 속성: rounded-t-lg, rounded-tr-md 등
  const logical = token.match(/^rounded-([tblres]{1,2})-(none|xs|sm|md|lg|xl|2xl|3xl|4xl|full)$/);
  if (logical) {
    return {
      type: 'border-radius',
      logical: logical[1],
      preset: logical[2],
      raw: token,
      arbitrary: false
    };
  }
  // 논리적 속성 + 임의값: rounded-t-[2vw], rounded-tr-[10px]
  const logicalArb = token.match(/^rounded-([tblres]{1,2})-\[(.+)\]$/);
  if (logicalArb) {
    return {
      type: 'border-radius',
      logical: logicalArb[1],
      value: logicalArb[2],
      raw: token,
      arbitrary: true
    };
  }
  // 임의값: rounded-[2vw]
  const arbitrary = token.match(/^rounded-\[(.+)\]$/);
  if (arbitrary) return { type: 'border-radius', value: arbitrary[1], raw: token, arbitrary: true };
  // 커스텀 프로퍼티: rounded-(--my-radius)
  const custom = token.match(/^rounded-\((--[a-zA-Z0-9-_]+)\)$/);
  if (custom) return { type: 'border-radius', value: `var(${custom[1]})`, raw: token, arbitrary: true };
  return null;
} 