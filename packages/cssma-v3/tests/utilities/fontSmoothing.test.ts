import { describe, it, expect } from 'vitest';
import { parseFontSmoothing } from '../../src/parser/utilities/fontSmoothing';

describe('parseFontSmoothing', () => {
  it('parses antialiased', () => {
    expect(parseFontSmoothing('antialiased')).toEqual({
      type: 'font-smoothing',
      property: ['-webkit-font-smoothing', '-moz-osx-font-smoothing'],
      value: ['antialiased', 'grayscale'],
      raw: 'antialiased',
    });
  });

  it('parses subpixel-antialiased', () => {
    expect(parseFontSmoothing('subpixel-antialiased')).toEqual({
      type: 'font-smoothing',
      property: ['-webkit-font-smoothing', '-moz-osx-font-smoothing'],
      value: ['auto', 'auto'],
      raw: 'subpixel-antialiased',
    });
  });

  it('returns null for invalid input', () => {
    expect(parseFontSmoothing('antialias')).toBeNull();
    expect(parseFontSmoothing('font-smoothing')).toBeNull();
    expect(parseFontSmoothing('text-antialiased')).toBeNull();
  });
}); 