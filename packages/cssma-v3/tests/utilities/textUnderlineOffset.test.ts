import { describe, it, expect } from "vitest";
import { parseTypography } from '../../src/parser/utilities/typography';

describe("parseTextUnderlineOffset", () => {
  it("parses underline-offset-<number>", () => {
    expect(parseTypography("underline-offset-1")).toEqual({ type: "text-underline-offset", preset: "1", raw: "underline-offset-1", arbitrary: false });
    expect(parseTypography("underline-offset-2")).toEqual({ type: "text-underline-offset", preset: "2", raw: "underline-offset-2", arbitrary: false });
    expect(parseTypography("underline-offset-8")).toEqual({ type: "text-underline-offset", preset: "8", raw: "underline-offset-8", arbitrary: false });
  });
  it("parses -underline-offset-<number>", () => {
    expect(parseTypography("-underline-offset-1")).toEqual({ type: "text-underline-offset", preset: "-1", raw: "-underline-offset-1", arbitrary: false });
    expect(parseTypography("-underline-offset-4")).toEqual({ type: "text-underline-offset", preset: "-4", raw: "-underline-offset-4", arbitrary: false });
  });
  it("parses underline-offset-auto", () => {
    expect(parseTypography("underline-offset-auto")).toEqual({ type: "text-underline-offset", preset: "auto", raw: "underline-offset-auto", arbitrary: false });
  });
  it("parses custom property", () => {
    expect(parseTypography("underline-offset-(--my-underline-offset)")).toEqual({ type: "text-underline-offset", preset: "--my-underline-offset", raw: "underline-offset-(--my-underline-offset)", arbitrary: true });
  });
  it("parses arbitrary value", () => {
    expect(parseTypography("underline-offset-[3px]")).toEqual({ type: "text-underline-offset", preset: "3px", raw: "underline-offset-[3px]", arbitrary: true });
    expect(parseTypography("underline-offset-[calc(1em+2px)]")).toEqual({ type: "text-underline-offset", preset: "calc(1em+2px)", raw: "underline-offset-[calc(1em+2px)]", arbitrary: true });
  });
  it("returns null for invalid values", () => {
    expect(parseTypography("underline-offset-thick")).toBeNull();
    expect(parseTypography("underline-offset-foo")).toBeNull();
    expect(parseTypography("underline-offset-1.5")).toBeNull();
    expect(parseTypography("underline-offset--1")).toBeNull();
    expect(parseTypography("underline-offset-[foo bar]" )).toEqual({ type: "text-underline-offset", preset: "foo bar", raw: "underline-offset-[foo bar]", arbitrary: true }); // valid arbitrary
  });
}); 