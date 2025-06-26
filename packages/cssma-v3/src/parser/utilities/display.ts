// Tailwind display utility parser
// https://tailwindcss.com/docs/display

const presets = [
  'block', 'inline-block', 'inline', 'flex', 'inline-flex', 'table', 'inline-table',
  'table-caption', 'table-cell', 'table-column', 'table-column-group', 'table-footer-group',
  'table-header-group', 'table-row-group', 'table-row', 'flow-root', 'grid', 'contents',
  'list-item', 'hidden'
];

export function parseDisplay(token: string): any | null {
  for (const preset of presets) {
    if (token === preset) return { type: 'display', preset, raw: token, arbitrary: false };
  }
  return null;
} 