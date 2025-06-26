import { describe, it, expect } from "vitest";
import { parseTextDecorationStyle } from "../../src/parser/utilities/textDecorationStyle";

describe("parseTextDecorationStyle", () => {
  it("parses decoration-solid", () => {
    expect(parseTextDecorationStyle("decoration-solid")).toEqual({ type: "text-decoration-style", preset: "solid", raw: "decoration-solid", arbitrary: false });
  });
  it("parses decoration-double", () => {
    expect(parseTextDecorationStyle("decoration-double")).toEqual({ type: "text-decoration-style", preset: "double", raw: "decoration-double", arbitrary: false });
  });
  it("parses decoration-dotted", () => {
    expect(parseTextDecorationStyle("decoration-dotted")).toEqual({ type: "text-decoration-style", preset: "dotted", raw: "decoration-dotted", arbitrary: false });
  });
  it("parses decoration-dashed", () => {
    expect(parseTextDecorationStyle("decoration-dashed")).toEqual({ type: "text-decoration-style", preset: "dashed", raw: "decoration-dashed", arbitrary: false });
  });
  it("parses decoration-wavy", () => {
    expect(parseTextDecorationStyle("decoration-wavy")).toEqual({ type: "text-decoration-style", preset: "wavy", raw: "decoration-wavy", arbitrary: false });
  });
  it("parses arbitrary value", () => {
    expect(parseTextDecorationStyle("decoration-[zigzag]")).toEqual({ type: "text-decoration-style", preset: "zigzag", raw: "decoration-[zigzag]", arbitrary: true });
    expect(parseTextDecorationStyle("decoration-[custom]")).toEqual({ type: "text-decoration-style", preset: "custom", raw: "decoration-[custom]", arbitrary: true });
  });
  it("returns null for invalid values", () => {
    expect(parseTextDecorationStyle("decoration-solid-double")).toBeNull();
    expect(parseTextDecorationStyle("text-decoration-solid")).toBeNull();
    expect(parseTextDecorationStyle("decoration-foo")).toBeNull();
  });
}); 