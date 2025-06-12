/**
 * Utility functions for CSS converters to handle type-safe value conversion
 */

export function toString(value: any): string {
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return value.toString();
  if (typeof value === 'boolean') return value.toString();
  return String(value);
}

export function toPxOrString(value: any): string {
  if (typeof value === 'number') return `${value}px`;
  if (typeof value === 'string') return value;
  return String(value);
}

export function toNumber(value: any): number {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const num = parseFloat(value);
    return isNaN(num) ? 0 : num;
  }
  return 0;
}

export function isString(value: any): value is string {
  return typeof value === 'string';
}

export function isNumber(value: any): value is number {
  return typeof value === 'number';
}

export function isArray(value: any): value is any[] {
  return Array.isArray(value);
} 