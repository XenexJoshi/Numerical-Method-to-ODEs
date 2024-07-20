import compile from "../src/lib/Compiler";
import Adams_Bashforth from "../src/lib/Adams-Bashforth";
import { describe, test, expect } from "vitest";

function checkEquality(tab1, tab2) {
  for (let i = 0; i < tab1.length; ++i) {
    if (Math.abs(tab1[i] - tab2[i]) >= 0.0001) {
      return false;
    }
  } return true;
}

describe("Test cases for Adams-Bashforth approximation", () => {
  test("Testing case with integer step-size", () => {
    const fn = compile("2 * t - y");
    let tab = Adams_Bashforth(fn, 0, 1, 5, 1);
    let x_table = [0, 1, 2, 3, 4, 5];
    let y_table = [1, 1.125, 2.4219, 4.1582, 6.2234, 7.8719];
    expect(checkEquality(tab[0], x_table)).toBe(true);
    expect(checkEquality(tab[1], y_table)).toBe(true);
  });

  test("Testing case for integer step-size", () => {
    const fn = compile("y + sin t");
    let tab = Adams_Bashforth(fn, 0, 1, 8, 1);
    let x_table = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    let y_table = [1, 3.3679, 10.7394, 30.1745, 77.1259, 193.9924,
      490.9884, 1247.3566, 3170.0164];
    expect(checkEquality(tab[0], x_table)).toBe(true);
    expect(checkEquality(tab[1], y_table)).toBe(true);
  });

  test("Testing case for non-integer step-size", () => {
    const fn = compile("1 - t + 4 * y");
    let tab = Adams_Bashforth(fn, 0, 1, 0.4, 0.1);
    let x_table = [0, 0.1, 0.2, 0.3, 0.4];
    let y_table = [1, 1.6089, 2.5050, 3.8294, 5.7836];
    expect(checkEquality(tab[0], x_table)).toBe(true);
    expect(checkEquality(tab[1], y_table)).toBe(true);
  });

  test("Testing case for non-integer step-size", () => {
    const fn = compile("10 - y - 3 * t");
    let tab = Adams_Bashforth(fn, 0, 1, 1.0, 0.1);
    let x_table = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
    let y_table = [1, 1.8420, 2.5752, 3.2102, 3.7561, 4.2216, 4.6142, 4.9409,
      5.2079, 5.4210, 5.5853];
    expect(checkEquality(tab[0], x_table)).toBe(true);
    expect(checkEquality(tab[1], y_table)).toBe(true);
  });

  test("Testing case for polynomial function", () => {
    const fn = compile("t ^ 2 - t + 4 - y");
    let tab = Adams_Bashforth(fn, 0, 1, 1.0, 0.2);
    let x_table = [0, 0.2, 0.4, 0.6, 0.8, 1.0];
    let y_table = [1, 1.5276, 1.9381, 2.2671, 2.5436, 2.7921];
    expect(checkEquality(tab[0], x_table)).toBe(true);
    expect(checkEquality(tab[1], y_table)).toBe(true);
  });

  test("Testing case for higher order polynomial function", () => {
    const fn = compile("0 - y ^ 3 + y ^ 2 - y + t ^ 4 + t ^ 2");
    let tab = Adams_Bashforth(fn, 0, 1, 1.0, 0.2);
    let x_table = [0, 0.2, 0.4, 0.6, 0.8, 1.0];
    let y_table = [1, 0.8342, 0.7264, 0.6805, 0.7220, 0.8882];
    expect(checkEquality(tab[0], x_table)).toBe(true);
    expect(checkEquality(tab[1], y_table)).toBe(true);
  });

  test("Testing case for trigonometric function", () => {
    const fn = compile("tan y - arcsin t - 2");
    let tab = Adams_Bashforth(fn, -1, 1, 1.0, 0.2);
    let x_table = [-1.0, -0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8, 1.0];
    let y_table = [1, 1.2502, 1.4581, 1.0533, -2.0332, 0.1396, -1.3237,
      -3.1842, -1.8663, -2.1272, -3.3418];
    expect(checkEquality(tab[0], x_table)).toBe(true);
    expect(checkEquality(tab[1], y_table)).toBe(true);
  });

  test("Testing case for exponential function", () => {
    const fn = compile("e ^ (0 - t ^ 2 + t) - e ^ (0 - y)");
    let tab = Adams_Bashforth(fn, 0, 2, 2.0, 0.2);
    let x_table = [0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0];
    let y_table = [2, 2.1936, 2.4196, 2.6598, 2.8917, 3.0983, 3.2680, 3.3963,
      3.4852, 3.5415, 3.5733];
    expect(checkEquality(tab[0], x_table)).toBe(true);
    expect(checkEquality(tab[1], y_table)).toBe(true);
  });

  test("Testing case for composite function", () => {
    const fn = compile("e ^ (0 - sin y) - arctan y + sin t * y");
    let tab = Adams_Bashforth(fn, 0, 1, 8, 1);
    let x_table = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    let y_table = [1, 1.1165, 1.3562, 0.9085, 2.3878, -0.1291, 3.5902,
      2.2403, 0.3622];
    expect(checkEquality(tab[0], x_table)).toBe(true);
    expect(checkEquality(tab[1], y_table)).toBe(true);
  });

  test("Testing case for composite function", () => {
    const fn = compile("e ^ (0 - 4 + sin y) - ln y + arctan y * t + 3");
    let tab = Adams_Bashforth(fn, 0, 1, 0.8, 0.1);
    let x_table = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8];
    let y_table = [1, 1.2969, 1.5868, 1.8778, 2.1732, 2.4730, 2.7753,
      3.0783, 3.3805];
    expect(checkEquality(tab[0], x_table)).toBe(true);
    expect(checkEquality(tab[1], y_table)).toBe(true);
  });
});