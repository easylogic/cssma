import { FigmaLayoutProps } from '../types';

const SPACING_MAP: Record<string, number> = {
  '0': 0,
  '1': 4,
  '2': 8,
  '3': 12,
  '4': 16,
  '5': 20,
  '6': 24,
  '8': 32,
  '10': 40,
  '12': 48,
  '16': 64
};

function parseSpacing(value: string): number {
  const size = value.match(/\d+/)?.[0];
  return size ? (SPACING_MAP[size] || parseInt(size) * 4) : 0;
}

export function convertLayout(value: string): FigmaLayoutProps {
  const classes = value.split(' ');
  const result: FigmaLayoutProps = {};

  // Default to horizontal layout if flex is present
  if (classes.includes('flex')) {
    result.layoutMode = 'HORIZONTAL';
    result.layoutWrap = 'NO_WRAP';
  }

  // Handle flex direction
  if (classes.includes('flex-col')) {
    result.layoutMode = 'VERTICAL';
  } else if (classes.includes('flex-row')) {
    result.layoutMode = 'HORIZONTAL';
  }

  // Handle flex wrap
  if (classes.includes('flex-wrap')) {
    result.layoutWrap = 'WRAP';
  } else if (classes.includes('flex-nowrap')) {
    result.layoutWrap = 'NO_WRAP';
  }

  // Handle justify content
  if (classes.includes('justify-start')) {
    result.primaryAxisAlignItems = 'MIN';
  } else if (classes.includes('justify-center')) {
    result.primaryAxisAlignItems = 'CENTER';
  } else if (classes.includes('justify-end')) {
    result.primaryAxisAlignItems = 'MAX';
  } else if (classes.includes('justify-between')) {
    result.primaryAxisAlignItems = 'SPACE_BETWEEN';
  }

  // Handle align items
  if (classes.includes('items-start')) {
    result.counterAxisAlignItems = 'MIN';
  } else if (classes.includes('items-center')) {
    result.counterAxisAlignItems = 'CENTER';
  } else if (classes.includes('items-end')) {
    result.counterAxisAlignItems = 'MAX';
  } else if (classes.includes('items-baseline')) {
    result.counterAxisAlignItems = 'BASELINE';
  }

  // Handle gap
  for (const cls of classes) {
    if (cls.startsWith('gap-')) {
      const size = parseSpacing(cls.replace('gap-', ''));
      result.itemSpacing = size;
      result.counterAxisSpacing = size;
    } else if (cls.startsWith('gap-x-')) {
      result.itemSpacing = parseSpacing(cls.replace('gap-x-', ''));
    } else if (cls.startsWith('gap-y-')) {
      result.counterAxisSpacing = parseSpacing(cls.replace('gap-y-', ''));
    }
  }

  // Handle padding
  for (const cls of classes) {
    if (cls === 'p-0') {
      result.paddingTop = 0;
      result.paddingRight = 0;
      result.paddingBottom = 0;
      result.paddingLeft = 0;
    } else if (cls.startsWith('p-')) {
      const padding = parseSpacing(cls.replace('p-', ''));
      result.paddingTop = padding;
      result.paddingRight = padding;
      result.paddingBottom = padding;
      result.paddingLeft = padding;
    } else if (cls.startsWith('px-')) {
      const padding = parseSpacing(cls.replace('px-', ''));
      result.paddingLeft = padding;
      result.paddingRight = padding;
    } else if (cls.startsWith('py-')) {
      const padding = parseSpacing(cls.replace('py-', ''));
      result.paddingTop = padding;
      result.paddingBottom = padding;
    } else if (cls.startsWith('pt-')) {
      result.paddingTop = parseSpacing(cls.replace('pt-', ''));
    } else if (cls.startsWith('pr-')) {
      result.paddingRight = parseSpacing(cls.replace('pr-', ''));
    } else if (cls.startsWith('pb-')) {
      result.paddingBottom = parseSpacing(cls.replace('pb-', ''));
    } else if (cls.startsWith('pl-')) {
      result.paddingLeft = parseSpacing(cls.replace('pl-', ''));
    }
  }

  return result;
}
