import { findVariableByName } from 'src/utils/figma-variable';
import { processStyles } from '../index';
import { FigmaVariablePaint, FigmaVariableGradientStop } from '../types';

type TextVariableTypes = {
  fontSize: number;
  fontName: FontName;
  lineHeight: LineHeight;
  letterSpacing: LetterSpacing;
};

type TextVariableValue = {
  variableId: string;
  value?: any;
};

/**
 * Process Paint objects with Figma variables.
 */
async function processVariablePaint(paint: FigmaVariablePaint): Promise<Paint> {
  // Handle solid color variables
  if (paint.type === 'SOLID' && paint.boundVariables?.color) {
    const variable = await findVariableByName(paint.boundVariables.color.id);
    if (!variable) return paint as Paint;

    return figma.variables.setBoundVariableForPaint(
      {
        type: 'SOLID',
        color: { r: 0, g: 0, b: 0 },
        ...(paint.opacity !== undefined && { opacity: paint.opacity })
      },
      'color',
      variable
    ) as Paint;
  }

  // Handle gradient variables
  if (['GRADIENT_LINEAR', 'GRADIENT_RADIAL', 'GRADIENT_ANGULAR'].includes(paint.type)) {
    const stops = await Promise.all(
      (paint as any).gradientStops.map(async (stop: FigmaVariableGradientStop) => {
        if (stop.boundVariables?.color) {
          const variable = await findVariableByName(stop.boundVariables.color.id);
          if (!variable) return stop;

          const paint = await figma.variables.setBoundVariableForPaint(
            {
              type: 'SOLID',
              color: { r: 0, g: 0, b: 0 }
            },
            'color',
            variable
          ) as SolidPaint;

          return {
            ...stop,
            color: paint.color
          };
        }
        return stop;
      })
    );

    return {
      ...paint,
      gradientStops: stops
    } as Paint;
  }

  return paint as Paint;
}

/**
 * Apply Figma variables to text properties.
 */
async function processTextVariable(
  node: TextNode,
  variableId: string,
  propertyType: 'fontSize' | 'fontName' | 'lineHeight' | 'letterSpacing' | 'paragraphSpacing' | 'paragraphIndent'
): Promise<any | null> {
  const variable = await findVariableByName(variableId);
  if (!variable) return null;

  try {
    // Bind variable to text property
    node.setBoundVariable(propertyType as VariableBindableTextField, variable);
  } catch (error) {
    console.error('text variable error:', error);
    return null;
  }
}

/**
 * Apply Tailwind CSS styles to a Figma node.
 * 
 * @param node The target Figma node to apply styles to
 * @param styles Tailwind CSS style string (e.g., 'flex-col bg-white rounded-lg p-[16] gap-[8]')
 * @returns The styled node
 * 
 * @example
 * ```typescript
 * // Create and style a frame
 * const frame = figma.createFrame();
 * applyStyles(frame, 'flex-col bg-white rounded-lg p-[16] gap-[8]');
 * 
 * // Create and style a text node
 * const text = figma.createText();
 * text.characters = 'Hello World';
 * applyStyles(text, 'text-lg font-bold text-[#1a1a1a]');
 * ```
 */
export async function applyStyles<T extends SceneNode>(node: T, styles: string = ''): Promise<T> {
  if (!styles) return node;
  
  try {
    const styleObject = processStyles(styles);
    
    // Check node type for applicable properties
    const isFrameLike = ['FRAME', 'COMPONENT', 'INSTANCE', 'SECTION'].includes(node.type);
    const isTextNode = node.type === 'TEXT';
    const isVectorNode = node.type === 'VECTOR';
    
    // Check for property existence (only when needed)
    const hasCornerRadius = styleObject.cornerRadius !== undefined || 
                           styleObject.topLeftRadius !== undefined || 
                           styleObject.topRightRadius !== undefined || 
                           styleObject.bottomLeftRadius !== undefined || 
                           styleObject.bottomRightRadius !== undefined;
                           
    const hasFills = styleObject.fills !== undefined;
    const hasStrokes = styleObject.strokes !== undefined || 
                      styleObject.strokeWeight !== undefined || 
                      styleObject.strokeAlign !== undefined || 
                      styleObject.dashPattern !== undefined;
                      
    const hasEffects = styleObject.effects !== undefined;
    const hasResize = styleObject.width !== undefined || styleObject.height !== undefined;
    const hasOpacity = styleObject.opacity !== undefined;
    
    // Check for size constraints
    const hasSizeConstraints = styleObject.minWidth !== undefined ||
                              styleObject.maxWidth !== undefined ||
                              styleObject.minHeight !== undefined ||
                              styleObject.maxHeight !== undefined;

    const hasIndividualStrokes = styleObject.strokeTopWeight !== undefined ||
                                styleObject.strokeRightWeight !== undefined ||
                                styleObject.strokeBottomWeight !== undefined ||
                                styleObject.strokeLeftWeight !== undefined;
    
    // Apply layout properties (only for frame-like nodes)
    if (isFrameLike) {
      const frameNode = node as FrameNode;
      
      // Layout mode and direction
      if (styleObject.layoutMode !== undefined) {
        frameNode.layoutMode = styleObject.layoutMode;
      }
      
      // Alignment properties
      if (styleObject.primaryAxisAlignItems !== undefined) {
        frameNode.primaryAxisAlignItems = styleObject.primaryAxisAlignItems;
      }
      
      if (styleObject.counterAxisAlignItems !== undefined) {
        frameNode.counterAxisAlignItems = styleObject.counterAxisAlignItems;
      }
      
      // Layout wrap (line break)
      if (styleObject.layoutWrap !== undefined) {
        frameNode.layoutWrap = styleObject.layoutWrap;
      }
      
      // Sizing properties
      if (styleObject.layoutSizingHorizontal !== undefined) {
        frameNode.layoutSizingHorizontal = styleObject.layoutSizingHorizontal;
      }
      
      if (styleObject.layoutSizingVertical !== undefined) {
        frameNode.layoutSizingVertical = styleObject.layoutSizingVertical;
      }
      
      // Spacing properties
      if (styleObject.itemSpacing !== undefined) {
        frameNode.itemSpacing = styleObject.itemSpacing;
      }
      
      if (styleObject.counterAxisSpacing !== undefined) {
        frameNode.counterAxisSpacing = styleObject.counterAxisSpacing;
      }
      
      // Padding properties
      if (styleObject.paddingTop !== undefined) {
        frameNode.paddingTop = styleObject.paddingTop;
      }
      
      if (styleObject.paddingRight !== undefined) {
        frameNode.paddingRight = styleObject.paddingRight;
      }
      
      if (styleObject.paddingBottom !== undefined) {
        frameNode.paddingBottom = styleObject.paddingBottom;
      }
      
      if (styleObject.paddingLeft !== undefined) {
        frameNode.paddingLeft = styleObject.paddingLeft;
      }
    }
    
    // Apply corner radius properties
    if (hasCornerRadius && 'cornerRadius' in node) {
      const roundableNode = node as SceneNode & { 
        cornerRadius: number;
        topLeftRadius?: number;
        topRightRadius?: number;
        bottomLeftRadius?: number;
        bottomRightRadius?: number;
      };
      
      // Apply global corner radius
      if (styleObject.cornerRadius !== undefined) {
        roundableNode.cornerRadius = styleObject.cornerRadius;
      }
      
      // Apply individual corner radii
      if ('topLeftRadius' in roundableNode && styleObject.topLeftRadius !== undefined) {
        roundableNode.topLeftRadius = styleObject.topLeftRadius;
      }
      
      if ('topRightRadius' in roundableNode && styleObject.topRightRadius !== undefined) {
        roundableNode.topRightRadius = styleObject.topRightRadius;
      }
      
      if ('bottomLeftRadius' in roundableNode && styleObject.bottomLeftRadius !== undefined) {
        roundableNode.bottomLeftRadius = styleObject.bottomLeftRadius;
      }
      
      if ('bottomRightRadius' in roundableNode && styleObject.bottomRightRadius !== undefined) {
        roundableNode.bottomRightRadius = styleObject.bottomRightRadius;
      }
    }
    
    // Apply fill properties
    if (hasFills && 'fills' in node) {
      const fillableNode = node as SceneNode & { fills: ReadonlyArray<Paint> | Paint[] };
      if (styleObject.fills) {
        fillableNode.fills = await Promise.all(
          styleObject.fills.map(fill => processVariablePaint(fill as FigmaVariablePaint))
        );
      }
    }
    
    // Apply stroke properties
    if (hasStrokes && 'strokes' in node) {
      const strokeableNode = node as SceneNode & { 
        strokes: ReadonlyArray<Paint> | Paint[];
        strokeWeight?: number;
        strokeAlign?: 'INSIDE' | 'OUTSIDE' | 'CENTER';
        strokeCap?: 'NONE' | 'ROUND' | 'SQUARE' | 'ARROW_LINES' | 'ARROW_EQUILATERAL';
        strokeJoin?: 'MITER' | 'BEVEL' | 'ROUND';
        dashPattern?: ReadonlyArray<number> | number[];
      };
      
      if (styleObject.strokes !== undefined) {
        strokeableNode.strokes = await Promise.all(
          styleObject.strokes.map(stroke => processVariablePaint(stroke as FigmaVariablePaint))
        );
      }
      
      if ('strokeWeight' in strokeableNode && styleObject.strokeWeight !== undefined) {
        strokeableNode.strokeWeight = styleObject.strokeWeight;
      }
      
      if ('strokeAlign' in strokeableNode && styleObject.strokeAlign !== undefined) {
        strokeableNode.strokeAlign = styleObject.strokeAlign as 'INSIDE' | 'OUTSIDE' | 'CENTER';
      }
      
      if ('dashPattern' in strokeableNode && styleObject.dashPattern !== undefined) {
        strokeableNode.dashPattern = styleObject.dashPattern as number[];
      }
    }
    
    // Apply effect properties
    if (hasEffects && 'effects' in node) {
      const effectableNode = node as SceneNode & { effects: ReadonlyArray<Effect> | Effect[] };
      effectableNode.effects = styleObject.effects as Effect[];
    }
    
    // Apply opacity property
    if (hasOpacity && 'opacity' in node) {
      const opacityNode = node as SceneNode & { opacity: number };
      if (styleObject.opacity !== undefined) {
        opacityNode.opacity = styleObject.opacity;
      }
    }
    
    // Handle text node specific properties
    if (isTextNode) {
      const textNode = node as TextNode;
      
      // Font size
      if (styleObject.fontSize !== undefined) {
        if (typeof styleObject.fontSize === 'object' && 'variableId' in styleObject.fontSize) {
          await processTextVariable(
            textNode,
            (styleObject.fontSize as TextVariableValue).variableId,
            'fontSize'
          );
        } else {
          textNode.fontSize = styleObject.fontSize as number;
        }
      }
      
      // Font name (family + style)
      if (styleObject.fontName !== undefined) {
        if (typeof styleObject.fontName === 'object' && 'variableId' in styleObject.fontName) {
          await processTextVariable(
            textNode,
            (styleObject.fontName as TextVariableValue).variableId,
            'fontName'
          );
        } else {
          textNode.fontName = styleObject.fontName as FontName;
        }
      }
      
      // Text alignment
      if (styleObject.textAlignHorizontal !== undefined) {
        textNode.textAlignHorizontal = styleObject.textAlignHorizontal as 'LEFT' | 'CENTER' | 'RIGHT' | 'JUSTIFIED';
      }
      
      if (styleObject.textAlignVertical !== undefined) {
        textNode.textAlignVertical = styleObject.textAlignVertical as 'TOP' | 'CENTER' | 'BOTTOM';
      }
      
      // Line height
      if (styleObject.lineHeight !== undefined) {
        if (typeof styleObject.lineHeight === 'object' && 'variableId' in styleObject.lineHeight) {
          await processTextVariable(
            textNode,
            (styleObject.lineHeight as TextVariableValue).variableId,
            'lineHeight'
          );
        } else {
          textNode.lineHeight = styleObject.lineHeight as LineHeight;
        }
      }
      
      // Letter spacing
      if (styleObject.letterSpacing !== undefined) {
        if (typeof styleObject.letterSpacing === 'object' && 'variableId' in styleObject.letterSpacing) {
          await processTextVariable(
            textNode,
            (styleObject.letterSpacing as TextVariableValue).variableId,
            'letterSpacing'
          );
        } else {
          textNode.letterSpacing = styleObject.letterSpacing as LetterSpacing;
        }
      }
      
      // Text decoration
      if (styleObject.textDecoration !== undefined) {
        textNode.textDecoration = styleObject.textDecoration as 'NONE' | 'UNDERLINE' | 'STRIKETHROUGH';
      }
      
      // Text transform
      if (styleObject.textCase !== undefined) {
        textNode.textCase = styleObject.textCase as 'ORIGINAL' | 'UPPER' | 'LOWER' | 'TITLE';
      }
      
      // Paragraph spacing
      if (styleObject.paragraphSpacing !== undefined) {
        if (typeof styleObject.paragraphSpacing === 'object' && 'variableId' in styleObject.paragraphSpacing) {
          await processTextVariable(
            textNode,
            (styleObject.paragraphSpacing as TextVariableValue).variableId,
            'paragraphSpacing'
          );
        } else {
          textNode.paragraphSpacing = styleObject.paragraphSpacing as number;
        }
      }
      
      // Paragraph indent
      if (styleObject.paragraphIndent !== undefined) {
        if (typeof styleObject.paragraphIndent === 'object' && 'variableId' in styleObject.paragraphIndent) {
          await processTextVariable(
            textNode,
            (styleObject.paragraphIndent as TextVariableValue).variableId,
            'paragraphIndent'
          );
        } else {
          textNode.paragraphIndent = styleObject.paragraphIndent as number;
        }
      }
    }
    
    // Handle vector node specific properties
    if (isVectorNode) {
      const vectorNode = node as VectorNode;
      const extendedStyleObject = styleObject as any;
      
      if (extendedStyleObject.vectorPaths !== undefined) {
        vectorNode.vectorPaths = extendedStyleObject.vectorPaths;
      } else if (extendedStyleObject.paths !== undefined) {
        // Legacy compatibility handling
        vectorNode.vectorPaths = extendedStyleObject.paths.map((path: string) => ({
          data: path,
          windingRule: 'NONZERO'
        }));
      }
    }
    
    // Sizing properties (only for nodes with resize method)
    if (hasResize && 'resize' in node) {
      const resizableNode = node as SceneNode & { resize: (width: number, height: number) => void };
      
      if (styleObject.width !== undefined && styleObject.height !== undefined) {
        resizableNode.resize(styleObject.width, styleObject.height);
      } else if (styleObject.width !== undefined) {
        resizableNode.resize(styleObject.width, node.height);
      } else if (styleObject.height !== undefined) {
        resizableNode.resize(node.width, styleObject.height);
      }
    }
    
    // Apply size constraints
    if (hasSizeConstraints) {
      if (styleObject.minWidth !== undefined) {
        node.minWidth = styleObject.minWidth;
      }
      if (styleObject.maxWidth !== undefined) {
        node.maxWidth = styleObject.maxWidth;
      }
      if (styleObject.minHeight !== undefined) {
        node.minHeight = styleObject.minHeight;
      }
      if (styleObject.maxHeight !== undefined) {
        node.maxHeight = styleObject.maxHeight;
      }
    }

    // Apply individual stroke weights
    if (hasIndividualStrokes && 'strokes' in node) {
      const strokeableNode = node as SceneNode & {
        strokeTopWeight?: number;
        strokeRightWeight?: number;
        strokeBottomWeight?: number;
        strokeLeftWeight?: number;
      };

      if (styleObject.strokeTopWeight !== undefined) {
        strokeableNode.strokeTopWeight = styleObject.strokeTopWeight;
      }
      if (styleObject.strokeRightWeight !== undefined) {
        strokeableNode.strokeRightWeight = styleObject.strokeRightWeight;
      }
      if (styleObject.strokeBottomWeight !== undefined) {
        strokeableNode.strokeBottomWeight = styleObject.strokeBottomWeight;
      }
      if (styleObject.strokeLeftWeight !== undefined) {
        strokeableNode.strokeLeftWeight = styleObject.strokeLeftWeight;
      }
    }
    
    return node;
  } catch (error) {
    console.error('Error occurred during style application:', error);
    return node;
  }
}