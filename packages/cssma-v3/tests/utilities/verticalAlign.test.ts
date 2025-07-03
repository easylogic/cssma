import { describe, it, expect } from "vitest";
import { parseTypography } from '../../src/parser/utilities/typography';

describe("parseVerticalAlign", () => {
  it("parses align-baseline", () => {
    expect(parseTypography("align-baseline")).toEqual({ type: "vertical-align", preset: "baseline", raw: "align-baseline", arbitrary: false });
  });
  it("parses align-top", () => {
    expect(parseTypography("align-top")).toEqual({ type: "vertical-align", preset: "top", raw: "align-top", arbitrary: false });
  });
  it("parses align-middle", () => {
    expect(parseTypography("align-middle")).toEqual({ type: "vertical-align", preset: "middle", raw: "align-middle", arbitrary: false });
  });
  it("parses align-bottom", () => {
    expect(parseTypography("align-bottom")).toEqual({ type: "vertical-align", preset: "bottom", raw: "align-bottom", arbitrary: false });
  });
  it("parses align-text-top", () => {
    expect(parseTypography("align-text-top")).toEqual({ type: "vertical-align", preset: "text-top", raw: "align-text-top", arbitrary: false });
  });
  it("parses align-text-bottom", () => {
    expect(parseTypography("align-text-bottom")).toEqual({ type: "vertical-align", preset: "text-bottom", raw: "align-text-bottom", arbitrary: false });
  });
  it("parses align-sub", () => {
    expect(parseTypography("align-sub")).toEqual({ type: "vertical-align", preset: "sub", raw: "align-sub", arbitrary: false });
  });
  it("parses align-super", () => {
    expect(parseTypography("align-super")).toEqual({ type: "vertical-align", preset: "super", raw: "align-super", arbitrary: false });
  });
  it("parses custom property", () => {
    expect(parseTypography("align-(--foo)")).toEqual({ type: "vertical-align", value: "var(--foo)", raw: "align-(--foo)", arbitrary: true });
  });
  it("parses arbitrary value", () => {
    expect(parseTypography("align-[10px]")).toEqual({ type: "vertical-align", value: "10px", raw: "align-[10px]", arbitrary: true });
  });
  it("returns null for invalid values", () => {
    expect(parseTypography("align-")).toBeNull();
    expect(parseTypography("align-foo")).toBeNull();
    expect(parseTypography("vertical-align-top")).toBeNull();
  });
}); 