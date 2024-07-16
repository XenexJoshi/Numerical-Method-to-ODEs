import compile from "../src/lib/Compiler";
import { describe, test, expect } from "vitest";

describe("Testing mathematical computations", () => {
  test("Testing literals", () => {
    const fn = compile("100");
    expect(fn()).toBe(100);
  });

  test("Testing parsing with trimming", () => {
    const fn = compile(" 10    ");
    expect(fn()).toBe(10);
  });

  test("Testing addition and subtraction", () => {
    const fn = compile("10 + 2 - 3");
    expect(fn()).toBe(9);
  });

  test("Testing multiplication and division", () => {
    const fn = compile("7 * 6 / 2");
    expect(fn()).toBe(21);
  });

  test("Testing exponentiation", () => {
    const fn = compile("2 ^ 2 ^ 2");
    expect(fn()).toBe(16);
  });

  test("Testing parenthesis", () => {
    const fn = compile("(3 + 2 * (2 - 2))");
    expect(fn()).toBe(3);
  });

  test("Testing order of operations", () => {
    const fn = compile("10 + ((2 ^ 2) - 1) * 2");
    expect(fn()).toBe(16);
  })
});

describe("Testing environment-built global functions", () => {
  test("Testing global sine function", () => {
    const fn = compile('sin 2 * t');
    expect(fn({ t: 1 })).toBe(Math.sin(2));
  });

  test("Testing global cosine function", () => {
    const fn = compile("cos 2 * (t + 1)");
    expect(fn({ t: 2 })).toBe(Math.cos(6));
  });

  test("Testing global tangent function", () => {
    const fn = compile("(tan x) ^ 2");
    expect(fn({ x: 1 })).toBe(Math.tan(1) ** 2);
  });

  test("Testing global natural log function", () => {
    const fn = compile("ln x");
    expect(fn({ x: 1 })).toBe(0);
    expect(fn({ x: 2 })).toBe(Math.log(2));
  });

  test("Testing global inverse sine function", () => {
    const fn = compile("arcsin x");
    expect(fn({ x: 0 })).toBe(0);
    expect(fn({ x: 1 })).toBe(Math.asin(1));
  });

  test("Testing global inverse cosine function", () => {
    const fn = compile("arccos 2 * x");
    expect(fn({ x: 0 })).toBe(Math.acos(0));
    expect(fn({ x: 0.5 })).toBe(0);
  });

  test("Testing global inverse arctangent function", () => {
    const fn = compile("arctan x");
    expect(fn({ x: 0 })).toBe(0);
    expect(fn({ x: 1 })).toBe(Math.atan(1));
  });

  test("Testing global hyperbolic sine function", () => {
    const fn = compile("sinh x");
    expect(fn({ x: 1 })).toBe(Math.sinh(1));
  });

  test("Testing global hyperbolic cosine function", () => {
    const fn = compile("cosh 3 * x");
    expect(fn({ x: 1 })).toBe(Math.cosh(3));
  });

  test("Testing global hyperbolic tangent function", () => {
    const fn = compile("tanh x ^ (0 - 1)");
    expect(fn({ x: 2 })).toBe(Math.tanh(0.5));
  });

  test("Testing global square root function", () => {
    const fn = compile("sqrt 100 ^ x");
    expect(fn({ x: 2 })).toBe(100);
    expect(fn({ x: 1 })).toBe(Math.sqrt(100));
  });

  test("Testing global constant pi", () => {
    const fn = compile("pi");
    expect(fn({ x: 1 })).toBe(Math.PI);
  });

  test("Testing global constant Euler's number", () => {
    const fn = compile("e ^ (0 - 2)");
    expect(fn({ x: 1 })).toBe(1 / (Math.E ** 2));
  })
});

describe("Testing nested complex computations", () => {
  test("", () => {
    expect(true).toBe(true);
  })
})