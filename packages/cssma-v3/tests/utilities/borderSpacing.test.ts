import { describe, it, expect } from "vitest";
import { parseBorderSpacing } from "../../src/parser/utilities/borderSpacing";

describe("parseBorderSpacing", () => {
  it("parses border-spacing preset", () => {
    expect(parseBorderSpacing("border-spacing-2")).toEqual({
      type: "border-spacing",
      axis: "both",
      value: "2",
      raw: "border-spacing-2",
      arbitrary: false,
    });
  });
  it("parses border-spacing arbitrary", () => {
    expect(parseBorderSpacing("border-spacing-[7px]")).toEqual({
      type: "border-spacing",
      axis: "both",
      value: "7px",
      raw: "border-spacing-[7px]",
      arbitrary: true,
    });
  });
  it("parses border-spacing custom property", () => {
    expect(parseBorderSpacing("border-spacing-(--my-spacing)")).toEqual({
      type: "border-spacing",
      axis: "both",
      value: "var(--my-spacing)",
      raw: "border-spacing-(--my-spacing)",
      arbitrary: true,
      customProperty: true,
    });
  });
  it("parses border-spacing-x preset", () => {
    expect(parseBorderSpacing("border-spacing-x-3")).toEqual({
      type: "border-spacing",
      axis: "x",
      value: "3",
      raw: "border-spacing-x-3",
      arbitrary: false,
    });
  });
  it("parses border-spacing-x arbitrary", () => {
    expect(parseBorderSpacing("border-spacing-x-[2em]")).toEqual({
      type: "border-spacing",
      axis: "x",
      value: "2em",
      raw: "border-spacing-x-[2em]",
      arbitrary: true,
    });
  });
  it("parses border-spacing-x custom property", () => {
    expect(parseBorderSpacing("border-spacing-x-(--foo)")).toEqual({
      type: "border-spacing",
      axis: "x",
      value: "var(--foo)",
      raw: "border-spacing-x-(--foo)",
      arbitrary: true,
      customProperty: true,
    });
  });
  it("parses border-spacing-y preset", () => {
    expect(parseBorderSpacing("border-spacing-y-4")).toEqual({
      type: "border-spacing",
      axis: "y",
      value: "4",
      raw: "border-spacing-y-4",
      arbitrary: false,
    });
  });
  it("parses border-spacing-y arbitrary", () => {
    expect(parseBorderSpacing("border-spacing-y-[1.5rem]")).toEqual({
      type: "border-spacing",
      axis: "y",
      value: "1.5rem",
      raw: "border-spacing-y-[1.5rem]",
      arbitrary: true,
    });
  });
  it("parses border-spacing-y custom property", () => {
    expect(parseBorderSpacing("border-spacing-y-(--bar)")).toEqual({
      type: "border-spacing",
      axis: "y",
      value: "var(--bar)",
      raw: "border-spacing-y-(--bar)",
      arbitrary: true,
      customProperty: true,
    });
  });
  it("returns null for invalid input", () => {
    expect(parseBorderSpacing("border-spacing")).toBeNull();
    expect(parseBorderSpacing("border-spacing-x")).toBeNull();
    expect(parseBorderSpacing("border-spacing-y")).toBeNull();
    expect(parseBorderSpacing("border-spacing-foo")).toBeNull();
  });
});
