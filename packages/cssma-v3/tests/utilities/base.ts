// ParsedClassToken 기본 구조 생성 유틸리티 (utility용)
export const baseUtility = (overrides: Partial<any> = {}) => ({
  type: 'utility',
  raw: overrides.raw ?? overrides.prefix ?? '',
  prefix: '',
  value: '',
  preset: undefined,
  arbitrary: false,
  customProperty: false,
  negative: false,
  important: false,
  ...overrides,
}); 