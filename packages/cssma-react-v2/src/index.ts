/**
 * CSSMA React v2 - Simple Version
 * 기본적인 React 통합을 위한 라이브러리
 */

// Core Components
export { CSSMAProvider } from './components/CSSMAProvider';
export { CSSMABox } from './components/CSSMABox';

// Hooks
export { useCSSMA } from './hooks/useCSSMA';
export { useCSSMAStyles } from './hooks/useCSSMAStyles';
export { useDarkMode } from './hooks/useDarkMode';

// Utilities
export { cssmaToReactStyle } from './utils/cssmaToReactStyle';
export { generateCSS, generateUniqueId } from './utils/cssToStyleTag';

// Core Classes
export { StyleInjector, getStyleInjector } from './core/StyleInjector';

// Types
export type {
  // Core Types
  CSSMAConfig,
  CSSMAEngine,
  ParsedStyles,
  FigmaProperties,
  
  // Provider Types
  CSSMAProviderProps,
  CSSMAContextValue,
  
  // Hook Types
  UseCSSMAOptions,
  UseCSSMAResult,
  UseCSSMAStylesOptions,
  UseCSSMAStylesResult,
  
  // Component Types
  CSSMABoxProps,
  
  // Utility Types
  ReactStyleObject,
} from './types';

// ============================================================================
// 🚀 Quick Start Examples
// ============================================================================

/**
 * Provider 설정
 * 
 * @example
 * ```tsx
 * import { CSSMAProvider } from 'cssma-react-v2';
 * 
 * function App() {
 *   return (
 *     <CSSMAProvider preset="figma-optimized">
 *       <YourComponents />
 *     </CSSMAProvider>
 *   );
 * }
 * ```
 */

/**
 * Hook 사용법
 * 
 * @example
 * ```tsx
 * import { useCSSMA } from 'cssma-react-v2';
 * 
 * function Component() {
 *   const cssma = useCSSMA();
 *   const styles = cssma.parse('p-4 bg-red-500 text-white');
 *   const reactStyle = cssmaToReactStyle(styles);
 *   
 *   return <div style={reactStyle}>Hello World</div>;
 * }
 * ```
 */

/**
 * CSSMABox 컴포넌트
 * 
 * @example
 * ```tsx
 * import { CSSMABox } from 'cssma-react-v2';
 * 
 * function Component() {
 *   return (
 *     <CSSMABox className="p-4 bg-blue-500 text-white rounded-lg">
 *       Styled with CSSMA classes
 *     </CSSMABox>
 *   );
 * }
 * ```
 */

// ============================================================================
// 🔍 Version Info
// ============================================================================
export const VERSION = '2.0.0'; 