import { describe, it, expect } from 'vitest';
import { parseAspectRatio } from '../../src/parser/utilities/aspectRatio';

describe('parseAspectRatioUtility', () => {
  const cases: Array<[string, any]> = [
    ['aspect-square', { type: 'aspect-ratio', preset: 'square', value: '1/1', raw: 'aspect-square', arbitrary: false }],
    ['aspect-video', { type: 'aspect-ratio', preset: 'video', value: '16/9', raw: 'aspect-video', arbitrary: false }],
    ['aspect-auto', { type: 'aspect-ratio', preset: 'auto', value: 'auto', raw: 'aspect-auto', arbitrary: false }],
    ['aspect-3/2', { type: 'aspect-ratio', value: '3/2', raw: 'aspect-3/2', arbitrary: false }],
    ['aspect-16/9', { type: 'aspect-ratio', value: '16/9', raw: 'aspect-16/9', arbitrary: false }],
    ['aspect-1/1', { type: 'aspect-ratio', value: '1/1', raw: 'aspect-1/1', arbitrary: false }],
    ['aspect-(--my-aspect-ratio)', { type: 'aspect-ratio', customProperty: '--my-aspect-ratio', raw: 'aspect-(--my-aspect-ratio)', arbitrary: false }],
    ['aspect-[calc(4*3+1)/3]', { type: 'aspect-ratio', value: 'calc(4*3+1)/3', raw: 'aspect-[calc(4*3+1)/3]', arbitrary: true }],
    ['aspect-[var(--my-aspect-ratio)]', { type: 'aspect-ratio', value: 'var(--my-aspect-ratio)', raw: 'aspect-[var(--my-aspect-ratio)]', arbitrary: true }],
  ];

  it.each(cases)('parseAspectRatio(%s)', (input, expected) => {
    expect(parseAspectRatio(input)).toEqual(expected);
  });
}); 