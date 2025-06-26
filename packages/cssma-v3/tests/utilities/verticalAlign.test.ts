import { describe, it, expect } from "vitest";
import { parseVerticalAlign } from "../../src/parser/utilities/verticalAlign";

describe("parseVerticalAlign", () => {
  it("parses align-baseline", () => {
    expect(parseVerticalAlign("align-baseline")).toEqual({ type: "vertical-align", preset: "align-baseline", raw: "align-baseline", arbitrary: false });
  });
  it("parses align-top", () => {
    expect(parseVerticalAlign("align-top")).toEqual({ type: "vertical-align", preset: "align-top", raw: "align-top", arbitrary: false });
  });
  it("parses align-middle", () => {
    expect(parseVerticalAlign("align-middle")).toEqual({ type: "vertical-align", preset: "align-middle", raw: "align-middle", arbitrary: false });
  });
  it("parses align-bottom", () => {
    expect(parseVerticalAlign("align-bottom")).toEqual({ type: "vertical-align", preset: "align-bottom", raw: "align-bottom", arbitrary: false });
  });
  it("parses align-text-top", () => {
    expect(parseVerticalAlign("align-text-top")).toEqual({ type: "vertical-align", preset: "align-text-top", raw: "align-text-top", arbitrary: false });
  });
  it("parses align-text-bottom", () => {
    expect(parseVerticalAlign("align-text-bottom")).toEqual({ type: "vertical-align", preset: "align-text-bottom", raw: "align-text-bottom", arbitrary: false });
  });
  it("parses align-sub", () => {
    expect(parseVerticalAlign("align-sub")).toEqual({ type: "vertical-align", preset: "align-sub", raw: "align-sub", arbitrary: false });
  });
  it("parses align-super", () => {
    expect(parseVerticalAlign("align-super")).toEqual({ type: "vertical-align", preset: "align-super", raw: "align-super", arbitrary: false });
  });
  it("parses custom property", () => {
    expect(parseVerticalAlign("align-(--my-alignment)")).toEqual({ type: "vertical-align", preset: "--my-alignment", raw: "align-(--my-alignment)", arbitrary: true });
  });
  it("parses arbitrary value", () => {
    expect(parseVerticalAlign("align-[4px]")).toEqual({ type: "vertical-align", preset: "4px", raw: "align-[4px]", arbitrary: true });
    expect(parseVerticalAlign("align-[top+2px]")).toEqual({ type: "vertical-align", preset: "top+2px", raw: "align-[top+2px]", arbitrary: true });
  });
  it("returns null for invalid values", () => {
    expect(parseVerticalAlign("vertical-align-top")).toBeNull();
    expect(parseVerticalAlign("align-top-bottom")).toBeNull();
    expect(parseVerticalAlign("align-foo")).toBeNull();
  });
}); 