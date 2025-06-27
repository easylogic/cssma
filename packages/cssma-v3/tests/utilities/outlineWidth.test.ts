import { describe, it, expect } from 'vitest';
import { parseOutlineWidth } from '../../src/parser/utilities/outlineWidth';

describe('parseOutlineWidth', () => {
  it('parses outline-width presets', () => {
    const cases = [
      ['outline', { type: 'outline-width', value: '1px', raw: 'outline', arbitrary: false }],
      ['outline-2', { type: 'outline-width', value: '2px', raw: 'outline-2', arbitrary: false }],
      ['outline-4', { type: 'outline-width', value: '4px', raw: 'outline-4', arbitrary: false }],
    ];
    for (const [input, expected] of cases) {
      expect(parseOutlineWidth(input)).toMatchObject(expected);
    }
  });

  it('parses outline-width custom property', () => {
    expect(parseOutlineWidth('outline-(length:--my-outline-width)')).toMatchObject({
      type: 'outline-width',
      value: 'var(--my-outline-width)',
      raw: 'outline-(length:--my-outline-width)',
      arbitrary: true,
    });
  });

  it('parses outline-width arbitrary values', () => {
    expect(parseOutlineWidth('outline-[2vw]')).toMatchObject({
      type: 'outline-width',
      value: '2vw',
      raw: 'outline-[2vw]',
      arbitrary: true,
    });
    expect(parseOutlineWidth('outline-[length:var(--foo)]')).toBeNull();
  });

  it('returns null for invalid values', () => {
    const invalids = [
      'outline-',
      'outline-foo',
      'outline-(--bar)',
      '',
      'outline-width',
    ];
    for (const input of invalids) {
      expect(parseOutlineWidth(input)).toBeNull();
    }
  });
}); 