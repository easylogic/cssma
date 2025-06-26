import { describe, it, expect } from "vitest";
import { parseTextDecorationColor } from "../../src/parser/utilities/textDecorationColor";

describe("parseTextDecorationColor", () => {
  it("parses basic presets", () => {
    expect(parseTextDecorationColor("decoration-inherit")).toEqual({ type: "text-decoration-color", preset: "inherit", raw: "decoration-inherit", arbitrary: false });
    expect(parseTextDecorationColor("decoration-current")).toEqual({ type: "text-decoration-color", preset: "current", raw: "decoration-current", arbitrary: false });
    expect(parseTextDecorationColor("decoration-transparent")).toEqual({ type: "text-decoration-color", preset: "transparent", raw: "decoration-transparent", arbitrary: false });
    expect(parseTextDecorationColor("decoration-black")).toEqual({ type: "text-decoration-color", preset: "black", raw: "decoration-black", arbitrary: false });
    expect(parseTextDecorationColor("decoration-white")).toEqual({ type: "text-decoration-color", preset: "white", raw: "decoration-white", arbitrary: false });
  });
  it("parses palette colors", () => {
    expect(parseTextDecorationColor("decoration-red-500")).toEqual({ type: "text-decoration-color", preset: "red-500", raw: "decoration-red-500", arbitrary: false });
    expect(parseTextDecorationColor("decoration-blue-600")).toEqual({ type: "text-decoration-color", preset: "blue-600", raw: "decoration-blue-600", arbitrary: false });
    expect(parseTextDecorationColor("decoration-emerald-200")).toEqual({ type: "text-decoration-color", preset: "emerald-200", raw: "decoration-emerald-200", arbitrary: false });
  });
  it("parses palette colors with opacity", () => {
    expect(parseTextDecorationColor("decoration-red-500/75")).toEqual({ type: "text-decoration-color", preset: "red-500/75", raw: "decoration-red-500/75", arbitrary: false });
    expect(parseTextDecorationColor("decoration-blue-600/50")).toEqual({ type: "text-decoration-color", preset: "blue-600/50", raw: "decoration-blue-600/50", arbitrary: false });
  });
  it("parses custom property", () => {
    expect(parseTextDecorationColor("decoration-(--my-color)")).toEqual({ type: "text-decoration-color", preset: "--my-color", raw: "decoration-(--my-color)", arbitrary: true });
  });
  it("parses arbitrary value", () => {
    expect(parseTextDecorationColor("decoration-[#50d71e]")).toEqual({ type: "text-decoration-color", preset: "#50d71e", raw: "decoration-[#50d71e]", arbitrary: true });
    expect(parseTextDecorationColor("decoration-[oklch(70%_0.2_200)]")).toEqual({ type: "text-decoration-color", preset: "oklch(70%_0.2_200)", raw: "decoration-[oklch(70%_0.2_200)]", arbitrary: true });
  });
  it("returns null for invalid values", () => {
    expect(parseTextDecorationColor("decoration-foo")).toBeNull();
    expect(parseTextDecorationColor("decoration-red")).toBeNull();
    expect(parseTextDecorationColor("decoration-red-abc")).toBeNull();
    expect(parseTextDecorationColor("decoration-500")).toBeNull();
    expect(parseTextDecorationColor("decoration-#fff")).toBeNull();
  });
}); 