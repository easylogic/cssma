import { describe, it, expect } from "vitest";
import { parseTypography } from '../../src/parser/utilities/typography';

describe("parseTextDecorationStyle", () => {
  it("parses decoration-solid", () => {
    expect(parseTypography("decoration-solid")).toEqual({ type: "text-decoration-style", preset: "solid", raw: "decoration-solid", arbitrary: false });
  });
  it("parses decoration-double", () => {
    expect(parseTypography("decoration-double")).toEqual({ type: "text-decoration-style", preset: "double", raw: "decoration-double", arbitrary: false });
  });
  it("parses decoration-dotted", () => {
    expect(parseTypography("decoration-dotted")).toEqual({ type: "text-decoration-style", preset: "dotted", raw: "decoration-dotted", arbitrary: false });
  });
  it("parses decoration-dashed", () => {
    expect(parseTypography("decoration-dashed")).toEqual({ type: "text-decoration-style", preset: "dashed", raw: "decoration-dashed", arbitrary: false });
  });
  it("parses decoration-wavy", () => {
    expect(parseTypography("decoration-wavy")).toEqual({ type: "text-decoration-style", preset: "wavy", raw: "decoration-wavy", arbitrary: false });
  });
  it("parses arbitrary value", () => {
    expect(parseTypography("decoration-[zigzag]")).toEqual({ type: "text-decoration-style", preset: "zigzag", raw: "decoration-[zigzag]", arbitrary: true });
    expect(parseTypography("decoration-[custom]")).toEqual({ type: "text-decoration-style", preset: "custom", raw: "decoration-[custom]", arbitrary: true });
  });
  it("returns null for invalid values", () => {
    expect(parseTypography("decoration-solid-double")).toBeNull();
    expect(parseTypography("text-decoration-solid")).toBeNull();
    expect(parseTypography("decoration-foo")).toBeNull();
  });
}); 