import { describe, it, expect } from "vitest";
import { parseVerticalAlign } from "../../src/parser/utilities/verticalAlign";

describe("parseVerticalAlign", () => {
  it("parses align-baseline", () => {
    expect(parseVerticalAlign("align-baseline")).toEqual({ type: "vertical-align", preset: "baseline", raw: "align-baseline", arbitrary: false });
  });
  it("parses align-top", () => {
    expect(parseVerticalAlign("align-top")).toEqual({ type: "vertical-align", preset: "top", raw: "align-top", arbitrary: false });
  });
  it("parses align-middle", () => {
    expect(parseVerticalAlign("align-middle")).toEqual({ type: "vertical-align", preset: "middle", raw: "align-middle", arbitrary: false });
  });
  it("parses align-bottom", () => {
    expect(parseVerticalAlign("align-bottom")).toEqual({ type: "vertical-align", preset: "bottom", raw: "align-bottom", arbitrary: false });
  });
  it("parses align-text-top", () => {
    expect(parseVerticalAlign("align-text-top")).toEqual({ type: "vertical-align", preset: "text-top", raw: "align-text-top", arbitrary: false });
  });
  it("parses align-text-bottom", () => {
    expect(parseVerticalAlign("align-text-bottom")).toEqual({ type: "vertical-align", preset: "text-bottom", raw: "align-text-bottom", arbitrary: false });
  });
  it("parses align-sub", () => {
    expect(parseVerticalAlign("align-sub")).toEqual({ type: "vertical-align", preset: "sub", raw: "align-sub", arbitrary: false });
  });
  it("parses align-super", () => {
    expect(parseVerticalAlign("align-super")).toEqual({ type: "vertical-align", preset: "super", raw: "align-super", arbitrary: false });
  });
  it("parses custom property", () => {
    expect(parseVerticalAlign("align-(--foo)")).toEqual({ type: "vertical-align", value: "var(--foo)", raw: "align-(--foo)", arbitrary: true });
  });
  it("parses arbitrary value", () => {
    expect(parseVerticalAlign("align-[10px]")).toEqual({ type: "vertical-align", value: "10px", raw: "align-[10px]", arbitrary: true });
  });
  it("returns null for invalid values", () => {
    expect(parseVerticalAlign("align-")).toBeNull();
    expect(parseVerticalAlign("align-foo")).toBeNull();
    expect(parseVerticalAlign("vertical-align-top")).toBeNull();
  });
}); 