import { describe, it, expect } from "vitest";
import { parseBaseToken } from "../../src/parser/utils";

describe("parseUtilityToken", () => {
  const prefixes = [
    "border",
    "border-t",
    "border-b",
    "border-l",
    "border-r",
    "border-x",
    "border-y",
    "m",
    "mx",
    "my",
    "mt",
    "mb",
    "ml",
    "mr",
    "p",
    "px",
    "py",
    "pt",
    "pb",
    "pl",
    "pr",
    "bg",
    "text",
    "rounded",
    "rounded-tl",
    "shadow",
    "flex",
    "items",
    "justify",
    "gap",
    "gap-x",
    "gap-y",
    "col-span",
    "w",
    "h",
  ];

  it("parses prefix/value correctly", () => {
    expect(parseBaseToken("border", prefixes)).toEqual({
      raw: "border",
      prefix: "border",
      value: "",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("border-2", prefixes)).toEqual({
      raw: "border-2",
      prefix: "border",
      value: "2",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: true,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("border-x", prefixes)).toEqual({
      raw: "border-x",
      prefix: "border-x",
      value: "",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("border-x-4", prefixes)).toEqual({
      raw: "border-x-4",
      prefix: "border-x",
      value: "4",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: true,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("border-x-[2vw]", prefixes)).toEqual({
      raw: "border-x-[2vw]",
      prefix: "border-x",
      value: "2vw",
      slash: undefined,
      customProperty: false,
      arbitrary: true,
      arbitraryType: undefined,
      arbitraryValue: "2vw",
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("border-[10px]", prefixes)).toEqual({
      raw: "border-[10px]",
      prefix: "border",
      value: "10px",
      slash: undefined,
      customProperty: false,
      arbitrary: true,
      arbitraryType: undefined,
      arbitraryValue: "10px",
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("m-4", prefixes)).toEqual({
      raw: "m-4",
      prefix: "m",
      value: "4",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: true,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("-m-4", prefixes)).toEqual({
      raw: "-m-4",
      prefix: "m",
      value: "4",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: true,
      preset: true,
      negative: true,
      important: false,
    });
    expect(parseBaseToken("!m-4", prefixes)).toEqual({
      raw: "!m-4",
      prefix: "m",
      value: "4",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: true,
      preset: true,
      negative: false,
      important: true,
    });
    expect(parseBaseToken("!-m-4", prefixes)).toEqual({
      raw: "!-m-4",
      prefix: "m",
      value: "4",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: true,
      preset: true,
      negative: true,
      important: true,
    });
    expect(parseBaseToken("m-!4", prefixes)).toEqual({
      raw: "m-!4",
      prefix: "m",
      value: "!4",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("mx-auto", prefixes)).toEqual({
      raw: "mx-auto",
      prefix: "mx",
      value: "auto",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("p-[10px]", prefixes)).toEqual({
      raw: "p-[10px]",
      prefix: "p",
      value: "10px",
      slash: undefined,
      customProperty: false,
      arbitrary: true,
      arbitraryType: undefined,
      arbitraryValue: "10px",
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("bg-red-500", prefixes)).toEqual({
      raw: "bg-red-500",
      prefix: "bg",
      value: "red-500",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("!bg-red-500", prefixes)).toEqual({
      raw: "!bg-red-500",
      prefix: "bg",
      value: "red-500",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: true,
    });
    expect(parseBaseToken("bg-!important", prefixes)).toEqual({
      raw: "bg-!important",
      prefix: "bg",
      value: "!important",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("-bg-!important", prefixes)).toEqual({
      raw: "-bg-!important",
      prefix: "bg",
      value: "!important",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: true,
      important: false,
    });
    expect(parseBaseToken("text-lg", prefixes)).toEqual({
      raw: "text-lg",
      prefix: "text",
      value: "lg",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("rounded-tl-md", prefixes)).toEqual({
      raw: "rounded-tl-md",
      prefix: "rounded-tl",
      value: "md",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("shadow-xl", prefixes)).toEqual({
      raw: "shadow-xl",
      prefix: "shadow",
      value: "xl",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("flex", prefixes)).toEqual({
      raw: "flex",
      prefix: "flex",
      value: "",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("items-center", prefixes)).toEqual({
      raw: "items-center",
      prefix: "items",
      value: "center",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("justify-between", prefixes)).toEqual({
      raw: "justify-between",
      prefix: "justify",
      value: "between",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("gap-x-4", prefixes)).toEqual({
      raw: "gap-x-4",
      prefix: "gap-x",
      value: "4",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: true,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("col-span-3", prefixes)).toEqual({
      raw: "col-span-3",
      prefix: "col-span",
      value: "3",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: true,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("w-[calc(100%-2rem)]", prefixes)).toEqual({
      raw: "w-[calc(100%-2rem)]",
      prefix: "w",
      value: "calc(100%-2rem)",
      slash: undefined,
      customProperty: false,
      arbitrary: true,
      arbitraryType: "calc",
      arbitraryValue: "100%-2rem",
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
  });

  it("returns null for invalid", () => {
    expect(parseBaseToken("foo-bar", prefixes)).toBeNull();
    expect(parseBaseToken("border-x-", prefixes)).toBeNull();
    expect(parseBaseToken("border-", prefixes)).toBeNull();
  });

  it("parses various Tailwind-like utilities", () => {
    // 숫자, 테마 키, 임의 값, custom property, 특수문자 등
    expect(parseBaseToken("p-0", prefixes)).toEqual({
      raw: "p-0",
      prefix: "p",
      value: "0",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: true,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("p-1.5", prefixes)).toEqual({
      raw: "p-1.5",
      prefix: "p",
      value: "1.5",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: true,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("p-[3.5rem]", prefixes)).toEqual({
      raw: "p-[3.5rem]",
      prefix: "p",
      value: "3.5rem",
      slash: undefined,
      customProperty: false,
      arbitrary: true,
      arbitraryType: undefined,
      arbitraryValue: "3.5rem",
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("m-auto", prefixes)).toEqual({
      raw: "m-auto",
      prefix: "m",
      value: "auto",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("mx-[calc(100%-2rem)]", prefixes)).toEqual({
      raw: "mx-[calc(100%-2rem)]",
      prefix: "mx",
      value: "calc(100%-2rem)",
      slash: undefined,
      customProperty: false,
      arbitrary: true,
      arbitraryType: "calc",
      arbitraryValue: "100%-2rem",
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("gap-y-2", prefixes)).toEqual({
      raw: "gap-y-2",
      prefix: "gap-y",
      value: "2",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: true,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("rounded-tl-[10px]", prefixes)).toEqual({
      raw: "rounded-tl-[10px]",
      prefix: "rounded-tl",
      value: "10px",
      slash: undefined,
      customProperty: false,
      arbitrary: true,
      arbitraryType: undefined,
      arbitraryValue: "10px",
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("w-full", prefixes)).toEqual({
      raw: "w-full",
      prefix: "w",
      value: "full",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("h-screen", prefixes)).toEqual({
      raw: "h-screen",
      prefix: "h",
      value: "screen",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("col-span-12", prefixes)).toEqual({
      raw: "col-span-12",
      prefix: "col-span",
      value: "12",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: true,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("bg-[#ff0]", prefixes)).toEqual({
      raw: "bg-[#ff0]",
      prefix: "bg",
      value: "#ff0",
      slash: undefined,
      customProperty: false,
      arbitrary: true,
      arbitraryType: "hex",
      arbitraryValue: "#ff0",
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("bg-[#123456]", prefixes)).toEqual({
      raw: "bg-[#123456]",
      prefix: "bg",
      value: "#123456",
      slash: undefined,
      customProperty: false,
      arbitrary: true,
      arbitraryType: "hex",
      arbitraryValue: "#123456",
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("bg-[#12345678]", prefixes)).toEqual({
      raw: "bg-[#12345678]",
      prefix: "bg",
      value: "#12345678",
      slash: undefined,
      customProperty: false,
      arbitrary: true,
      arbitraryType: "hex",
      arbitraryValue: "#12345678",
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    expect(
      parseBaseToken("bg-[url(https://foo.bar/img.png)]", prefixes)
    ).toEqual({
      raw: "bg-[url(https://foo.bar/img.png)]",
      prefix: "bg",
      value: "url(https://foo.bar/img.png)",
      slash: undefined,
      customProperty: false,
      arbitrary: true,
      arbitraryType: "url",
      arbitraryValue: "https://foo.bar/img.png",
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("text-[theme(spacing.1)]", prefixes)).toEqual({
      raw: "text-[theme(spacing.1)]",
      prefix: "text",
      value: "theme(spacing.1)",
      slash: undefined,
      customProperty: false,
      arbitrary: true,
      arbitraryType: "theme",
      arbitraryValue: "spacing.1",
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("border-[var(--my-border)]", prefixes)).toEqual({
      raw: "border-[var(--my-border)]",
      prefix: "border",
      value: "var(--my-border)",
      slash: undefined,
      customProperty: false,
      arbitrary: true,
      arbitraryType: "var",
      arbitraryValue: "--my-border",
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("border-(--my-border)", prefixes)).toEqual({
      raw: "border-(--my-border)",
      prefix: "border",
      value: "--my-border",
      slash: undefined,
      customProperty: true,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("border-x-(length:--foo)", prefixes)).toEqual({
      raw: "border-x-(length:--foo)",
      prefix: "border-x",
      value: "length:--foo",
      slash: undefined,
      customProperty: true,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    // 중첩 prefix, 잘못된 조합
    expect(parseBaseToken("border-xx-2", prefixes)).toEqual({
      raw: "border-xx-2",
      prefix: "border",
      value: "xx-2",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("border-xy-2", prefixes)).toEqual({
      raw: "border-xy-2",
      prefix: "border",
      value: "xy-2",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("border-x-x-2", prefixes)).toEqual({
      raw: "border-x-x-2",
      prefix: "border-x",
      value: "x-2",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    // 특수문자, 공백 등
    expect(parseBaseToken("bg-[rgba(0,0,0,0.5)]", prefixes)).toEqual({
      raw: "bg-[rgba(0,0,0,0.5)]",
      prefix: "bg",
      value: "rgba(0,0,0,0.5)",
      slash: undefined,
      customProperty: false,
      arbitrary: true,
      arbitraryType: "rgba",
      arbitraryValue: "0,0,0,0.5",
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("text-[theme(spacing.1)]", prefixes)).toEqual({
      raw: "text-[theme(spacing.1)]",
      prefix: "text",
      value: "theme(spacing.1)",
      slash: undefined,
      customProperty: false,
      arbitrary: true,
      arbitraryType: "theme",
      arbitraryValue: "spacing.1",
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("w-[length:calc(100%-1rem)]", prefixes)).toEqual({
      raw: "w-[length:calc(100%-1rem)]",
      prefix: "w",
      value: "length:calc(100%-1rem)",
      slash: undefined,
      customProperty: false,
      arbitrary: true,
      arbitraryType: undefined,
      arbitraryValue: "length:calc(100%-1rem)",
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    // 빈 값, 하이픈만 있는 경우
    expect(parseBaseToken("m-", prefixes)).toBeNull();
    expect(parseBaseToken("gap-x-", prefixes)).toBeNull();
    expect(parseBaseToken("bg-", prefixes)).toBeNull();
  });

  it("parses additional edge cases", () => {
    // 공백 포함
    expect(parseBaseToken(" m-4", prefixes)).toBeNull(); // 앞에 공백(매칭 불가)
    expect(parseBaseToken("m-4 ", prefixes)).toEqual({
      raw: "m-4 ",
      prefix: "m",
      value: "4 ",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    }); // 뒤에 공백은 value에 포함
    expect(parseBaseToken("m -4", prefixes)).toBeNull(); // 중간에 공백(매칭 불가)
    // 숫자/문자 혼합
    expect(parseBaseToken("m-4a", prefixes)).toEqual({
      raw: "m-4a",
      prefix: "m",
      value: "4a",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("m-a4", prefixes)).toEqual({
      raw: "m-a4",
      prefix: "m",
      value: "a4",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    // 이중 하이픈
    expect(parseBaseToken("m--4", prefixes)).toEqual({
      raw: "m--4",
      prefix: "m",
      value: "-4",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: true,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("border--2", prefixes)).toEqual({
      raw: "border--2",
      prefix: "border",
      value: "-2",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: true,
      preset: true,
      negative: false,
      important: false,
    });
    // prefix 중복
    expect(parseBaseToken("border-border-2", prefixes)).toEqual({
      raw: "border-border-2",
      prefix: "border",
      value: "border-2",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    // 특수문자 value
    expect(parseBaseToken("bg-!important", prefixes)).toEqual({
      raw: "bg-!important",
      prefix: "bg",
      value: "!important",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("text-@media", prefixes)).toEqual({
      raw: "text-@media",
      prefix: "text",
      value: "@media",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    // 대소문자 구분
    expect(parseBaseToken("Bg-red-500", prefixes)).toBeNull(); // 대소문자 구분
    expect(parseBaseToken("BG-red-500", prefixes)).toBeNull();
    // 유사 prefix
    expect(parseBaseToken("borderx-2", prefixes)).toBeNull(); // borderx는 prefix에 없음
    expect(parseBaseToken("border_x-2", prefixes)).toBeNull(); // 언더스코어
    // 하이픈 위치
    expect(parseBaseToken("-m-4", prefixes)).toEqual({
      raw: "-m-4",
      prefix: "m",
      value: "4",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: true,
      preset: true,
      negative: true,
      important: false,
    }); // prefix 앞에 하이픈
    expect(parseBaseToken("m4", prefixes)).toBeNull(); // 하이픈 없이 붙은 경우
    // 빈 문자열
    expect(parseBaseToken("", prefixes)).toBeNull();
    // prefix만 있고 value가 없는 경우(정확히 일치)
    expect(parseBaseToken("gap", prefixes)).toEqual({
      raw: "gap",
      prefix: "gap",
      value: "",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    // prefix만 있고 value가 없는 경우(정확히 일치하지 않음)
    expect(parseBaseToken("gap-", prefixes)).toBeNull();
    // 하이픈만 value인 경우
    expect(parseBaseToken("gap--", prefixes)).toEqual({
      raw: "gap--",
      prefix: "gap",
      value: "-",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    // prefix가 value에 포함된 경우
    expect(parseBaseToken("gap-gap", prefixes)).toEqual({
      raw: "gap-gap",
      prefix: "gap",
      value: "gap",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    // 숫자 prefix
    expect(parseBaseToken("w-100", prefixes)).toEqual({
      raw: "w-100",
      prefix: "w",
      value: "100",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: true,
      preset: true,
      negative: false,
      important: false,
    });
    // value가 하이픈으로 시작하는 경우
    expect(parseBaseToken("w--100", prefixes)).toEqual({
      raw: "w--100",
      prefix: "w",
      value: "-100",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: true,
      preset: true,
      negative: false,
      important: false,
    });
  });

  it("parses customProperty/arbitrary/numeric/preset flags", () => {
    // customProperty
    expect(parseBaseToken("border-(--my-border)", prefixes)).toEqual({
      raw: "border-(--my-border)",
      prefix: "border",
      value: "--my-border",
      slash: undefined,
      customProperty: true,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("border-x-(length:--foo)", prefixes)).toEqual({
      raw: "border-x-(length:--foo)",
      prefix: "border-x",
      value: "length:--foo",
      slash: undefined,
      customProperty: true,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    // arbitrary
    expect(parseBaseToken("w-[calc(100%-2rem)]", prefixes)).toEqual({
      raw: "w-[calc(100%-2rem)]",
      prefix: "w",
      value: "calc(100%-2rem)",
      slash: undefined,
      customProperty: false,
      arbitrary: true,
      arbitraryType: "calc",
      arbitraryValue: "100%-2rem",
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("bg-[#ff0]", prefixes)).toEqual({
      raw: "bg-[#ff0]",
      prefix: "bg",
      value: "#ff0",
      slash: undefined,
      customProperty: false,
      arbitrary: true,
      arbitraryType: "hex",
      arbitraryValue: "#ff0",
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    // numeric
    expect(parseBaseToken("m-4", prefixes)).toEqual({
      raw: "m-4",
      prefix: "m",
      value: "4",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: true,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("gap-x--2", prefixes)).toEqual({
      raw: "gap-x--2",
      prefix: "gap-x",
      value: "-2",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: true,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("p-1.5", prefixes)).toEqual({
      raw: "p-1.5",
      prefix: "p",
      value: "1.5",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: true,
      preset: true,
      negative: false,
      important: false,
    });
    // preset
    expect(parseBaseToken("bg-red-500", prefixes)).toEqual({
      raw: "bg-red-500",
      prefix: "bg",
      value: "red-500",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("text-lg", prefixes)).toEqual({
      raw: "text-lg",
      prefix: "text",
      value: "lg",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("rounded-tl-md", prefixes)).toEqual({
      raw: "rounded-tl-md",
      prefix: "rounded-tl",
      value: "md",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("m-auto", prefixes)).toEqual({
      raw: "m-auto",
      prefix: "m",
      value: "auto",
      slash: undefined,
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
  });

  it("parses slash and arbitraryType/arbitraryValue correctly", () => {
    expect(parseBaseToken("bg-red-500/50", prefixes)).toEqual({
      raw: "bg-red-500/50",
      prefix: "bg",
      value: "red-500",
      slash: "50",
      customProperty: false,
      arbitrary: false,
      arbitraryType: undefined,
      arbitraryValue: undefined,
      numeric: false,
      preset: true,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("bg-[rgba(0,0,0,0.5)]/20", prefixes)).toEqual({
      raw: "bg-[rgba(0,0,0,0.5)]/20",
      prefix: "bg",
      value: "rgba(0,0,0,0.5)",
      slash: "20",
      customProperty: false,
      arbitrary: true,
      arbitraryType: "rgba",
      arbitraryValue: "0,0,0,0.5",
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("w-[calc(100%-2rem)]", prefixes)).toEqual({
      raw: "w-[calc(100%-2rem)]",
      prefix: "w",
      value: "calc(100%-2rem)",
      slash: undefined,
      customProperty: false,
      arbitrary: true,
      arbitraryType: "calc",
      arbitraryValue: "100%-2rem",
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("border-[var(--foo)]", prefixes)).toEqual({
      raw: "border-[var(--foo)]",
      prefix: "border",
      value: "var(--foo)",
      slash: undefined,
      customProperty: false,
      arbitrary: true,
      arbitraryType: "var",
      arbitraryValue: "--foo",
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    expect(
      parseBaseToken("bg-[url(https://foo.bar/img.png)]", prefixes)
    ).toEqual({
      raw: "bg-[url(https://foo.bar/img.png)]",
      prefix: "bg",
      value: "url(https://foo.bar/img.png)",
      slash: undefined,
      customProperty: false,
      arbitrary: true,
      arbitraryType: "url",
      arbitraryValue: "https://foo.bar/img.png",
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    expect(parseBaseToken("text-[theme(spacing.1)]", prefixes)).toEqual({
      raw: "text-[theme(spacing.1)]",
      prefix: "text",
      value: "theme(spacing.1)",
      slash: undefined,
      customProperty: false,
      arbitrary: true,
      arbitraryType: "theme",
      arbitraryValue: "spacing.1",
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
  });

  it('parses arbitrary value and returns inner value', () => {
    expect(parseBaseToken('bg-[url(https://foo)]', ['bg'])).toMatchObject({
      prefix: 'bg',
      value: 'url(https://foo)',
      arbitrary: true,
      arbitraryType: 'url',
      arbitraryValue: 'https://foo',
      slash: undefined,
    });
    expect(parseBaseToken('w-[calc(100%-2rem)]', ['w'])).toMatchObject({
      prefix: 'w',
      value: 'calc(100%-2rem)',
      arbitrary: true,
      arbitraryType: 'calc',
      arbitraryValue: '100%-2rem',
      slash: undefined,
    });
    expect(parseBaseToken('border-[length:var(--foo)]/50', ['border'])).toMatchObject({
      prefix: 'border',
      value: 'length:var(--foo)',
      arbitrary: true,
      arbitraryType: undefined,
      arbitraryValue: 'length:var(--foo)',
      slash: '50',
    });
    expect(parseBaseToken('bg-[rgba(0,0,0,0.5)]/10', ['bg'])).toMatchObject({
      prefix: 'bg',
      value: 'rgba(0,0,0,0.5)',
      arbitrary: true,
      arbitraryType: 'rgba',
      arbitraryValue: '0,0,0,0.5',
      slash: '10',
    });
  });

  it('parses custom property and returns inner value', () => {
    expect(parseBaseToken('bg-(--foo)', ['bg'])).toMatchObject({
      prefix: 'bg',
      value: '--foo',
      customProperty: true,
      slash: undefined,
    });
    expect(parseBaseToken('bg-(--foo)/20', ['bg'])).toMatchObject({
      prefix: 'bg',
      value: '--foo',
      customProperty: true,
      slash: '20',
    });
  });

  it('parses preset value and slash', () => {
    expect(parseBaseToken('bg-red-500/50', ['bg'])).toMatchObject({
      prefix: 'bg',
      value: 'red-500',
      preset: true,
      slash: '50',
    });
    expect(parseBaseToken('bg-red-500', ['bg'])).toMatchObject({
      prefix: 'bg',
      value: 'red-500',
      preset: true,
      slash: undefined,
    });
  });

  it('respects hasSlash option: false disables slash splitting', () => {
    // preset value with slash, but hasSlash: false
    expect(parseBaseToken('bg-red-500/50', ['bg'], false)).toMatchObject({
      prefix: 'bg',
      value: 'red-500/50',
      slash: undefined,
      preset: true,
    });
    // arbitrary value with slash inside, hasSlash: false
    expect(parseBaseToken('bg-[rgba(0,0,0,0.5)]/10', ['bg'], false)).toMatchObject({
      prefix: 'bg',
      value: 'rgba(0,0,0,0.5)',
      slash: undefined,
      arbitrary: true,
      arbitraryType: 'rgba',
      arbitraryValue: '0,0,0,0.5',
    });
    // customProperty with slash, hasSlash: false
    expect(parseBaseToken('border-(--my-border)/20', ['border'], false)).toMatchObject({
      prefix: 'border',
      value: '--my-border',
      slash: undefined,
      customProperty: false,
    });
    // arbitrary value, hasSlash: false, no slash in value
    expect(parseBaseToken('w-[calc(100%-2rem)]', ['w'], false)).toMatchObject({
      prefix: 'w',
      value: 'calc(100%-2rem)',
      arbitrary: true,
      slash: undefined,
    });
    // customProperty, hasSlash: false, no slash in value
    expect(parseBaseToken('bg-(--foo)', ['bg'], false)).toMatchObject({
      prefix: 'bg',
      value: '--foo',
      customProperty: true,
      slash: undefined,
    });
  });

  it('parses CSS Color 4 oklch/lch/lab/color() arbitrary values', () => {
    expect(parseBaseToken('bg-[oklch(62.2345%_0.154_219.2_/_0.8)]', prefixes)).toEqual({
      raw: 'bg-[oklch(62.2345%_0.154_219.2_/_0.8)]',
      prefix: 'bg',
      value: 'oklch(62.2345% 0.154 219.2 / 0.8)',
      slash: undefined,
      customProperty: false,
      arbitrary: true,
      arbitraryType: 'oklch',
      arbitraryValue: '62.2345% 0.154 219.2 / 0.8',
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    expect(parseBaseToken('bg-[lch(52%_0.2_180)]', prefixes)).toEqual({
      raw: 'bg-[lch(52%_0.2_180)]',
      prefix: 'bg',
      value: 'lch(52% 0.2 180)',
      slash: undefined,
      customProperty: false,
      arbitrary: true,
      arbitraryType: 'lch',
      arbitraryValue: '52% 0.2 180',
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    expect(parseBaseToken('bg-[lab(52%_20_30)]', prefixes)).toEqual({
      raw: 'bg-[lab(52%_20_30)]',
      prefix: 'bg',
      value: 'lab(52% 20 30)',
      slash: undefined,
      customProperty: false,
      arbitrary: true,
      arbitraryType: 'lab',
      arbitraryValue: '52% 20 30',
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
    expect(parseBaseToken('bg-[color(display-p3_1_0.5_0)]', prefixes)).toEqual({
      raw: 'bg-[color(display-p3_1_0.5_0)]',
      prefix: 'bg',
      value: 'color(display-p3 1 0.5 0)',
      slash: undefined,
      customProperty: false,
      arbitrary: true,
      arbitraryType: 'color',
      arbitraryValue: 'display-p3 1 0.5 0',
      numeric: false,
      preset: false,
      negative: false,
      important: false,
    });
  });
});
