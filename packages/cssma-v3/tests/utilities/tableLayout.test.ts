import { describe, it, expect } from 'vitest';
import { parseTableLayout } from '../../src/parser/utilities/tableLayout';

describe('parseTableLayout', () => {
  it('parses table-auto', () => {
    expect(parseTableLayout('table-auto')).toEqual({
      type: 'table-layout',
      value: 'auto',
      raw: 'table-auto',
    });
  });

  it('parses table-fixed', () => {
    expect(parseTableLayout('table-fixed')).toEqual({
      type: 'table-layout',
      value: 'fixed',
      raw: 'table-fixed',
    });
  });

  it('returns null for invalid input', () => {
    expect(parseTableLayout('table-layout')).toBeNull();
    expect(parseTableLayout('table-auto-foo')).toBeNull();
  });
}); 