import { describe, it, expect } from 'vitest';
import { parseGridAutoFlow } from '../../src/parser/utilities/gridAutoFlow';

describe('parseGridAutoFlowUtility', () => {
  it('parses grid-auto-flow-row', () => {
    expect(parseGridAutoFlow('grid-auto-flow-row')).toEqual({
      type: 'grid-auto-flow',
      preset: 'row',
      raw: 'grid-auto-flow-row',
      arbitrary: false,
    });
  });
  it('parses grid-auto-flow-col', () => {
    expect(parseGridAutoFlow('grid-auto-flow-col')).toEqual({
      type: 'grid-auto-flow',
      preset: 'col',
      raw: 'grid-auto-flow-col',
      arbitrary: false,
    });
  });
  it('parses grid-auto-flow-dense', () => {
    expect(parseGridAutoFlow('grid-auto-flow-dense')).toEqual({
      type: 'grid-auto-flow',
      preset: 'dense',
      raw: 'grid-auto-flow-dense',
      arbitrary: false,
    });
  });
  it('parses grid-auto-flow-row-dense', () => {
    expect(parseGridAutoFlow('grid-auto-flow-row-dense')).toEqual({
      type: 'grid-auto-flow',
      preset: 'row-dense',
      raw: 'grid-auto-flow-row-dense',
      arbitrary: false,
    });
  });
  it('parses grid-auto-flow-col-dense', () => {
    expect(parseGridAutoFlow('grid-auto-flow-col-dense')).toEqual({
      type: 'grid-auto-flow',
      preset: 'col-dense',
      raw: 'grid-auto-flow-col-dense',
      arbitrary: false,
    });
  });
  it('parses grid-auto-flow-[arbitrary]', () => {
    expect(parseGridAutoFlow('grid-auto-flow-[foobar]')).toEqual({
      type: 'grid-auto-flow',
      value: 'foobar',
      raw: 'grid-auto-flow-[foobar]',
      arbitrary: true,
    });
  });
  it('returns null for invalid input', () => {
    expect(parseGridAutoFlow('grid-auto-flow')).toBeNull();
    expect(parseGridAutoFlow('grid-auto-flow-')).toBeNull();
    expect(parseGridAutoFlow('grid-auto-flow-row-col')).toBeNull();
    expect(parseGridAutoFlow('grid-auto-flow-arbitrary')).toBeNull();
  });
}); 