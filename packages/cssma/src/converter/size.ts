import { FigmaStyleProperties, ParsedStyle } from '../types';

export function convertSizeToFigma(style: ParsedStyle): Partial<FigmaStyleProperties> {
  const { property, value, variant } = style;

  // Handle size constraints
  switch (property) {
    case 'minWidth':
      return { minWidth: typeof value === 'number' ? value : undefined };
    case 'maxWidth':
      return { maxWidth: typeof value === 'number' && value !== Infinity ? value : undefined };
    case 'minHeight':
      return { minHeight: typeof value === 'number' ? value : undefined };
    case 'maxHeight':
      return { maxHeight: typeof value === 'number' && value !== Infinity ? value : undefined };
    default:
      return {};
  }
} 