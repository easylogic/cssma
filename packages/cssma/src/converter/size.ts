import { FigmaStyleObject, ParsedStyle } from '../types';

export function convertSizeToFigma(style: ParsedStyle): Partial<FigmaStyleObject> {
  const { property, value, variant } = style;

  // Handle size constraints
  switch (property) {
    case 'minWidth':
      return { minWidth: typeof value === 'number' ? value : undefined };
    case 'maxWidth':
      return { maxWidth: value === Infinity ? undefined : value };
    case 'minHeight':
      return { minHeight: typeof value === 'number' ? value : undefined };
    case 'maxHeight':
      return { maxHeight: value === Infinity ? undefined : value };
    default:
      return {};
  }
} 