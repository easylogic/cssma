import { describe, it, expect } from 'vitest';
import { parseGridAutoFlowUtility } from '../../src/parser/utilities/gridAutoFlow';

describe('parseGridAutoFlowUtility', () => {
  it('parses grid-auto-flow-row', () => {
    expect(parseGridAutoFlowUtility('grid-auto-flow-row')).toEqual({
      type: 'grid-auto-flow',
      preset: 'row',
      raw: 'grid-auto-flow-row',
      arbitrary: false,
    });
  });
  it('parses grid-auto-flow-col', () => {
    expect(parseGridAutoFlowUtility('grid-auto-flow-col')).toEqual({
      type: 'grid-auto-flow',
      preset: 'col',
      raw: 'grid-auto-flow-col',
      arbitrary: false,
    });
  });
  it('parses grid-auto-flow-dense', () => {
    expect(parseGridAutoFlowUtility('grid-auto-flow-dense')).toEqual({
      type: 'grid-auto-flow',
      preset: 'dense',
      raw: 'grid-auto-flow-dense',
      arbitrary: false,
    });
  });
  it('parses grid-auto-flow-row-dense', () => {
    expect(parseGridAutoFlowUtility('grid-auto-flow-row-dense')).toEqual({
      type: 'grid-auto-flow',
      preset: 'row-dense',
      raw: 'grid-auto-flow-row-dense',
      arbitrary: false,
    });
  });
  it('parses grid-auto-flow-col-dense', () => {
    expect(parseGridAutoFlowUtility('grid-auto-flow-col-dense')).toEqual({
      type: 'grid-auto-flow',
      preset: 'col-dense',
      raw: 'grid-auto-flow-col-dense',
      arbitrary: false,
    });
  });
  it('parses grid-auto-flow-[arbitrary]', () => {
    expect(parseGridAutoFlowUtility('grid-auto-flow-[foobar]')).toEqual({
      type: 'grid-auto-flow',
      value: 'foobar',
      raw: 'grid-auto-flow-[foobar]',
      arbitrary: true,
    });
  });
  it('returns null for invalid input', () => {
    expect(parseGridAutoFlowUtility('grid-auto-flow')).toBeNull();
    expect(parseGridAutoFlowUtility('grid-auto-flow-')).toBeNull();
    expect(parseGridAutoFlowUtility('grid-auto-flow-row-col')).toBeNull();
    expect(parseGridAutoFlowUtility('grid-auto-flow-arbitrary')).toBeNull();
  });
}); 