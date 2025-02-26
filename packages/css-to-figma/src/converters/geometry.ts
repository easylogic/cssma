import { FigmaGeometryProps } from '../types';

const RADIUS_SIZES: Record<string, number> = {
  'sm': 2,
  'DEFAULT': 4,
  'md': 6,
  'lg': 8,
  'xl': 12,
  '2xl': 16,
  '3xl': 24,
  'full': 9999
};

const BORDER_SIZES: Record<string, number> = {
  'DEFAULT': 1,
  '0': 0,
  '2': 2,
  '4': 4,
  '8': 8
};

function parseRadius(value: string): number {
  if (!value || value === 'rounded') {
    return RADIUS_SIZES['DEFAULT'];
  }
  const size = value.match(/\d+xl|\d+|[a-z]+/)?.[0];
  return size ? (RADIUS_SIZES[size] || parseInt(size)) : RADIUS_SIZES['DEFAULT'];
}

function parseBorderWidth(value: string): number {
  if (!value || value === 'border') {
    return BORDER_SIZES['DEFAULT'];
  }
  const size = value.match(/\d+/)?.[0];
  return size ? (BORDER_SIZES[size] || parseInt(size)) : BORDER_SIZES['DEFAULT'];
}

function setAllCornerRadii(result: FigmaGeometryProps, radius: number) {
  result.topLeftRadius = radius;
  result.topRightRadius = radius;
  result.bottomLeftRadius = radius;
  result.bottomRightRadius = radius;
}

export function convertGeometry(value: string): FigmaGeometryProps {
  const classes = value.split(' ');
  const result: FigmaGeometryProps = {};

  for (const cls of classes) {
    // Handle border radius
    if (cls.startsWith('rounded')) {
      const parts = cls.split('-');
      const size = parts.length > 1 ? parts[parts.length - 1] : '';
      const radius = parseRadius(size);

      // Handle individual corners
      if (parts.length === 3) {
        const position = parts[1];
        switch (position) {
          case 't':
            result.topLeftRadius = radius;
            result.topRightRadius = radius;
            break;
          case 'r':
            result.topRightRadius = radius;
            result.bottomRightRadius = radius;
            break;
          case 'b':
            result.bottomLeftRadius = radius;
            result.bottomRightRadius = radius;
            break;
          case 'l':
            result.topLeftRadius = radius;
            result.bottomLeftRadius = radius;
            break;
          case 'tl':
            result.topLeftRadius = radius;
            break;
          case 'tr':
            result.topRightRadius = radius;
            break;
          case 'br':
            result.bottomRightRadius = radius;
            break;
          case 'bl':
            result.bottomLeftRadius = radius;
            break;
        }
      } else {
        // Handle all corners
        setAllCornerRadii(result, radius);
      }
    }

    // Handle border width
    if (cls === 'border' || cls.startsWith('border-')) {
      const width = cls === 'border' ? '' : cls.replace('border-', '');
      result.strokeWeight = parseBorderWidth(width);
      if (!result.strokeAlign) {
        result.strokeAlign = 'CENTER';
      }
    }

    // Handle stroke alignment
    if (cls.startsWith('stroke-')) {
      const align = cls.replace('stroke-', '');
      switch (align) {
        case 'inside':
          result.strokeAlign = 'INSIDE';
          break;
        case 'center':
          result.strokeAlign = 'CENTER';
          break;
        case 'outside':
          result.strokeAlign = 'OUTSIDE';
          break;
      }
    }
  }

  return result;
} 