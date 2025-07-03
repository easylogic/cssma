import { describe, it, expect } from "vitest";
import { parseTypography } from '../../src/parser/utilities/typography';

describe("parseTextIndent", () => {
  it("parses indent-4", () => {
    expect(parseTypography("indent-4")).toEqual({
      type: "text-indent",
      value: "4",
      raw: "indent-4",
      arbitrary: false,
      customProperty: false,
      negative: false,
    });
  });
  it("parses -indent-8", () => {
    expect(parseTypography("-indent-8")).toEqual({
      type: "text-indent",
      value: "8",
      raw: "-indent-8",
      arbitrary: false,
      customProperty: false,
      negative: true,
    });
  });
  it("parses indent-px", () => {
    expect(parseTypography("indent-px")).toEqual({
      type: "text-indent",
      value: "1px",
      raw: "indent-px",
      arbitrary: false,
      customProperty: false,
      negative: false,
    });
  });
  it("parses -indent-px", () => {
    expect(parseTypography("-indent-px")).toEqual({
      type: "text-indent",
      value: "1px",
      raw: "-indent-px",
      arbitrary: false,
      customProperty: false,
      negative: true,
    });
  });
  it("parses indent-(--my-indent)", () => {
    expect(parseTypography("indent-(--my-indent)")).toEqual({
      type: "text-indent",
      value: "var(--my-indent)",
      raw: "indent-(--my-indent)",
      arbitrary: false,
      customProperty: true,
      negative: false,
    });
  });
  it("parses indent-[50%]", () => {
    expect(parseTypography("indent-[50%]")).toEqual({
      type: "text-indent",
      value: "50%",
      raw: "indent-[50%]",
      arbitrary: true,
      customProperty: false,
      negative: false,
    });
  });
  it("returns null for invalid input", () => {
    expect(parseTypography("indent-")).toBeNull();
    expect(parseTypography("indent-foo")).toBeNull();
    expect(parseTypography("indent-4px")).toBeNull();
    expect(parseTypography("text-indent-4")).toBeNull();
    expect(parseTypography("--indent-4")).toBeNull();
  });
}); 