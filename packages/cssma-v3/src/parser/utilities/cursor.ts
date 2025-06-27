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

// Allow only valid CSS cursor values for arbitrary (same as preset, plus url(...), inherit, initial, unset)
function isValidCursorValue(val: string): boolean {
  if (presetCursors.includes(val)) return true;
  if (/^url\(.+\)$/.test(val)) return true;
  if (["inherit", "initial", "unset"].includes(val)) return true;
  return false;
}

export function parseCursor(token: string): any | null {
  let m;
  if ((m = presetRe.exec(token))) {
    return { type: 'cursor', value: m[1], raw: token, preset: m[1] };
  }
  if ((m = customPropRe.exec(token))) {
    return { type: 'cursor', value: `var(${m[1]})`, raw: token, customProperty: true };
  }
  if ((m = arbitraryRe.exec(token))) {
    const val = m[1].trim();
    // Allow comma-separated list if all are valid
    const parts = val.split(',').map(v => v.trim()).filter(Boolean);
    if (parts.length > 0 && parts.every(isValidCursorValue)) {
      return { type: 'cursor', value: val, raw: token, arbitrary: true };
    }
    return null;
  }
  return null;
} 