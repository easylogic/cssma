import { describe, it, expect } from 'vitest';
import { parseAppearance } from '../../src/parser/utilities/appearance';

describe('parseAppearance', () => {
  it('parses appearance-none', () => {
    expect(parseAppearance('appearance-none')).toEqual({ type: 'appearance', value: 'none', raw: 'appearance-none', preset: 'none' });
  });
  it('parses appearance-auto', () => {
    expect(parseAppearance('appearance-auto')).toEqual({ type: 'appearance', value: 'auto', raw: 'appearance-auto', preset: 'auto' });
  });
  it('returns null for invalid input', () => {
    expect(parseAppearance('appearance')).toBeNull();
    expect(parseAppearance('appearance-foo')).toBeNull();
    expect(parseAppearance('appearance-none-auto')).toBeNull();
    expect(parseAppearance('appearance-auto-none')).toBeNull();
  });
}); 