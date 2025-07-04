// ParsedClassToken 기본 구조 생성 유틸리티 (utility용)
export const baseUtility = (overrides: Partial<any> = {}) => ({
  type: overrides.type ?? 'utility',
  raw: overrides.raw ?? overrides.prefix ?? '',
  prefix: '',
  value: '',
  preset: overrides.preset ?? false,
  arbitrary: false,
  customProperty: false,
  negative: false,
  important: false,
  numeric: false,
  slash: undefined,
  arbitraryType: undefined,
  arbitraryValue: undefined,
  ...overrides,
}); 