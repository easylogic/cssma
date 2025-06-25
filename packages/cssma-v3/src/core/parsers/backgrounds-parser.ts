import { ParsedStyle, ParsedClass, ParsedStyles, ParserContext } from '../../types';
import { ColorUtils } from '../../config';

export class BackgroundsParser {

  private static readonly BACKGROUND_SIZE_VALUES: Record<string, string> = {
    'bg-auto': 'auto',
    'bg-cover': 'cover',
    'bg-contain': 'contain'
  };

  private static readonly BACKGROUND_POSITION_VALUES: Record<string, string> = {
    'bg-bottom': 'bottom',
    'bg-center': 'center',
    'bg-left': 'left',
    'bg-left-bottom': 'left bottom',
    'bg-left-top': 'left top',
    'bg-right': 'right',
    'bg-right-bottom': 'right bottom',
    'bg-right-top': 'right top',
    'bg-top': 'top'
  };

  private static readonly BACKGROUND_REPEAT_VALUES: Record<string, string> = {
    'bg-repeat': 'repeat',
    'bg-no-repeat': 'no-repeat',
    'bg-repeat-x': 'repeat-x',
    'bg-repeat-y': 'repeat-y',
    'bg-repeat-round': 'round',
    'bg-repeat-space': 'space'
  };

  private static readonly BACKGROUND_ATTACHMENT_VALUES: Record<string, string> = {
    'bg-fixed': 'fixed',
    'bg-local': 'local',
    'bg-scroll': 'scroll'
  };

  private static readonly BACKGROUND_CLIP_VALUES: Record<string, string> = {
    'bg-clip-border': 'border-box',
    'bg-clip-padding': 'padding-box',
    'bg-clip-content': 'content-box',
    'bg-clip-text': 'text'
  };

  private static readonly BACKGROUND_ORIGIN_VALUES: Record<string, string> = {
    'bg-origin-border': 'border-box',
    'bg-origin-padding': 'padding-box',
    'bg-origin-content': 'content-box'
  };

  // 기존 그라데이션 방향 (v3.x 호환성)
  private static readonly GRADIENT_DIRECTIONS: Record<string, string> = {
    'bg-gradient-to-t': 'to top',
    'bg-gradient-to-tr': 'to top right',
    'bg-gradient-to-r': 'to right',
    'bg-gradient-to-br': 'to bottom right',
    'bg-gradient-to-b': 'to bottom',
    'bg-gradient-to-bl': 'to bottom left',
    'bg-gradient-to-l': 'to left',
    'bg-gradient-to-tl': 'to top left'
  };

  // v4.1 새로운 선형 그라데이션 방향
  private static readonly LINEAR_GRADIENT_DIRECTIONS: Record<string, string> = {
    'bg-linear-to-t': 'to top',
    'bg-linear-to-tr': 'to top right',
    'bg-linear-to-r': 'to right',
    'bg-linear-to-br': 'to bottom right',
    'bg-linear-to-b': 'to bottom',
    'bg-linear-to-bl': 'to bottom left',
    'bg-linear-to-l': 'to left',
    'bg-linear-to-tl': 'to top left'
  };

  private static readonly BACKGROUND_IMAGE_VALUES: Record<string, string> = {
    'bg-image-none': 'none',
    'bg-none': 'none',
    'bg-image-transparent': 'transparent',
    'bg-image-current': 'currentColor',
    'bg-image-inherit': 'inherit',
    'bg-image-initial': 'initial',
    'bg-image-unset': 'unset'
  };

  // v4.1 배경 투명도 값들
  private static readonly BACKGROUND_OPACITY_VALUES: Record<string, string> = {
    'bg-opacity-0': '0',
    'bg-opacity-5': '0.05',
    'bg-opacity-10': '0.1',
    'bg-opacity-20': '0.2',
    'bg-opacity-25': '0.25',
    'bg-opacity-30': '0.3',
    'bg-opacity-40': '0.4',
    'bg-opacity-50': '0.5',
    'bg-opacity-60': '0.6',
    'bg-opacity-70': '0.7',
    'bg-opacity-75': '0.75',
    'bg-opacity-80': '0.8',
    'bg-opacity-90': '0.9',
    'bg-opacity-95': '0.95',
    'bg-opacity-100': '1'
  };

  /**
   * 표준 인터페이스: 클래스가 background 관련인지 확인합니다.
   */
  static isValidClass(className: string, context: ParserContext): boolean {
    // Background patterns (색상 포함)
    const patterns = [
      /^bg-/, // bg-red-500, bg-transparent, bg-gradient-to-r, bg-linear-to-r, bg-radial, bg-conic-45, bg-fixed, etc.
      /^from-/, // from-red-500, from-10% (gradient start)
      /^via-/, // via-blue-500, via-30% (gradient middle)
      /^to-/, // to-green-500, to-90% (gradient end)
    ];

    // 기본 패턴 체크
    if (!patterns.some(pattern => pattern.test(className))) {
      return false;
    }

    // 잘못된 배경 클래스들 명시적으로 거부
    const invalidPatterns = [
      /^bg-invalid-/, // bg-invalid-color
      /^bg-wrong-/, // bg-wrong-property
      /^bg-nonexistent-/, // bg-nonexistent-value
      /^bg-bad-/, // bg-bad-syntax
      /^bg-fake-/, // bg-fake-class
      // 잘못된 그라데이션 방향 거부
      /^bg-gradient-to-invalid$/,
      /^bg-linear-to-invalid$/,
      /^bg-radial-invalid$/,
      /^bg-conic-invalid$/,
      // 존재하지 않는 색상 거부
      /^(from|via|to)-nonexistent-/,
    ];

    if (invalidPatterns.some(pattern => pattern.test(className))) {
      return false;
    }

    // 이름이 존재하는데 범위가 다르다면 거부
    const [ , colorPrefix , ...rest ] = className.split('-');
    if (context.utils.isColorName(colorPrefix) && !context.utils.isValidColor(colorPrefix)) {
      return false;
    }

    return true;
  }

  /**
   * 표준 인터페이스: background 클래스의 값을 파싱합니다.
   */
  static parseValue(className: string, context: ParserContext): {
    property: string;
    value: string;
    isArbitrary: boolean;
  } | null {

    if (!this.isValidClass(className, context)) {
      return null;
    }

    // v4.1 커스텀 속성 배경 이미지 (bg-(image:--my-image))
    if (className.startsWith('bg-(') && className.endsWith(')')) {
      const value = className.slice(3, -1); // Remove 'bg-(' and ')'
      return {
        property: 'bg-custom-property',
        value,
        isArbitrary: false
      };
    }

    // v4.1 새로운 선형 그라데이션 방향
    if (className.startsWith('bg-linear-to-')) {
      const direction = this.LINEAR_GRADIENT_DIRECTIONS[className];
      if (direction) {
        return {
          property: 'bg-linear',
          value: direction,
          isArbitrary: false
        };
      }
    }

    // v4.1 각도 기반 선형 그라데이션 (bg-linear-45, -bg-linear-90)
    const linearAngleMatch = className.match(/^(-?)bg-linear-(\d+)(?:\/(.+))?$/);
    if (linearAngleMatch) {
      if (className.startsWith('bg-linear-')) {
        console.log('[BackgroundsParser] linearAngleMatch found for', className, ':', linearAngleMatch);
      }
      const [, negative, angle, interpolation] = linearAngleMatch;
      const actualAngle = negative ? `-${angle}deg` : `${angle}deg`;
      const interpolationMode = interpolation || 'oklab';
      const result = {
        property: 'bg-linear-angle',
        value: `${actualAngle} in ${interpolationMode}`,
        isArbitrary: false
      };
      return result;
    }

    // v4.1 보간 모드가 있는 선형 그라데이션 (bg-linear-to-r/srgb)
    const linearInterpolationMatch = className.match(/^bg-linear-to-([a-z]+)\/(.+)$/);
    if (linearInterpolationMatch) {
      const [, direction, interpolation] = linearInterpolationMatch;
      const directionValue = this.getDirectionValue(direction);
      if (directionValue) {
        return {
          property: 'bg-linear-interpolation',
          value: `to ${directionValue} in ${interpolation}`,
          isArbitrary: false
        };
      }
    }

    // v4.1 방사형 그라데이션 (bg-radial, bg-radial/hsl)
    const radialMatch = className.match(/^bg-radial(?:\/(.+))?$/);
    if (radialMatch) {
      const [, interpolation] = radialMatch;
      const interpolationMode = interpolation || 'oklab';
      return {
        property: 'bg-radial',
        value: `in ${interpolationMode}`,
        isArbitrary: false
      };
    }

    // v4.1 원뿔형 그라데이션 (bg-conic-0, bg-conic-45, -bg-conic-90)
    const conicMatch = className.match(/^(-?)bg-conic(?:-(\d+))?(?:\/(.+))?$/);
    if (conicMatch) {
      const [, negative, angle, interpolation] = conicMatch;
      const actualAngle = angle ? (negative ? `-${angle}deg` : `${angle}deg`) : '0deg';
      const interpolationMode = interpolation || 'oklab';
      return {
        property: 'bg-conic',
        value: `from ${actualAngle} in ${interpolationMode}`,
        isArbitrary: false
      };
    }

    // v4.1 임의 그라데이션 (bg-linear-[...], bg-radial-[...], bg-conic-[...])
    if (className.startsWith('bg-linear-[') && className.endsWith(']')) {
      const value = className.slice(11, -1); // Remove 'bg-linear-[' and ']'
      return {
        property: 'bg-linear-arbitrary',
        value,
        isArbitrary: true
      };
    }

    if (className.startsWith('bg-radial-[') && className.endsWith(']')) {
      const value = className.slice(11, -1); // Remove 'bg-radial-[' and ']'
      return {
        property: 'bg-radial-arbitrary',
        value,
        isArbitrary: true
      };
    }

    if (className.startsWith('bg-conic-[') && className.endsWith(']')) {
      const value = className.slice(10, -1); // Remove 'bg-conic-[' and ']'
      return {
        property: 'bg-conic-arbitrary',
        value,
        isArbitrary: true
      };
    }

    // v4.1 커스텀 속성 그라데이션 (bg-linear-(<custom-property>))
    if (className.startsWith('bg-linear-(') && className.endsWith(')')) {
      const value = className.slice(11, -1); // Remove 'bg-linear-(' and ')'
      return {
        property: 'bg-linear-custom',
        value,
        isArbitrary: false
      };
    }

    if (className.startsWith('bg-radial-(') && className.endsWith(')')) {
      const value = className.slice(11, -1); // Remove 'bg-radial-(' and ')'
      return {
        property: 'bg-radial-custom',
        value,
        isArbitrary: false
      };
    }

    if (className.startsWith('bg-conic-(') && className.endsWith(')')) {
      const value = className.slice(10, -1); // Remove 'bg-conic-(' and ')'
      return {
        property: 'bg-conic-custom',
        value,
        isArbitrary: false
      };
    }

    // 기존 그라데이션 방향 (v3.x 호환성)
    if (className.startsWith('bg-gradient-')) {
      const direction = this.GRADIENT_DIRECTIONS[className];
      if (direction) {
        return {
          property: 'bg-gradient',
          value: direction,
          isArbitrary: false
        };
      }
    }

    // v4.1 배경 투명도 (bg-opacity-50)
    if (className.startsWith('bg-opacity-')) {
      if (className.startsWith('bg-opacity-[') && className.endsWith(']')) {
        const value = className.slice(12, -1); // Remove 'bg-opacity-[' and ']'
        return {
          property: 'bg-opacity',
          value,
          isArbitrary: true
        };
      }
      
      const opacity = this.BACKGROUND_OPACITY_VALUES[className];
      if (opacity) {
        return {
          property: 'bg-opacity',
          value: opacity,
          isArbitrary: false
        };
      }
    }

    // Background size preset values (우선순위를 색상보다 높게)
    const sizeValue = this.BACKGROUND_SIZE_VALUES[className];
    if (sizeValue) {
      return {
        property: 'bg-size',
        value: sizeValue,
        isArbitrary: false
      };
    }

    // Background position preset values
    const positionValue = this.BACKGROUND_POSITION_VALUES[className];
    if (positionValue) {
      return {
        property: 'bg-position',
        value: positionValue,
        isArbitrary: false
      };
    }

    // Background repeat preset values
    const repeatValue = this.BACKGROUND_REPEAT_VALUES[className];
    if (repeatValue) {
      return {
        property: 'bg-repeat',
        value: repeatValue,
        isArbitrary: false
      };
    }

    // Background attachment preset values
    const attachmentValue = this.BACKGROUND_ATTACHMENT_VALUES[className];
    if (attachmentValue) {
      return {
        property: 'bg-attachment',
        value: attachmentValue,
        isArbitrary: false
      };
    }

    // Background clip preset values
    const clipValue = this.BACKGROUND_CLIP_VALUES[className];
    if (clipValue) {
      return {
        property: 'bg-clip',
        value: clipValue,
        isArbitrary: false
      };
    }

    // Background origin preset values
    const originValue = this.BACKGROUND_ORIGIN_VALUES[className];
    if (originValue) {
      return {
        property: 'bg-origin',
        value: originValue,
        isArbitrary: false
      };
    }

    // Background image preset values (bg-none)
    const imageValue = this.BACKGROUND_IMAGE_VALUES[className];
    if (imageValue) {
      return {
        property: 'bg-image',
        value: imageValue,
        isArbitrary: false
      };
    }

    // Background color patterns (이제 마지막에 처리)
    if (className.startsWith('bg-') && !className.includes('-to-') && !className.includes('-via-') && !className.includes('gradient') && !className.includes('linear') && !className.includes('radial') && !className.includes('conic')) {
      // bg-red-500, bg-[#ff0000], bg-transparent, bg-current
      if (className.startsWith('bg-[') && className.endsWith(']')) {
        const value = className.slice(4, -1); // Remove 'bg-[' and ']'

        if (value.startsWith('url(')) {
          return {
            property: 'backgroundImage',
            value,
            isArbitrary: true
          };
        }

        return {
          property: 'bg',
          value,
          isArbitrary: true
        };
      }
      
      const value = className.substring(3); // Remove 'bg-'
      return {
        property: 'bg',
        value,
        isArbitrary: false
      };
    }

    // v4.1 향상된 그라데이션 정지점 (from-10%, via-30%, to-90%)
    if (className.startsWith('from-')) {
      if (className.startsWith('from-[') && className.endsWith(']')) {
        const value = className.slice(6, -1); // Remove 'from-[' and ']'
        return {
          property: 'from',
          value,
          isArbitrary: true
        };
      }

      // 커스텀 속성 (from-(<custom-property>))
      if (className.startsWith('from-(') && className.endsWith(')')) {
        const value = className.slice(6, -1); // Remove 'from-(' and ')'
        return {
          property: 'from-custom',
          value,
          isArbitrary: false
        };
      }

      // 퍼센트 위치 (from-10%)
      if (className.match(/^from-\d+%$/)) {
        const value = className.substring(5); // Remove 'from-'
        return {
          property: 'from-position',
          value,
          isArbitrary: false
        };
      }
      
      const value = className.substring(5); // Remove 'from-'
      return {
        property: 'from',
        value,
        isArbitrary: false
      };
    }

    // Gradient middle color (via-)
    if (className.startsWith('via-')) {
      if (className.startsWith('via-[') && className.endsWith(']')) {
        const value = className.slice(5, -1); // Remove 'via-[' and ']'
        return {
          property: 'via',
          value,
          isArbitrary: true
        };
      }

      // 커스텀 속성 (via-(<custom-property>))
      if (className.startsWith('via-(') && className.endsWith(')')) {
        const value = className.slice(5, -1); // Remove 'via-(' and ')'
        return {
          property: 'via-custom',
          value,
          isArbitrary: false
        };
      }

      // 퍼센트 위치 (via-30%)
      if (className.match(/^via-\d+%$/)) {
        const value = className.substring(4); // Remove 'via-'
        return {
          property: 'via-position',
          value,
          isArbitrary: false
        };
      }
      
      const value = className.substring(4); // Remove 'via-'
      return {
        property: 'via',
        value,
        isArbitrary: false
      };
    }

    // Gradient end color (to-)
    if (className.startsWith('to-')) {
      if (className.startsWith('to-[') && className.endsWith(']')) {
        const value = className.slice(4, -1); // Remove 'to-[' and ']'
        return {
          property: 'to',
          value,
          isArbitrary: true
        };
      }

      // 커스텀 속성 (to-(<custom-property>))
      if (className.startsWith('to-(') && className.endsWith(')')) {
        const value = className.slice(4, -1); // Remove 'to-(' and ')'
        return {
          property: 'to-custom',
          value,
          isArbitrary: false
        };
      }

      // 퍼센트 위치 (to-90%)
      if (className.match(/^to-\d+%$/)) {
        const value = className.substring(3); // Remove 'to-'
        return {
          property: 'to-position',
          value,
          isArbitrary: false
        };
      }
      
      const value = className.substring(3); // Remove 'to-'
      return {
        property: 'to',
        value,
        isArbitrary: false
      };
    }

    // Background size (bg-cover, bg-contain, bg-auto, bg-[50%])
    if (className.startsWith('bg-[') && className.endsWith(']') && !className.includes('gradient') && !className.includes('linear') && !className.includes('radial') && !className.includes('conic')) {
      const value = className.slice(4, -1); // Remove 'bg-[' and ']'
      // Check if it's a size value, position value, etc.
      if (value.includes('%') || value.includes('px') || value.includes('rem') || value.includes('em') || value.includes(' ')) {
        // Could be size or position
        return {
          property: 'bg-arbitrary',
          value,
          isArbitrary: true
        };
      }
    }

    return null;
  }

  static parse(className: string): ParsedStyle | null {
    // v4.1 배경 투명도
    if (this.BACKGROUND_OPACITY_VALUES[className]) {
      return {
        property: '--tw-bg-opacity',
        value: this.BACKGROUND_OPACITY_VALUES[className],
        variant: 'preset'
      };
    }

    // v4.1 임의 배경 투명도
    if (className.startsWith('bg-opacity-[') && className.endsWith(']')) {
      const value = className.slice(12, -1);
      return {
        property: '--tw-bg-opacity',
        value: value,
        variant: 'arbitrary'
      };
    }

    // Background size
    if (this.BACKGROUND_SIZE_VALUES[className]) {
      return {
        property: 'backgroundSize',
        value: this.BACKGROUND_SIZE_VALUES[className],
        variant: 'preset'
      };
    }

    // Background position
    if (this.BACKGROUND_POSITION_VALUES[className]) {
      return {
        property: 'backgroundPosition',
        value: this.BACKGROUND_POSITION_VALUES[className],
        variant: 'preset'
      };
    }

    // Background repeat
    if (this.BACKGROUND_REPEAT_VALUES[className]) {
      return {
        property: 'backgroundRepeat',
        value: this.BACKGROUND_REPEAT_VALUES[className],
        variant: 'preset'
      };
    }

    // Background attachment
    if (this.BACKGROUND_ATTACHMENT_VALUES[className]) {
      return {
        property: 'backgroundAttachment',
        value: this.BACKGROUND_ATTACHMENT_VALUES[className],
        variant: 'preset'
      };
    }

    // Background clip
    if (this.BACKGROUND_CLIP_VALUES[className]) {
      return {
        property: 'backgroundClip',
        value: this.BACKGROUND_CLIP_VALUES[className],
        variant: 'preset'
      };
    }

    // Background origin
    if (this.BACKGROUND_ORIGIN_VALUES[className]) {
      return {
        property: 'backgroundOrigin',
        value: this.BACKGROUND_ORIGIN_VALUES[className],
        variant: 'preset'
      };
    }

    if (this.BACKGROUND_IMAGE_VALUES[className]) {
      return {
        property: 'backgroundImage',
        value: this.BACKGROUND_IMAGE_VALUES[className],
        variant: 'preset'
      };
    }

    // v4.1 새로운 선형 그라데이션
    if (className.startsWith('bg-linear-')) {
      return this.parseLinearGradient(className);
    }

    // v4.1 방사형 그라데이션
    if (className.startsWith('bg-radial')) {
      return this.parseRadialGradient(className);
    }

    // v4.1 원뿔형 그라데이션
    if (className.startsWith('bg-conic')) {
      return this.parseConicGradient(className);
    }

    // 기존 그라데이션 (v3.x 호환성)
    if (className.startsWith('bg-gradient-')) {
      return this.parseGradient(className);
    }

    // 그라데이션 색상 정지점 (향상된 v4.1 기능 포함)
    if (className.startsWith('from-') || className.startsWith('via-') || className.startsWith('to-')) {
      return this.parseGradientColorStop(className);
    }

    // Background colors (check this last among bg- patterns)
    if (className.startsWith('bg-') && !className.includes('gradient') && !className.includes('linear') && !className.includes('radial') && !className.includes('conic')) {
      return this.parseBackgroundColor(className);
    }

    return null;
  }

  // v4.1 새로운 선형 그라데이션 파싱
  private static parseLinearGradient(className: string): ParsedStyle | null {
    // 방향 기반 (bg-linear-to-r)
    if (this.LINEAR_GRADIENT_DIRECTIONS[className]) {
      return {
        property: 'backgroundImage',
        value: `linear-gradient(${this.LINEAR_GRADIENT_DIRECTIONS[className]}, var(--tw-gradient-stops))`,
        variant: 'preset'
      };
    }

    // 각도 기반 (bg-linear-45, -bg-linear-90)
    const angleMatch = className.match(/^(-?)bg-linear-(\d+)(?:\/(.+))?$/);
    if (angleMatch) {
      const [, negative, angle, interpolation] = angleMatch;
      const actualAngle = negative ? `-${angle}deg` : `${angle}deg`;
      const interpolationMode = interpolation || 'oklab';
      return {
        property: 'backgroundImage',
        value: `linear-gradient(${actualAngle} in ${interpolationMode}, var(--tw-gradient-stops))`,
        variant: 'preset'
      };
    }

    // 보간 모드만 있는 경우 (bg-linear-to-r/srgb)
    const interpolationMatch = className.match(/^bg-linear-to-([a-z]+)\/(.+)$/);
    if (interpolationMatch) {
      const [, direction, interpolation] = interpolationMatch;
      const directionKey = `bg-linear-to-${direction}`;
      const directionValue = this.LINEAR_GRADIENT_DIRECTIONS[directionKey];
      if (directionValue) {
        return {
          property: 'backgroundImage',
          value: `linear-gradient(${directionValue} in ${interpolation}, var(--tw-gradient-stops))`,
          variant: 'preset'
        };
      }
    }

    // 임의값 (bg-linear-[25deg,red_5%,yellow_60%,lime_90%,teal])
    if (className.startsWith('bg-linear-[') && className.endsWith(']')) {
      const value = className.slice(11, -1);
      return {
        property: 'backgroundImage',
        value: `linear-gradient(var(--tw-gradient-stops, ${value}))`,
        variant: 'arbitrary'
      };
    }

    // 커스텀 속성 (bg-linear-(<custom-property>))
    if (className.startsWith('bg-linear-(') && className.endsWith(')')) {
      const value = className.slice(11, -1);
      return {
        property: 'backgroundImage',
        value: `linear-gradient(var(--tw-gradient-stops, var(${value})))`,
        variant: 'preset'
      };
    }

    return null;
  }

  // v4.1 방사형 그라데이션 파싱
  private static parseRadialGradient(className: string): ParsedStyle | null {
    // 기본 방사형 (bg-radial, bg-radial/hsl)
    const basicMatch = className.match(/^bg-radial(?:\/(.+))?$/);
    if (basicMatch) {
      const [, interpolation] = basicMatch;
      const interpolationMode = interpolation || 'oklab';
      return {
        property: 'backgroundImage',
        value: `radial-gradient(in ${interpolationMode}, var(--tw-gradient-stops))`,
        variant: 'preset'
      };
    }

    // 임의값 (bg-radial-[at_50%_75%])
    if (className.startsWith('bg-radial-[') && className.endsWith(']')) {
      const value = className.slice(11, -1);
      return {
        property: 'backgroundImage',
        value: `radial-gradient(var(--tw-gradient-stops, ${value}))`,
        variant: 'arbitrary'
      };
    }

    // 커스텀 속성 (bg-radial-(<custom-property>))
    if (className.startsWith('bg-radial-(') && className.endsWith(')')) {
      const value = className.slice(11, -1);
      return {
        property: 'backgroundImage',
        value: `radial-gradient(var(--tw-gradient-stops, var(${value})))`,
        variant: 'preset'
      };
    }

    return null;
  }

  // v4.1 원뿔형 그라데이션 파싱
  private static parseConicGradient(className: string): ParsedStyle | null {
    // 각도 기반 (bg-conic-45, -bg-conic-90)
    const angleMatch = className.match(/^(-?)bg-conic-?(\d+)?(?:\/(.+))?$/);
    if (angleMatch) {
      const [, negative, angle, interpolation] = angleMatch;
      const actualAngle = angle ? (negative ? `-${angle}deg` : `${angle}deg`) : '0deg';
      const interpolationMode = interpolation || 'oklab';
      return {
        property: 'backgroundImage',
        value: `conic-gradient(from ${actualAngle} in ${interpolationMode}, var(--tw-gradient-stops))`,
        variant: 'preset'
      };
    }

    // 임의값 (bg-conic-[from_45deg_at_center])
    if (className.startsWith('bg-conic-[') && className.endsWith(']')) {
      const value = className.slice(10, -1);
      return {
        property: 'backgroundImage',
        value: `conic-gradient(${value})`,
        variant: 'arbitrary'
      };
    }

    // 커스텀 속성 (bg-conic-(<custom-property>))
    if (className.startsWith('bg-conic-(') && className.endsWith(')')) {
      const value = className.slice(10, -1);
      return {
        property: 'backgroundImage',
        value: `var(${value})`,
        variant: 'preset'
      };
    }

    return null;
  }

  private static parseBackgroundColor(className: string): ParsedStyle | null {
    const value = className.replace('bg-', '');

    // Handle transparent and current
    if (value === 'transparent') {
      return {
        property: 'backgroundColor',
        value: 'transparent',
        variant: 'preset'
      };
    }

    if (value === 'current') {
      return {
        property: 'backgroundColor',
        value: 'currentColor',
        variant: 'preset'
      };
    }

    // Handle inherit, initial, unset
    if (['inherit', 'initial', 'unset'].includes(value)) {
      return {
        property: 'backgroundColor',
        value: value,
        variant: 'preset'
      };
    }

    // Handle arbitrary values
    if (value.startsWith('[') && value.endsWith(']')) {
      const color = value.slice(1, -1);
      
      // Check if it's a URL - should be backgroundImage
      if (color.startsWith('url(')) {
        return {
          property: 'backgroundImage',
          value: color,
          variant: 'arbitrary'
        };
      }
      
      // Otherwise it's a color - should be backgroundColor
      return {
        property: 'backgroundColor',
        value: color,
        variant: 'arbitrary'
      };
    }

    // v4.1 색상/투명도 조합 (bg-red-500/50)
    if (value.includes('/')) {
      const [colorPart, opacityPart] = value.split('/');
      const opacity = parseInt(opacityPart) / 100;
      
      if (this.isValidColor(colorPart)) {
        const colorValue = this.getColorValue(colorPart);
        return {
          property: 'backgroundColor',
          value: `${colorValue}`,
          variant: 'preset'
        };
      }
    }

    // Handle standard color palette
    if (this.isValidColor(value)) {
      return {
        property: 'backgroundColor',
        value: this.getColorValue(value),
        variant: 'preset'
      };
    }

    return null;
  }

  private static parseGradient(className: string): ParsedStyle | null {
    if (this.GRADIENT_DIRECTIONS[className]) {
      return {
        property: 'backgroundImage',
        value: `linear-gradient(${this.GRADIENT_DIRECTIONS[className]}, var(--tw-gradient-stops))`,
        variant: 'preset'
      };
    }

    return null;
  }

  private static parseGradientColorStop(className: string): ParsedStyle | null {
    const prefix = className.split('-')[0];
    const value = className.substring(prefix.length + 1);

    // v4.1 퍼센트 위치 (from-10%, via-30%, to-90%)
    if (value.match(/^\d+%$/)) {
      return {
        property: `--tw-gradient-${prefix}-position`,
        value: value,
        variant: 'preset'
      };
    }

    // Handle arbitrary values
    if (value.startsWith('[') && value.endsWith(']')) {
      const color = value.slice(1, -1);
      return {
        property: `--tw-gradient-${prefix}`,
        value: color,
        variant: 'arbitrary'
      };
    }

    // v4.1 커스텀 속성 (from-(<custom-property>))
    if (value.startsWith('(') && value.endsWith(')')) {
      const customProperty = value.slice(1, -1);
      return {
        property: `--tw-gradient-${prefix}`,
        value: `var(${customProperty})`,
        variant: 'preset'
      };
    }

    // Handle color palette
    if (this.isValidColor(value)) {
      return {
        property: `--tw-gradient-${prefix}`,
        value: this.getColorValue(value),
        variant: 'preset'
      };
    }

    return null;
  }

  private static isValidColor(colorName: string): boolean {
    // Check for color-scale pattern (e.g., red-500)
    const colorPattern = /^(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-\d{2,3}$/;
    
    // Check for basic color names
    const basicColors = ['black', 'white'];
    
    return colorPattern.test(colorName) || basicColors.includes(colorName);
  }

  private static getColorValue(colorName: string, preset?: any, config?: any): string {
    // ColorUtils의 표준 색상 처리 함수 사용
    if (preset && config) {
      return ColorUtils.getColorValue(colorName, preset, config);
    }
    
    // 기본 색상들 (fallback)
    if (colorName === 'black') return '#000000';
    if (colorName === 'white') return '#ffffff';
    
    // Parse color-scale pattern (e.g., red-500)
    const match = colorName.match(/^(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(\\d{2,3})$/);
    
    if (match && preset?.colors) {
      const [, colorFamily, shade] = match;
      const colorData = preset.colors[colorFamily]?.[shade];
      
      if (colorData) {
        // OKLCH 형식인지 확인
        if ('l' in colorData && 'c' in colorData && 'h' in colorData) {
          const rgb = ColorUtils.oklchToRgb(colorData.l, colorData.c, colorData.h);
          return ColorUtils.rgbToHex(rgb.r, rgb.g, rgb.b);
        }
        // 기존 RGB 형식 지원
        else if ('r' in colorData && 'g' in colorData && 'b' in colorData) {
          return ColorUtils.rgbToHex(colorData.r, colorData.g, colorData.b);
        }
      }
    }
    
    // 기본값: CSS 변수 형태로 반환
    return `var(--color-${colorName})`;
  }

  /**
   * Context Pattern을 사용한 새로운 스타일 적용 메서드
   */
  static applyBackgroundsStyle(
    parsedClass: ParsedClass, 
    styles: Partial<ParsedStyles>, 
    context: ParserContext
  ): void {
    if (!styles.backgrounds) {
      styles.backgrounds = {};
    }

    const { property, value, isArbitrary } = parsedClass;
    
    // Context에서 preset과 config 추출
    const preset = context.preset;
    const config = context.config;

    // 속성별 처리
    switch (property) {
      // Background color
      case 'bg':
      case 'backgroundColor':
        this.handleBackgroundColor(value, isArbitrary, styles.backgrounds, preset, config);
        break;
        
      // Background image
      case 'backgroundImage':
      case 'bg-image':
        this.handleBackgroundImage(value, isArbitrary, styles.backgrounds);
        break;
        
      // Background size
      case 'backgroundSize':
      case 'bg-size':
        this.handleBackgroundSize(value, isArbitrary, styles.backgrounds);
        break;
        
      // Background position
      case 'backgroundPosition':
      case 'bg-position':
        this.handleBackgroundPosition(value, isArbitrary, styles.backgrounds);
        break;
        
      // Background repeat
      case 'backgroundRepeat':
      case 'bg-repeat':
        this.handleBackgroundRepeat(value, isArbitrary, styles.backgrounds);
        break;
        
      // Background attachment
      case 'backgroundAttachment':
      case 'bg-attachment':
        this.handleBackgroundAttachment(value, isArbitrary, styles.backgrounds);
        break;
        
      // Background clip
      case 'backgroundClip':
      case 'bg-clip':
        this.handleBackgroundClip(value, isArbitrary, styles.backgrounds);
        break;
        
      // Background origin
      case 'backgroundOrigin':
      case 'bg-origin':
        this.handleBackgroundOrigin(value, isArbitrary, styles.backgrounds);
        break;
        
      // Background opacity
      case 'backgroundOpacity':
      case 'bg-opacity':
        this.handleBackgroundOpacity(value, isArbitrary, styles.backgrounds);
        break;
        
      // Arbitrary background values
      case 'bg-arbitrary':
        // For arbitrary values like bg-[50%_50%], determine the most likely property
        if (value.includes(' ') && (value.includes('%') || value.includes('px'))) {
          // Likely a position value
          styles.backgrounds.backgroundPosition = value;
        } else if (value.includes('%') || value.includes('px') || value.includes('rem') || value.includes('em')) {
          // Likely a size value  
          styles.backgrounds.backgroundSize = value;
        } else {
          // Fallback to backgroundColor for color values
          styles.backgrounds.backgroundColor = value;
        }
        break;
        
      // Gradient directions
      case 'gradient':
      case 'linearGradient':
      case 'radialGradient':
      case 'conicGradient':
      case 'bg-gradient':
      case 'bg-linear':
      case 'bg-linear-angle':
      case 'bg-linear-interpolation':
      case 'bg-linear-arbitrary':
      case 'bg-linear-custom':
        this.handleGradient(property, value, isArbitrary, styles.backgrounds);
        break;
      case 'bg-radial':
      case 'bg-radial-arbitrary':
      case 'bg-radial-custom':
        this.handleRadialGradient(property, value, isArbitrary, styles.backgrounds);
        break;
      case 'bg-conic':
      case 'bg-conic-arbitrary':
      case 'bg-conic-custom':
        this.handleConicGradient(property, value, isArbitrary, styles.backgrounds);
        break;
      case 'bg-custom-property':
        this.handleGradient(property, value, isArbitrary, styles.backgrounds);
        break;
        
      // Gradient color stops
      case 'from':
      case 'via':
      case 'to':
      case 'from-position':
      case 'via-position':  
      case 'to-position':
      case 'from-custom':
      case 'via-custom':
      case 'to-custom':
        this.handleGradientColorStop(property, value, isArbitrary, styles.backgrounds, preset, config);
        break;
        
      default:
        // Generic property 처리
        styles.backgrounds[property] = isArbitrary ? value : this.convertBackgroundValue(property, value);
        break;
    }
  }

  /**
   * Background color 처리 헬퍼 메서드
   */
  private static handleBackgroundColor(value: string, isArbitrary: boolean, backgroundStyles: any, preset: any, config: any): void {
    if (isArbitrary) {
      backgroundStyles.backgroundColor = value;
    } else {
      // 투명도 조합 처리 (bg-red-500/50)
      if (value.includes('/')) {
        const [colorPart, opacityPart] = value.split('/');
        const opacity = parseInt(opacityPart) / 100;
        
        if (this.isValidColor(colorPart)) {
          const colorValue = this.getColorValue(colorPart, preset, config);
          backgroundStyles.backgroundColor = colorValue;
          backgroundStyles.backgroundOpacity = opacity.toString();
        }
      } else {
        // 표준 색상 처리
        backgroundStyles.backgroundColor = this.getColorValue(value, preset, config);
      }
    }
  }

  /**
   * Background image 처리 헬퍼 메서드
   */
  private static handleBackgroundImage(value: string, isArbitrary: boolean, backgroundStyles: any): void {
    if (isArbitrary) {
      backgroundStyles.backgroundImage = value;
    } else {
      const presetValue = this.BACKGROUND_IMAGE_VALUES[`bg-${value}`] || 
                         this.BACKGROUND_IMAGE_VALUES[value] ||
                         value;
      backgroundStyles.backgroundImage = presetValue;
    }
  }

  /**
   * Background size 처리 헬퍼 메서드
   */
  private static handleBackgroundSize(value: string, isArbitrary: boolean, backgroundStyles: any): void {
    if (isArbitrary) {
      backgroundStyles.backgroundSize = value;
    } else {
      const presetValue = this.BACKGROUND_SIZE_VALUES[`bg-${value}`] || 
                         this.BACKGROUND_SIZE_VALUES[value] ||
                         value;
      backgroundStyles.backgroundSize = presetValue;
    }
  }

  /**
   * Background position 처리 헬퍼 메서드
   */
  private static handleBackgroundPosition(value: string, isArbitrary: boolean, backgroundStyles: any): void {
    if (isArbitrary) {
      backgroundStyles.backgroundPosition = value;
    } else {
      const presetValue = this.BACKGROUND_POSITION_VALUES[`bg-${value}`] || 
                         this.BACKGROUND_POSITION_VALUES[value] ||
                         value;
      backgroundStyles.backgroundPosition = presetValue;
    }
  }

  /**
   * Background repeat 처리 헬퍼 메서드
   */
  private static handleBackgroundRepeat(value: string, isArbitrary: boolean, backgroundStyles: any): void {
    if (isArbitrary) {
      backgroundStyles.backgroundRepeat = value;
    } else {
      const presetValue = this.BACKGROUND_REPEAT_VALUES[`bg-${value}`] || 
                         this.BACKGROUND_REPEAT_VALUES[value] ||
                         value;
      backgroundStyles.backgroundRepeat = presetValue;
    }
  }

  /**
   * Background attachment 처리 헬퍼 메서드
   */
  private static handleBackgroundAttachment(value: string, isArbitrary: boolean, backgroundStyles: any): void {
    if (isArbitrary) {
      backgroundStyles.backgroundAttachment = value;
    } else {
      const presetValue = this.BACKGROUND_ATTACHMENT_VALUES[`bg-${value}`] || 
                         this.BACKGROUND_ATTACHMENT_VALUES[value] ||
                         value;
      backgroundStyles.backgroundAttachment = presetValue;
    }
  }

  /**
   * Background clip 처리 헬퍼 메서드
   */
  private static handleBackgroundClip(value: string, isArbitrary: boolean, backgroundStyles: any): void {
    if (isArbitrary) {
      backgroundStyles.backgroundClip = value;
    } else {
      const presetValue = this.BACKGROUND_CLIP_VALUES[`bg-clip-${value}`] || 
                         this.BACKGROUND_CLIP_VALUES[value] ||
                         value;
      backgroundStyles.backgroundClip = presetValue;
    }
  }

  /**
   * Background origin 처리 헬퍼 메서드
   */
  private static handleBackgroundOrigin(value: string, isArbitrary: boolean, backgroundStyles: any): void {
    if (isArbitrary) {
      backgroundStyles.backgroundOrigin = value;
    } else {
      const presetValue = this.BACKGROUND_ORIGIN_VALUES[`bg-origin-${value}`] || 
                         this.BACKGROUND_ORIGIN_VALUES[value] ||
                         value;
      backgroundStyles.backgroundOrigin = presetValue;
    }
  }

  /**
   * Background opacity 처리 헬퍼 메서드
   */
  private static handleBackgroundOpacity(value: string, isArbitrary: boolean, backgroundStyles: any): void {
    if (isArbitrary) {
      backgroundStyles.backgroundOpacity = value;
    } else {
      const presetValue = this.BACKGROUND_OPACITY_VALUES[`bg-opacity-${value}`] || 
                         (parseInt(value) / 100).toString();
      backgroundStyles.backgroundOpacity = presetValue;
    }
  }

  /**
   * Gradient 처리 헬퍼 메서드
   */
  private static handleGradient(property: string, value: string, isArbitrary: boolean, backgroundStyles: any): void {
    if (isArbitrary) {
      backgroundStyles.backgroundImage = value;
    } else {
      const direction = this.GRADIENT_DIRECTIONS[`bg-gradient-to-${value}`] || 
                       this.LINEAR_GRADIENT_DIRECTIONS[`bg-linear-to-${value}`] ||
                       value;
      backgroundStyles.backgroundImage = `linear-gradient(${direction}, var(--tw-gradient-stops))`;
    }
  }

  private static handleRadialGradient(property: string, value: string, isArbitrary: boolean, backgroundStyles: any): void {
    if (isArbitrary) {
      backgroundStyles.backgroundImage = value;
    } else {
      backgroundStyles.backgroundImage = `radial-gradient(${value})`;
    }
  }

  private static handleConicGradient(property: string, value: string, isArbitrary: boolean, backgroundStyles: any): void {
    if (isArbitrary) {
      backgroundStyles.backgroundImage = value;
    } else {
      backgroundStyles.backgroundImage = `conic-gradient(${value})`;
    }
  }

  /**
   * Gradient color stop 처리 헬퍼 메서드
   */
  private static handleGradientColorStop(property: string, value: string, isArbitrary: boolean, backgroundStyles: any, preset: any, config: any): void {
    if (isArbitrary) {
      backgroundStyles[`--tw-gradient-${property}`] = value;
    } else {
      // 퍼센트 위치 처리 (from-10%, via-30%, to-90%)
      if (value.match(/^\d+%$/)) {
        backgroundStyles[`--tw-gradient-${property}-position`] = value;
      } else {
        // 색상 처리
        const colorValue = this.getColorValue(value, preset, config);
        backgroundStyles[`--tw-gradient-${property}`] = colorValue;
      }
    }
  }

  /**
   * Background 값 변환 헬퍼 메서드
   */
  private static convertBackgroundValue(property: string, value: string): string {
    // 특정 property에 따른 값 변환 로직
    return value;
  }

  /**
   * 방향 문자열을 CSS 값으로 변환하는 헬퍼 메서드
   */
  private static getDirectionValue(direction: string): string | null {
    const directionMap: Record<string, string> = {
      't': 'top',
      'tr': 'top right', 
      'r': 'right',
      'br': 'bottom right',
      'b': 'bottom',
      'bl': 'bottom left',
      'l': 'left',
      'tl': 'top left'
    };
    
    return directionMap[direction] || null;
  }
} 