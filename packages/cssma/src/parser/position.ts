import { ParsedStyle } from '../types';
import { extractFigmaVariableId } from '../utils/variables';

const POSITION_TYPE_MAP = {
  'absolute': 'ABSOLUTE',
  'relative': 'AUTO'
} as const;

type ConstraintValue = 'MIN' | 'MAX' | 'CENTER' | 'STRETCH' | 'SCALE';
type Constraints = {
  horizontal?: ConstraintValue;
  vertical?: ConstraintValue;
};

interface PositionState {
  constraints: Constraints;
}

let positionState: PositionState = {
  constraints: {}
};

export function resetPositionState() {
  positionState = {
    constraints: {}
  };
}

function parsePositionValue(value: string): { value: number; unit: 'px' | '%' } | null {
  if (value.startsWith('[') && value.endsWith(']')) {
    value = value.slice(1, -1);
  }

  if (value.endsWith('%')) {
    const num = parseFloat(value.slice(0, -1));
    return !isNaN(num) ? { value: num, unit: '%' } : null;
  }

  if (value.endsWith('px')) {
    value = value.slice(0, -2);
  }
  const num = parseFloat(value);
  return !isNaN(num) ? { value: num, unit: 'px' } : null;
}

export function parsePositionStyleValue(className: string): ParsedStyle | null {
  
  if (POSITION_TYPE_MAP[className as keyof typeof POSITION_TYPE_MAP]) {
    resetPositionState();
    return {
      property: 'layoutPositioning',
      value: POSITION_TYPE_MAP[className as keyof typeof POSITION_TYPE_MAP],
      variant: 'preset'
    };
  }

  
  if (className === 'center-x') {
    positionState.constraints = {
      ...positionState.constraints,
      horizontal: 'CENTER'
    };
    return {
      property: 'constraints',
      value: { horizontal: 'CENTER' },
      variant: 'preset'
    };
  }

  if (className === 'center-y') {
    positionState.constraints = {
      ...positionState.constraints,
      vertical: 'CENTER'
    };
    return {
      property: 'constraints',
      value: { vertical: 'CENTER' },
      variant: 'preset'
    };
  }

  
  if (className === 'stretch-x') {
    positionState.constraints = {
      ...positionState.constraints,
      horizontal: 'STRETCH'
    };
    return {
      property: 'constraints',
      value: { horizontal: 'STRETCH' },
      variant: 'preset'
    };
  }

  if (className === 'stretch-y') {
    positionState.constraints = {
      ...positionState.constraints,
      vertical: 'STRETCH'
    };
    return {
      property: 'constraints',
      value: { vertical: 'STRETCH' },
      variant: 'preset'
    };
  }

  
  if (className === 'scale-x') {
    positionState.constraints = {
      ...positionState.constraints,
      horizontal: 'SCALE'
    };
    return {
      property: 'constraints',
      value: { horizontal: 'SCALE' },
      variant: 'preset'
    };
  }

  if (className === 'scale-y') {
    positionState.constraints = {
      ...positionState.constraints,
      vertical: 'SCALE'
    };
    return {
      property: 'constraints',
      value: { vertical: 'SCALE' },
      variant: 'preset'
    };
  }

  
  const positionMatch = className.match(/^(left|right|top|bottom)-(.+)$/);
  if (positionMatch) {
    const [, direction, rawValue] = positionMatch;

    
    if (rawValue.startsWith('$[')) {
      const variableId = extractFigmaVariableId(rawValue);
      if (!variableId) return null;

      const constraints: Constraints = {};
      if (direction.startsWith('center-')) {
        constraints[direction === 'center-x' ? 'horizontal' : 'vertical'] = 'CENTER';
      } else if (direction.startsWith('stretch-')) {
        constraints[direction === 'stretch-x' ? 'horizontal' : 'vertical'] = 'STRETCH';
      } else {
        const isHorizontal = direction === 'left' || direction === 'right';
        if (isHorizontal) {
          constraints.horizontal = direction === 'left' ? 'MIN' : 'MAX';
        } else {
          constraints.vertical = direction === 'top' ? 'MIN' : 'MAX';
        }
      }

      return {
        property: 'position',
        value: variableId,
        variant: 'figma-variable',
        variableId,
        constraints
      };
    }

    const parsedValue = parsePositionValue(rawValue);
    if (!parsedValue) return null;

    
    if (direction.startsWith('center-')) {
      if (direction === 'center-x') {
        positionState.constraints = {
          ...positionState.constraints,
          horizontal: 'CENTER'
        };
      } else {
        positionState.constraints = {
          ...positionState.constraints,
          vertical: 'CENTER'
        };
      }
    } else if (direction.startsWith('stretch-')) {
      if (direction === 'stretch-x') {
        positionState.constraints = {
          ...positionState.constraints,
          horizontal: 'STRETCH'
        };
      } else {
        positionState.constraints = {
          ...positionState.constraints,
          vertical: 'STRETCH'
        };
      }
    } else {
      const isHorizontal = direction === 'left' || direction === 'right';
      if (isHorizontal) {
        positionState.constraints = {
          ...positionState.constraints,
          horizontal: direction === 'left' ? 'MIN' : 'MAX'
        };
      } else {
        positionState.constraints = {
          ...positionState.constraints,
          vertical: direction === 'top' ? 'MIN' : 'MAX'
        };
      }
    }

    return {
      property: 'position',
      direction: direction,
      value: parsedValue.value,
      unit: parsedValue.unit,
      variant: 'arbitrary',
      constraints: positionState.constraints
    };
  }

  return null;
}

export function parsePositionStyles(classNames: string[]): ParsedStyle | null {
  
  const positionStyles = classNames
    .map(cls => parsePositionStyleValue(cls))
    .filter((style): style is ParsedStyle => style !== null);

  if (positionStyles.length === 0) return null;

  
  const layoutPositioning = positionStyles.find(s => s.property === 'layoutPositioning');
  if (layoutPositioning) return layoutPositioning;

  
  const directions: Record<string, number> = {};
  const constraints: Constraints = {};
  let unit: 'px' | '%' = 'px';

  positionStyles.forEach(style => {
    if (style.property === 'position' && 
        'direction' in style && 
        typeof style.direction === 'string' &&
        'value' in style && 
        typeof style.value === 'number') {
      directions[style.direction] = style.value;
      if ('unit' in style && (style.unit === 'px' || style.unit === '%')) {
        unit = style.unit;
      }
    }
    if (style.property === 'constraints' && 'value' in style) {
      const constraintValue = style.value as Partial<Constraints>;
      if (constraintValue.horizontal) {
        constraints.horizontal = constraintValue.horizontal;
      }
      if (constraintValue.vertical) {
        constraints.vertical = constraintValue.vertical;
      }
    }
  });

   STRETCH
  if ('left' in directions && 'right' in directions) {
    constraints.horizontal = 'STRETCH';
  }

   STRETCH
  if ('top' in directions && 'bottom' in directions) {
    constraints.vertical = 'STRETCH';
  }

  
  if (Object.keys(directions).length > 0) {
    return {
      property: 'position',
      value: directions,
      unit,
      variant: 'arbitrary',
      constraints
    };
  }

  
  if (Object.keys(constraints).length > 0) {
    return {
      property: 'constraints',
      value: constraints,
      variant: 'preset'
    };
  }

  return null;
}