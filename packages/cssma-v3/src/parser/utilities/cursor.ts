// Tailwind cursor utility parser
// https://tailwindcss.com/docs/cursor

const presetCursors = [
  'auto', 'default', 'pointer', 'wait', 'text', 'move', 'help', 'not-allowed', 'none',
  'context-menu', 'progress', 'cell', 'crosshair', 'vertical-text', 'alias', 'copy',
  'no-drop', 'grab', 'grabbing', 'all-scroll', 'col-resize', 'row-resize', 'n-resize',
  'e-resize', 's-resize', 'w-resize', 'ne-resize', 'nw-resize', 'se-resize', 'sw-resize',
  'ew-resize', 'ns-resize', 'nesw-resize', 'nwse-resize', 'zoom-in', 'zoom-out'
];

const presetRe = new RegExp(`^cursor-(${presetCursors.join('|').replace(/-/g, '\-')})$`);
const customPropRe = /^cursor-\((--[\w-]+)\)$/;
const arbitraryRe = /^cursor-\[(.+)\]$/;

export function parseCursor(token: string): any | null {
  let m;
  if ((m = presetRe.exec(token))) {
    return { type: 'cursor', value: m[1], raw: token, preset: m[1] };
  }
  if ((m = customPropRe.exec(token))) {
    return { type: 'cursor', value: `var(${m[1]})`, raw: token, customProperty: true };
  }
  if ((m = arbitraryRe.exec(token))) {
    return { type: 'cursor', value: m[1], raw: token, arbitrary: true };
  }
  return null;
} 