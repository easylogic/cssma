import { describe, it, expect } from 'vitest';
import { parseStrokeWidth } from '../../src/parser/utilities/strokeWidth';

describe('parseStrokeWidth', () => {
  it('parses stroke-1', () => {
    expect(parseStrokeWidth('stroke-1')).toEqual({ type: 'stroke-width', value: '1', raw: 'stroke-1', arbitrary: false });
  });
  it('parses stroke-2', () => {
    expect(parseStrokeWidth('stroke-2')).toEqual({ type: 'stroke-width', value: '2', raw: 'stroke-2', arbitrary: false });
  });
  it('parses stroke-1.5', () => {
    expect(parseStrokeWidth('stroke-1.5')).toEqual({ type: 'stroke-width', value: '1.5', raw: 'stroke-1.5', arbitrary: false });
  });
  it('parses stroke-(length:--my-stroke-width)', () => {
    expect(parseStrokeWidth('stroke-(length:--my-stroke-width)')).toEqual({ type: 'stroke-width', value: 'var(--my-stroke-width)', raw: 'stroke-(length:--my-stroke-width)', customProperty: true });
  });
  it('parses stroke-[1.5]', () => {
    expect(parseStrokeWidth('stroke-[1.5]')).toEqual({ type: 'stroke-width', value: '1.5', raw: 'stroke-[1.5]', arbitrary: true });
  });
  it('parses stroke-[length:var(--foo)]', () => {
    expect(parseStrokeWidth('stroke-[length:var(--foo)]')).toEqual({ type: 'stroke-width', value: 'var(--foo)', raw: 'stroke-[length:var(--foo)]', arbitrary: true });
  });
  it('returns null for invalid input', () => {
    expect(parseStrokeWidth('stroke-')).toBeNull();
    expect(parseStrokeWidth('stroke-foo')).toBeNull();
    expect(parseStrokeWidth('stroke-(foo)')).toBeNull();
    expect(parseStrokeWidth('stroke-[]')).toBeNull();
    expect(parseStrokeWidth('stroke-(length:foo)')).toBeNull();
  });
}); 