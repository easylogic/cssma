import type { 
  FigmaStyleProperties, 
  FigmaColor, 
  FigmaPaint, 
  FigmaEffect, 
  FigmaLayoutProps, 
  FigmaTextProps, 
  FigmaGeometryProps,
  ParsedStyle
} from './types';

export { processCssStyles, type StyleProcessorOptions } from './style/processCssStyles';


export type {
  FigmaColor,
  FigmaPaint,
  FigmaEffect,
  FigmaLayoutProps,
  FigmaTextProps,
  FigmaGeometryProps,
  FigmaStyleProperties,
  ParsedStyle
};

export * from './parser/class-names';
export * from './parser/index';
export * from './converter';
export * from './converter/class-names';


export * from './apply/applyCssStyles';


// export * from './createElement';


export * from './core/createNodeForData';

export * from './core/updateNodeForData';


export * from './core/figmaToCss';

// Functional Pattern Builders - JSON NodeData creators
export * from './builders/nodeBuilders';

// Code Generators
export * from './generators/react';
export * from './generators/vue';
export * from './generators/angular';
export * from './generators/css';

// Dynamic Style System
export * from './dynamic';

// Animation system
export { parseAnimationClassName } from './parser/class-names/animation';
export { convertAnimationToCSS, ANIMATION_KEYFRAMES } from './converter/css/animation';
export { convertAnimationToFigma, extractAnimationMetadata } from './converter/animation';
export { figmaAnimationToCss, suggestTransitionClasses } from './figma-to-css/animation';

// Main conversion functions
export { 
  convertStylesToFigma, 
  convertStylesToCss,
  generatePrototypingInfo,
  type FigmaConversionResult
} from './converter';
export { figmaToCss, figmaToCssWithAnimations } from './figma-to-css';

// Figma prototyping
export { 
  convertAnimationToFigmaReactions, 
  generatePrototypeSuggestions,
  type FigmaReaction,
  type FigmaTransition,
  type FigmaEasing,
  type FigmaTrigger,
  type FigmaAction
} from './figma/prototyping';