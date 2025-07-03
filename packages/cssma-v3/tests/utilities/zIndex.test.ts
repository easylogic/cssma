import { CssmaContext } from "./../../src/theme-types";
import { describe, it, expect } from "vitest";
import { parseMisc } from '../../src/parser/utilities/misc';
import { defaultConfig } from "../../src/config/defaults";
import { createContext } from "../../src/config/context";
import { theme as themeGetter } from "../../src/config/theme-getter";

// --- Mock context 단위 테스트 ---
const mockThemeObj = {
  zIndex: {
    auto: "auto",
    "0": "zero",
    "10": "ten",
    "50": "fifty",
  },
};

const mockContext: CssmaContext = {
  theme: (...args: any[]) => themeGetter(mockThemeObj, ...args),
  config: () => {},
  plugins: [],
};

// --- defaultConfig + createContext 통합 테스트 ---
const defaultCtx = createContext(defaultConfig);

describe("parseZIndex (mock context)", () => {
  it("context 기반 preset (theme.zIndex)", () => {
    expect(parseMisc("z-auto", mockContext)).toEqual({
      type: "z-index",
      value: "auto",
      raw: "z-auto",
      arbitrary: false,
      customProperty: false,
      preset: "zIndex.auto",
      negative: false,
    });
    expect(parseMisc("z-0", mockContext)).toEqual({
      type: "z-index",
      value: "zero",
      raw: "z-0",
      arbitrary: false,
      customProperty: false,
      preset: "zIndex.0",
      negative: false,
    });
    expect(parseMisc("z-10", mockContext)).toEqual({
      type: "z-index",
      value: "ten",
      raw: "z-10",
      arbitrary: false,
      customProperty: false,
      preset: "zIndex.10",
      negative: false,
    });
    expect(parseMisc("z-50", mockContext)).toEqual({
      type: "z-index",
      value: "fifty",
      raw: "z-50",
      arbitrary: false,
      customProperty: false,
      preset: "zIndex.50",
      negative: false,
    });
  });

  it("custom property (z-[var(--foo)])", () => {
    expect(parseMisc("z-[var(--foo)]", mockContext)).toEqual({
      type: "z-index",
      value: "var(--foo)",
      raw: "z-[var(--foo)]",
      arbitrary: true,
      customProperty: false,
      negative: false,
    });
  });

  it("arbitrary value (z-[999], z-[-1])", () => {
    expect(parseMisc("z-[999]", mockContext)).toEqual({
      type: "z-index",
      value: "999",
      raw: "z-[999]",
      arbitrary: true,
      customProperty: false,
      negative: false,
    });
    expect(parseMisc("z-[-1]", mockContext)).toEqual({
      type: "z-index",
      value: "-1",
      raw: "z-[-1]",
      arbitrary: true,
      customProperty: false,
      negative: false,
    });
  });

  it("context 없는 경우 preset은 null, arbitrary/custom property는 정상", () => {
    expect(parseMisc("z-10")).toEqual(null);
    expect(parseMisc("z-[999]")).toEqual({
      type: "z-index",
      value: "999",
      raw: "z-[999]",
      arbitrary: true,
      customProperty: false,
      negative: false,
    });
    expect(parseMisc("z-[var(--foo)]")).toEqual({
      type: "z-index",
      value: "var(--foo)",
      raw: "z-[var(--foo)]",
      arbitrary: true,
      customProperty: false,
      negative: false,
    });
  });
});

describe("parseZIndex (defaultTheme context)", () => {
  it("context 기반 preset (theme.zIndex)", () => {
    expect(parseMisc("z-auto", defaultCtx)).toEqual({
      type: "z-index",
      value: "auto",
      raw: "z-auto",
      arbitrary: false,
      customProperty: false,
      preset: "zIndex.auto",
      negative: false,
    });
    expect(parseMisc("z-0", defaultCtx)).toEqual({
      type: "z-index",
      value: "0",
      raw: "z-0",
      arbitrary: false,
      customProperty: false,
      preset: "zIndex.0",
      negative: false,
    });
    expect(parseMisc("z-10", defaultCtx)).toEqual({
      type: "z-index",
      value: "10",
      raw: "z-10",
      arbitrary: false,
      customProperty: false,
      preset: "zIndex.10",
      negative: false,
    });
    expect(parseMisc("z-50", defaultCtx)).toEqual({
      type: "z-index",
      value: "50",
      raw: "z-50",
      arbitrary: false,
      customProperty: false,
      preset: "zIndex.50",
      negative: false,
    });
  });

  it("custom property (z-[var(--foo)])", () => {
    expect(parseMisc("z-[var(--foo)]", defaultCtx)).toEqual({
      type: "z-index",
      value: "var(--foo)",
      raw: "z-[var(--foo)]",
      arbitrary: true,
      customProperty: false,
      negative: false,
    });
  });

  it("arbitrary value (z-[999], z-[-1])", () => {
    expect(parseMisc("z-[999]", defaultCtx)).toEqual({
      type: "z-index",
      value: "999",
      raw: "z-[999]",
      arbitrary: true,
      customProperty: false,
      negative: false,
    });
    expect(parseMisc("z-[-1]", defaultCtx)).toEqual({
      type: "z-index",
      value: "-1",
      raw: "z-[-1]",
      arbitrary: true,
      customProperty: false,
      negative: false,
    });
  });
});
