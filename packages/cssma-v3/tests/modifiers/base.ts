// ParsedClassToken 기본 구조 생성 유틸리티 (modifier용)
export const baseModifier = (overrides: Partial<any> = {}) => ({
  type: 'modifier',
  raw: overrides.raw ?? overrides.prefix ?? '',
  prefix: '',
  value: '',
  slash: undefined,
  customProperty: false,
  arbitrary: false,
  arbitraryType: undefined,
  arbitraryValue: undefined,
  numeric: false,
  preset: false,
  negative: false,
  important: false,
  ...overrides,
}); 