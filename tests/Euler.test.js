import compile from "../src/lib/Compiler";
import Euler from "../src/lib/Euler";
import { describe, test, expect } from "vitest";

function checkEquality(tab1, tab2) {
  for (let i = 0; i < tab1.length; ++i) {
    if (Math.abs(tab1[i] - tab2[i]) >= 0.0001) {
      return false;
    }
  } return true;
}

describe("Test cases for Euler approximation", () => {
  test("Testing case with integer step-size", () => {
    const fn = compile("y");
    const tab = Euler(fn, 0, 1, 4, 1);
    const x_table = [0, 1, 2, 3, 4];
    const y_table = [1, 2, 4, 8, 16];
    expect(tab[0]).toEqual(x_table);
    expect(tab[1]).toEqual(y_table);
  });

  test("Testing case for integer step-size", () => {
    const fn = compile("2 * t + y");
    const tab = Euler(fn, 0, 1, 8, 1);
    const x_table = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const y_table = [1, 2, 6, 16, 38, 84, 178, 368, 750];
    expect(tab[0]).toEqual(x_table);
    expect(tab[1]).toEqual(y_table);
  });

  test("Testing case for non-integer step-size", () => {
    const fn = compile("2 * t * y");
    const tab = Euler(fn, 0, 1, 2.0, 0.2);
    const x_table = [0, 0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.6, 1.8, 2.0];
    const y_table = [1, 1, 1.08, 1.2528, 1.5534, 2.0505, 2.8708, 4.2488,
      6.6281, 10.8702, 18.6967];
    expect(checkEquality(tab[0], x_table)).toBe(true);
    expect(checkEquality(tab[1], y_table)).toBe(true);
  });

  test("Testing case for non-integer step-size", () => {
    const fn = compile("2 + t + y");
    const tab = Euler(fn, 0, 1, 1.0, 0.1);
    const x_table = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
    const y_table = [1, 1.3, 1.64, 2.024, 2.4564, 2.9420, 3.4862, 4.0948,
      4.7743, 5.5318, 6.3749];
    expect(checkEquality(tab[0], x_table)).toBe(true);
    expect(checkEquality(tab[1], y_table)).toBe(true);
  });

  test("Testing case for polynomial function", () => {
    const fn = compile("1 + t ^ 2 + 2 * t");
    const tab = Euler(fn, 0, 1, 5, 1);
    const x_table = [0, 1, 2, 3, 4, 5];
    const y_table = [1, 2, 6, 15, 31, 56];
    expect(checkEquality(tab[0], x_table)).toBe(true);
    expect(checkEquality(tab[1], y_table)).toBe(true);
  });

  test("Testing case for higher order polynomial function", () => {
    const fn = compile("t ^ 4 + 3 * t^ 3 - 6 * t ^ 2 - 4");
    const tab = Euler(fn, 0, 1, 8, 1);
    const x_table = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const y_table = [1, -3, -9, 3, 107, 455, 1301, 3025, 6157];
    expect(checkEquality(tab[0], x_table)).toBe(true);
    expect(checkEquality(tab[1], y_table)).toBe(true);
  });

  test("Testing case for trigonometric function", () => {
    const fn = compile("sin t - cos y");
    const tab = Euler(fn, 0, 1, 5, 0.5);
    const x_table = [0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0];
    const y_table = [1, 0.7298, 0.5969, 0.6041, 0.6914, 0.7608, 0.6979, 0.3854,
      -0.2533, -1.1157, -1.8243];
    expect(checkEquality(tab[0], x_table)).toBe(true);
    expect(checkEquality(tab[1], y_table)).toBe(true);
  });

  test("Testing case for exponential function", () => {
    const fn = compile("e^ (0 - t ^ 2) - 2 * e ^ (0 - y)");
    const tab = Euler(fn, 0, 1, 4.5, 0.5);
    const x_table = [0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5];
    const y_table = [1, 1.1321, 1.1992, 1.0817, 0.7953, 0.3531, -0.3484,
      -1.7653, -7.6091, -2024.1121];
    expect(checkEquality(tab[0], x_table)).toBe(true);
    expect(checkEquality(tab[1], y_table)).toBe(true);
  });

  test("Testing case for composite function", () => {
    const fn = compile("e ^ (sin t) + (cos y) ^ t");
    const tab = Euler(fn, 0, -1, 8, 1);
    const x_table = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const y_table = [-1, 1, 3.8601, 6.9094, 8.5929, 9.2678, 8.7111, 9.6539,
      10.7522];
    expect(checkEquality(tab[0], x_table)).toBe(true);
    expect(checkEquality(tab[1], y_table)).toBe(true);
  });

  test("Testing case for composite function", () => {
    const fn = compile("t + sin y * e ^ (0 - t)");
    const tab = Euler(fn, 0, 2, 8, 1);
    const x_table = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const y_table = [2, 2.9093, 4.7866, 7.3901, 10.7497, 14.9454, 20.0459,
      26.0956, 33.1194];
    expect(checkEquality(tab[0], x_table)).toBe(true);
    expect(checkEquality(tab[1], y_table)).toBe(true);
  });
});