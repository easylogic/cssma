import { describe, it, expect } from 'vitest';
import { parseCaptionSide } from '../../src/parser/utilities/captionSide';

describe('parseCaptionSide', () => {
  it('parses caption-top', () => {
    expect(parseCaptionSide('caption-top')).toEqual({
      type: 'caption-side',
      value: 'top',
      raw: 'caption-top',
    });
  });

  it('parses caption-bottom', () => {
    expect(parseCaptionSide('caption-bottom')).toEqual({
      type: 'caption-side',
      value: 'bottom',
      raw: 'caption-bottom',
    });
  });

  it('returns null for invalid input', () => {
    expect(parseCaptionSide('caption-side')).toBeNull();
    expect(parseCaptionSide('caption-top-foo')).toBeNull();
  });
}); 