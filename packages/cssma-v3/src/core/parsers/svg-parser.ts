/**
 * SVG Parser
 * Tailwind CSS의 모든 SVG 관련 유틸리티 클래스를 파싱합니다.
 */

import { ParsedStyle, ParsedClass, SVGStyles, DesignPreset } from '../../types';

export class SVGParser {
  /**
   * SVG 스타일을 적용합니다.
   * @param parsedClass 파싱된 클래스
   * @param styles 스타일 객체
   * @param preset 디자인 프리셋 (옵션)
   */
  static applySVGStyle(
    parsedClass: ParsedClass, 
    styles: { svg?: SVGStyles }, 
    preset?: DesignPreset
  ): void {
    if (!styles.svg) {
      styles.svg = {};
    }
    
    // 개별 파서를 사용하여 속성 값 설정
    const result = this.parse(parsedClass.baseClassName);
    if (result) {
      switch (result.property) {
        case 'fill':
          styles.svg.fill = result.value;
          break;
        case 'stroke':
          styles.svg.stroke = result.value;
          break;
        case 'strokeWidth':
          styles.svg.strokeWidth = result.value;
          break;
      }
    }
  }

  // Fill
  static parseFill(className: string): ParsedStyle | null {
    if (!className.startsWith('fill-')) return null;

    const value = className.slice(5);
    
    // Standard colors
    const colorMap: Record<string, string> = {
      'inherit': 'inherit',
      'current': 'currentColor',
      'transparent': 'transparent',
      'black': '#000000',
      'white': '#ffffff',
      'none': 'none',
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
      'slate-950': '#020617',
      // Gray
      'gray-50': '#f9fafb',
      'gray-100': '#f3f4f6',
      'gray-200': '#e5e7eb',
      'gray-300': '#d1d5db',
      'gray-400': '#9ca3af',
      'gray-500': '#6b7280',
      'gray-600': '#4b5563',
      'gray-700': '#374151',
      'gray-800': '#1f2937',
      'gray-900': '#111827',
      'gray-950': '#030712',
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
      'red-950': '#450a0a',
      // Orange
      'orange-50': '#fff7ed',
      'orange-100': '#ffedd5',
      'orange-200': '#fed7aa',
      'orange-300': '#fdba74',
      'orange-400': '#fb923c',
      'orange-500': '#f97316',
      'orange-600': '#ea580c',
      'orange-700': '#c2410c',
      'orange-800': '#9a3412',
      'orange-900': '#7c2d12',
      'orange-950': '#431407',
      // Yellow
      'yellow-50': '#fefce8',
      'yellow-100': '#fef3c7',
      'yellow-200': '#fde68a',
      'yellow-300': '#fcd34d',
      'yellow-400': '#fbbf24',
      'yellow-500': '#f59e0b',
      'yellow-600': '#d97706',
      'yellow-700': '#b45309',
      'yellow-800': '#92400e',
      'yellow-900': '#78350f',
      'yellow-950': '#451a03',
      // Green
      'green-50': '#f0fdf4',
      'green-100': '#dcfce7',
      'green-200': '#bbf7d0',
      'green-300': '#86efac',
      'green-400': '#4ade80',
      'green-500': '#22c55e',
      'green-600': '#16a34a',
      'green-700': '#15803d',
      'green-800': '#166534',
      'green-900': '#14532d',
      'green-950': '#052e16',
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
      'blue-900': '#1e3a8a',
      'blue-950': '#172554',
      // Indigo
      'indigo-50': '#eef2ff',
      'indigo-100': '#e0e7ff',
      'indigo-200': '#c7d2fe',
      'indigo-300': '#a5b4fc',
      'indigo-400': '#818cf8',
      'indigo-500': '#6366f1',
      'indigo-600': '#4f46e5',
      'indigo-700': '#4338ca',
      'indigo-800': '#3730a3',
      'indigo-900': '#312e81',
      'indigo-950': '#1e1b4b',
      // Purple
      'purple-50': '#faf5ff',
      'purple-100': '#f3e8ff',
      'purple-200': '#e9d5ff',
      'purple-300': '#d8b4fe',
      'purple-400': '#c084fc',
      'purple-500': '#a855f7',
      'purple-600': '#9333ea',
      'purple-700': '#7c3aed',
      'purple-800': '#6b21a8',
      'purple-900': '#581c87',
      'purple-950': '#3b0764',
      // Pink
      'pink-50': '#fdf2f8',
      'pink-100': '#fce7f3',
      'pink-200': '#fbcfe8',
      'pink-300': '#f9a8d4',
      'pink-400': '#f472b6',
      'pink-500': '#ec4899',
      'pink-600': '#db2777',
      'pink-700': '#be185d',
      'pink-800': '#9d174d',
      'pink-900': '#831843',
      'pink-950': '#500724'
    };

    if (value in colorMap) {
      return {
        property: 'fill',
        value: colorMap[value],
        variant: 'preset'
      };
    }

    // Handle arbitrary values
    if (value.startsWith('[') && value.endsWith(']')) {
      const arbitraryValue = value.slice(1, -1);
      return {
        property: 'fill',
        value: arbitraryValue,
        variant: 'arbitrary'
      };
    }

    return null;
  }

  // Stroke
  static parseStroke(className: string): ParsedStyle | null {
    if (!className.startsWith('stroke-')) return null;

    const value = className.slice(7);
    
    // Use the same color map as fill
    const colorMap: Record<string, string> = {
      'inherit': 'inherit',
      'current': 'currentColor',
      'transparent': 'transparent',
      'black': '#000000',
      'white': '#ffffff',
      'none': 'none',
      'slate-500': '#64748b',
      'gray-500': '#6b7280',
      'red-500': '#ef4444',
      'orange-500': '#f97316',
      'yellow-500': '#f59e0b',
      'green-500': '#22c55e',
      'blue-500': '#3b82f6',
      'indigo-500': '#6366f1',
      'purple-500': '#a855f7',
      'pink-500': '#ec4899'
    };

    if (value in colorMap) {
      return {
        property: 'stroke',
        value: colorMap[value],
        variant: 'preset'
      };
    }

    // Handle arbitrary values
    if (value.startsWith('[') && value.endsWith(']')) {
      const arbitraryValue = value.slice(1, -1);
      return {
        property: 'stroke',
        value: arbitraryValue,
        variant: 'arbitrary'
      };
    }

    return null;
  }

  // Stroke Width
  static parseStrokeWidth(className: string): ParsedStyle | null {
    if (!className.startsWith('stroke-')) return null;

    const value = className.slice(7);
    
    const strokeWidthMap: Record<string, string> = {
      '0': '0',
      '1': '1',
      '2': '2'
    };

    if (value in strokeWidthMap) {
      return {
        property: 'strokeWidth',
        value: strokeWidthMap[value],
        variant: 'preset'
      };
    }

    // Handle arbitrary values
    if (value.startsWith('[') && value.endsWith(']')) {
      const arbitraryValue = value.slice(1, -1);
      return {
        property: 'strokeWidth',
        value: arbitraryValue,
        variant: 'arbitrary'
      };
    }

    return null;
  }

  /**
   * 메인 파싱 메서드 - 모든 SVG 관련 클래스를 파싱
   */
  static parse(className: string): ParsedStyle | null {
    // stroke-width는 stroke 색상보다 먼저 체크해야 함
    if (className.match(/^stroke-[0-9]/)) {
      return this.parseStrokeWidth(className);
    }

    // 각 파싱 메서드를 순서대로 시도
    return (
      this.parseFill(className) ||
      this.parseStroke(className) ||
      this.parseStrokeWidth(className)
    );
  }
} 