/**
 * Mask Parser - CSS 마스크 관련 속성 파서
 * 
 * Linear gradient masks, radial gradient masks, composable mask system을 지원합니다.
 * CSS mask-image 속성을 통해 다양한 마스킹 효과를 생성합니다.
 */

import { ParsedClass, MaskStyles, DesignPreset, ParsedStyles } from '../../types';
import { ParserContext } from '../../types';

export class MaskParser {
  /**
   * 표준 인터페이스: 클래스가 mask 관련인지 확인합니다.
   */
  static isValidClass(className: string): boolean {
    // 정확한 매치
    const exactMatches = [
      'mask-none', // mask 제거
    ];
    
    if (exactMatches.includes(className)) {
      return true;
    }

    // 패턴 매치 - 백분율은 0-100 범위만 허용
    const patterns = [
      // Linear gradient masks - directional with percentage (0-100%)
      /^mask-[tlbr]-from-(?:100|[1-9]?\d)%$/, // mask-t-from-50%, mask-l-from-30% (0-100%)
      /^mask-[tlbr]-to-(?:100|[1-9]?\d)%$/, // mask-b-to-80%, mask-r-to-70% (0-100%)
      
      // Linear gradient masks - corner combinations
      /^mask-(tl|tr|bl|br)-from-(?:100|[1-9]?\d)%$/, // mask-tl-from-40%, mask-br-from-60% (0-100%)
      /^mask-(tl|tr|bl|br)-to-(?:100|[1-9]?\d)%$/, // mask-tl-to-40%, mask-br-to-60% (0-100%)
      
      // Radial gradient masks
      /^mask-radial-from-(?:100|[1-9]?\d)%$/, // mask-radial-from-80% (0-100%)
      /^mask-radial-to-(?:100|[1-9]?\d)%$/, // mask-radial-to-60% (0-100%)
      
      // Radial gradient masks with position (only valid position names)
      /^mask-radial-(at-center|at-top|at-bottom|at-left|at-right|at-top-left|at-top-right|at-bottom-left|at-bottom-right)$/, // position modifiers
      /^mask-radial-(at-center|at-top|at-bottom|at-left|at-right|at-top-left|at-top-right|at-bottom-left|at-bottom-right)-from-(?:100|[1-9]?\d)%$/, // position + from (0-100%)
      /^mask-radial-(at-center|at-top|at-bottom|at-left|at-right|at-top-left|at-top-right|at-bottom-left|at-bottom-right)-to-(?:100|[1-9]?\d)%$/, // position + to (0-100%)
      
      // Arbitrary values
      /^mask-\[.+\]$/, // mask-[linear-gradient(...)]
    ];

    return patterns.some(pattern => pattern.test(className));
  }

  /**
   * 표준 인터페이스: mask 클래스의 값을 파싱합니다.
   */
  static parseValue(className: string): {
    property: string;
    value: string;
    isArbitrary: boolean;
  } | null {
    // 먼저 유효한 클래스인지 확인
    if (!this.isValidClass(className)) {
      return null;
    }

    // 임의 값 매치
    const arbitraryMatch = className.match(/^mask-\[(.+)\]$/);
    if (arbitraryMatch) {
      return {
        property: 'mask',
        value: arbitraryMatch[1],
        isArbitrary: true
      };
    }

    // mask-none 처리
    if (className === 'mask-none') {
      return {
        property: 'mask',
        value: 'none',
        isArbitrary: false
      };
    }

    // Linear gradient masks 처리
    if (className.startsWith('mask-') && !className.startsWith('mask-radial')) {
      const value = className.slice('mask-'.length);
      return {
        property: 'mask-linear',
        value: value,
        isArbitrary: false
      };
    }

    // Radial gradient masks 처리
    if (className.startsWith('mask-radial')) {
      const value = className.slice('mask-radial-'.length) || 'default';
      return {
        property: 'mask-radial',
        value: value,
        isArbitrary: false
      };
    }

    return null;
  }

  /**
   * 표준 인터페이스: mask 스타일을 적용합니다.
   */
  static applyMaskStyle(
    parsedClass: ParsedClass,
    styles: Partial<ParsedStyles>,
    context: ParserContext
  ): void {
    if (!styles.mask) {
      styles.mask = {};
    }
    const mask = styles.mask;
    const { property, value, isArbitrary } = parsedClass;
    const preset = context.preset;
    switch (property) {
      case 'mask':
        this.handleMask(value, isArbitrary ?? false, mask, preset);
        break;
      case 'mask-linear':
        this.handleLinearMask(value, isArbitrary ?? false, mask, preset);
        break;
      case 'mask-radial':
        this.handleRadialMask(value, isArbitrary ?? false, mask, preset);
        break;
    }
  }

  /**
   * 기본 mask 처리
   */
  private static handleMask(
    value: string,
    isArbitrary: boolean,
    mask: MaskStyles,
    preset: DesignPreset
  ): void {
    if (isArbitrary) {
      // 임의 값 처리
      mask.maskImage = value;
      return;
    }

    if (value === 'none') {
      mask.maskImage = 'none';
      return;
    }
  }

  /**
   * Linear gradient mask 처리
   */
  private static handleLinearMask(
    value: string,
    isArbitrary: boolean,
    mask: MaskStyles,
    preset: DesignPreset
  ): void {
    if (isArbitrary) {
      mask.maskImage = value;
      return;
    }

    const linearMask = this.generateLinearMask(value);
    if (linearMask) {
      // 기존 mask와 결합
      if (mask.maskImage && mask.maskImage !== 'none') {
        mask.maskImage = `${mask.maskImage}, ${linearMask}`;
      } else {
        mask.maskImage = linearMask;
      }
    }
  }

  /**
   * Radial gradient mask 처리
   */
  private static handleRadialMask(
    value: string,
    isArbitrary: boolean,
    mask: MaskStyles,
    preset: DesignPreset
  ): void {
    if (isArbitrary) {
      mask.maskImage = value;
      return;
    }

    const radialMask = this.generateRadialMask(value);
    if (radialMask) {
      // 기존 mask와 결합
      if (mask.maskImage && mask.maskImage !== 'none') {
        mask.maskImage = `${mask.maskImage}, ${radialMask}`;
      } else {
        mask.maskImage = radialMask;
      }
    }
  }

  /**
   * Linear gradient mask CSS 생성
   */
  private static generateLinearMask(value: string): string | null {
    // Direction mapping
    const directionMap: Record<string, string> = {
      't': 'to top',
      'b': 'to bottom', 
      'l': 'to left',
      'r': 'to right',
      'tl': 'to top left',
      'tr': 'to top right',
      'bl': 'to bottom left',
      'br': 'to bottom right'
    };

    // Parse direction, type (from/to), and percentage
    const match = value.match(/^([tlbr]{1,2})-(from|to)-(\d+)%$/);
    if (!match) {
      return null;
    }

    const [, direction, type, percentage] = match;
    const gradientDirection = directionMap[direction];
    if (!gradientDirection) {
      return null;
    }

    // Generate gradient based on from/to type
    if (type === 'from') {
      // Fade from solid to transparent starting at percentage
      return `linear-gradient(${gradientDirection}, transparent 0%, transparent ${percentage}%, rgba(0,0,0,1) 100%)`;
    } else {
      // Fade from solid to transparent ending at percentage
      return `linear-gradient(${gradientDirection}, rgba(0,0,0,1) 0%, rgba(0,0,0,1) ${percentage}%, transparent 100%)`;
    }
  }

  /**
   * Radial gradient mask CSS 생성
   */
  private static generateRadialMask(value: string): string | null {
    // Default radial mask (center, from/to percentage)
    const basicMatch = value.match(/^(from|to)-(\d+)%$/);
    if (basicMatch) {
      const [, type, percentage] = basicMatch;
      
      if (type === 'from') {
        // Fade from center outward starting at percentage
        return `radial-gradient(circle at center, transparent 0%, transparent ${percentage}%, rgba(0,0,0,1) 100%)`;
      } else {
        // Fade from center outward ending at percentage
        return `radial-gradient(circle at center, rgba(0,0,0,1) 0%, rgba(0,0,0,1) ${percentage}%, transparent 100%)`;
      }
    }

    // Position-based radial mask
    const positionMatch = value.match(/^at-([a-z-]+)(?:-(from|to)-(\d+)%)?$/);
    if (positionMatch) {
      const [, position, type, percentage] = positionMatch;
      
      // Position mapping
      const positionMap: Record<string, string> = {
        'center': 'center',
        'top': 'top',
        'bottom': 'bottom',
        'left': 'left', 
        'right': 'right',
        'top-left': 'top left',
        'top-right': 'top right',
        'bottom-left': 'bottom left',
        'bottom-right': 'bottom right'
      };

      const radialPosition = positionMap[position];
      if (!radialPosition) {
        return null;
      }

      // If no percentage specified, default fade
      if (!type || !percentage) {
        return `radial-gradient(circle at ${radialPosition}, rgba(0,0,0,1) 0%, transparent 70%)`;
      }

      if (type === 'from') {
        return `radial-gradient(circle at ${radialPosition}, transparent 0%, transparent ${percentage}%, rgba(0,0,0,1) 100%)`;
      } else {
        return `radial-gradient(circle at ${radialPosition}, rgba(0,0,0,1) 0%, rgba(0,0,0,1) ${percentage}%, transparent 100%)`;
      }
    }

    // Default radial mask
    if (value === 'default' || value === '') {
      return 'radial-gradient(circle at center, rgba(0,0,0,1) 0%, transparent 70%)';
    }

    return null;
  }
} 