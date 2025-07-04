import { parseUtilityBase } from './utilities';
import { ParsedClassToken } from './utils';

const utilityParsers = [
    parseUtilityBase
];

export function parseUtility(token: string): ParsedClassToken | { type: 'unknown'; raw: string } {
  for (const parser of utilityParsers) {
    const result = parser(token);
    if (result) return result;
  }
  return { type: 'unknown', raw: token };
} 