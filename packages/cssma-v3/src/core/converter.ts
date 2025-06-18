  /**
   * StyleConverter - CSS와 Figma 스타일 간의 변환기
   * 
   * 이 클래스는 파싱된 CSS 클래스를 Figma 스타일로 변환하고,
   * Figma 스타일을 CSS 클래스로 변환하는 기능을 제공합니다.
   */

import { Color, FigmaColor, ParsedClass, ConversionResult, ParsedStyles, Config, DesignPreset } from '../types';

export class StyleConverter {
  private config: Config;
  private preset: DesignPreset;

  constructor(config: Config, preset: DesignPreset) {
    this.config = config;
    this.preset = preset;
  }

  /**
   * 파싱된 CSS 클래스 데이터를 Figma 스타일로 변환합니다.
   * @param parsedData 파싱된 CSS 데이터
   * @returns Figma 스타일 객체
   */
  cssToFigma(parsedData: any): any {
    const figmaStyles: any = {
      fills: [],
      strokes: [],
      effects: [],
      layout: {},
      typography: {},
      meta: {
        convertedFrom: parsedData.meta?.originalInput || '',
        conversionTime: 0
      }
    };
    
    const startTime = performance.now();
    
    // 색상 변환
    if (parsedData.colors) {
      this.convertColors(parsedData.colors, figmaStyles);
    }
    
    // 타이포그래피 변환
    if (parsedData.typography) {
      this.convertTypography(parsedData.typography, figmaStyles);
    }
    
    // 레이아웃 변환
    if (parsedData.layout) {
      this.convertLayout(parsedData.layout, figmaStyles);
    }
    
    // 효과 변환
    if (parsedData.effects) {
      this.convertEffects(parsedData.effects, figmaStyles);
    }
    
    // 애니메이션 변환 (Figma에서 지원하는 경우)
    if (parsedData.animation) {
      this.convertAnimation(parsedData.animation, figmaStyles);
    }
    
    figmaStyles.meta.conversionTime = performance.now() - startTime;
    
    return figmaStyles;
  }
  
  /**
   * Figma 스타일을 CSS 클래스로 변환합니다.
   * @param figmaStyles Figma 스타일 객체
   * @returns CSS 클래스 문자열
   */
  figmaToCss(figmaStyles: any): ConversionResult {
    const result: ConversionResult = {
      css: '',
      figma: figmaStyles,
      meta: {
        originalClasses: [],
        parseTime: 0,
        warnings: []
      }
    };
    
    const startTime = performance.now();
    const cssClasses: string[] = [];
    
    // 색상 변환
    if (figmaStyles.fills && figmaStyles.fills.length > 0) {
      cssClasses.push(...this.convertFigmaFills(figmaStyles.fills));
    }
    
    // 테두리 변환
    if (figmaStyles.strokes && figmaStyles.strokes.length > 0) {
      cssClasses.push(...this.convertFigmaStrokes(figmaStyles.strokes));
    }
    
    // 효과 변환
    if (figmaStyles.effects && figmaStyles.effects.length > 0) {
      cssClasses.push(...this.convertFigmaEffects(figmaStyles.effects));
    }
    
    // 레이아웃 변환
    if (figmaStyles.layout) {
      cssClasses.push(...this.convertFigmaLayout(figmaStyles.layout));
    }
    
    // 타이포그래피 변환
    if (figmaStyles.typography) {
      cssClasses.push(...this.convertFigmaTypography(figmaStyles.typography));
    }
    
    result.css = cssClasses.join(' ');
    result.meta.originalClasses = cssClasses;
    result.meta.parseTime = performance.now() - startTime;
    
    return result;
  }
  
  /**
   * 파싱된 스타일을 CSS 객체로 변환합니다.
   * @param parsedStyles 파싱된 스타일
   * @returns CSS 객체
   */
  toCSSObject(parsedStyles: ParsedStyles): any {
    const cssObject: any = {};
    
    // 색상 변환
    if (parsedStyles.colors?.text) {
      cssObject.color = this.colorToRgb(parsedStyles.colors.text);
    }
    if (parsedStyles.colors?.background) {
      cssObject.backgroundColor = this.colorToRgb(parsedStyles.colors.background);
    }
    // bg 필드 지원 (테스트 호환성)
    if ((parsedStyles.colors as any)?.bg) {
      cssObject.backgroundColor = this.colorToRgb((parsedStyles.colors as any).bg);
    }
    
    // 간격 변환
    if (parsedStyles.spacing?.padding) {
      if (typeof parsedStyles.spacing.padding === 'object') {
        const { top, right, bottom, left } = parsedStyles.spacing.padding;
        if (top && right && bottom && left && top === right && right === bottom && bottom === left) {
          cssObject.padding = `${top}px`;
        } else {
          if (top) cssObject.paddingTop = `${top}px`;
          if (right) cssObject.paddingRight = `${right}px`;
          if (bottom) cssObject.paddingBottom = `${bottom}px`;
          if (left) cssObject.paddingLeft = `${left}px`;
        }
      }
    }
    if (parsedStyles.spacing?.margin) {
      const { top, right, bottom, left } = parsedStyles.spacing.margin;
      if (top) cssObject.marginTop = `${top}px`;
      if (right) cssObject.marginRight = `${right}px`;
      if (bottom) cssObject.marginBottom = `${bottom}px`;
      if (left) cssObject.marginLeft = `${left}px`;
    }
    
    // 타이포그래피 변환
    if (parsedStyles.typography?.fontSize) {
      cssObject.fontSize = `${parsedStyles.typography.fontSize}px`;
    }
    if (parsedStyles.typography?.fontWeight) {
      cssObject.fontWeight = parsedStyles.typography.fontWeight;
    }
    
    // 레이아웃 변환
    if (parsedStyles.layout?.display) {
      cssObject.display = parsedStyles.layout.display;
    }
    if (parsedStyles.layout?.width) {
      cssObject.width = parsedStyles.layout.width;
    }
    
    // 사이징 변환
    if (parsedStyles.sizing?.minWidth) {
      cssObject.minWidth = parsedStyles.sizing.minWidth;
    }
    if (parsedStyles.sizing?.maxWidth) {
      cssObject.maxWidth = parsedStyles.sizing.maxWidth;
    }
    if (parsedStyles.sizing?.minHeight) {
      cssObject.minHeight = parsedStyles.sizing.minHeight;
    }
    if (parsedStyles.sizing?.maxHeight) {
      cssObject.maxHeight = parsedStyles.sizing.maxHeight;
    }
    if (parsedStyles.sizing?.size) {
      cssObject.width = parsedStyles.sizing.size;
      cssObject.height = parsedStyles.sizing.size;
    }
    
    // 효과 변환
    if (parsedStyles.effects?.borderRadius) {
      cssObject.borderRadius = `${parsedStyles.effects.borderRadius}px`;
    }
    if (parsedStyles.effects?.opacity) {
      cssObject.opacity = parsedStyles.effects.opacity;
    }
    if (parsedStyles.effects?.boxShadow && parsedStyles.effects.boxShadow.length > 0) {
      cssObject.boxShadow = parsedStyles.effects.boxShadow.join(', ');
    }
    
    // 애니메이션 변환
    if (parsedStyles.animation?.name || parsedStyles.animation?.duration || parsedStyles.animation?.timingFunction) {
      const animations: string[] = [];
      
      if (parsedStyles.animation.name) {
        animations.push(parsedStyles.animation.name);
      }
      
      if (parsedStyles.animation.duration) {
        if (typeof parsedStyles.animation.duration === 'number') {
          animations.push(`${parsedStyles.animation.duration}ms`);
        } else {
          animations.push(parsedStyles.animation.duration);
        }
      }
      
      if (parsedStyles.animation.timingFunction) {
        animations.push(parsedStyles.animation.timingFunction);
      }
      
      if (parsedStyles.animation.iterationCount) {
        animations.push(parsedStyles.animation.iterationCount.toString());
      }
      
      if (animations.length > 0) {
        cssObject.animation = animations.join(' ');
      }
    }
    
    return cssObject;
  }
  
  /**
   * CSS 객체를 CSS 문자열로 변환합니다.
   * @param cssObject CSS 객체
   * @returns CSS 문자열
   */
  toCSSString(cssObject: any): string {
    const cssRules: string[] = [];
    
    for (const [property, value] of Object.entries(cssObject)) {
      const kebabProperty = property.replace(/([A-Z])/g, '-$1').toLowerCase();
      cssRules.push(`${kebabProperty}: ${value};`);
    }
    
    return cssRules.join(' ');
  }
  
  /**
   * 파싱된 스타일을 React 스타일 객체로 변환합니다.
   * @param parsedStyles 파싱된 스타일
   * @returns React 스타일 객체
   */
  toReactStyles(parsedStyles: ParsedStyles): any {
    const reactStyles: any = {};
    
    // CSS 객체를 기반으로 하되 React용으로 숫자값 처리
    const cssObject = this.toCSSObject(parsedStyles);
    
    for (const [key, value] of Object.entries(cssObject)) {
      if (typeof value === 'string' && value.endsWith('px')) {
        // React에서는 숫자값으로 변환
        const numValue = parseInt(value);
        if (!isNaN(numValue)) {
          reactStyles[key] = numValue;
        } else {
          reactStyles[key] = value;
        }
      } else {
        reactStyles[key] = value;
      }
    }
    
    return reactStyles;
  }
  
  /**
   * 파싱된 스타일을 Figma 스타일 객체로 변환합니다.
   * @param parsedStyles 파싱된 스타일
   * @returns Figma 스타일 객체
   */
  toFigmaStyles(parsedStyles: ParsedStyles): any {
    const figmaStyles: any = {
      fills: [],
      strokes: [],
      effects: [],
      textFill: [],
      strokeWeight: 0
    };
    
    // 배경색
    if (parsedStyles.colors?.background) {
      figmaStyles.fills.push({
        type: 'SOLID',
        color: this.convertColorToFigma(parsedStyles.colors.background),
        visible: true
      });
    }
    // bg 필드 지원 (테스트 호환성)
    if ((parsedStyles.colors as any)?.bg) {
      figmaStyles.fills.push({
        type: 'SOLID',
        color: this.convertColorToFigma((parsedStyles.colors as any).bg),
        visible: true
      });
    }
    
    // 텍스트 색상
    if (parsedStyles.colors?.text) {
      figmaStyles.textFill.push({
        type: 'SOLID',
        color: this.convertColorToFigma(parsedStyles.colors.text),
        visible: true
      });
    }
    
    // 간격
    if (parsedStyles.spacing?.padding) {
      const { top, right, bottom, left } = parsedStyles.spacing.padding;
      if (top) figmaStyles.paddingTop = top;
      if (right) figmaStyles.paddingRight = right;
      if (bottom) figmaStyles.paddingBottom = bottom;
      if (left) figmaStyles.paddingLeft = left;
    }
    
    // 타이포그래피
    if (parsedStyles.typography?.fontSize) {
      figmaStyles.fontSize = parsedStyles.typography.fontSize;
    }
    if (parsedStyles.typography?.fontWeight) {
      figmaStyles.fontWeight = parsedStyles.typography.fontWeight;
    }
    
    // 효과
    if (parsedStyles.effects?.borderRadius) {
      figmaStyles.cornerRadius = parsedStyles.effects.borderRadius;
    }
    
    return figmaStyles;
  }
  
  /**
   * Color 객체를 RGB 문자열로 변환합니다.
   */
  private colorToRgb(color: Color): string {
    const r = Math.round(color.r * 255);
    const g = Math.round(color.g * 255);
    const b = Math.round(color.b * 255);
    return `rgb(${r}, ${g}, ${b})`;
  }
  
  /**
   * CSS 색상을 Figma 색상으로 변환합니다.
   */
  private convertColors(colors: any, figmaStyles: any): void {
    // 배경색 변환
    if (colors.background) {
      figmaStyles.fills.push({
        type: 'SOLID',
        color: this.convertColorToFigma(colors.background),
        visible: true,
        opacity: colors.background.a !== undefined ? colors.background.a : 1
      });
    }
    
    // 텍스트 색상 변환
    if (colors.text) {
      figmaStyles.typography.color = this.convertColorToFigma(colors.text);
    }
  }
  
  /**
   * CSS 타이포그래피를 Figma 타이포그래피로 변환합니다.
   */
  private convertTypography(typography: any, figmaStyles: any): void {
    if (typography.fontSize) {
      figmaStyles.typography.fontSize = typography.fontSize;
    }
    
    if (typography.fontWeight) {
      figmaStyles.typography.fontWeight = typography.fontWeight;
    }
    
    if (typography.lineHeight) {
      figmaStyles.typography.lineHeight = typography.lineHeight;
    }
    
    if (typography.fontFamily) {
      figmaStyles.typography.fontFamily = typography.fontFamily;
    }
    
    if (typography.letterSpacing) {
      figmaStyles.typography.letterSpacing = typography.letterSpacing;
    }
  }
  
  /**
   * CSS 레이아웃을 Figma 레이아웃으로 변환합니다.
   */
  private convertLayout(layout: any, figmaStyles: any): void {
    if (layout.width) {
      figmaStyles.layout.width = layout.width;
    }
    
    if (layout.height) {
      figmaStyles.layout.height = layout.height;
    }
    
    if (layout.padding) {
      figmaStyles.layout.padding = layout.padding;
    }
    
    if (layout.margin) {
      figmaStyles.layout.margin = layout.margin;
    }
    
    if (layout.display) {
      figmaStyles.layout.display = layout.display;
    }
  }
  
  /**
   * CSS 효과를 Figma 효과로 변환합니다.
   */
  private convertEffects(effects: any, figmaStyles: any): void {
    // 그림자 변환
    if (effects.boxShadow) {
      for (const shadow of effects.boxShadow) {
        figmaStyles.effects.push({
          type: 'DROP_SHADOW',
          visible: true,
          color: this.convertColorToFigma(shadow.color),
          offset: {
            x: shadow.offsetX,
            y: shadow.offsetY
          },
          radius: shadow.blurRadius,
          spread: shadow.spreadRadius
        });
      }
    }
    
    // 투명도 변환
    if (effects.opacity !== undefined) {
      figmaStyles.opacity = effects.opacity;
    }
    
    // 블러 효과 변환
    if (effects.blur) {
      figmaStyles.effects.push({
        type: 'LAYER_BLUR',
        visible: true,
        radius: effects.blur
      });
    }
  }
  
  /**
   * CSS 애니메이션을 Figma 애니메이션으로 변환합니다.
   */
  private convertAnimation(animation: any, figmaStyles: any): void {
    // Figma API에서 지원하는 경우 구현
    // 현재는 제한적인 지원만 가능
    figmaStyles.animation = animation;
  }
  
  /**
   * Figma 채우기를 CSS 클래스로 변환합니다.
   */
  private convertFigmaFills(fills: any[]): string[] {
    const cssClasses: string[] = [];
    
    for (const fill of fills) {
      if (fill.type === 'SOLID') {
        const color = this.convertFigmaColorToCSS(fill.color);
        cssClasses.push(`bg-[${color}]`);
        
        if (fill.opacity !== 1 && fill.opacity !== undefined) {
          cssClasses.push(`opacity-${Math.round(fill.opacity * 100)}`);
        }
      }
      // 그라데이션 및 기타 채우기 타입 처리
    }
    
    return cssClasses;
  }
  
  /**
   * Figma 테두리를 CSS 클래스로 변환합니다.
   */
  private convertFigmaStrokes(strokes: any[]): string[] {
    const cssClasses: string[] = [];
    
    for (const stroke of strokes) {
      if (stroke.type === 'SOLID') {
        const color = this.convertFigmaColorToCSS(stroke.color);
        cssClasses.push(`border-[${color}]`);
        
        if (stroke.width) {
          cssClasses.push(`border-[${stroke.width}px]`);
        }
      }
    }
    
    return cssClasses;
  }
  
  /**
   * Figma 효과를 CSS 클래스로 변환합니다.
   */
  private convertFigmaEffects(effects: any[]): string[] {
    const cssClasses: string[] = [];
    
    for (const effect of effects) {
      if (effect.type === 'DROP_SHADOW') {
        const color = this.convertFigmaColorToCSS(effect.color);
        const shadow = `${effect.offset.x}px ${effect.offset.y}px ${effect.radius}px ${effect.spread || 0}px ${color}`;
        cssClasses.push(`shadow-[${shadow}]`);
      } else if (effect.type === 'LAYER_BLUR') {
        cssClasses.push(`blur-[${effect.radius}px]`);
      }
    }
    
    return cssClasses;
  }
  
  /**
   * Figma 레이아웃을 CSS 클래스로 변환합니다.
   */
  private convertFigmaLayout(layout: any): string[] {
    const cssClasses: string[] = [];
    
    if (layout.width) {
      cssClasses.push(`w-[${layout.width}]`);
    }
    
    if (layout.height) {
      cssClasses.push(`h-[${layout.height}]`);
    }
    
    if (layout.padding) {
      const { top, right, bottom, left } = layout.padding;
      
      if (top === right && right === bottom && bottom === left) {
        cssClasses.push(`p-[${top}px]`);
      } else {
        if (top) cssClasses.push(`pt-[${top}px]`);
        if (right) cssClasses.push(`pr-[${right}px]`);
        if (bottom) cssClasses.push(`pb-[${bottom}px]`);
        if (left) cssClasses.push(`pl-[${left}px]`);
      }
    }
    
    if (layout.margin) {
      const { top, right, bottom, left } = layout.margin;
      
      if (top === right && right === bottom && bottom === left) {
        cssClasses.push(`m-[${top}px]`);
      } else {
        if (top) cssClasses.push(`mt-[${top}px]`);
        if (right) cssClasses.push(`mr-[${right}px]`);
        if (bottom) cssClasses.push(`mb-[${bottom}px]`);
        if (left) cssClasses.push(`ml-[${left}px]`);
      }
    }
    
    if (layout.display) {
      cssClasses.push(layout.display);
    }
    
    return cssClasses;
  }
  
  /**
   * Figma 타이포그래피를 CSS 클래스로 변환합니다.
   */
  private convertFigmaTypography(typography: any): string[] {
    const cssClasses: string[] = [];
    
    if (typography.fontSize) {
      cssClasses.push(`text-[${typography.fontSize}px]`);
    }
    
    if (typography.fontWeight) {
      // 일반적인 폰트 가중치 매핑
      const weightMap: Record<number, string> = {
        100: 'thin',
        200: 'extralight',
        300: 'light',
        400: 'normal',
        500: 'medium',
        600: 'semibold',
        700: 'bold',
        800: 'extrabold',
        900: 'black'
      };
      
      const weightClass = weightMap[typography.fontWeight] || `font-[${typography.fontWeight}]`;
      cssClasses.push(weightClass);
    }
    
    if (typography.lineHeight) {
      cssClasses.push(`leading-[${typography.lineHeight}]`);
    }
    
    if (typography.fontFamily) {
      cssClasses.push(`font-[${typography.fontFamily}]`);
    }
    
    if (typography.letterSpacing) {
      cssClasses.push(`tracking-[${typography.letterSpacing}em]`);
    }
    
    if (typography.color) {
      const color = this.convertFigmaColorToCSS(typography.color);
      cssClasses.push(`text-[${color}]`);
    }
    
    return cssClasses;
  }
  
  /**
   * CSS 색상을 Figma 색상으로 변환합니다.
   */
  private convertColorToFigma(color: Color): FigmaColor {
    return {
      r: color.r,
      g: color.g,
      b: color.b,
      a: color.a
    };
  }
  
  /**
   * Figma 색상을 CSS 색상 문자열로 변환합니다.
   */
  private convertFigmaColorToCSS(color: FigmaColor): string {
    const r = Math.round(color.r * 255);
    const g = Math.round(color.g * 255);
    const b = Math.round(color.b * 255);
    
    if (color.a !== undefined && color.a < 1) {
      return `rgba(${r}, ${g}, ${b}, ${color.a})`;
    }
    
    return `rgb(${r}, ${g}, ${b})`;
  }
}

// 별칭 export
export { StyleConverter as CSSConverter }; 