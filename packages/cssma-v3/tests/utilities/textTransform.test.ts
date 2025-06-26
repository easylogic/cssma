import { describe, it, expect } from "vitest";
import { parseTextTransform } from "../../src/parser/utilities/textTransform";

describe("parseTextTransform", () => {
  it("parses uppercase", () => {
    expect(parseTextTransform("uppercase")).toEqual({ type: "text-transform", preset: "uppercase", raw: "uppercase", arbitrary: false });
  });
  it("parses lowercase", () => {
    expect(parseTextTransform("lowercase")).toEqual({ type: "text-transform", preset: "lowercase", raw: "lowercase", arbitrary: false });
  });
  it("parses capitalize", () => {
    expect(parseTextTransform("capitalize")).toEqual({ type: "text-transform", preset: "capitalize", raw: "capitalize", arbitrary: false });
  });
  it("parses normal-case", () => {
    expect(parseTextTransform("normal-case")).toEqual({ type: "text-transform", preset: "normal-case", raw: "normal-case", arbitrary: false });
  });
  it("parses arbitrary value", () => {
    expect(parseTextTransform("text-transform-[full-width]")).toEqual({ type: "text-transform", preset: "full-width", raw: "text-transform-[full-width]", arbitrary: true });
    expect(parseTextTransform("text-transform-[none]")).toEqual({ type: "text-transform", preset: "none", raw: "text-transform-[none]", arbitrary: true });
  });
  it("returns null for invalid values", () => {
    expect(parseTextTransform("text-uppercase")).toBeNull();
    expect(parseTextTransform("capitalize-text")).toBeNull();
    expect(parseTextTransform("text-transform-foo")).toBeNull();
  });
}); 