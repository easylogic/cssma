import { describe, it, expect } from "vitest";
import { parseTypography } from '../../src/parser/utilities/typography';

describe("parseTextAlign", () => {
  it("parses text-left", () => {
    expect(parseTypography("text-left")).toEqual({ type: "text-align", preset: "left", raw: "text-left", arbitrary: false });
  });
  it("parses text-center", () => {
    expect(parseTypography("text-center")).toEqual({ type: "text-align", preset: "center", raw: "text-center", arbitrary: false });
  });
  it("parses text-right", () => {
    expect(parseTypography("text-right")).toEqual({ type: "text-align", preset: "right", raw: "text-right", arbitrary: false });
  });
  it("parses text-justify", () => {
    expect(parseTypography("text-justify")).toEqual({ type: "text-align", preset: "justify", raw: "text-justify", arbitrary: false });
  });
  it("parses text-start", () => {
    expect(parseTypography("text-start")).toEqual({ type: "text-align", preset: "start", raw: "text-start", arbitrary: false });
  });
  it("parses text-end", () => {
    expect(parseTypography("text-end")).toEqual({ type: "text-align", preset: "end", raw: "text-end", arbitrary: false });
  });
  it("parses arbitrary value", () => {
    expect(parseTypography("text-[center]")).toEqual({ type: "text-align", preset: "center", raw: "text-[center]", arbitrary: true });
    expect(parseTypography("text-[justify-all]")).toEqual({ type: "text-align", preset: "justify-all", raw: "text-[justify-all]", arbitrary: true });
  });
  it("returns null for invalid values", () => {
    expect(parseTypography("text-middle")).toBeNull();
    expect(parseTypography("text-align-left")).toBeNull();
    expect(parseTypography("text-foo")).toBeNull();
  });
}); 