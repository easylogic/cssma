import { ParsedStyle, FigmaStyleProperties } from '../types';

export function convertPositionToFigma(styles: ParsedStyle[]): Partial<FigmaStyleProperties> {
  const result: Partial<FigmaStyleProperties> = {
    constraints: {}
  };

  for (const style of styles) {
    switch (style.property) {
      case 'layoutPositioning':
        if (typeof style.value === 'string') {
          result.layoutPositioning = style.value as 'ABSOLUTE' | 'AUTO';
        }
        break;

      case 'position':
        if (style.variant === 'arbitrary' || style.variant === 'figma-variable') {
          // Handle Figma variable case
          if (style.variant === 'figma-variable') {
            result.position = {
              direction: style.direction as 'left' | 'right' | 'top' | 'bottom' | 'center-x' | 'center-y' | 'stretch-x' | 'stretch-y',
              value: style.value as string,
              variableId: style.variableId
            };
          } else {
            // Handle normal position values
            result.position = {
              direction: style.direction as 'left' | 'right' | 'top' | 'bottom' | 'center-x' | 'center-y' | 'stretch-x' | 'stretch-y',
              value: style.value as number,
              unit: style.unit as 'px' | '%'
            };
          }

          // Add constraints if present
          if (style.constraints) {
            result.constraints = {
              ...result.constraints,
              ...style.constraints
            };
          }
        }
        break;

      case 'constraints':
        if (typeof style.value === 'object' && style.value !== null) {
          result.constraints = {
            ...result.constraints,
            ...style.value
          };
        }
        break;

      case 'zIndex':
        if (typeof style.value === 'number') {
          result.order = style.value;
        }
        break;
    }
  }

  return result;
}