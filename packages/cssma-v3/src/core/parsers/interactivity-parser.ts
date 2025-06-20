/**
 * Interactivity Parser
 * Tailwind CSS의 모든 Interactivity 유틸리티 클래스를 파싱합니다.
 */

import { ParsedStyle, ParsedClass, InteractivityStyles, DesignPreset } from '../../types';

const INTERACTIVITY_CLASSES = {
  'accent': 'accent',
  'appearance': 'appearance',
  'cursor': 'cursor',
  'caret': 'caret',
  'pointer-events': 'pointer-events',
  'resize': 'resize',
  'scroll': 'scroll',
  'snap': 'snap',
  'touch': 'touch',
  'select': 'select',
  'will-change': 'will-change',
};

const PREFIX_CLASSES = [
  'accent-',
  'appearance-',
  'cursor-',
  'caret-',
  'pointer-events-',
  'resize-',
  'scroll-',
  'snap-',
  'touch-',
  'select-',
  'will-change-',
];

export class InteractivityParser {
  /**
   * 표준 인터페이스: 클래스가 interactivity 관련인지 확인합니다.
   */
  static isValidClass(className: string): boolean {
    // Interactivity patterns
    const patterns = [
      /^accent-/, // accent-red-500, accent-[#ff0000]
      /^appearance-/, // appearance-none, appearance-auto
      /^cursor-/, // cursor-pointer, cursor-not-allowed, cursor-[url()]
      /^caret-/, // caret-red-500, caret-[#ff0000]
      /^pointer-events-/, // pointer-events-none, pointer-events-auto
      /^resize/, // resize, resize-x, resize-y, resize-none
      /^scroll-/, // scroll-smooth, scroll-auto, scroll-m-4, scroll-p-8
      /^select-/, // select-none, select-text, select-all, select-auto
      /^touch-/, // touch-auto, touch-none, touch-pan-x, touch-pan-y
      /^user-select-/, // user-select-none, user-select-text, user-select-all
      /^will-change-/, // will-change-auto, will-change-scroll, will-change-contents
    ];

    return patterns.some(pattern => pattern.test(className));
  }

  /**
   * 표준 인터페이스: interactivity 클래스의 값을 파싱합니다.
   */
  static parseValue(className: string): {
    property: string;
    value: string;
    isArbitrary: boolean;
  } | null {
    if (!this.isValidClass(className)) {
      return null;
    }

    // Simple prefix patterns
    const simplePatterns = [
      'accent', 'appearance', 'cursor', 'caret', 'pointer-events',
      'select', 'user-select', 'will-change'
    ];
    
    for (const pattern of simplePatterns) {
      if (className.startsWith(`${pattern}-`)) {
        const valueStr = className.substring(pattern.length + 1);
        
        // Arbitrary value [...]
        if (valueStr.startsWith('[') && valueStr.endsWith(']')) {
          const value = valueStr.slice(1, -1);
          return {
            property: pattern,
            value,
            isArbitrary: true
          };
        }
        
        return {
          property: pattern,
          value: valueStr,
          isArbitrary: false
        };
      }
    }

    // Resize patterns (resize, resize-x, resize-y, resize-none)
    if (className.startsWith('resize')) {
      if (className === 'resize') {
        return {
          property: 'resize',
          value: 'both',
          isArbitrary: false
        };
      }
      
      const valueStr = className.substring(7); // Remove 'resize-'
      return {
        property: 'resize',
        value: valueStr,
        isArbitrary: false
      };
    }

    // Scroll patterns (scroll-smooth, scroll-m-4, scroll-p-8)
    if (className.startsWith('scroll-')) {
      const parts = className.split('-');
      if (parts.length >= 2) {
        const scrollType = parts[1]; // smooth, auto, m, p, etc.
        const value = parts.slice(2).join('-') || '';
        
        // Scroll behavior (scroll-smooth, scroll-auto)
        if (scrollType === 'smooth' || scrollType === 'auto') {
          return {
            property: 'scroll-behavior',
            value: scrollType,
            isArbitrary: false
          };
        }
        
        // Scroll margin/padding (scroll-m-4, scroll-p-8)
        if (scrollType === 'm' || scrollType === 'p') {
          return {
            property: `scroll-${scrollType}`,
            value: value || 'default',
            isArbitrary: false
          };
        }
        
        // Other scroll properties
        return {
          property: `scroll-${scrollType}`,
          value: value || 'default',
          isArbitrary: false
        };
      }
    }

    // Touch patterns (touch-auto, touch-none, touch-pan-x)
    if (className.startsWith('touch-')) {
      const valueStr = className.substring(6); // Remove 'touch-'
      return {
        property: 'touch-action',
        value: valueStr,
        isArbitrary: false
      };
    }

    return null;
  }

  static isInteractivityClass(className: string): boolean {
    if (className in INTERACTIVITY_CLASSES || PREFIX_CLASSES.some(prefix => className.startsWith(prefix))) {
      return true;
    }

    return false;
  }
  /**
   * Interactivity 스타일을 적용합니다.
   * @param parsedClass 파싱된 클래스
   * @param styles 스타일 객체
   * @param preset 디자인 프리셋 (옵션)
   */
  static applyInteractivityStyle(
    parsedClass: ParsedClass, 
    styles: { interactivity?: InteractivityStyles }, 
    preset?: DesignPreset
  ): void {
    if (!styles.interactivity) {
      styles.interactivity = {};
    }
    
    // 개별 파서를 사용하여 속성 값 설정
    const result = this.parse(parsedClass.baseClassName);
    if (result) {
      switch (result.property) {
        case 'accentColor':
          styles.interactivity.accentColor = result.value;
          break;
        case 'appearance':
          styles.interactivity.appearance = result.value;
          break;
        case 'cursor':
          styles.interactivity.cursor = result.value;
          break;
        case 'caretColor':
          styles.interactivity.caretColor = result.value;
          break;
        case 'pointerEvents':
          styles.interactivity.pointerEvents = result.value;
          break;
        case 'resize':
          styles.interactivity.resize = result.value;
          break;
        case 'scrollBehavior':
          styles.interactivity.scrollBehavior = result.value;
          break;
        case 'scrollMargin':
          styles.interactivity.scrollMargin = result.value;
          break;
        case 'scrollMarginTop':
          styles.interactivity.scrollMarginTop = result.value;
          break;
        case 'scrollMarginRight':
          styles.interactivity.scrollMarginRight = result.value;
          break;
        case 'scrollMarginBottom':
          styles.interactivity.scrollMarginBottom = result.value;
          break;
        case 'scrollMarginLeft':
          styles.interactivity.scrollMarginLeft = result.value;
          break;
        case 'scrollPadding':
          styles.interactivity.scrollPadding = result.value;
          break;
        case 'scrollPaddingTop':
          styles.interactivity.scrollPaddingTop = result.value;
          break;
        case 'scrollPaddingRight':
          styles.interactivity.scrollPaddingRight = result.value;
          break;
        case 'scrollPaddingBottom':
          styles.interactivity.scrollPaddingBottom = result.value;
          break;
        case 'scrollPaddingLeft':
          styles.interactivity.scrollPaddingLeft = result.value;
          break;
        case 'scrollSnapAlign':
          styles.interactivity.scrollSnapAlign = result.value;
          break;
        case 'scrollSnapStop':
          styles.interactivity.scrollSnapStop = result.value;
          break;
        case 'scrollSnapType':
          styles.interactivity.scrollSnapType = result.value;
          break;
        case 'touchAction':
          styles.interactivity.touchAction = result.value;
          break;
        case 'userSelect':
          styles.interactivity.userSelect = result.value;
          break;
        case 'willChange':
          styles.interactivity.willChange = result.value;
          break;
      }
    }
  }

  // Accent Color
  static parseAccentColor(className: string): ParsedStyle | null {
    if (!className.startsWith('accent-')) return null;

    const value = className.slice(7);
    
    // Standard colors
    const colorMap: Record<string, string> = {
      'inherit': 'inherit',
      'current': 'currentColor',
      'transparent': 'transparent',
      'black': '#000000',
      'white': '#ffffff',
      // Gray scale
      'slate-50': '#f8fafc',
      'slate-100': '#f1f5f9',
      'slate-200': '#e2e8f0',
      'slate-300': '#cbd5e1',
      'slate-400': '#94a3b8',
      'slate-500': '#64748b',
      'slate-600': '#475569',
      'slate-700': '#334155',
      'slate-800': '#1e293b',
      'slate-900': '#0f172a',
      // Red
      'red-50': '#fef2f2',
      'red-100': '#fee2e2',
      'red-200': '#fecaca',
      'red-300': '#fca5a5',
      'red-400': '#f87171',
      'red-500': '#ef4444',
      'red-600': '#dc2626',
      'red-700': '#b91c1c',
      'red-800': '#991b1b',
      'red-900': '#7f1d1d',
      // Blue
      'blue-50': '#eff6ff',
      'blue-100': '#dbeafe',
      'blue-200': '#bfdbfe',
      'blue-300': '#93c5fd',
      'blue-400': '#60a5fa',
      'blue-500': '#3b82f6',
      'blue-600': '#2563eb',
      'blue-700': '#1d4ed8',
      'blue-800': '#1e40af',
      'blue-900': '#1e3a8a'
    };

    if (value in colorMap) {
      return {
        property: 'accentColor',
        value: colorMap[value],
        variant: 'preset'
      };
    }

    // Handle arbitrary values
    if (value.startsWith('[') && value.endsWith(']')) {
      const arbitraryValue = value.slice(1, -1);
      return {
        property: 'accentColor',
        value: arbitraryValue,
        variant: 'arbitrary'
      };
    }

    return null;
  }

  // Appearance
  static parseAppearance(className: string): ParsedStyle | null {
    const appearanceMap: Record<string, string> = {
      'appearance-none': 'none',
      'appearance-auto': 'auto'
    };

    if (className in appearanceMap) {
      return {
        property: 'appearance',
        value: appearanceMap[className],
        variant: 'preset'
      };
    }

    return null;
  }

  // Cursor
  static parseCursor(className: string): ParsedStyle | null {
    if (!className.startsWith('cursor-')) return null;

    const value = className.slice(7);
    const cursorMap: Record<string, string> = {
      'auto': 'auto',
      'default': 'default',
      'pointer': 'pointer',
      'wait': 'wait',
      'text': 'text',
      'move': 'move',
      'help': 'help',
      'not-allowed': 'not-allowed',
      'none': 'none',
      'context-menu': 'context-menu',
      'progress': 'progress',
      'cell': 'cell',
      'crosshair': 'crosshair',
      'vertical-text': 'vertical-text',
      'alias': 'alias',
      'copy': 'copy',
      'no-drop': 'no-drop',
      'grab': 'grab',
      'grabbing': 'grabbing',
      'all-scroll': 'all-scroll',
      'col-resize': 'col-resize',
      'row-resize': 'row-resize',
      'n-resize': 'n-resize',
      'e-resize': 'e-resize',
      's-resize': 's-resize',
      'w-resize': 'w-resize',
      'ne-resize': 'ne-resize',
      'nw-resize': 'nw-resize',
      'se-resize': 'se-resize',
      'sw-resize': 'sw-resize',
      'ew-resize': 'ew-resize',
      'ns-resize': 'ns-resize',
      'nesw-resize': 'nesw-resize',
      'nwse-resize': 'nwse-resize',
      'zoom-in': 'zoom-in',
      'zoom-out': 'zoom-out'
    };

    if (value in cursorMap) {
      return {
        property: 'cursor',
        value: cursorMap[value],
        variant: 'preset'
      };
    }

    return null;
  }

  // Caret Color
  static parseCaretColor(className: string): ParsedStyle | null {
    if (!className.startsWith('caret-')) return null;

    const value = className.slice(6);
    
    // Use same color map as accent color
    const colorMap: Record<string, string> = {
      'inherit': 'inherit',
      'current': 'currentColor',
      'transparent': 'transparent',
      'black': '#000000',
      'white': '#ffffff',
      'slate-500': '#64748b',
      'red-500': '#ef4444',
      'blue-500': '#3b82f6',
      'green-500': '#10b981',
      'yellow-500': '#f59e0b',
      'purple-500': '#8b5cf6',
      'pink-500': '#ec4899'
    };

    if (value in colorMap) {
      return {
        property: 'caretColor',
        value: colorMap[value],
        variant: 'preset'
      };
    }

    return null;
  }

  // Pointer Events
  static parsePointerEvents(className: string): ParsedStyle | null {
    const pointerEventsMap: Record<string, string> = {
      'pointer-events-none': 'none',
      'pointer-events-auto': 'auto'
    };

    if (className in pointerEventsMap) {
      return {
        property: 'pointerEvents',
        value: pointerEventsMap[className],
        variant: 'preset'
      };
    }

    return null;
  }

  // Resize
  static parseResize(className: string): ParsedStyle | null {
    const resizeMap: Record<string, string> = {
      'resize-none': 'none',
      'resize-y': 'vertical',
      'resize-x': 'horizontal',
      'resize': 'both'
    };

    if (className in resizeMap) {
      return {
        property: 'resize',
        value: resizeMap[className],
        variant: 'preset'
      };
    }

    return null;
  }

  // Scroll Behavior
  static parseScrollBehavior(className: string): ParsedStyle | null {
    const scrollBehaviorMap: Record<string, string> = {
      'scroll-auto': 'auto',
      'scroll-smooth': 'smooth'
    };

    if (className in scrollBehaviorMap) {
      return {
        property: 'scrollBehavior',
        value: scrollBehaviorMap[className],
        variant: 'preset'
      };
    }

    return null;
  }

  // Scroll Margin
  static parseScrollMargin(className: string): ParsedStyle | null {
    if (!className.startsWith('scroll-m')) return null;

    const spacingMap: Record<string, string> = {
      'scroll-m-0': '0px',
      'scroll-m-px': '1px',
      'scroll-m-0.5': '0.125rem',
      'scroll-m-1': '0.25rem',
      'scroll-m-1.5': '0.375rem',
      'scroll-m-2': '0.5rem',
      'scroll-m-2.5': '0.625rem',
      'scroll-m-3': '0.75rem',
      'scroll-m-3.5': '0.875rem',
      'scroll-m-4': '1rem',
      'scroll-m-5': '1.25rem',
      'scroll-m-6': '1.5rem',
      'scroll-m-7': '1.75rem',
      'scroll-m-8': '2rem',
      'scroll-m-9': '2.25rem',
      'scroll-m-10': '2.5rem',
      'scroll-m-11': '2.75rem',
      'scroll-m-12': '3rem',
      'scroll-m-14': '3.5rem',
      'scroll-m-16': '4rem',
      'scroll-m-20': '5rem',
      'scroll-m-24': '6rem',
      'scroll-m-28': '7rem',
      'scroll-m-32': '8rem',
      'scroll-m-36': '9rem',
      'scroll-m-40': '10rem',
      'scroll-m-44': '11rem',
      'scroll-m-48': '12rem',
      'scroll-m-52': '13rem',
      'scroll-m-56': '14rem',
      'scroll-m-60': '15rem',
      'scroll-m-64': '16rem',
      'scroll-m-72': '18rem',
      'scroll-m-80': '20rem',
      'scroll-m-96': '24rem'
    };

    if (className in spacingMap) {
      return {
        property: 'scrollMargin',
        value: spacingMap[className],
        variant: 'preset'
      };
    }

    // Directional scroll margins
    if (className.startsWith('scroll-mx-')) {
      const value = className.slice(10);
      const scrollKey = `scroll-m-${value}` as keyof typeof spacingMap;
      if (scrollKey in spacingMap) {
        return {
          property: 'scrollMarginLeft',
          value: spacingMap[scrollKey],
          variant: 'preset',
          additionalProperties: [{
            property: 'scrollMarginRight',
            value: spacingMap[scrollKey]
          }]
        };
      }
    }

    if (className.startsWith('scroll-my-')) {
      const value = className.slice(10);
      const scrollKey = `scroll-m-${value}` as keyof typeof spacingMap;
      if (scrollKey in spacingMap) {
        return {
          property: 'scrollMarginTop',
          value: spacingMap[scrollKey],
          variant: 'preset',
          additionalProperties: [{
            property: 'scrollMarginBottom',
            value: spacingMap[scrollKey]
          }]
        };
      }
    }

    if (className.startsWith('scroll-mt-')) {
      const value = className.slice(10);
      const scrollKey = `scroll-m-${value}` as keyof typeof spacingMap;
      if (scrollKey in spacingMap) {
        return {
          property: 'scrollMarginTop',
          value: spacingMap[scrollKey],
          variant: 'preset'
        };
      }
    }

    if (className.startsWith('scroll-mr-')) {
      const value = className.slice(10);
      const scrollKey = `scroll-m-${value}` as keyof typeof spacingMap;
      if (scrollKey in spacingMap) {
        return {
          property: 'scrollMarginRight',
          value: spacingMap[scrollKey],
          variant: 'preset'
        };
      }
    }

    if (className.startsWith('scroll-mb-')) {
      const value = className.slice(10);
      const scrollKey = `scroll-m-${value}` as keyof typeof spacingMap;
      if (scrollKey in spacingMap) {
        return {
          property: 'scrollMarginBottom',
          value: spacingMap[scrollKey],
          variant: 'preset'
        };
      }
    }

    if (className.startsWith('scroll-ml-')) {
      const value = className.slice(10);
      const scrollKey = `scroll-m-${value}` as keyof typeof spacingMap;
      if (scrollKey in spacingMap) {
        return {
          property: 'scrollMarginLeft',
          value: spacingMap[scrollKey],
          variant: 'preset'
        };
      }
    }

    return null;
  }

  // Scroll Padding
  static parseScrollPadding(className: string): ParsedStyle | null {
    if (!className.startsWith('scroll-p')) return null;

    const spacingMap: Record<string, string> = {
      'scroll-p-0': '0px',
      'scroll-p-px': '1px',
      'scroll-p-0.5': '0.125rem',
      'scroll-p-1': '0.25rem',
      'scroll-p-1.5': '0.375rem',
      'scroll-p-2': '0.5rem',
      'scroll-p-2.5': '0.625rem',
      'scroll-p-3': '0.75rem',
      'scroll-p-3.5': '0.875rem',
      'scroll-p-4': '1rem',
      'scroll-p-5': '1.25rem',
      'scroll-p-6': '1.5rem',
      'scroll-p-7': '1.75rem',
      'scroll-p-8': '2rem',
      'scroll-p-9': '2.25rem',
      'scroll-p-10': '2.5rem',
      'scroll-p-11': '2.75rem',
      'scroll-p-12': '3rem',
      'scroll-p-14': '3.5rem',
      'scroll-p-16': '4rem',
      'scroll-p-20': '5rem',
      'scroll-p-24': '6rem',
      'scroll-p-28': '7rem',
      'scroll-p-32': '8rem',
      'scroll-p-36': '9rem',
      'scroll-p-40': '10rem',
      'scroll-p-44': '11rem',
      'scroll-p-48': '12rem',
      'scroll-p-52': '13rem',
      'scroll-p-56': '14rem',
      'scroll-p-60': '15rem',
      'scroll-p-64': '16rem',
      'scroll-p-72': '18rem',
      'scroll-p-80': '20rem',
      'scroll-p-96': '24rem'
    };

    if (className in spacingMap) {
      return {
        property: 'scrollPadding',
        value: spacingMap[className],
        variant: 'preset'
      };
    }

    // Directional scroll paddings (similar to scroll margins)
    if (className.startsWith('scroll-px-')) {
      const value = className.slice(10);
      const scrollKey = `scroll-p-${value}` as keyof typeof spacingMap;
      if (scrollKey in spacingMap) {
        return {
          property: 'scrollPaddingLeft',
          value: spacingMap[scrollKey],
          variant: 'preset',
          additionalProperties: [{
            property: 'scrollPaddingRight',
            value: spacingMap[scrollKey]
          }]
        };
      }
    }

    if (className.startsWith('scroll-py-')) {
      const value = className.slice(10);
      const scrollKey = `scroll-p-${value}` as keyof typeof spacingMap;
      if (scrollKey in spacingMap) {
        return {
          property: 'scrollPaddingTop',
          value: spacingMap[scrollKey],
          variant: 'preset',
          additionalProperties: [{
            property: 'scrollPaddingBottom',
            value: spacingMap[scrollKey]
          }]
        };
      }
    }

    if (className.startsWith('scroll-pt-')) {
      const value = className.slice(10);
      const scrollKey = `scroll-p-${value}` as keyof typeof spacingMap;
      if (scrollKey in spacingMap) {
        return {
          property: 'scrollPaddingTop',
          value: spacingMap[scrollKey],
          variant: 'preset'
        };
      }
    }

    return null;
  }

  // Scroll Snap Align
  static parseScrollSnapAlign(className: string): ParsedStyle | null {
    const snapAlignMap: Record<string, string> = {
      'snap-start': 'start',
      'snap-end': 'end',
      'snap-center': 'center',
      'snap-align-none': 'none'
    };

    if (className in snapAlignMap) {
      return {
        property: 'scrollSnapAlign',
        value: snapAlignMap[className],
        variant: 'preset'
      };
    }

    return null;
  }

  // Scroll Snap Stop
  static parseScrollSnapStop(className: string): ParsedStyle | null {
    const snapStopMap: Record<string, string> = {
      'snap-normal': 'normal',
      'snap-always': 'always'
    };

    if (className in snapStopMap) {
      return {
        property: 'scrollSnapStop',
        value: snapStopMap[className],
        variant: 'preset'
      };
    }

    return null;
  }

  // Scroll Snap Type
  static parseScrollSnapType(className: string): ParsedStyle | null {
    const snapTypeMap: Record<string, string> = {
      'snap-none': 'none',
      'snap-x': 'x var(--tw-scroll-snap-strictness)',
      'snap-y': 'y var(--tw-scroll-snap-strictness)',
      'snap-both': 'both var(--tw-scroll-snap-strictness)',
      'snap-mandatory': 'var(--tw-scroll-snap-strictness)',
      'snap-proximity': 'var(--tw-scroll-snap-strictness)'
    };

    if (className in snapTypeMap) {
      return {
        property: 'scrollSnapType',
        value: snapTypeMap[className],
        variant: 'preset'
      };
    }

    return null;
  }

  // Touch Action
  static parseTouchAction(className: string): ParsedStyle | null {
    const touchActionMap: Record<string, string> = {
      'touch-auto': 'auto',
      'touch-none': 'none',
      'touch-pan-x': 'pan-x',
      'touch-pan-left': 'pan-left',
      'touch-pan-right': 'pan-right',
      'touch-pan-y': 'pan-y',
      'touch-pan-up': 'pan-up',
      'touch-pan-down': 'pan-down',
      'touch-pinch-zoom': 'pinch-zoom',
      'touch-manipulation': 'manipulation'
    };

    if (className in touchActionMap) {
      return {
        property: 'touchAction',
        value: touchActionMap[className],
        variant: 'preset'
      };
    }

    return null;
  }

  // User Select
  static parseUserSelect(className: string): ParsedStyle | null {
    const userSelectMap: Record<string, string> = {
      'select-none': 'none',
      'select-text': 'text',
      'select-all': 'all',
      'select-auto': 'auto'
    };

    if (className in userSelectMap) {
      return {
        property: 'userSelect',
        value: userSelectMap[className],
        variant: 'preset'
      };
    }

    return null;
  }

  // Will Change
  static parseWillChange(className: string): ParsedStyle | null {
    const willChangeMap: Record<string, string> = {
      'will-change-auto': 'auto',
      'will-change-scroll': 'scroll-position',
      'will-change-contents': 'contents',
      'will-change-transform': 'transform'
    };

    if (className in willChangeMap) {
      return {
        property: 'willChange',
        value: willChangeMap[className],
        variant: 'preset'
      };
    }

    return null;
  }

  /**
   * 메인 파싱 메서드 - 모든 interactivity 관련 클래스를 파싱
   */
  static parse(className: string): ParsedStyle | null {
    // 각 파싱 메서드를 순서대로 시도
    return (
      this.parseAccentColor(className) ||
      this.parseAppearance(className) ||
      this.parseCursor(className) ||
      this.parseCaretColor(className) ||
      this.parsePointerEvents(className) ||
      this.parseResize(className) ||
      this.parseScrollBehavior(className) ||
      this.parseScrollMargin(className) ||
      this.parseScrollPadding(className) ||
      this.parseScrollSnapAlign(className) ||
      this.parseScrollSnapStop(className) ||
      this.parseScrollSnapType(className) ||
      this.parseTouchAction(className) ||
      this.parseUserSelect(className) ||
      this.parseWillChange(className)
    );
  }
} 