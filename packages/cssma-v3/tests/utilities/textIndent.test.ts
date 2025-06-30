import { describe, it, expect } from "vitest";
import { parseTextIndent } from "../../src/parser/utilities/textIndent";

describe("parseTextIndent", () => {
  it("parses indent-4", () => {
    expect(parseTextIndent("indent-4")).toEqual({
      type: "text-indent",
      value: "4",
      raw: "indent-4",
      arbitrary: false,
      customProperty: false,
      negative: false,
    });
  });
  it("parses -indent-8", () => {
    expect(parseTextIndent("-indent-8")).toEqual({
      type: "text-indent",
      value: "8",
      raw: "-indent-8",
      arbitrary: false,
      customProperty: false,
      negative: true,
    });
  });
  it("parses indent-px", () => {
    expect(parseTextIndent("indent-px")).toEqual({
      type: "text-indent",
      value: "1px",
      raw: "indent-px",
      arbitrary: false,
      customProperty: false,
      negative: false,
    });
  });
  it("parses -indent-px", () => {
    expect(parseTextIndent("-indent-px")).toEqual({
      type: "text-indent",
      value: "1px",
      raw: "-indent-px",
      arbitrary: false,
      customProperty: false,
      negative: true,
    });
  });
  it("parses indent-(--my-indent)", () => {
    expect(parseTextIndent("indent-(--my-indent)")).toEqual({
      type: "text-indent",
      value: "var(--my-indent)",
      raw: "indent-(--my-indent)",
      arbitrary: false,
      customProperty: true,
      negative: false,
    });
  });
  it("parses indent-[50%]", () => {
    expect(parseTextIndent("indent-[50%]")).toEqual({
      type: "text-indent",
      value: "50%",
      raw: "indent-[50%]",
      arbitrary: true,
      customProperty: false,
      negative: false,
    });
  });
  it("returns null for invalid input", () => {
    expect(parseTextIndent("indent-")).toBeNull();
    expect(parseTextIndent("indent-foo")).toBeNull();
    expect(parseTextIndent("indent-4px")).toBeNull();
    expect(parseTextIndent("text-indent-4")).toBeNull();
    expect(parseTextIndent("--indent-4")).toBeNull();
  });
}); 