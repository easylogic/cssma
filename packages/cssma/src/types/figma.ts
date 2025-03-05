export type FigmaStyleProperties = {
  fills?: FigmaPaint[];
  fontSize?: number;
  fontName?: FigmaFontName;
  textAlignHorizontal?: 'LEFT' | 'CENTER' | 'RIGHT' | 'JUSTIFIED';
  textAlignVertical?: 'TOP' | 'CENTER' | 'BOTTOM';
  letterSpacing?: number | { value: number; unit: string };
  lineHeight?: FigmaLineHeight;
  textDecoration?: 'NONE' | 'UNDERLINE' | 'STRIKETHROUGH';
  textCase?: 'ORIGINAL' | 'UPPER' | 'LOWER' | 'TITLE';
  textTransform?: 'NONE' | 'UPPER' | 'LOWER' | 'TITLE';
  fontStyle?: 'NORMAL' | 'ITALIC';
  fontWeight?: number;
  width?: number;
  height?: number;
  gap?: number;
  paragraphSpacing?: number;
  paragraphIndent?: number;
}; 