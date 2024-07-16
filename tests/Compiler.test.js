import compile from "../src/lib/Compiler";
import { describe, test, it, expect } from "vitest";

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

/* sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  log: (n, base) => Math.log(n) / Math.log(base),
  arcsin: Math.asin,
  arccos: Math.acos,
  arctan: Math.atan,
  sinh: Math.sinh,
  cosh: Math.cosh,
  tanh: Math.tanh,
  sqrt: Math.sqrt,
  pi: Math.PI,
  e: Math.E, */

describe("Testing environment-built functions", () => {


});