import { ParsedClassName } from '../../types';
import { parseSizeClassName } from './size';
import { parseSpacingClassName } from './spacing';
import { parseLayoutClassName } from './layout';
import { parseBorderClassName } from './border';
import { parseTextClassName } from './text';
import { parseBackgroundClassName } from './background';
import { parsePositionClassName } from './position';
import { parseTransformClassName } from './transform';
import { parseOverflowClassName } from './overflow';
import { parseBlendClassName } from './blend';
import { parseAspectClassName } from './aspect';
import { parseStrokeClassName } from './stroke';
import { parseFontClassName } from './font';
import { parseShadowClassName } from './shadow';
import { parseFilterClassName } from './filter';
import { parseShapeClassName } from './shape';
import { parseAnimationClassName } from './animation';



export function parseClassName(className: string): ParsedClassName | null {
    // Try each parser in order
    const parsers = [
        parseSizeClassName,
        parseSpacingClassName,
        parseLayoutClassName,
        parseBorderClassName,
        parseTextClassName,
        parseBackgroundClassName,
        parsePositionClassName,
        parseTransformClassName,
        parseOverflowClassName,
        parseBlendClassName,
        parseAspectClassName,
        parseStrokeClassName,
        parseFontClassName,
        parseShadowClassName,
        parseFilterClassName,
        parseShapeClassName,
        parseAnimationClassName,
    ];

    for (const parser of parsers) {
        const result = parser(className);
        if (result) {
            return result;
        }
    }

    return null;
}

export function parseClassNames(classNames: string): ParsedClassName[] {
    const classes = classNames.split(/\s+/).filter(Boolean);
    const styles: ParsedClassName[] = [];
  
    for (const className of classes) {
      const parsedClassName = parseClassName(className);
      if (parsedClassName) {
        styles.push(parsedClassName);
      }
    }
    return styles;
}