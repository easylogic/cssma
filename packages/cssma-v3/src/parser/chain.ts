// modifier chain 파서
import type { Token } from './tokenizer';

export interface ModifierChainItem {
  type: string;
  raw: string;
  parsed?: any;
  position: number;
}

export function parseModifierChain(tokens: Token[]): { modifiers: ModifierChainItem[]; utility: Token | null } {
  // TODO: 실제 modifier chain 파싱 로직 구현
  return { modifiers: [], utility: null };
} 