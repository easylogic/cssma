// Tailwind text-decoration-thickness utility parser
// https://tailwindcss.com/docs/text-decoration-thickness

export function parseTextDecorationThickness(token: string): any | null {
  // decoration-<number>
  const num = token.match(/^decoration-(\d+)$/);
  if (num) {
    return { type: 'text-decoration-thickness', preset: num[1], raw: token, arbitrary: false };
  }
  // decoration-from-font
  if (token === 'decoration-from-font') {
    return { type: 'text-decoration-thickness', preset: 'from-font', raw: token, arbitrary: false };
  }
  // decoration-auto
  if (token === 'decoration-auto') {
    return { type: 'text-decoration-thickness', preset: 'auto', raw: token, arbitrary: false };
  }
  // decoration-(length:<custom-property>)
  const customProp = token.match(/^decoration-\(length:([a-zA-Z0-9-_]+)\)$/);
  if (customProp) {
    return { type: 'text-decoration-thickness', preset: `length:--${customProp[1]}`, raw: token, arbitrary: true };
  }
  // decoration-[value]
  const arbitrary = token.match(/^decoration-\[(.+)]$/);
  if (arbitrary) {
    return { type: 'text-decoration-thickness', preset: arbitrary[1], raw: token, arbitrary: true };
  }
  return null;
} 