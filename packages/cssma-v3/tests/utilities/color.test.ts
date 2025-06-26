import { describe, it, expect } from "vitest";
import { parseTextColor } from "../../src/parser/utilities/color";

describe("parseTextColor", () => {
  it("parses basic presets", () => {
    expect(parseTextColor("text-inherit")).toEqual({ type: "color", preset: "inherit", raw: "text-inherit", arbitrary: false });
    expect(parseTextColor("text-current")).toEqual({ type: "color", preset: "current", raw: "text-current", arbitrary: false });
    expect(parseTextColor("text-transparent")).toEqual({ type: "color", preset: "transparent", raw: "text-transparent", arbitrary: false });
    expect(parseTextColor("text-black")).toEqual({ type: "color", preset: "black", raw: "text-black", arbitrary: false });
    expect(parseTextColor("text-white")).toEqual({ type: "color", preset: "white", raw: "text-white", arbitrary: false });
  });
  it("parses palette colors", () => {
    expect(parseTextColor("text-red-500")).toEqual({ type: "color", preset: "red-500", raw: "text-red-500", arbitrary: false });
    expect(parseTextColor("text-blue-600")).toEqual({ type: "color", preset: "blue-600", raw: "text-blue-600", arbitrary: false });
    expect(parseTextColor("text-emerald-200")).toEqual({ type: "color", preset: "emerald-200", raw: "text-emerald-200", arbitrary: false });
  });
  it("parses palette colors with opacity", () => {
    expect(parseTextColor("text-red-500/75")).toEqual({ type: "color", preset: "red-500/75", raw: "text-red-500/75", arbitrary: false });
    expect(parseTextColor("text-blue-600/50")).toEqual({ type: "color", preset: "blue-600/50", raw: "text-blue-600/50", arbitrary: false });
  });
  it("parses custom property", () => {
    expect(parseTextColor("text-(--my-color)")).toEqual({ type: "color", preset: "--my-color", raw: "text-(--my-color)", arbitrary: true });
  });
  it("parses arbitrary value", () => {
    expect(parseTextColor("text-[#50d71e]")).toEqual({ type: "color", preset: "#50d71e", raw: "text-[#50d71e]", arbitrary: true });
    expect(parseTextColor("text-[oklch(70%_0.2_200)]")).toEqual({ type: "color", preset: "oklch(70%_0.2_200)", raw: "text-[oklch(70%_0.2_200)]", arbitrary: true });
  });
  it("returns null for invalid values", () => {
    expect(parseTextColor("text-foo")).toBeNull();
    expect(parseTextColor("text-red")).toBeNull();
    expect(parseTextColor("text-red-abc")).toBeNull();
    expect(parseTextColor("text-500")).toBeNull();
    expect(parseTextColor("text-#fff")).toBeNull();
  });
}); 