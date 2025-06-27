import { describe, it, expect } from 'vitest';
import { parseTouchAction } from '../../src/parser/utilities/touchAction';

describe('parseTouchAction', () => {
  it('parses touch-auto', () => {
    expect(parseTouchAction('touch-auto')).toEqual({ type: 'touch-action', value: 'auto', raw: 'touch-auto' });
  });
  it('parses touch-none', () => {
    expect(parseTouchAction('touch-none')).toEqual({ type: 'touch-action', value: 'none', raw: 'touch-none' });
  });
  it('parses touch-pan-x', () => {
    expect(parseTouchAction('touch-pan-x')).toEqual({ type: 'touch-action', value: 'pan-x', raw: 'touch-pan-x' });
  });
  it('parses touch-pan-left', () => {
    expect(parseTouchAction('touch-pan-left')).toEqual({ type: 'touch-action', value: 'pan-left', raw: 'touch-pan-left' });
  });
  it('parses touch-pan-right', () => {
    expect(parseTouchAction('touch-pan-right')).toEqual({ type: 'touch-action', value: 'pan-right', raw: 'touch-pan-right' });
  });
  it('parses touch-pan-y', () => {
    expect(parseTouchAction('touch-pan-y')).toEqual({ type: 'touch-action', value: 'pan-y', raw: 'touch-pan-y' });
  });
  it('parses touch-pan-up', () => {
    expect(parseTouchAction('touch-pan-up')).toEqual({ type: 'touch-action', value: 'pan-up', raw: 'touch-pan-up' });
  });
  it('parses touch-pan-down', () => {
    expect(parseTouchAction('touch-pan-down')).toEqual({ type: 'touch-action', value: 'pan-down', raw: 'touch-pan-down' });
  });
  it('parses touch-pinch-zoom', () => {
    expect(parseTouchAction('touch-pinch-zoom')).toEqual({ type: 'touch-action', value: 'pinch-zoom', raw: 'touch-pinch-zoom' });
  });
  it('parses touch-manipulation', () => {
    expect(parseTouchAction('touch-manipulation')).toEqual({ type: 'touch-action', value: 'manipulation', raw: 'touch-manipulation' });
  });
  it('returns null for invalid input', () => {
    expect(parseTouchAction('touch')).toBeNull();
    expect(parseTouchAction('touch-foo')).toBeNull();
    expect(parseTouchAction('touch-pan')).toBeNull();
    expect(parseTouchAction('touch-auto-x')).toBeNull();
  });
}); 