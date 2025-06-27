import { describe, it, expect } from 'vitest';
import { parseBoxShadow } from '../../src/parser/utilities/boxShadow';

describe('parseBoxShadow', () => {
  it('parses shadow-none', () => {
    expect(parseBoxShadow('shadow-none')).toMatchObject({ type: 'box-shadow', value: 'none' });
  });
  it('parses shadow-lg', () => {
    expect(parseBoxShadow('shadow-lg')).toMatchObject({ type: 'box-shadow', value: 'lg' });
  });
  it('parses shadow', () => {
    expect(parseBoxShadow('shadow')).toMatchObject({ type: 'box-shadow', value: 'DEFAULT' });
  });
  it('parses shadow-[0_2px_8px_#0003]', () => {
    expect(parseBoxShadow('shadow-[0_2px_8px_#0003]')).toMatchObject({ type: 'box-shadow', value: '0_2px_8px_#0003', arbitrary: true });
  });
  it('parses shadow-(--my-shadow)', () => {
    expect(parseBoxShadow('shadow-(--my-shadow)')).toMatchObject({ type: 'box-shadow', value: '--my-shadow' });
  });
  it('parses shadow-(color:--my-shadow-color)', () => {
    expect(parseBoxShadow('shadow-(color:--my-shadow-color)')).toMatchObject({ type: 'box-shadow', color: '--my-shadow-color' });
  });
  it('parses shadow-red-500', () => {
    expect(parseBoxShadow('shadow-red-500')).toMatchObject({ type: 'box-shadow', color: 'red-500' });
  });
  it('parses shadow-red-500/50', () => {
    expect(parseBoxShadow('shadow-red-500/50')).toMatchObject({ type: 'box-shadow', color: 'red-500', opacity: 50 });
  });
  it('parses inset-shadow-md', () => {
    expect(parseBoxShadow('inset-shadow-md')).toMatchObject({ type: 'box-shadow', value: 'md', inset: true });
  });
  it('parses inset-shadow-[inset_0_2px_8px_#0003]', () => {
    expect(parseBoxShadow('inset-shadow-[inset_0_2px_8px_#0003]')).toMatchObject({ type: 'box-shadow', value: 'inset_0_2px_8px_#0003', inset: true, arbitrary: true });
  });
}); 