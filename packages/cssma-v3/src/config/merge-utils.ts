// deepMerge: 객체를 재귀적으로 병합 (확장)
export function deepMerge<T>(base: T, override: Partial<T>): T {
  const result: any = {};
  const keys = new Set([
    ...Object.keys(base || {}),
    ...Object.keys(override || {}),
  ]);
  for (const key of keys) {
    const skey = String(key);
    const baseVal = base && typeof base === 'object' ? base[skey] : undefined;
    const overrideVal = override && typeof override === 'object' ? override[skey] : undefined;
    if (
      overrideVal &&
      typeof overrideVal === 'object' &&
      !Array.isArray(overrideVal)
    ) {
      result[skey] = deepMerge(
        (typeof baseVal === 'object' && baseVal !== null) ? baseVal : {},
        overrideVal
      );
    } else if (overrideVal !== undefined) {
      result[skey] = overrideVal;
    } else {
      result[skey] = baseVal;
    }
  }
  return result;
}

// shallowMerge: 1단계만 병합, 같은 key면 완전 교체 (덮어쓰기)
export function shallowMerge<T>(base: T, override: Partial<T>): T {
  return { ...base, ...override };
} 