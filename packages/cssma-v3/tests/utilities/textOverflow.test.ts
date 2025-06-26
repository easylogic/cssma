import { describe, it, expect } from "vitest";
import { parseTextOverflow } from "../../src/parser/utilities/textOverflow";

describe("parseTextOverflow", () => {
  it("parses truncate", () => {
    expect(parseTextOverflow("truncate")).toEqual({ type: "text-overflow", preset: "truncate", raw: "truncate", arbitrary: false });
  });
  it("parses text-ellipsis", () => {
    expect(parseTextOverflow("text-ellipsis")).toEqual({ type: "text-overflow", preset: "text-ellipsis", raw: "text-ellipsis", arbitrary: false });
  });
  it("parses text-clip", () => {
    expect(parseTextOverflow("text-clip")).toEqual({ type: "text-overflow", preset: "text-clip", raw: "text-clip", arbitrary: false });
  });
  it("parses arbitrary value", () => {
    expect(parseTextOverflow("text-overflow-[fade]")).toEqual({ type: "text-overflow", preset: "fade", raw: "text-overflow-[fade]", arbitrary: true });
    expect(parseTextOverflow("text-overflow-[custom]")).toEqual({ type: "text-overflow", preset: "custom", raw: "text-overflow-[custom]", arbitrary: true });
  });
  it("returns null for invalid values", () => {
    expect(parseTextOverflow("overflow-ellipsis")).toBeNull();
    expect(parseTextOverflow("text-overflow-foo")).toBeNull();
    expect(parseTextOverflow("truncate-text")).toBeNull();
  });
}); 