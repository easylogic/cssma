import { describe, it, expect } from 'vitest';
import { parseDisplayUtility } from '../../src/parser/utilities/display';

describe('parseDisplayUtility', () => {
  const cases: Array<[string, any]> = [
    ['block', { type: 'display', preset: 'block', raw: 'block', arbitrary: false }],
    ['inline-block', { type: 'display', preset: 'inline-block', raw: 'inline-block', arbitrary: false }],
    ['inline', { type: 'display', preset: 'inline', raw: 'inline', arbitrary: false }],
    ['flex', { type: 'display', preset: 'flex', raw: 'flex', arbitrary: false }],
    ['inline-flex', { type: 'display', preset: 'inline-flex', raw: 'inline-flex', arbitrary: false }],
    ['table', { type: 'display', preset: 'table', raw: 'table', arbitrary: false }],
    ['inline-table', { type: 'display', preset: 'inline-table', raw: 'inline-table', arbitrary: false }],
    ['table-caption', { type: 'display', preset: 'table-caption', raw: 'table-caption', arbitrary: false }],
    ['table-cell', { type: 'display', preset: 'table-cell', raw: 'table-cell', arbitrary: false }],
    ['table-column', { type: 'display', preset: 'table-column', raw: 'table-column', arbitrary: false }],
    ['table-column-group', { type: 'display', preset: 'table-column-group', raw: 'table-column-group', arbitrary: false }],
    ['table-footer-group', { type: 'display', preset: 'table-footer-group', raw: 'table-footer-group', arbitrary: false }],
    ['table-header-group', { type: 'display', preset: 'table-header-group', raw: 'table-header-group', arbitrary: false }],
    ['table-row-group', { type: 'display', preset: 'table-row-group', raw: 'table-row-group', arbitrary: false }],
    ['table-row', { type: 'display', preset: 'table-row', raw: 'table-row', arbitrary: false }],
    ['flow-root', { type: 'display', preset: 'flow-root', raw: 'flow-root', arbitrary: false }],
    ['grid', { type: 'display', preset: 'grid', raw: 'grid', arbitrary: false }],
    ['contents', { type: 'display', preset: 'contents', raw: 'contents', arbitrary: false }],
    ['list-item', { type: 'display', preset: 'list-item', raw: 'list-item', arbitrary: false }],
    ['hidden', { type: 'display', preset: 'hidden', raw: 'hidden', arbitrary: false }],
  ];

  it.each(cases)('parseDisplayUtility(%s)', (input, expected) => {
    expect(parseDisplayUtility(input)).toEqual(expected);
  });
}); 