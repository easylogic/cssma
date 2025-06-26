// 파서 전체에서 사용하는 타입/인터페이스/유니언 정의

export type ModifierType =
  | 'responsive'
  | 'state'
  | 'dark'
  | 'group'
  | 'attribute'
  | 'motion';

export interface ModifierToken {
  type: ModifierType;
  raw: string;
  parsed?: any;
  position: number;
}

export interface UtilityToken {
  type: 'utility';
  raw: string;
  utility: string;
  value: string | number | object;
  arbitrary: boolean;
}

export interface ParsedClassName {
  modifiers: ModifierToken[];
  utility: UtilityToken | null;
  original: string;
} 