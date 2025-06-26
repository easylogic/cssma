import { describe, it, expect } from "vitest";
import { parseTextIndent } from "../../src/parser/utilities/textIndent";

describe("parseTextIndent", () => {
  it("parses indent-<number>", () => {
    expect(parseTextIndent("indent-2")).toEqual({ type: "text-indent", preset: "2", raw: "indent-2", arbitrary: false });
    expect(parseTextIndent("indent-8")).toEqual({ type: "text-indent", preset: "8", raw: "indent-8", arbitrary: false });
  });
  it("parses -indent-<number>", () => {
    expect(parseTextIndent("-indent-2")).toEqual({ type: "text-indent", preset: "-2", raw: "-indent-2", arbitrary: false });
    expect(parseTextIndent("-indent-8")).toEqual({ type: "text-indent", preset: "-8", raw: "-indent-8", arbitrary: false });
  });
  it("parses indent-px", () => {
    expect(parseTextIndent("indent-px")).toEqual({ type: "text-indent", preset: "px", raw: "indent-px", arbitrary: false });
  });
  it("parses -indent-px", () => {
    expect(parseTextIndent("-indent-px")).toEqual({ type: "text-indent", preset: "-px", raw: "-indent-px", arbitrary: false });
  });
  it("parses custom property", () => {
    expect(parseTextIndent("indent-(--my-indentation)")).toEqual({ type: "text-indent", preset: "--my-indentation", raw: "indent-(--my-indentation)", arbitrary: true });
  });
  it("parses arbitrary value", () => {
    expect(parseTextIndent("indent-[50%]")).toEqual({ type: "text-indent", preset: "50%", raw: "indent-[50%]", arbitrary: true });
    expect(parseTextIndent("indent-[2em]")).toEqual({ type: "text-indent", preset: "2em", raw: "indent-[2em]", arbitrary: true });
  });
  it("returns null for invalid values", () => {
    expect(parseTextIndent("indent-foo")).toBeNull();
    expect(parseTextIndent("indent--2")).toBeNull();
    expect(parseTextIndent("indent-1.5")).toBeNull();
    expect(parseTextIndent("indent-[foo bar]" )).toEqual({ type: "text-indent", preset: "foo bar", raw: "indent-[foo bar]", arbitrary: true }); // valid arbitrary
  });
}); 