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