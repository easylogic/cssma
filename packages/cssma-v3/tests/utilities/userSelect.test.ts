import { describe, it, expect } from 'vitest';
import { parseUserSelect } from '../../src/parser/utilities/userSelect';

describe('parseUserSelect', () => {
  it('parses select-none', () => {
    expect(parseUserSelect('select-none')).toEqual({ type: 'user-select', value: 'none', raw: 'select-none' });
  });
  it('parses select-text', () => {
    expect(parseUserSelect('select-text')).toEqual({ type: 'user-select', value: 'text', raw: 'select-text' });
  });
  it('parses select-all', () => {
    expect(parseUserSelect('select-all')).toEqual({ type: 'user-select', value: 'all', raw: 'select-all' });
  });
  it('parses select-auto', () => {
    expect(parseUserSelect('select-auto')).toEqual({ type: 'user-select', value: 'auto', raw: 'select-auto' });
  });
  it('returns null for invalid input', () => {
    expect(parseUserSelect('select')).toBeNull();
    expect(parseUserSelect('select-foo')).toBeNull();
    expect(parseUserSelect('select-none-all')).toBeNull();
    expect(parseUserSelect('select-auto-text')).toBeNull();
  });
}); 