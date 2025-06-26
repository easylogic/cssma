// Tailwind v4.1 font-family utilities:
// font-sans, font-serif, font-mono, font-[<value>], font-(family-name:<custom-property>)

const presetMap: Record<string, string> = {
  'sans': 'var(--font-sans)',
  'serif': 'var(--font-serif)',
  'mono': 'var(--font-mono)',
};

export function parseFontFamily(token: string): any | null {
  // Preset: font-sans, font-serif, font-mono
  const preset = token.match(/^font-(sans|serif|mono)$/);
  if (preset) {
    return { type: 'font-family', value: presetMap[preset[1]], raw: token, arbitrary: false };
  }

  // Custom property: font-(family-name:--my-font)
  const customVar = token.match(/^font-\(family-name:([\w-]+)\)$/);
  if (customVar) {
    return { type: 'font-family', value: `var(--${customVar[1]})`, raw: token, arbitrary: true };
  }

  // Arbitrary value: font-[<value>]
  const arbitrary = token.match(/^font-\[(.+)\]$/);
  if (arbitrary) {
    return { type: 'font-family', value: arbitrary[1], raw: token, arbitrary: true };
  }

  return null;
}

export default parseFontFamily; 