import { describe, it, expect } from 'vitest';
import { parsePointerEvents } from '../../src/parser/utilities/pointerEvents';

describe('parsePointerEvents', () => {
  it('parses pointer-events-auto', () => {
    expect(parsePointerEvents('pointer-events-auto')).toEqual({ type: 'pointer-events', value: 'auto', raw: 'pointer-events-auto', preset: 'auto' });
  });
  it('parses pointer-events-none', () => {
    expect(parsePointerEvents('pointer-events-none')).toEqual({ type: 'pointer-events', value: 'none', raw: 'pointer-events-none', preset: 'none' });
  });
  it('returns null for invalid input', () => {
    expect(parsePointerEvents('pointer-events')).toBeNull();
    expect(parsePointerEvents('pointer-events-foo')).toBeNull();
    expect(parsePointerEvents('pointer-events-auto-none')).toBeNull();
    expect(parsePointerEvents('pointer-events-none-auto')).toBeNull();
  });
}); 