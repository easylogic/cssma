// Tailwind v4 구조를 참고한 cssma-v3의 theme/config 타입 정의

export interface CssmaTheme {
  /** 색상 팔레트 (ex: red-500, blue-200 등) */
  colors?: Record<string, string | Record<string, string>>;
  /** 폰트 패밀리 (ex: sans, serif, mono, ... ) */
  fontFamily?: Record<string, string>;
  /** 폰트 굵기 (ex: thin, bold, extrabold, ... ) */
  fontWeight?: Record<string, string | number>;
  /** 폰트 사이즈 (ex: xs, sm, base, lg, ... ) */
  textSize?: Record<string, string>;
  /** 타이포그래피 */
  tracking?: Record<string, string>; // letter-spacing
  leading?: Record<string, string>; // line-height
  /** 브레이크포인트 (ex: sm, md, lg, xl, 2xl, ... ) */
  breakpoints?: Record<string, string>;
  container?: Record<string, string>;
  /** spacing/sizing */
  spacing?: Record<string, string>;
  width?: Record<string, string>;
  minWidth?: Record<string, string>;
  maxWidth?: Record<string, string>;
  height?: Record<string, string>;
  minHeight?: Record<string, string>;
  maxHeight?: Record<string, string>;
  /** border */
  radius?: Record<string, string>;
  borderWidth?: Record<string, string>;
  borderColor?: Record<string, string>;
  borderStyle?: Record<string, string>;
  /** box-shadow (ex: sm, md, lg, ... ) */
  shadow?: Record<string, string>;
  /** inset box-shadow */
  insetShadow?: Record<string, string>;
  /** drop-shadow (filter) */
  dropShadow?: Record<string, string>;
  opacity?: Record<string, string>;
  /** blur (filter) */
  blur?: Record<string, string>;
  /** transform/animation */
  scale?: Record<string, string>;
  rotate?: Record<string, string>;
  skew?: Record<string, string>;
  translate?: Record<string, string>;
  /** perspective (3D) */
  perspective?: Record<string, string>;
  /** aspect-ratio (ex: video, square, ...) */
  aspect?: Record<string, string>;
  /** transition timing function */
  ease?: Record<string, string>;
  /** animation (ex: spin, ping, bounce, ...) */
  animate?: Record<string, string>;
  /** 기타 네임스페이스 */
  outline?: Record<string, string>;
  mask?: Record<string, string>;
  fill?: Record<string, string>;
  stroke?: Record<string, string>;
  accent?: Record<string, string>;
  caret?: Record<string, string>;
  zIndex?: Record<string, string | number>;
  /** catch-all for custom/미지원 네임스페이스 */
  [namespace: string]: any;
}

export interface CssmaPreset {
  name: string;
  theme: CssmaTheme;
  extends?: string;
  description?: string;
  [key: string]: any;
}

export interface CssmaConfig {
  mode?: "jit" | "aot";
  prefix?: string;
  corePlugins?: string[];
  presets?: CssmaPreset[];
  theme?: CssmaTheme;
  [key: string]: any;
}

export interface CssmaContext {
  config: CssmaConfig;
  theme: CssmaTheme;
  presets?: CssmaPreset[];
  // 필요시 추가 필드
} 