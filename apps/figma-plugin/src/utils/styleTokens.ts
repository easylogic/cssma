/**
 * 스타일 토큰 시스템 및 임의 값 파서
 * Tailwind CSS와 유사한 구문을 사용하여 Figma 노드 스타일링 시스템 구현
 */

// CSS 색상 이름 상수
export const CSS_COLOR_NAMES = [
  'black', 'white', 'red', 'green', 'blue', 'yellow', 'orange', 
  'purple', 'pink', 'gray', 'brown', 'transparent'
];

// CSS 색상 이름을 Figma RGB 값으로 매핑
export const CSS_COLOR_MAP: Record<string, { r: number, g: number, b: number, a?: number }> = {
  'black': { r: 0, g: 0, b: 0 },
  'white': { r: 1, g: 1, b: 1 },
  'red': { r: 1, g: 0, b: 0 },
  'green': { r: 0, g: 0.8, b: 0 },
  'blue': { r: 0, g: 0, b: 1 },
  'yellow': { r: 1, g: 1, b: 0 },
  'orange': { r: 1, g: 0.65, b: 0 },
  'purple': { r: 0.5, g: 0, b: 0.5 },
  'pink': { r: 1, g: 0.75, b: 0.8 },
  'gray': { r: 0.5, g: 0.5, b: 0.5 },
  'brown': { r: 0.65, g: 0.16, b: 0.16 },
  'transparent': { r: 0, g: 0, b: 0, a: 0 }
};

// 스타일 문자열에서 임의 값을 추출하는 정규식
export const ARBITRARY_VALUE_REGEX = /^([a-z\-]+)\-\[(.*?)\]$/;

// Gradient 방향에 따른 transform 매트릭스
const GRADIENT_TRANSFORMS: Record<string, number[][]> = {
  'to-r': [[1, 0, 0], [0, 1, 0]],      // 왼쪽에서 오른쪽
  'to-l': [[-1, 0, 1], [0, 1, 0]],     // 오른쪽에서 왼쪽
  'to-t': [[1, 0, 0], [0, -1, 1]],     // 아래에서 위
  'to-b': [[1, 0, 0], [0, 1, 0]],      // 위에서 아래
  'to-tr': [[1, -1, 0], [1, 1, 0]],    // 왼쪽 아래에서 오른쪽 위
  'to-tl': [[-1, -1, 1], [1, 1, 0]],   // 오른쪽 아래에서 왼쪽 위
  'to-br': [[1, 1, 0], [-1, 1, 1]],    // 왼쪽 위에서 오른쪽 아래
  'to-bl': [[-1, 1, 1], [-1, 1, 1]]    // 오른쪽 위에서 왼쪽 아래
};

interface GradientStyle {
  fills: Array<{
    type: 'GRADIENT_LINEAR';
    gradientStops: Array<{
      position: number;
      color: { r: number; g: number; b: number; a?: number };
    }>;
    gradientTransform: number[][];
  }>;
}

// 스타일 매핑 시스템 (기본 토큰)
export const STYLE_MAPPINGS: Record<string, Partial<Record<string, any>>> = {
  // 레이아웃
  'auto-layout': {  },
  "flex-col": { layoutMode: "VERTICAL" },
  "flex-row": { layoutMode: "HORIZONTAL" },
  "wrap": { layoutWrap: "WRAP" },
  "no-wrap": { layoutWrap: "NO_WRAP" },

  // 오버플로우 속성
  "overflow-visible": { clipsContent: false },
  "overflow-hidden": { clipsContent: true },

  // 회전
  "rotate-45": { rotation: 45 },
  "rotate-90": { rotation: 90 },
  "rotate-180": { rotation: 180 },
  "rotate-270": { rotation: 270 },
  
  // 정렬
  "items-start": { counterAxisAlignItems: "MIN" },
  "items-center": { counterAxisAlignItems: "CENTER" },
  "items-end": { counterAxisAlignItems: "MAX" },
  "items-baseline": { counterAxisAlignItems: "BASELINE" },
  
  "justify-start": { primaryAxisAlignItems: "MIN" },
  "justify-center": { primaryAxisAlignItems: "CENTER" },
  "justify-end": { primaryAxisAlignItems: "MAX" },
  "justify-between": { primaryAxisAlignItems: "SPACE_BETWEEN" },
  
  // 크기
  "w-full": { layoutSizingHorizontal: "FILL" },
  "w-auto": { layoutSizingHorizontal: "HUG" },
  "w-hug": { layoutSizingHorizontal: "HUG" },
  "h-full": { layoutSizingVertical: "FILL" },
  "h-auto": { layoutSizingVertical: "HUG" },
  "h-hug": { layoutSizingVertical: "HUG" },
  
  // 간격 (gap)
  "gap-2": { itemSpacing: 8 },
  "gap-4": { itemSpacing: 16 },
  "gap-6": { itemSpacing: 24 },
  "gap-8": { itemSpacing: 32 },
  
  // 패딩
  "p-2": { 
    paddingTop: 8, 
    paddingRight: 8,
    paddingBottom: 8,
    paddingLeft: 8 
  },
  "p-4": { 
    paddingTop: 16, 
    paddingRight: 16,
    paddingBottom: 16,
    paddingLeft: 16 
  },
  "p-6": { 
    paddingTop: 24, 
    paddingRight: 24,
    paddingBottom: 24,
    paddingLeft: 24 
  },
  "p-8": { 
    paddingTop: 32, 
    paddingRight: 32,
    paddingBottom: 32,
    paddingLeft: 32 
  },

  "px-2": { 
    paddingLeft: 8, 
    paddingRight: 8 
  },
  "px-4": { 
    paddingLeft: 16, 
    paddingRight: 16 
  },
  "px-6": { 
    paddingLeft: 24, 
    paddingRight: 24 
  },
  "px-8": { 
    paddingLeft: 32,
    paddingRight: 32 
  },
  "py-2": { 
    paddingTop: 8, 
    paddingBottom: 8 
  },
  "py-4": { 
    paddingTop: 16, 
    paddingBottom: 16 
  },
  "py-6": { 
    paddingTop: 24, 
    paddingBottom: 24 
  },
  "py-8": { 
    paddingTop: 32, 
    paddingBottom: 32 
  },
  
  // 배경색
  "bg-white": { 
    fills: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }] 
  },
  "bg-black": { 
    fills: [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }] 
  },
  "bg-gray": { 
    fills: [{ type: 'SOLID', color: { r: 0.95, g: 0.95, b: 0.95 } }] 
  },
  "bg-blue": { 
    fills: [{ type: 'SOLID', color: { r: 0.9, g: 0.95, b: 1 } }] 
  },
  "bg-red": { 
    fills: [{ type: 'SOLID', color: { r: 1, g: 0.9, b: 0.9 } }] 
  },
  "bg-green": { 
    fills: [{ type: 'SOLID', color: { r: 0.9, g: 1, b: 0.9 } }] 
  },
  "bg-transparent": { 
    fills: [] 
  },

  // 글꼴 색
  "text-white": { 
    fills: [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }] 
  },
  "text-black": { 
    fills: [{ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }] 
  },
  
  // 글꼴 크기
  "text-xs": { fontSize: 12 },
  "text-sm": { fontSize: 14 },
  "text-md": { fontSize: 16 },
  "text-lg": { fontSize: 20 },
  "text-xl": { fontSize: 24 },
  "text-2xl": { fontSize: 32 },
  
  // 글꼴 무게
  "text-normal": { _fontStyleName: "Regular" },
  "font-bold": { _fontStyleName: "Bold" },
  
  // 텍스트 정렬
  "text-left": { textAlignHorizontal: "LEFT" },
  "text-center": { textAlignHorizontal: "CENTER" },
  "text-right": { textAlignHorizontal: "RIGHT" },

  // 텍스트 장식
  "underline": { 
    textAlignVertical: "CENTER",
    textDecoration: "UNDERLINE" as const
  },
  "line-through": { 
    textAlignVertical: "CENTER",
    textDecoration: "STRIKETHROUGH" as const
  },
  "no-underline": { 
    textAlignVertical: "CENTER",
    textDecoration: "NONE" as const
  },
  
  // 모서리 반경
  "rounded-sm": { cornerRadius: 4 },
  "rounded-md": { cornerRadius: 8 },
  "rounded-lg": { cornerRadius: 12 },
  "rounded-full": { cornerRadius: 9999 },

  // border
  "border-none": { 
    strokes: []
  },

  "border-sm": { 
    strokeWeight: 1
  },

  "border-md": { 
    strokeWeight: 2
  },

  "border-lg": { 
    strokeWeight: 3
  },

  "border-white": { 
    strokes: [{
      type: 'SOLID',
      color: { r: 1, g: 1, b: 1 },
    }]
  },
  
  "border-black": { 
    strokes: [{
      type: 'SOLID',
      color: { r: 0, g: 0, b: 0 },
    }]
  },
  

  "border-transparent": { 
    strokes: [
      {type: 'SOLID', color: { r: 0, g: 0, b: 0, a: 0 }}
    ]
  },
  
  // 그림자
  "shadow-sm": { 
    effects: [
      {
        type: 'DROP_SHADOW',
        color: { r: 0, g: 0, b: 0, a: 0.05 }, // 반투명 검은색
        offset: { x: 0, y: 4 }, // 그림자 오프셋
        radius: 4, // 그림자 블러 반경
        spread: 0, // 그림자 확산
        visible: true, // 효과 보이기/숨기기
        blendMode: 'NORMAL' // 블렌드 모드
      }
    ]
  },
  "shadow-md": { 
    effects: [
      {
        type: "DROP_SHADOW",
        color: { r: 0, g: 0, b: 0, a: 0.1 },
        offset: { x: 0, y: 4 },
        radius: 8,
        spread: 0,
        visible: true,
        blendMode: 'NORMAL'
      }
    ]
  }
};

/**
 * 임의 값을 파싱하는 함수
 * @param style 스타일 문자열 (예: "bg-[#FF5733]")
 * @returns 해당 속성과 값, 없으면 null
 */
export function parseArbitraryValue(style: string): { property: string, value: any } | null {
  const match = style.match(ARBITRARY_VALUE_REGEX);
  if (!match) return null;
  
  const [, property, value] = match;
  
  // 속성 유형에 따라 값 처리
  switch (property) {
    case 'bg':
      return { 
        property: 'fills', 
        value: [{ type: 'SOLID', color: parseColor(value) }] 
      };
    
    case 'border':

      if (value === 'none') {
        return { 
          property: 'strokes', 
          value: []
        };
      }

      if (value === 'transparent') {
        return { 
          property: 'strokes', 
          value: []
        };
      }

      if (CSS_COLOR_NAMES.indexOf(value) >= 0) {
        return { 
          property: 'strokes', 
          value: [{ type: 'SOLID', color: parseColor(value) }] 
        };
      }

      if (value.startsWith('#')) {
        return { 
          property: 'strokes', 
          value: [{ type: 'SOLID', color: hexToRGBA(value) }] 
        };
      }

      if (value.startsWith('rgb')) {
        return { 
          property: 'strokes', 
          value: [{ type: 'SOLID', color: rgbStringToFigma(value) }] 
        };
      }
      
      if (value.endsWith('px')) {
        return { 
          property: 'strokeWeight', 
          value: parseSize(value)
        };
      }

      if (!isNaN(Number(value))) {
        return { 
          property: 'strokeWeight', 
          value: Number(value) / 10
        };
      }

      return { 
        property: 'strokes', 
        value: [{ type: 'SOLID', color: parseColor(value) }] 
      };
    
    case 'p':
      const padding = parseInt(value);
      return { 
        property: 'padding', 
        value: {
          paddingTop: padding,
          paddingRight: padding,
          paddingBottom: padding,
          paddingLeft: padding
        }
      };
      
    case 'w':
      return { property: 'width', value: parseSize(value) };
      
    case 'h':
      return { property: 'height', value: parseSize(value) };
      
    case 'gap':
      return { property: 'itemSpacing', value: parseInt(value) };
      
    case 'text':
      // 텍스트 색상인 경우
      if (value.startsWith('#') || CSS_COLOR_NAMES.indexOf(value) >= 0) {
        return { property: 'fills', value: [{ type: 'SOLID', color: parseColor(value) }] };
      } 
      // 글자 크기인 경우
      else if (!isNaN(parseInt(value))) {
        return { property: 'fontSize', value: parseInt(value) };
      }
      return null;
      
    case 'rounded':
      return { property: 'cornerRadius', value: parseInt(value) };
      
    case 'px':
      const paddingHorizontal = parseInt(value);
      return {
        property: 'paddingHorizontal',
        value: {
          paddingLeft: paddingHorizontal,
          paddingRight: paddingHorizontal
        }
      };
      
    case 'py':
      const paddingVertical = parseInt(value);
      return {
        property: 'paddingVertical',
        value: {
          paddingTop: paddingVertical,
          paddingBottom: paddingVertical
        }
      };
    case 'pt':
      return { property: 'paddingTop', value: parseInt(value) };
    case 'pb':
      return { property: 'paddingBottom', value: parseInt(value) };
    case 'pl':
      return { property: 'paddingLeft', value: parseInt(value) };
    case 'pr':
      return { property: 'paddingRight', value: parseInt(value) };
  }
  
  return null;
}

/**
 * 색상 문자열을 Figma 색상 객체로 변환
 * @param color 색상 문자열 (예: "#FF0000", "red", "rgb(255,0,0)")
 * @returns Figma 색상 객체
 */
export function parseColor(color: string): { r: number, g: number, b: number, a?: number } {
  // CSS 색상 이름 처리 (예: "red", "blue")
  if (CSS_COLOR_NAMES.indexOf(color) >= 0) {
    return CSS_COLOR_MAP[color];
  }
  
  // HEX 색상 처리 (예: "#FF0000")
  if (color.startsWith('#')) {
    return hexToRGBA(color);
  }
  
  // RGB 색상 처리 (예: "rgb(255,0,0)")
  if (color.startsWith('rgb')) {
    return rgbStringToFigma(color);
  }
  
  // 기본값 반환
  return { r: 0, g: 0, b: 0 };
}

/**
 * 크기 값 파싱 (px, %, 등)
 * @param size 크기 문자열 (예: "100px", "50%")
 * @returns 숫자 값
 */
export function parseSize(size: string): number {
  // 퍼센트 처리 (Figma API에서 사용할 수 있는 방식으로 변환 필요)
  if (size.endsWith('%')) {
    return parseInt(size) / 100; // 0-1 사이 비율로 변환 (일부 속성에서 사용)
  }
  
  // px 단위 제거
  if (size.endsWith('px')) {
    size = size.replace('px', '');
  }
  
  // 숫자로 변환
  return parseInt(size);
}

/**
 * 16진수 색상 코드를 Figma RGBA로 변환
 * @param hex 16진수 색상 코드 (예: "#FF0000")
 * @returns Figma RGBA 색상 객체
 */
export function hexToRGBA(hex: string): { r: number, g: number, b: number, a?: number } {
  // # 제거
  hex = hex.replace('#', '');
  
  // 알파값 처리 (8자리 16진수인 경우)
  const hasAlpha = hex.length === 8;
  const alpha = hasAlpha ? parseInt(hex.slice(6, 8), 16) / 255 : undefined;
  
  // RGB 값 파싱
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;
  
  return {
    r,
    g,
    b,
    ...(alpha !== undefined && { a: alpha })
  };
}

/**
 * RGB 문자열을 Figma 색상 객체로 변환
 * @param rgb RGB 문자열 (예: "rgb(255,0,0)")
 * @returns Figma RGB 객체
 */
export function rgbStringToFigma(rgb: string): { r: number, g: number, b: number, a?: number } {
  // RGB 값 추출
  const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d*\.?\d+))?\)/);
  if (!match) return { r: 0, g: 0, b: 0 };
  
  const r = parseInt(match[1]) / 255;
  const g = parseInt(match[2]) / 255;
  const b = parseInt(match[3]) / 255;
  const a = match[4] ? parseFloat(match[4]) : undefined;
  
  return { r, g, b, ...(a !== undefined && { a }) };
}

/**
 * Gradient 스타일을 파싱하는 함수
 * @param styles 스타일 배열
 * @returns Figma gradient fills 객체
 */
function parseGradient(styles: string[]): GradientStyle | null {
  const gradientDirection = styles.find(style => style.startsWith('bg-gradient-'));
  if (!gradientDirection) return null;

  const fromColor = styles.find(style => style.startsWith('from-[#'));
  const toColor = styles.find(style => style.startsWith('to-[#'));
  
  if (!fromColor || !toColor) return null;

  const fromHexMatch = fromColor.match(/#([A-Fa-f0-9]{6})/);
  const toHexMatch = toColor.match(/#([A-Fa-f0-9]{6})/);
  
  if (!fromHexMatch || !toHexMatch) return null;

  const direction = gradientDirection.replace('bg-gradient-', '');
  const transform = GRADIENT_TRANSFORMS[direction] || GRADIENT_TRANSFORMS['to-b'];

  return {
    fills: [{
      type: 'GRADIENT_LINEAR',
      gradientStops: [
        { position: 0, color: hexToRGBA(`#${fromHexMatch[1]}`) },
        { position: 1, color: hexToRGBA(`#${toHexMatch[1]}`) }
      ],
      gradientTransform: transform
    }]
  };
}

/**
 * 스타일 클래스를 Figma 노드에 적용하는 함수
 * @param node Figma 노드
 * @param styles 스타일 클래스 배열
 */
export function applyStyles(node: SceneNode, styles: string[]): void {
  if (!styles || !Array.isArray(styles)) return;
  
  // Gradient 처리
  const gradientStyles = parseGradient(styles);
  if (gradientStyles) {
    Object.assign(node, gradientStyles);
  }

  // 폰트 스타일 처리를 위한 변수
  let fontStyleName: string | null = null;
  
  for (const style of styles) {
    if (style === 'w-full' || style === 'h-full' || style === 'w-auto' || style === 'h-auto') {
      continue;
    }

    // 임의 값 형식 확인
    const arbitraryValue = parseArbitraryValue(style);
    console.log(arbitraryValue, style);
    if (arbitraryValue) {
      const { property, value } = arbitraryValue;
      console.log(style, property, value);
      
      if (property === 'padding') {
        // 패딩은 여러 속성을 설정해야 함
        const paddingValues = value as Record<string, number>;
        
        // 각 패딩 키 순회
        for (const key in paddingValues) {
          if (Object.prototype.hasOwnProperty.call(paddingValues, key)) {
            // @ts-ignore - Figma의 타입 정의와 맞지 않을 수 있음
            node[key] = paddingValues[key];
          }
        }
      } 
      else if (property === 'paddingHorizontal') {
        // 수평 패딩 설정
        const paddingValues = value as Record<string, number>;
        
        // 각 패딩 키 순회
        for (const key in paddingValues) {
          if (Object.prototype.hasOwnProperty.call(paddingValues, key)) {
            // @ts-ignore
            node[key] = paddingValues[key];
          }
        }
      }
      else if (property === 'paddingVertical') {
        // 수직 패딩 설정
        const paddingValues = value as Record<string, number>;
        
        // 각 패딩 키 순회
        for (const key in paddingValues) {
          if (Object.prototype.hasOwnProperty.call(paddingValues, key)) {
            // @ts-ignore
            node[key] = paddingValues[key];
          }
        }
      } else if (property === 'width') {
        (node as FrameNode).resize(value, (node as FrameNode).height);
      } else if (property === 'height') {
        (node as FrameNode).resize((node as FrameNode).width, value);
      } else {
        // 일반 속성은 직접 설정
        // @ts-ignore - Figma의 타입 정의와 맞지 않을 수 있음
        node[property] = value;
      }
      continue;
    }
    
    // 사전 정의된 스타일 적용
    const styleProps = STYLE_MAPPINGS[style];
    console.log(styleProps, style);
    if (styleProps) {
      // 각 스타일 속성을 개별적으로 설정
      for (const key in styleProps) {
        if (Object.prototype.hasOwnProperty.call(styleProps, key)) {
          // 폰트 스타일 처리 (_fontStyleName으로 시작하는 특수 속성)
          if (key === '_fontStyleName') {
            fontStyleName = styleProps[key];
            continue;
          } else if (key === 'cornerRadius') {
            console.log(styleProps[key], 'cornerRadius', node);
            (node as FrameNode).topLeftRadius = styleProps[key];
            (node as FrameNode).topRightRadius = styleProps[key];
            (node as FrameNode).bottomLeftRadius = styleProps[key];
            (node as FrameNode).bottomRightRadius = styleProps[key];
            continue;
          }

          console.log(node, key, styleProps[key]);
          
          // @ts-ignore - Figma의 타입 정의와 맞지 않을 수 있음
          node[key] = styleProps[key];
        }
      }
    } else {
      console.warn(`Unknown style token: ${style}`);
    }
  }
  
  // 폰트 스타일 적용 (텍스트 노드에만 해당)
  if (fontStyleName && node.type === 'TEXT') {
    // 폰트 패밀리는 'Inter' 기본값 사용
    // fontName은 처음부터 설정하는 것이 안전함
    (node as TextNode).fontName = { family: 'Inter', style: fontStyleName };
  }
}

/**
 * 레이아웃 스타일 검증 함수
 * 부모-자식 관계에 따라 일부 속성이 유효한지 확인
 * @param parent 부모 노드
 * @param child 자식 노드
 * @param styles 자식 노드에 적용할 스타일
 * @returns 검증된 스타일 배열
 */
export function validateLayoutStyles(parent: BaseNode | null, child: SceneNode, styles: string[]): string[] {
  if (!parent || !styles) return styles;
  
  const validatedStyles = [...styles];
  
  // 부모 노드가 Auto Layout인지 확인
  const parentHasAutoLayout = 'layoutMode' in parent && parent.layoutMode !== 'NONE';
  
  // w-full 또는 h-full은 Auto Layout 부모에서만 작동
  if (!parentHasAutoLayout) {
    // w-full이나 h-full이 포함되어 있는지 확인
    const wFullIndex = validatedStyles.indexOf('w-full');
    if (wFullIndex >= 0) {
      console.warn(`Warning: Style 'w-full' requires a parent with Auto Layout. Using 'w-auto' instead.`);
      validatedStyles.splice(wFullIndex, 1, 'w-auto');
    }
    
    const hFullIndex = validatedStyles.indexOf('h-full');
    if (hFullIndex >= 0) {
      console.warn(`Warning: Style 'h-full' requires a parent with Auto Layout. Using 'h-auto' instead.`);
      validatedStyles.splice(hFullIndex, 1, 'h-auto');
    }
    
    // 임의 값 스타일 확인
    for (let i = 0; i < validatedStyles.length; i++) {
      const style = validatedStyles[i];
      const match = style.match(ARBITRARY_VALUE_REGEX);
      
      if (match && match[1] === 'layout') {
        console.warn(`Warning: Style '${style}' requires a parent with Auto Layout. Removing style.`);
        validatedStyles.splice(i, 1);
        i--; // 인덱스 조정
      }
    }
  }
  
  return validatedStyles;
} 