import type { CssmaContext } from '../../src/types';
import { describe, it, expect } from "vitest";
import { parseTypography } from '../../src/parser/utilities/typography';
import { createContext } from "../../src/config/context";
import { defaultConfig } from "../../src/config/defaults";
import { theme as themeGetter } from "../../src/config/theme-getter";

// --- Mock context 단위 테스트 ---
const mockThemeObj = {
  colors: {
    red: { 500: "#f00" },
    primary: "#123456",
    inherit: "inherit",
    current: "currentColor",
    transparent: "transparent",
    black: "#000",
    white: "#fff"
  }
};

const mockContext: CssmaContext = {
  theme: (...args: any[]) => themeGetter(mockThemeObj, ...args),
  config: () => {},
  plugins: []
};

describe("parseTextColor (mock context)", () => {
  it("parses context palette colors", () => {
    expect(parseTypography("text-red-500", mockContext)).toEqual({
      type: "color", value: "red-500", raw: "text-red-500", arbitrary: false, customProperty: false, preset: "colors.red.500"
    });
    expect(parseTypography("text-primary", mockContext)).toEqual({
      type: "color", value: "primary", raw: "text-primary", arbitrary: false, customProperty: false, preset: "colors.primary"
    });
  });
  it("parses custom property", () => {
    expect(parseTypography("text-(--my-color)")).toEqual({
      type: "color", value: "--my-color", raw: "text-(--my-color)", arbitrary: true, customProperty: true
    });
  });
  it("parses arbitrary value", () => {
    expect(parseTypography("text-[#50d71e]" )).toEqual({
      type: "color", value: "#50d71e", raw: "text-[#50d71e]", arbitrary: true, customProperty: false
    });
    expect(parseTypography("text-[oklch(70%_0.2_200)]")).toEqual({
      type: "color", value: "oklch(70%_0.2_200)", raw: "text-[oklch(70%_0.2_200)]", arbitrary: true, customProperty: false
    });
  });
  it("returns null for missing context values", () => {
    expect(parseTypography("text-blue-500", mockContext)).toBeNull();
    expect(parseTypography("text-red-600", mockContext)).toBeNull();
  });
});

// --- defaultConfig + createContext 통합 테스트 ---
const defaultCtx = createContext(defaultConfig);

describe("parseTextColor (defaultConfig context)", () => {
  it("parses Tailwind palette colors", () => {
    expect(parseTypography("text-red-500", defaultCtx)).toEqual({
      type: "color", value: "red-500", raw: "text-red-500", arbitrary: false, customProperty: false, preset: "colors.red.500"
    });
    expect(parseTypography("text-blue-600", defaultCtx)).toEqual({
      type: "color", value: "blue-600", raw: "text-blue-600", arbitrary: false, customProperty: false, preset: "colors.blue.600"
    });
    expect(parseTypography("text-emerald-200", defaultCtx)).toEqual({
      type: "color", value: "emerald-200", raw: "text-emerald-200", arbitrary: false, customProperty: false, preset: "colors.emerald.200"
    });
  });
  it("returns null for truly invalid values", () => {
    expect(parseTypography("text-foo", defaultCtx)).toBeNull();
    expect(parseTypography("text-red", defaultCtx)).toBeNull();
    expect(parseTypography("text-red-abc", defaultCtx)).toBeNull();
    expect(parseTypography("text-500", defaultCtx)).toBeNull();
    expect(parseTypography("text-#fff", defaultCtx)).toBeNull();
  });
}); 