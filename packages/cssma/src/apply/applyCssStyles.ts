import { FontName, LetterSpacing, LineHeight, Paint } from '../types/figma';
import { findVariableByName } from '../utils/figma-variable';
import { processCssStyles } from '../index';
import { FigmaStyleProperties, FigmaPaint, FigmaSolidPaint } from '../types';

type TextVariableTypes = {
  fontSize: number;
  fontName: FontName;
  lineHeight: LineHeight;
  letterSpacing: LetterSpacing;
  textAlignVertical: 'TOP' | 'CENTER' | 'BOTTOM';
  paragraphSpacing: number;
  paragraphIndent: number;
};

type TextVariableValue = {
  variableId: string;
  value?: any;
};

type ExtendedFigmaStyleProperties = FigmaStyleProperties & {
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  strokeTopWeight?: number;
  strokeRightWeight?: number;
  strokeBottomWeight?: number;
  strokeLeftWeight?: number;
};

type BoundVariablePaint = FigmaPaint & {
  boundVariables?: {
    color?: {
      type: "VARIABLE_ALIAS";
      id: string;
    };
  };
};

/**
 * Process Paint objects with Figma variables.
 */
async function processVariablePaint(paint: BoundVariablePaint): Promise<Paint> {
  // Handle solid color variables
  if (paint.type === 'SOLID' && paint.boundVariables?.color) {
    const variable = await findVariableByName(paint.boundVariables.color.id);
    if (!variable) return paint as Paint;

    const result = await (figma as any).variables.setBoundVariableForPaint(
      {
        type: 'SOLID',
        color: { r: 0, g: 0, b: 0 },
        opacity: ('opacity' in paint) ? paint.opacity : undefined
      } as FigmaSolidPaint,
      'color',
      variable
    );

    return result;
  }

  // Handle gradient variables
  if (['GRADIENT_LINEAR', 'GRADIENT_RADIAL', 'GRADIENT_ANGULAR'].includes(paint.type)) {
    const gradientPaint = paint as unknown as GradientPaint;
    const stops = await Promise.all(
      gradientPaint.gradientStops.map(async (stop) => {
        if ('boundVariables' in stop && stop.boundVariables?.color) {
          const variable = await findVariableByName(stop.boundVariables.color.id);
          if (!variable) return stop;

          const result = await figma.variables.setBoundVariableForPaint(
            {
              type: 'SOLID',
              color: { r: 0, g: 0, b: 0 }
            } as SolidPaint,
            'color',
            variable
          );

          return {
            ...stop,
            color: (result as SolidPaint).color
          };
        }
        return stop;
      })
    );

    return {
      ...gradientPaint,
      gradientStops: stops,
      gradientTransform: gradientPaint.gradientTransform || [[1, 0, 0], [0, 1, 0]]
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
  propertyType: keyof TextVariableTypes
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
export async function applyCssStyles<T extends SceneNode>(node: T, styles: string = ''): Promise<T> {
  if (!styles) return node;
  
  try {
    const styleObject = processCssStyles(styles) as ExtendedFigmaStyleProperties;
    
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
      
      console.log('🔧 Layout Debug - Node:', frameNode.name, 'Type:', frameNode.type);
      console.log('📍 Node ID:', frameNode.id);
      console.log('🎯 Parent:', frameNode.parent ? `${frameNode.parent.name} (${frameNode.parent.type})` : 'None');
      console.log('👶 Children count:', frameNode.children?.length || 0);
      console.log('📐 Style Object:', JSON.stringify(styleObject, null, 2));
      console.log('🎯 Current layoutMode:', frameNode.layoutMode);
      console.log('🔧 Current sizing - H:', frameNode.layoutSizingHorizontal, 'V:', frameNode.layoutSizingVertical);
      
      // Layout mode and direction
      if (styleObject.layoutMode !== undefined) {
        console.log('📱 Setting layoutMode:', styleObject.layoutMode);
        // @ts-ignore
        frameNode.layoutMode = styleObject.layoutMode;
        console.log('✅ layoutMode set to:', frameNode.layoutMode);
      }
      
      // Alignment properties
      if (styleObject.primaryAxisAlignItems !== undefined) {
        console.log('🎪 Setting primaryAxisAlignItems:', styleObject.primaryAxisAlignItems);
        frameNode.primaryAxisAlignItems = styleObject.primaryAxisAlignItems;
      }
      
      if (styleObject.counterAxisAlignItems !== undefined) {
        console.log('🎭 Setting counterAxisAlignItems:', styleObject.counterAxisAlignItems);
        frameNode.counterAxisAlignItems = styleObject.counterAxisAlignItems;
      }
      
      // Layout wrap (line break)
      if (styleObject.layoutWrap !== undefined) {
        console.log('🌯 Setting layoutWrap:', styleObject.layoutWrap);
        frameNode.layoutWrap = styleObject.layoutWrap;
      }
      
      // Sizing properties
      if (styleObject.layoutSizingHorizontal !== undefined) {
        console.log('↔️ Attempting to set layoutSizingHorizontal:', styleObject.layoutSizingHorizontal);
        console.log('🔍 Pre-check - Node:', frameNode.name, 'ID:', frameNode.id);
        console.log('🔍 Pre-check - layoutMode:', frameNode.layoutMode);
        console.log('🔍 Pre-check - Parent layoutMode:', frameNode.parent && 'layoutMode' in frameNode.parent ? frameNode.parent.layoutMode : 'N/A');
        try {
          frameNode.layoutSizingHorizontal = styleObject.layoutSizingHorizontal;
          console.log('✅ layoutSizingHorizontal set successfully for:', frameNode.name);
        } catch (error) {
          console.error('❌ Error setting layoutSizingHorizontal for node:', frameNode.name);
          console.error('❌ Node ID:', frameNode.id);
          console.error('❌ Node type:', frameNode.type);
          console.error('❌ Current layoutMode:', frameNode.layoutMode);
          console.error('❌ Parent info:', frameNode.parent ? `${frameNode.parent.name} (${frameNode.parent.type})` : 'None');
          console.error('❌ Error details:', error);
        }
      }
      
      if (styleObject.layoutSizingVertical !== undefined) {
        console.log('↕️ Attempting to set layoutSizingVertical:', styleObject.layoutSizingVertical);
        console.log('🔍 Pre-check - Node:', frameNode.name, 'ID:', frameNode.id);
        console.log('🔍 Pre-check - layoutMode:', frameNode.layoutMode);
        console.log('🔍 Pre-check - Parent layoutMode:', frameNode.parent && 'layoutMode' in frameNode.parent ? frameNode.parent.layoutMode : 'N/A');
        try {
          frameNode.layoutSizingVertical = styleObject.layoutSizingVertical;
          console.log('✅ layoutSizingVertical set successfully for:', frameNode.name);
        } catch (error) {
          console.error('❌ Error setting layoutSizingVertical for node:', frameNode.name);
          console.error('❌ Node ID:', frameNode.id);
          console.error('❌ Node type:', frameNode.type);
          console.error('❌ Current layoutMode:', frameNode.layoutMode);
          console.error('❌ Parent info:', frameNode.parent ? `${frameNode.parent.name} (${frameNode.parent.type})` : 'None');
          console.error('❌ Error details:', error);
        }
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
          styleObject.fills.map(async (fill) => processVariablePaint(fill))
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
          styleObject.strokes.map(async (stroke) => processVariablePaint(stroke))
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
      
      console.log('📝 Text node debug:', textNode.name);
      console.log('📝 styleObject layoutSizing:', {
        horizontal: styleObject.layoutSizingHorizontal,
        vertical: styleObject.layoutSizingVertical
      });
      
      // Apply layoutSizing properties for text nodes
      if (styleObject.layoutSizingHorizontal !== undefined) {
        textNode.layoutSizingHorizontal = styleObject.layoutSizingHorizontal;
        console.log('📝 Text node layoutSizingHorizontal set to:', styleObject.layoutSizingHorizontal);
      }
      
      if (styleObject.layoutSizingVertical !== undefined) {
        textNode.layoutSizingVertical = styleObject.layoutSizingVertical;
        console.log('📝 Text node layoutSizingVertical set to:', styleObject.layoutSizingVertical);
      }
      
      // Handle textAutoResize based on layoutSizing
      if (styleObject.layoutSizingHorizontal === 'FILL') {
        // When w-full is applied, set textAutoResize to HEIGHT so width can fill
        textNode.textAutoResize = 'HEIGHT';
        console.log('📝 Text node textAutoResize set to HEIGHT for w-full:', textNode.name);
      } else if (styleObject.layoutSizingHorizontal === 'HUG' && styleObject.layoutSizingVertical === 'HUG') {
        // When w-auto h-auto, use WIDTH_AND_HEIGHT (default behavior)
        textNode.textAutoResize = 'WIDTH_AND_HEIGHT';
        console.log('📝 Text node textAutoResize set to WIDTH_AND_HEIGHT for w-auto h-auto:', textNode.name);
      }
      
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
          try {
            textNode.fontName = styleObject.fontName as FontName;
            console.log('✅ FontName set successfully:', styleObject.fontName);
          } catch (error) {
            console.warn('⚠️ Failed to set fontName:', styleObject.fontName, 'Falling back to Inter Regular');
            console.warn('⚠️ Error details:', error);
            // Fallback to a safe default font
            try {
              textNode.fontName = { family: 'Inter', style: 'Regular' };
            } catch (fallbackError) {
              console.error('❌ Even fallback font failed:', fallbackError);
            }
          }
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