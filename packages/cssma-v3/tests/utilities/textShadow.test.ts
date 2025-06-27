import { describe, it, expect } from 'vitest';
import { parseTextShadow } from '../../src/parser/utilities/textShadow';

describe('parseTextShadow', () => {
  it('parses text-shadow-none', () => {
    expect(parseTextShadow('text-shadow-none')).toMatchObject({ type: 'text-shadow', value: 'none' });
  });
  it('parses text-shadow-lg', () => {
    expect(parseTextShadow('text-shadow-lg')).toMatchObject({ type: 'text-shadow', value: 'lg' });
  });
  it('parses text-shadow-[0_2px_8px_#0003]', () => {
    expect(parseTextShadow('text-shadow-[0_2px_8px_#0003]')).toMatchObject({ type: 'text-shadow', value: '0_2px_8px_#0003', arbitrary: true });
  });
  it('parses text-shadow-(--my-shadow)', () => {
    expect(parseTextShadow('text-shadow-(--my-shadow)')).toMatchObject({ type: 'text-shadow', value: '--my-shadow' });
  });
  it('parses text-shadow-(color:--my-shadow-color)', () => {
    expect(parseTextShadow('text-shadow-(color:--my-shadow-color)')).toMatchObject({ type: 'text-shadow', color: '--my-shadow-color' });
  });
  it('parses text-shadow-red-500', () => {
    expect(parseTextShadow('text-shadow-red-500')).toMatchObject({ type: 'text-shadow', color: 'red-500' });
  });
  it('parses text-shadow-red-500/50', () => {
    expect(parseTextShadow('text-shadow-red-500/50')).toMatchObject({ type: 'text-shadow', color: 'red-500', opacity: 50 });
  });
}); 