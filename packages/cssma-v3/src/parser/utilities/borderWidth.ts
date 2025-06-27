// Tailwind border-width utility parser
// https://tailwindcss.com/docs/border-width

import { extractArbitraryValue, isLengthValue } from '../utils';

export function parseBorderWidth(token: string): any | null {
  // border (all sides, default 1px)
  if (token === 'border') return { type: 'border-width', side: 'all', value: '1px', raw: token, arbitrary: false };
  // border-{number}
  const allNum = token.match(/^border-(\d+)$/);
  if (allNum) return { type: 'border-width', side: 'all', value: `${allNum[1]}px`, raw: token, arbitrary: false };
  // border-[value] (arbitrary, 숫자 또는 숫자+단위 허용)
  const allArbVal = extractArbitraryValue(token, 'border');
  if (allArbVal && isLengthValue(allArbVal)) {
    return { type: 'border-width', side: 'all', value: allArbVal, raw: token, arbitrary: true };
  }
  // border-(length:--custom)
  const allCustom = token.match(/^border-\(length:(--[a-zA-Z0-9-_]+)\)$/);
  if (allCustom) return { type: 'border-width', side: 'all', value: `var(${allCustom[1]})`, raw: token, arbitrary: true };

  // border-x, border-x-{number}, border-x-[value], border-x-(length:--custom)
  if (token === 'border-x') return { type: 'border-width', side: 'x', value: '1px', raw: token, arbitrary: false };
  const xNum = token.match(/^border-x-(\d+)$/);
  if (xNum) return { type: 'border-width', side: 'x', value: `${xNum[1]}px`, raw: token, arbitrary: false };
  // border-x-[value] (arbitrary, 숫자 또는 숫자+단위 허용)
  const xArbVal = extractArbitraryValue(token, 'border-x');
  if (xArbVal && isLengthValue(xArbVal)) {
    return { type: 'border-width', side: 'x', value: xArbVal, raw: token, arbitrary: true };
  }
  const xCustom = token.match(/^border-x-\(length:(--[a-zA-Z0-9-_]+)\)$/);
  if (xCustom) return { type: 'border-width', side: 'x', value: `var(${xCustom[1]})`, raw: token, arbitrary: true };

  // border-y, border-y-{number}, border-y-[value], border-y-(length:--custom)
  if (token === 'border-y') return { type: 'border-width', side: 'y', value: '1px', raw: token, arbitrary: false };
  const yNum = token.match(/^border-y-(\d+)$/);
  if (yNum) return { type: 'border-width', side: 'y', value: `${yNum[1]}px`, raw: token, arbitrary: false };
  // border-y-[value] (arbitrary, 숫자 또는 숫자+단위 허용)
  const yArbVal = extractArbitraryValue(token, 'border-y');
  if (yArbVal && isLengthValue(yArbVal)) {
    return { type: 'border-width', side: 'y', value: yArbVal, raw: token, arbitrary: true };
  }
  const yCustom = token.match(/^border-y-\(length:(--[a-zA-Z0-9-_]+)\)$/);
  if (yCustom) return { type: 'border-width', side: 'y', value: `var(${yCustom[1]})`, raw: token, arbitrary: true };

  // border-s, border-s-{number}, border-s-[value], border-s-(length:--custom)
  if (token === 'border-s') return { type: 'border-width', side: 's', value: '1px', raw: token, arbitrary: false };
  const sNum = token.match(/^border-s-(\d+)$/);
  if (sNum) return { type: 'border-width', side: 's', value: `${sNum[1]}px`, raw: token, arbitrary: false };
  // border-s-[value] (arbitrary, 숫자 또는 숫자+단위 허용)
  const sArbVal = extractArbitraryValue(token, 'border-s');
  if (sArbVal && isLengthValue(sArbVal)) {
    return { type: 'border-width', side: 's', value: sArbVal, raw: token, arbitrary: true };
  }
  const sCustom = token.match(/^border-s-\(length:(--[a-zA-Z0-9-_]+)\)$/);
  if (sCustom) return { type: 'border-width', side: 's', value: `var(${sCustom[1]})`, raw: token, arbitrary: true };

  // border-e, border-e-{number}, border-e-[value], border-e-(length:--custom)
  if (token === 'border-e') return { type: 'border-width', side: 'e', value: '1px', raw: token, arbitrary: false };
  const eNum = token.match(/^border-e-(\d+)$/);
  if (eNum) return { type: 'border-width', side: 'e', value: `${eNum[1]}px`, raw: token, arbitrary: false };
  // border-e-[value] (arbitrary, 숫자 또는 숫자+단위 허용)
  const eArbVal = extractArbitraryValue(token, 'border-e');
  if (eArbVal && isLengthValue(eArbVal)) {
    return { type: 'border-width', side: 'e', value: eArbVal, raw: token, arbitrary: true };
  }
  const eCustom = token.match(/^border-e-\(length:(--[a-zA-Z0-9-_]+)\)$/);
  if (eCustom) return { type: 'border-width', side: 'e', value: `var(${eCustom[1]})`, raw: token, arbitrary: true };

  // border-t, border-t-{number}, border-t-[value], border-t-(length:--custom)
  if (token === 'border-t') return { type: 'border-width', side: 't', value: '1px', raw: token, arbitrary: false };
  const tNum = token.match(/^border-t-(\d+)$/);
  if (tNum) return { type: 'border-width', side: 't', value: `${tNum[1]}px`, raw: token, arbitrary: false };
  // border-t-[value] (arbitrary, 숫자 또는 숫자+단위 허용)
  const tArbVal = extractArbitraryValue(token, 'border-t');
  if (tArbVal && isLengthValue(tArbVal)) {
    return { type: 'border-width', side: 't', value: tArbVal, raw: token, arbitrary: true };
  }
  const tCustom = token.match(/^border-t-\(length:(--[a-zA-Z0-9-_]+)\)$/);
  if (tCustom) return { type: 'border-width', side: 't', value: `var(${tCustom[1]})`, raw: token, arbitrary: true };

  // border-r, border-r-{number}, border-r-[value], border-r-(length:--custom)
  if (token === 'border-r') return { type: 'border-width', side: 'r', value: '1px', raw: token, arbitrary: false };
  const rNum = token.match(/^border-r-(\d+)$/);
  if (rNum) return { type: 'border-width', side: 'r', value: `${rNum[1]}px`, raw: token, arbitrary: false };
  // border-r-[value] (arbitrary, 숫자 또는 숫자+단위 허용)
  const rArbVal = extractArbitraryValue(token, 'border-r');
  if (rArbVal && isLengthValue(rArbVal)) {
    return { type: 'border-width', side: 'r', value: rArbVal, raw: token, arbitrary: true };
  }
  const rCustom = token.match(/^border-r-\(length:(--[a-zA-Z0-9-_]+)\)$/);
  if (rCustom) return { type: 'border-width', side: 'r', value: `var(${rCustom[1]})`, raw: token, arbitrary: true };

  // border-b, border-b-{number}, border-b-[value], border-b-(length:--custom)
  if (token === 'border-b') return { type: 'border-width', side: 'b', value: '1px', raw: token, arbitrary: false };
  const bNum = token.match(/^border-b-(\d+)$/);
  if (bNum) return { type: 'border-width', side: 'b', value: `${bNum[1]}px`, raw: token, arbitrary: false };
  // border-b-[value] (arbitrary, 숫자 또는 숫자+단위 허용)
  const bArbVal = extractArbitraryValue(token, 'border-b');
  if (bArbVal && isLengthValue(bArbVal)) {
    return { type: 'border-width', side: 'b', value: bArbVal, raw: token, arbitrary: true };
  }
  const bCustom = token.match(/^border-b-\(length:(--[a-zA-Z0-9-_]+)\)$/);
  if (bCustom) return { type: 'border-width', side: 'b', value: `var(${bCustom[1]})`, raw: token, arbitrary: true };

  // border-l, border-l-{number}, border-l-[value], border-l-(length:--custom)
  if (token === 'border-l') return { type: 'border-width', side: 'l', value: '1px', raw: token, arbitrary: false };
  const lNum = token.match(/^border-l-(\d+)$/);
  if (lNum) return { type: 'border-width', side: 'l', value: `${lNum[1]}px`, raw: token, arbitrary: false };
  // border-l-[value] (arbitrary, 숫자 또는 숫자+단위 허용)
  const lArbVal = extractArbitraryValue(token, 'border-l');
  if (lArbVal && isLengthValue(lArbVal)) {
    return { type: 'border-width', side: 'l', value: lArbVal, raw: token, arbitrary: true };
  }
  const lCustom = token.match(/^border-l-\(length:(--[a-zA-Z0-9-_]+)\)$/);
  if (lCustom) return { type: 'border-width', side: 'l', value: `var(${lCustom[1]})`, raw: token, arbitrary: true };

  return null;
} 