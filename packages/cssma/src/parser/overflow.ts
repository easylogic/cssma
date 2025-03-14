import { ParsedStyle } from '../types';

const OVERFLOW_MAP = {
  'visible': { clipsContent: false, scrollingEnabled: false },
  'hidden': { clipsContent: true, scrollingEnabled: false },
  'scroll': { clipsContent: true, scrollingEnabled: true },
  'auto': { clipsContent: true, scrollingEnabled: true }
} as const;

export function parseOverflowStyleValue(className: string): ParsedStyle | null {
  
  if (className.startsWith('overflow-')) {
    const value = className.replace('overflow-', '');
    const config = OVERFLOW_MAP[value as keyof typeof OVERFLOW_MAP];
    
    if (config) {
      return {
        property: 'overflow',
        value: value,
        clipsContent: config.clipsContent,
        scrollingEnabled: config.scrollingEnabled,
        variant: 'preset'
      };
    }
  }

  return null;
} 