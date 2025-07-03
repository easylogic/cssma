import { describe, it, expect } from "vitest";
import { parseTypography } from '../../src/parser/utilities/typography';

describe("parseTextTransform", () => {
  it("parses uppercase", () => {
    expect(parseTypography("uppercase")).toEqual({ type: "text-transform", preset: "uppercase", raw: "uppercase", arbitrary: false });
  });
  it("parses lowercase", () => {
    expect(parseTypography("lowercase")).toEqual({ type: "text-transform", preset: "lowercase", raw: "lowercase", arbitrary: false });
  });
  it("parses capitalize", () => {
    expect(parseTypography("capitalize")).toEqual({ type: "text-transform", preset: "capitalize", raw: "capitalize", arbitrary: false });
  });
  it("parses normal-case", () => {
    expect(parseTypography("normal-case")).toEqual({ type: "text-transform", preset: "normal-case", raw: "normal-case", arbitrary: false });
  });
  it("parses arbitrary value", () => {
    expect(parseTypography("text-transform-[full-width]")).toEqual({ type: "text-transform", preset: "full-width", raw: "text-transform-[full-width]", arbitrary: true });
    expect(parseTypography("text-transform-[none]")).toEqual({ type: "text-transform", preset: "none", raw: "text-transform-[none]", arbitrary: true });
  });
  it("returns null for invalid values", () => {
    expect(parseTypography("text-uppercase")).toBeNull();
    expect(parseTypography("capitalize-text")).toBeNull();
    expect(parseTypography("text-transform-foo")).toBeNull();
  });
}); 