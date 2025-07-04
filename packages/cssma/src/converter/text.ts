import { COLORS } from '../config/tokens';
import { ParsedStyle, FigmaStyleProperties, FigmaFontName, FigmaLineHeight, FigmaColor, FigmaSolidPaint } from '../types';
import { parseColor } from '../utils/colors';

const TEXT_ALIGN_VALUES = ['LEFT', 'CENTER', 'RIGHT', 'JUSTIFIED'] as const;
type TextAlignValue = typeof TEXT_ALIGN_VALUES[number];

const TEXT_ALIGN_VERTICAL_VALUES = ['TOP', 'CENTER', 'BOTTOM'] as const;
type TextAlignVerticalValue = typeof TEXT_ALIGN_VERTICAL_VALUES[number];

const TEXT_DECORATION_VALUES = ['UNDERLINE', 'STRIKETHROUGH', 'NONE'] as const;
type TextDecorationValue = typeof TEXT_DECORATION_VALUES[number];

const LEADING_TRIM_VALUES = ['NONE', 'CAP_HEIGHT'] as const;
type LeadingTrimValue = typeof LEADING_TRIM_VALUES[number];

type BoundVariable = {
  type: 'VARIABLE_ALIAS';
  id: string;
};

type FigmaVariableColor = {
  boundVariables?: {
    color: BoundVariable;
  };
};

type FigmaVariableSolidPaint = FigmaSolidPaint & FigmaVariableColor;

type FigmaVariableText = {
  boundVariables?: {
    fontSize?: BoundVariable;
    lineHeight?: BoundVariable;
    letterSpacing?: BoundVariable;
    fontName?: BoundVariable;
    textAlignVertical?: BoundVariable;
    paragraphSpacing?: BoundVariable;
    paragraphIndent?: BoundVariable;
    leadingTrim?: BoundVariable;
  };
  fills?: FigmaVariableSolidPaint[];
};

type FigmaVariableStyleProperties = Omit<FigmaStyleProperties, 'fills'> & FigmaVariableText;

export function convertTextToFigma(style: ParsedStyle): Partial<FigmaVariableStyleProperties> {
  const result: Partial<FigmaVariableStyleProperties> = {};

  switch (style.property) {
    case 'color':
      if (style.variant === 'figma-variable' && style.variableId) {
        result.fills = [{
          type: 'SOLID',
          color: { r: 0, g: 0, b: 0 },
          ...(style.opacity !== undefined && { opacity: style.opacity }),
          boundVariables: {
            color: {
              type: 'VARIABLE_ALIAS',
              id: style.variableId
            }
          }
        }];
      } else if (typeof style.value === 'object') {
        result.fills = [{
          type: 'SOLID',
          color: style.value as FigmaColor
        }];
      } else if (typeof style.value === 'string') {
        const color = COLORS[style.value as keyof typeof COLORS] || parseColor(style.value);
        if (color) {
          result.fills = [{
            type: 'SOLID',
            color: {
              r: color.r,
              g: color.g,
              b: color.b,
            },
            opacity: color.a
          }];
        }
      }
      break;

    case 'fontSize':
      if (style.variant === 'figma-variable' && style.variableId) {
        result.fontSize = 0;
        result.boundVariables = {
          fontSize: {
            type: 'VARIABLE_ALIAS',
            id: style.variableId
          }
        };
      } else if (typeof style.value === 'number' && style.value > 0) {
        result.fontSize = style.value;
      }
      break;

    case 'fontName':
      if (style.variant === 'figma-variable' && style.variableId) {
        result.fontName = { family: '', style: '' };
        result.boundVariables = {
          fontName: {
            type: 'VARIABLE_ALIAS',
            id: style.variableId
          }
        };
      } else if (typeof style.value === 'object' && 'family' in style.value) {
        const fontName = style.value as FigmaFontName;
        result.fontName = fontName;
      }
      break;

    case 'textAlignHorizontal':
      if (typeof style.value === 'string' && TEXT_ALIGN_VALUES.includes(style.value as TextAlignValue)) {
        result.textAlignHorizontal = style.value as TextAlignValue;
      }
      break;

    case 'textAlignVertical':
      if (style.variant === 'figma-variable' && style.variableId) {
        result.textAlignVertical = 'TOP';
        result.boundVariables = {
          textAlignVertical: {
            type: 'VARIABLE_ALIAS',
            id: style.variableId
          }
        };
      } else if (typeof style.value === 'string' && TEXT_ALIGN_VERTICAL_VALUES.includes(style.value as TextAlignVerticalValue)) {
        result.textAlignVertical = style.value as TextAlignVerticalValue;
      }
      break;

    case 'letterSpacing':
      if (style.variant === 'figma-variable' && style.variableId) {
        result.letterSpacing = { value: 0, unit: 'PIXELS' };
        result.boundVariables = {
          letterSpacing: {
            type: 'VARIABLE_ALIAS',
            id: style.variableId
          }
        };
      } else if (typeof style.value === 'number') {
        if (style.unit === 'PERCENT' && style.value === 0) {
          break;
        }
        
        if (style.unit) {
          result.letterSpacing = {
            value: style.value,
            unit: style.unit as 'PIXELS' | 'PERCENT'
          };
        } else {
          result.letterSpacing = style.value;
        }
      }
      break;

    case 'lineHeight':
      if (style.variant === 'figma-variable' && style.variableId) {
        result.lineHeight = { value: 0, unit: 'PIXELS' };
        result.boundVariables = {
          lineHeight: {
            type: 'VARIABLE_ALIAS',
            id: style.variableId
          }
        };
      } else if (style.unit === 'AUTO') {
        result.lineHeight = { value: 0, unit: 'PIXELS' };
      } else if (typeof style.value === 'number') {
        result.lineHeight = {
          value: style.value,
          unit: (style.unit || 'PIXELS') as 'PIXELS' | 'PERCENT'
        };
      }
      break;

    case 'textDecoration':
      if (typeof style.value === 'string' && TEXT_DECORATION_VALUES.includes(style.value as TextDecorationValue)) {
        result.textDecoration = style.value as TextDecorationValue;
      }
      break;

    case 'textCase':
      if (typeof style.value === 'string') {
        result.textCase = style.value as 'ORIGINAL' | 'UPPER' | 'LOWER' | 'TITLE';
      }
      break;

    case 'textTransform':
      if (typeof style.value === 'string') {
        result.textTransform = style.value as 'NONE' | 'UPPER' | 'LOWER' | 'TITLE';
      }
      break;

    case 'fontStyle':
      if (typeof style.value === 'string') {
        result.fontStyle = style.value as 'NORMAL' | 'ITALIC';
      }
      break;

    case 'fontWeight':
      if (typeof style.value === 'number') {
        result.fontWeight = style.value;
      }
      break;

    case 'paragraphSpacing':
      if (style.variant === 'figma-variable' && style.variableId) {
        result.paragraphSpacing = 0;
        result.boundVariables = {
          paragraphSpacing: {
            type: 'VARIABLE_ALIAS',
            id: style.variableId
          }
        };
      } else if (typeof style.value === 'number') {
        result.paragraphSpacing = style.value;
      }
      break;

    case 'paragraphIndent':
      if (style.variant === 'figma-variable' && style.variableId) {
        result.paragraphIndent = 0;
        result.boundVariables = {
          paragraphIndent: {
            type: 'VARIABLE_ALIAS',
            id: style.variableId
          }
        };
      } else if (typeof style.value === 'number') {
        result.paragraphIndent = style.value;
      }
      break;

    case 'leadingTrim':
      if (style.variant === 'figma-variable' && style.variableId) {
        result.leadingTrim = 'NONE';
        result.boundVariables = {
          leadingTrim: {
            type: 'VARIABLE_ALIAS',
            id: style.variableId
          }
        };
      } else if (typeof style.value === 'string' && LEADING_TRIM_VALUES.includes(style.value as LeadingTrimValue)) {
        result.leadingTrim = style.value as LeadingTrimValue;
      }
      break;
  }

  return result;
} 