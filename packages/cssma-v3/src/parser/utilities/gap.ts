// Tailwind gap utility parser
// https://tailwindcss.com/docs/gap

export function parseGapUtility(token: string): any | null {
  // gap-x-*
  let m = token.match(/^gap-x-(\d+)$/);
  if (m) return { type: 'gap', value: parseInt(m[1], 10), axis: 'x', raw: token, arbitrary: false };
  // gap-y-*
  m = token.match(/^gap-y-(\d+)$/);
  if (m) return { type: 'gap', value: parseInt(m[1], 10), axis: 'y', raw: token, arbitrary: false };
  // gap-*
  m = token.match(/^gap-(\d+)$/);
  if (m) return { type: 'gap', value: parseInt(m[1], 10), axis: 'both', raw: token, arbitrary: false };
  // gap-x-[arbitrary]
  m = token.match(/^gap-x-\[(.+)\]$/);
  if (m) return { type: 'gap', value: m[1], axis: 'x', raw: token, arbitrary: true };
  // gap-y-[arbitrary]
  m = token.match(/^gap-y-\[(.+)\]$/);
  if (m) return { type: 'gap', value: m[1], axis: 'y', raw: token, arbitrary: true };
  // gap-[arbitrary]
  m = token.match(/^gap-\[(.+)\]$/);
  if (m) return { type: 'gap', value: m[1], axis: 'both', raw: token, arbitrary: true };
  return null;
} 