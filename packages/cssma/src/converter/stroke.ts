import { FigmaStyleProperties, ParsedStyle } from '../types';

export function convertStrokeToFigma(style: ParsedStyle): Partial<FigmaStyleProperties> {
  const { property, value, variant, variableId } = style;

  // Handle individual stroke weights
  switch (property) {
    case 'strokeTopWeight':
      return variant === 'figma-variable' && variableId
        ? { strokeTopWeight: undefined, boundVariables: { strokeTopWeight: { id: variableId, type: 'VARIABLE_ALIAS' } } }
        : { strokeTopWeight: value as number };
    case 'strokeRightWeight':
      return variant === 'figma-variable' && variableId
        ? { strokeRightWeight: undefined, boundVariables: { strokeRightWeight: { id: variableId, type: 'VARIABLE_ALIAS' } } }
        : { strokeRightWeight: value as number };
    case 'strokeBottomWeight':
      return variant === 'figma-variable' && variableId
        ? { strokeBottomWeight: undefined, boundVariables: { strokeBottomWeight: { id: variableId, type: 'VARIABLE_ALIAS' } } }
        : { strokeBottomWeight: value as number };
    case 'strokeLeftWeight':
      return variant === 'figma-variable' && variableId
        ? { strokeLeftWeight: undefined, boundVariables: { strokeLeftWeight: { id: variableId, type: 'VARIABLE_ALIAS' } } }
        : { strokeLeftWeight: value as number };
    default:
      return {};
  }
} 