import { describe, it, expect } from 'vitest';
import { parseOutlineOffset } from '../../src/parser/utilities/outlineOffset';

describe('parseOutlineOffset', () => {
  it('parses positive outline-offset values', () => {
    expect(parseOutlineOffset('outline-offset-0')).toEqual({ type: 'outline-offset', value: '0px', raw: 'outline-offset-0', arbitrary: false, negative: false });
    expect(parseOutlineOffset('outline-offset-2')).toEqual({ type: 'outline-offset', value: '2px', raw: 'outline-offset-2', arbitrary: false, negative: false });
    expect(parseOutlineOffset('outline-offset-4')).toEqual({ type: 'outline-offset', value: '4px', raw: 'outline-offset-4', arbitrary: false, negative: false });
  });

  it('parses negative outline-offset values', () => {
    expect(parseOutlineOffset('-outline-offset-2')).toEqual({ type: 'outline-offset', value: 'calc(2px * -1)', raw: '-outline-offset-2', arbitrary: false, negative: true });
  });

  it('parses custom property outline-offset', () => {
    expect(parseOutlineOffset('outline-offset-(--my-outline-offset)')).toEqual({ type: 'outline-offset', value: 'var(--my-outline-offset)', raw: 'outline-offset-(--my-outline-offset)', arbitrary: true, customProperty: true });
  });

  it('parses arbitrary outline-offset values', () => {
    expect(parseOutlineOffset('outline-offset-[2vw]')).toEqual({ type: 'outline-offset', value: '2vw', raw: 'outline-offset-[2vw]', arbitrary: true });
    expect(parseOutlineOffset('outline-offset-[10px]')).toEqual({ type: 'outline-offset', value: '10px', raw: 'outline-offset-[10px]', arbitrary: true });
  });

  it('returns null for invalid tokens', () => {
    expect(parseOutlineOffset('outline-offset')).toBeNull();
    expect(parseOutlineOffset('outline-offset-foo')).toBeNull();
    expect(parseOutlineOffset('outline-offset-[red]')).toBeNull();
    expect(parseOutlineOffset('outline-offset-(foo)')).toBeNull();
  });
}); 