import { describe, it, expect } from "vitest";
import { parseTypography } from '../../src/parser/utilities/typography';

describe("parseTextDecorationColor", () => {
  it("parses preset keywords", () => {
    expect(parseTypography("decoration-inherit")).toEqual({ type: "text-decoration-color", preset: "inherit", raw: "decoration-inherit", arbitrary: false });
    expect(parseTypography("decoration-current")).toEqual({ type: "text-decoration-color", preset: "current", raw: "decoration-current", arbitrary: false });
    expect(parseTypography("decoration-transparent")).toEqual({ type: "text-decoration-color", preset: "transparent", raw: "decoration-transparent", arbitrary: false });
    expect(parseTypography("decoration-black")).toEqual({ type: "text-decoration-color", preset: "black", raw: "decoration-black", arbitrary: false });
    expect(parseTypography("decoration-white")).toEqual({ type: "text-decoration-color", preset: "white", raw: "decoration-white", arbitrary: false });
  });
  it("parses palette and opacity", () => {
    expect(parseTypography("decoration-blue-500")).toEqual({ type: "text-decoration-color", preset: "blue-500", raw: "decoration-blue-500", arbitrary: false });
    expect(parseTypography("decoration-red-100/75")).toEqual({ type: "text-decoration-color", preset: "red-100/75", raw: "decoration-red-100/75", arbitrary: false });
    expect(parseTypography("decoration-amber-900/10")).toEqual({ type: "text-decoration-color", preset: "amber-900/10", raw: "decoration-amber-900/10", arbitrary: false });
  });
  it("parses custom property", () => {
    expect(parseTypography("decoration-(--my-color)")).toEqual({ type: "text-decoration-color", value: "var(--my-color)", raw: "decoration-(--my-color)", arbitrary: true });
  });
  it("parses arbitrary value", () => {
    expect(parseTypography("decoration-[#243c5a]")).toEqual({ type: "text-decoration-color", value: "#243c5a", raw: "decoration-[#243c5a]", arbitrary: true });
    expect(parseTypography("decoration-[oklch(70%_0.2_200)]")).toEqual({ type: "text-decoration-color", value: "oklch(70%_0.2_200)", raw: "decoration-[oklch(70%_0.2_200)]", arbitrary: true });
  });
  it("returns null for invalid", () => {
    expect(parseTypography("decoration")).toBeNull();
    expect(parseTypography("decoration-foo")).toBeNull();
    expect(parseTypography("decoration-[notacolor]")).toBeNull();
  });
}); 