import { describe, it, expect } from 'vitest';
import { parseCursor } from '../../src/parser/utilities/cursor';

describe('parseCursor', () => {
  it('parses preset cursor classes', () => {
    expect(parseCursor('cursor-pointer')).toEqual({ type: 'cursor', value: 'pointer', raw: 'cursor-pointer', preset: 'pointer' });
    expect(parseCursor('cursor-default')).toEqual({ type: 'cursor', value: 'default', raw: 'cursor-default', preset: 'default' });
    expect(parseCursor('cursor-grab')).toEqual({ type: 'cursor', value: 'grab', raw: 'cursor-grab', preset: 'grab' });
    expect(parseCursor('cursor-nwse-resize')).toEqual({ type: 'cursor', value: 'nwse-resize', raw: 'cursor-nwse-resize', preset: 'nwse-resize' });
    expect(parseCursor('cursor-zoom-in')).toEqual({ type: 'cursor', value: 'zoom-in', raw: 'cursor-zoom-in', preset: 'zoom-in' });
  });
  it('parses cursor-(<custom-property>)', () => {
    expect(parseCursor('cursor-(--my-cursor)')).toEqual({ type: 'cursor', value: 'var(--my-cursor)', raw: 'cursor-(--my-cursor)', customProperty: true });
  });
  it('parses cursor-[<value>]', () => {
    expect(parseCursor('cursor-[url(hand.cur),_pointer]')).toEqual({ type: 'cursor', value: 'url(hand.cur),_pointer', raw: 'cursor-[url(hand.cur),_pointer]', arbitrary: true });
  });
  it('returns null for invalid input', () => {
    expect(parseCursor('cursor-')).toBeNull();
    expect(parseCursor('cursor-foo')).toBeNull();
    expect(parseCursor('cursor-pointer-foo')).toBeNull();
    expect(parseCursor('cursor-()')).toBeNull();
    expect(parseCursor('cursor-[]')).toBeNull();
    expect(parseCursor('cursor-(foo)')).toBeNull();
    expect(parseCursor('cursor-[foo]')).toBeNull();
  });
}); 