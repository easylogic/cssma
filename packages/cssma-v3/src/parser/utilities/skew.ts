// Tailwind skew utility parser
// https://tailwindcss.com/docs/skew

const skewRe = /^(-?)skew-(\d+)$/;
const skewCustomPropRe = /^skew-\((--[\w-]+)\)$/;
const skewArbitraryRe = /^skew-\[(.+)\]$/;

const skewXRe = /^(-?)skew-x-(\d+)$/;
const skewXCustomPropRe = /^skew-x-\((--[\w-]+)\)$/;
const skewXArbitraryRe = /^skew-x-\[(.+)\]$/;

const skewYRe = /^(-?)skew-y-(\d+)$/;
const skewYCustomPropRe = /^skew-y-\((--[\w-]+)\)$/;
const skewYArbitraryRe = /^skew-y-\[(.+)\]$/;

export function parseSkew(token: string): any | null {
  let m;
  if ((m = skewRe.exec(token))) {
    const negative = m[1] === '-';
    return {
      type: 'skew',
      value: negative ? `skewX(-${m[2]}deg) skewY(-${m[2]}deg)` : `skewX(${m[2]}deg) skewY(${m[2]}deg)`,
      raw: token,
      negative,
      arbitrary: false,
    };
  }
  if ((m = skewCustomPropRe.exec(token))) {
    return {
      type: 'skew',
      value: `skewX(var(${m[1]})) skewY(var(${m[1]}))`,
      raw: token,
      customProperty: true,
      arbitrary: false,
    };
  }
  if ((m = skewArbitraryRe.exec(token))) {
    return {
      type: 'skew',
      value: `skewX(${m[1]}) skewY(${m[1]})`,
      raw: token,
      arbitrary: true,
    };
  }
  // skew-x
  if ((m = skewXRe.exec(token))) {
    const negative = m[1] === '-';
    return {
      type: 'skew-x',
      value: negative ? `skewX(-${m[2]}deg)` : `skewX(${m[2]}deg)`,
      raw: token,
      negative,
      arbitrary: false,
    };
  }
  if ((m = skewXCustomPropRe.exec(token))) {
    return {
      type: 'skew-x',
      value: `skewX(var(${m[1]}))`,
      raw: token,
      customProperty: true,
      arbitrary: false,
    };
  }
  if ((m = skewXArbitraryRe.exec(token))) {
    return {
      type: 'skew-x',
      value: `skewX(${m[1]})`,
      raw: token,
      arbitrary: true,
    };
  }
  // skew-y
  if ((m = skewYRe.exec(token))) {
    const negative = m[1] === '-';
    return {
      type: 'skew-y',
      value: negative ? `skewY(-${m[2]}deg)` : `skewY(${m[2]}deg)`,
      raw: token,
      negative,
      arbitrary: false,
    };
  }
  if ((m = skewYCustomPropRe.exec(token))) {
    return {
      type: 'skew-y',
      value: `skewY(var(${m[1]}))`,
      raw: token,
      customProperty: true,
      arbitrary: false,
    };
  }
  if ((m = skewYArbitraryRe.exec(token))) {
    return {
      type: 'skew-y',
      value: `skewY(${m[1]})`,
      raw: token,
      arbitrary: true,
    };
  }
  return null;
} 