import { describe, it, expect } from "vitest";
import { parseTextDecorationColor } from "../../src/parser/utilities/textDecorationColor";

describe("parseTextDecorationColor", () => {
  it("parses preset keywords", () => {
    expect(parseTextDecorationColor("decoration-inherit")).toEqual({ type: "text-decoration-color", preset: "inherit", raw: "decoration-inherit", arbitrary: false });
    expect(parseTextDecorationColor("decoration-current")).toEqual({ type: "text-decoration-color", preset: "current", raw: "decoration-current", arbitrary: false });
    expect(parseTextDecorationColor("decoration-transparent")).toEqual({ type: "text-decoration-color", preset: "transparent", raw: "decoration-transparent", arbitrary: false });
    expect(parseTextDecorationColor("decoration-black")).toEqual({ type: "text-decoration-color", preset: "black", raw: "decoration-black", arbitrary: false });
    expect(parseTextDecorationColor("decoration-white")).toEqual({ type: "text-decoration-color", preset: "white", raw: "decoration-white", arbitrary: false });
  });
  it("parses palette and opacity", () => {
    expect(parseTextDecorationColor("decoration-blue-500")).toEqual({ type: "text-decoration-color", preset: "blue-500", raw: "decoration-blue-500", arbitrary: false });
    expect(parseTextDecorationColor("decoration-red-100/75")).toEqual({ type: "text-decoration-color", preset: "red-100/75", raw: "decoration-red-100/75", arbitrary: false });
    expect(parseTextDecorationColor("decoration-amber-900/10")).toEqual({ type: "text-decoration-color", preset: "amber-900/10", raw: "decoration-amber-900/10", arbitrary: false });
  });
  it("parses custom property", () => {
    expect(parseTextDecorationColor("decoration-(--my-color)")).toEqual({ type: "text-decoration-color", value: "var(--my-color)", raw: "decoration-(--my-color)", arbitrary: true });
  });
  it("parses arbitrary value", () => {
    expect(parseTextDecorationColor("decoration-[#243c5a]")).toEqual({ type: "text-decoration-color", value: "#243c5a", raw: "decoration-[#243c5a]", arbitrary: true });
    expect(parseTextDecorationColor("decoration-[oklch(70%_0.2_200)]")).toEqual({ type: "text-decoration-color", value: "oklch(70%_0.2_200)", raw: "decoration-[oklch(70%_0.2_200)]", arbitrary: true });
  });
  it("returns null for invalid", () => {
    expect(parseTextDecorationColor("decoration")).toBeNull();
    expect(parseTextDecorationColor("decoration-foo")).toBeNull();
    expect(parseTextDecorationColor("decoration-[notacolor]")).toBeNull();
  });
}); 