import { describe, it, expect } from "vitest";
import { parseTextDecorationThickness } from "../../src/parser/utilities/textDecorationThickness";

describe("parseTextDecorationThickness", () => {
  it("parses decoration-<number>", () => {
    expect(parseTextDecorationThickness("decoration-1")).toEqual({ type: "text-decoration-thickness", preset: "1", raw: "decoration-1", arbitrary: false });
    expect(parseTextDecorationThickness("decoration-2")).toEqual({ type: "text-decoration-thickness", preset: "2", raw: "decoration-2", arbitrary: false });
    expect(parseTextDecorationThickness("decoration-4")).toEqual({ type: "text-decoration-thickness", preset: "4", raw: "decoration-4", arbitrary: false });
  });
  it("parses decoration-from-font", () => {
    expect(parseTextDecorationThickness("decoration-from-font")).toEqual({ type: "text-decoration-thickness", preset: "from-font", raw: "decoration-from-font", arbitrary: false });
  });
  it("parses decoration-auto", () => {
    expect(parseTextDecorationThickness("decoration-auto")).toEqual({ type: "text-decoration-thickness", preset: "auto", raw: "decoration-auto", arbitrary: false });
  });
  it("parses custom property", () => {
    expect(parseTextDecorationThickness("decoration-(length:my-decoration-thickness)")).toEqual({ type: "text-decoration-thickness", preset: "length:--my-decoration-thickness", raw: "decoration-(length:my-decoration-thickness)", arbitrary: true });
  });
  it("parses arbitrary value", () => {
    expect(parseTextDecorationThickness("decoration-[0.25rem]")).toEqual({ type: "text-decoration-thickness", preset: "0.25rem", raw: "decoration-[0.25rem]", arbitrary: true });
    expect(parseTextDecorationThickness("decoration-[3px]")).toEqual({ type: "text-decoration-thickness", preset: "3px", raw: "decoration-[3px]", arbitrary: true });
  });
  it("returns null for invalid values", () => {
    expect(parseTextDecorationThickness("decoration-thick")).toBeNull();
    expect(parseTextDecorationThickness("decoration-foo")).toBeNull();
    expect(parseTextDecorationThickness("decoration-1.5")).toBeNull();
    expect(parseTextDecorationThickness("decoration-[foo bar]" )).toEqual({ type: "text-decoration-thickness", preset: "foo bar", raw: "decoration-[foo bar]", arbitrary: true }); // valid arbitrary
  });
}); 