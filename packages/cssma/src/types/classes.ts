/**
 * CSSMA Class Type Definitions for Enhanced TypeScript Support
 * Provides comprehensive type checking and IntelliSense for CSSMA classes
 */

// ===== Animation Classes =====

/**
 * Animation classes for smooth transitions and keyframe animations
 * 
 * @example
 * ```tsx
 * // Basic animations
 * <div className="animate-spin" />      // Continuous rotation
 * <div className="animate-pulse" />     // Subtle pulsing effect
 * <div className="animate-bounce" />    // Bouncing animation
 * 
 * // Custom animations with timing
 * <div className="animate-[fadeIn_0.3s_ease-out]" />
 * ```
 */
export type AnimationClasses = 
  | 'animate-none'
  | 'animate-spin'
  | 'animate-ping' 
  | 'animate-pulse'
  | 'animate-bounce'
  | `animate-[${string}]`;

/**
 * Transition classes for smooth property changes
 * 
 * @example
 * ```tsx
 * // Basic transitions
 * <div className="transition" />          // All properties
 * <div className="transition-colors" />   // Color properties only
 * <div className="transition-opacity" /> // Opacity only
 * 
 * // With duration and timing
 * <div className="transition duration-300 ease-in-out" />
 * ```
 */
export type TransitionClasses = 
  | 'transition'
  | 'transition-none'
  | 'transition-all'
  | 'transition-colors'
  | 'transition-opacity'
  | 'transition-shadow'
  | 'transition-transform';

/**
 * Duration classes for animation and transition timing
 * 
 * @example
 * ```tsx
 * <div className="duration-200" />     // 200ms
 * <div className="duration-500" />     // 500ms
 * <div className="duration-[250ms]" /> // Custom duration
 * ```
 */
export type DurationClasses = 
  | 'duration-0'
  | 'duration-75'
  | 'duration-100'
  | 'duration-150'
  | 'duration-200'
  | 'duration-300'
  | 'duration-500'
  | 'duration-700'
  | 'duration-1000'
  | `duration-[${number}ms]`
  | `duration-[${number}s]`;

/**
 * Timing function classes for animation easing
 * 
 * @example
 * ```tsx
 * <div className="ease-linear" />    // Linear timing
 * <div className="ease-in-out" />    // Ease in and out
 * <div className="ease-[cubic-bezier(0.4,0,0.2,1)]" /> // Custom cubic-bezier
 * ```
 */
export type TimingFunctionClasses = 
  | 'ease-linear'
  | 'ease-in'
  | 'ease-out' 
  | 'ease-in-out'
  | `ease-[cubic-bezier(${number},${number},${number},${number})]`
  | `ease-[steps(${number})]`
  | `ease-[steps(${number},start)]`
  | `ease-[steps(${number},end)]`;

/**
 * Delay classes for animation and transition delays
 * 
 * @example
 * ```tsx
 * <div className="delay-100" />     // 100ms delay
 * <div className="delay-[500ms]" /> // Custom delay
 * ```
 */
export type DelayClasses = 
  | 'delay-0'
  | 'delay-75'
  | 'delay-100'
  | 'delay-150'
  | 'delay-200'
  | 'delay-300'
  | 'delay-500'
  | 'delay-700'
  | 'delay-1000'
  | `delay-[${number}ms]`
  | `delay-[${number}s]`;

// ===== Spacing Classes =====

/**
 * Padding classes for internal spacing
 * 
 * @example
 * ```tsx
 * <div className="p-4" />        // 16px padding all sides
 * <div className="px-8" />       // 32px horizontal padding
 * <div className="py-2" />       // 8px vertical padding
 * <div className="p-[24px]" />   // Custom padding
 * ```
 */
export type PaddingClasses = 
  | 'p-0' | 'p-1' | 'p-2' | 'p-3' | 'p-4' | 'p-5' | 'p-6' | 'p-8' | 'p-10' | 'p-12' | 'p-16' | 'p-20' | 'p-24'
  | 'px-0' | 'px-1' | 'px-2' | 'px-3' | 'px-4' | 'px-5' | 'px-6' | 'px-8' | 'px-10' | 'px-12' | 'px-16' | 'px-20' | 'px-24'
  | 'py-0' | 'py-1' | 'py-2' | 'py-3' | 'py-4' | 'py-5' | 'py-6' | 'py-8' | 'py-10' | 'py-12' | 'py-16' | 'py-20' | 'py-24'
  | 'pt-0' | 'pt-1' | 'pt-2' | 'pt-3' | 'pt-4' | 'pt-5' | 'pt-6' | 'pt-8' | 'pt-10' | 'pt-12' | 'pt-16' | 'pt-20' | 'pt-24'
  | 'pr-0' | 'pr-1' | 'pr-2' | 'pr-3' | 'pr-4' | 'pr-5' | 'pr-6' | 'pr-8' | 'pr-10' | 'pr-12' | 'pr-16' | 'pr-20' | 'pr-24'
  | 'pb-0' | 'pb-1' | 'pb-2' | 'pb-3' | 'pb-4' | 'pb-5' | 'pb-6' | 'pb-8' | 'pb-10' | 'pb-12' | 'pb-16' | 'pb-20' | 'pb-24'
  | 'pl-0' | 'pl-1' | 'pl-2' | 'pl-3' | 'pl-4' | 'pl-5' | 'pl-6' | 'pl-8' | 'pl-10' | 'pl-12' | 'pl-16' | 'pl-20' | 'pl-24'
  | `p-[${string}]` | `px-[${string}]` | `py-[${string}]`
  | `pt-[${string}]` | `pr-[${string}]` | `pb-[${string}]` | `pl-[${string}]`;

/**
 * Margin classes for external spacing
 * 
 * @example
 * ```tsx
 * <div className="m-4" />        // 16px margin all sides
 * <div className="mx-auto" />    // Centered horizontally
 * <div className="my-8" />       // 32px vertical margin
 * <div className="m-[24px]" />   // Custom margin
 * ```
 */
export type MarginClasses = 
  | 'm-0' | 'm-1' | 'm-2' | 'm-3' | 'm-4' | 'm-5' | 'm-6' | 'm-8' | 'm-10' | 'm-12' | 'm-16' | 'm-20' | 'm-24' | 'm-auto'
  | 'mx-0' | 'mx-1' | 'mx-2' | 'mx-3' | 'mx-4' | 'mx-5' | 'mx-6' | 'mx-8' | 'mx-10' | 'mx-12' | 'mx-16' | 'mx-20' | 'mx-24' | 'mx-auto'
  | 'my-0' | 'my-1' | 'my-2' | 'my-3' | 'my-4' | 'my-5' | 'my-6' | 'my-8' | 'my-10' | 'my-12' | 'my-16' | 'my-20' | 'my-24' | 'my-auto'
  | 'mt-0' | 'mt-1' | 'mt-2' | 'mt-3' | 'mt-4' | 'mt-5' | 'mt-6' | 'mt-8' | 'mt-10' | 'mt-12' | 'mt-16' | 'mt-20' | 'mt-24' | 'mt-auto'
  | 'mr-0' | 'mr-1' | 'mr-2' | 'mr-3' | 'mr-4' | 'mr-5' | 'mr-6' | 'mr-8' | 'mr-10' | 'mr-12' | 'mr-16' | 'mr-20' | 'mr-24' | 'mr-auto'
  | 'mb-0' | 'mb-1' | 'mb-2' | 'mb-3' | 'mb-4' | 'mb-5' | 'mb-6' | 'mb-8' | 'mb-10' | 'mb-12' | 'mb-16' | 'mb-20' | 'mb-24' | 'mb-auto'
  | 'ml-0' | 'ml-1' | 'ml-2' | 'ml-3' | 'ml-4' | 'ml-5' | 'ml-6' | 'ml-8' | 'ml-10' | 'ml-12' | 'ml-16' | 'ml-20' | 'ml-24' | 'ml-auto'
  | `m-[${string}]` | `mx-[${string}]` | `my-[${string}]`
  | `mt-[${string}]` | `mr-[${string}]` | `mb-[${string}]` | `ml-[${string}]`;

// ===== Layout Classes =====

/**
 * Display classes for element display types
 * 
 * @example
 * ```tsx
 * <div className="flex" />         // Flexbox container
 * <div className="grid" />         // Grid container
 * <div className="block" />        // Block element
 * <div className="hidden" />       // Hidden element
 * ```
 */
export type DisplayClasses = 
  | 'block' | 'inline-block' | 'inline' | 'flex' | 'inline-flex'
  | 'grid' | 'inline-grid' | 'table' | 'table-row' | 'table-cell'
  | 'hidden' | 'none';

/**
 * Position classes for element positioning
 * 
 * @example
 * ```tsx
 * <div className="relative" />     // Relative positioning
 * <div className="absolute" />     // Absolute positioning
 * <div className="fixed" />        // Fixed positioning
 * <div className="sticky" />       // Sticky positioning
 * ```
 */
export type PositionClasses = 
  | 'static' | 'fixed' | 'absolute' | 'relative' | 'sticky';

// ===== Color Classes =====

/**
 * Background color classes
 * 
 * @example
 * ```tsx
 * <div className="bg-red-500" />      // Red background
 * <div className="bg-blue-100" />     // Light blue background
 * <div className="bg-[#ff0000]" />    // Custom hex color
 * ```
 */
export type BackgroundColorClasses = 
  | 'bg-transparent' | 'bg-current' | 'bg-black' | 'bg-white'
  | 'bg-gray-50' | 'bg-gray-100' | 'bg-gray-200' | 'bg-gray-300' | 'bg-gray-400' | 'bg-gray-500' | 'bg-gray-600' | 'bg-gray-700' | 'bg-gray-800' | 'bg-gray-900'
  | 'bg-red-50' | 'bg-red-100' | 'bg-red-200' | 'bg-red-300' | 'bg-red-400' | 'bg-red-500' | 'bg-red-600' | 'bg-red-700' | 'bg-red-800' | 'bg-red-900'
  | 'bg-blue-50' | 'bg-blue-100' | 'bg-blue-200' | 'bg-blue-300' | 'bg-blue-400' | 'bg-blue-500' | 'bg-blue-600' | 'bg-blue-700' | 'bg-blue-800' | 'bg-blue-900'
  | 'bg-green-50' | 'bg-green-100' | 'bg-green-200' | 'bg-green-300' | 'bg-green-400' | 'bg-green-500' | 'bg-green-600' | 'bg-green-700' | 'bg-green-800' | 'bg-green-900'
  | `bg-[${string}]`;

// ===== Main CSSMA Class Type =====

/**
 * Complete union type for all CSSMA classes with enhanced IntelliSense support
 * 
 * @example
 * ```tsx
 * // Basic usage
 * const classes: CSSMAClassName = 'flex p-4 bg-blue-500';
 * 
 * // With animations
 * const animated: CSSMAClassName = 'animate-spin duration-1000 ease-in-out';
 * 
 * // Custom arbitrary values
 * const custom: CSSMAClassName = 'w-[250px] h-[100vh] bg-[#ff6b6b]';
 * ```
 */
export type CSSMAClassName = 
  | AnimationClasses
  | TransitionClasses
  | DurationClasses
  | TimingFunctionClasses
  | DelayClasses
  | PaddingClasses
  | MarginClasses
  | DisplayClasses
  | PositionClasses
  | BackgroundColorClasses
  | string; // Allow for any string to maintain flexibility

// Import ParsedStyle from main types to avoid duplication
import type { ParsedStyle } from './index';

// ===== Utility Types =====

/**
 * Type-safe class name builder for composing complex CSSMA classes
 * 
 * @example
 * ```tsx
 * const builder = createClassBuilder()
 *   .animate('animate-spin')
 *   .duration('duration-1000')
 *   .background('bg-blue-500')
 *   .padding('p-4');
 * 
 * const className = builder.toString(); // "animate-spin duration-1000 bg-blue-500 p-4"
 * ```
 */
export type ClassNameBuilder<T extends string = ''> = {
  animate: <A extends AnimationClasses>(animation: A) => ClassNameBuilder<T extends '' ? A : `${T} ${A}`>;
  duration: <D extends DurationClasses>(duration: D) => ClassNameBuilder<T extends '' ? D : `${T} ${D}`>;
  background: <B extends BackgroundColorClasses>(bg: B) => ClassNameBuilder<T extends '' ? B : `${T} ${B}`>;
  padding: <P extends PaddingClasses>(padding: P) => ClassNameBuilder<T extends '' ? P : `${T} ${P}`>;
  margin: <M extends MarginClasses>(margin: M) => ClassNameBuilder<T extends '' ? M : `${T} ${M}`>;
  add: <C extends CSSMAClassName>(className: C) => ClassNameBuilder<T extends '' ? C : `${T} ${C}`>;
  toString: () => T;
};

/**
 * Parsed CSSMA result type with enhanced type information
 */
export interface ParsedCSSMAResult {
  styles: ParsedStyle[];
  warnings: string[];
  errors: string[];
  performance: {
    parseTime: number;
    classCount: number;
    cacheHits: number;
  };
}

/**
 * CSSMA parser configuration options
 */
export interface CSSMAConfig {
  /** Enable performance profiling */
  enableProfiling?: boolean;
  /** Enable caching for repeated parsing */
  enableCaching?: boolean;
  /** Maximum cache size */
  maxCacheSize?: number;
  /** Strict mode for type checking */
  strictMode?: boolean;
  /** Custom animation definitions */
  customAnimations?: Record<string, string>;
} 