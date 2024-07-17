import compile from "../src/lib/Compiler";
import Runge_Kutta from "../src/lib/Runge-Kutta";
import { describe, test, expect } from "vitest";

function checkEquality(tab1, tab2) {
  for (let i = 0; i < tab1.length; ++i) {
    if (Math.abs(tab1[i] - tab2[i]) >= 0.0001) {
      return false;
    }
  } return true;
}

describe("Test cases for Runge-Kutta approximation", () => {
  test("Testing case with integer step-size", () => {
    const fn = compile("y");
    const tab = Runge_Kutta(fn, 0, 1, 4, 1);
    const x_table = [0, 1, 2, 3, 4];
    const y_table = [1, 2.7083, 7.3351, 19.8658, 53.8032];
    expect(checkEquality(tab[0], x_table)).toBe(true);
    expect(checkEquality(tab[1], y_table)).toBe(true);
  });

  test("Testing case for integer step-size", () => {
    const fn = compile("2 * t + y");
    const tab = Runge_Kutta(fn, 0, 1, 8, 1);
    const x_table = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const y_table = [1, 4.125, 16.0052, 51.5974, 151.4097, 425.1514, 1169.9516,
      3190.5356, 8666.3671];
    expect(checkEquality(tab[0], x_table)).toBe(true);
    expect(checkEquality(tab[1], y_table)).toBe(true);
  });

  test("Testing case for non-integer step-size", () => {
    const fn = compile("2 * t * y");
    const tab = Runge_Kutta(fn, 0, 1, 2.0, 0.2);
    const x_table = [0, 0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.6, 1.8, 2.0];
    const y_table = [1, 1.0408, 1.1735, 1.4333, 1.8964, 2.7181, 4.2199, 7.0966,
      12.9256, 25.4955, 54.4539];
    expect(checkEquality(tab[0], x_table)).toBe(true);
    expect(checkEquality(tab[1], y_table)).toBe(true);
  });

  test("Testing case for non-integer step-size", () => {
    const fn = compile("2 + t + y");
    const tab = Runge_Kutta(fn, 0, 1, 1.0, 0.1);
    const x_table = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0];
    const y_table = [1, 1.3207, 1.6856, 2.0994, 2.5673, 3.0949, 3.6885, 4.3550,
      5.1022, 5.9384, 6.8731];
    expect(checkEquality(tab[0], x_table)).toBe(true);
    expect(checkEquality(tab[1], y_table)).toBe(true);
  });

  test("Testing case for polynomial function", () => {
    const fn = compile("1 + t ^ 2 + 2 * t");
    const tab = Runge_Kutta(fn, 0, 1, 5, 1);
    const x_table = [0, 1, 2, 3, 4, 5];
    const y_table = [1, 3.3333, 9.6666, 22, 42.3333, 72.6666];
    expect(checkEquality(tab[0], x_table)).toBe(true);
    expect(checkEquality(tab[1], y_table)).toBe(true);
  });

  test("Testing case for higher order polynomial function", () => {
    const fn = compile("t ^ 4 + 3 * t^ 3 - 6 * t ^ 2 - 4");
    const tab = Runge_Kutta(fn, 0, 1, 8, 1);
    const x_table = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const y_table = [1, -4.0416, -4.5833, 44.375, 253.8333, 824.7916, 2072.25,
      4449.2083, 8570.6666];
    expect(checkEquality(tab[0], x_table)).toBe(true);
    expect(checkEquality(tab[1], y_table)).toBe(true);
  });

  test("Testing case for trigonometric function", () => {
    const fn = compile("sin t - cos y");
    const tab = Runge_Kutta(fn, 0, 1, 5, 0.5);
    const x_table = [0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0];
    const y_table = [1, 0.8083, 0.7922, 0.9325, 1.1695, 1.4199, 1.5795, 1.5292,
      1.1482, 0.3626, -0.6077];
    expect(checkEquality(tab[0], x_table)).toBe(true);
    expect(checkEquality(tab[1], y_table)).toBe(true);
  });

  test("Testing case for exponential function", () => {
    const fn = compile("e^ (0 - t ^ 2) - 2 * e ^ (0 - y)");
    const tab = Runge_Kutta(fn, 0, 1, 2.5, 0.5);
    const x_table = [0, 0.5, 1.0, 1.5, 2.0, 2.5];
    const y_table = [1, 1.1159, 1.0726, 0.7954, 0.2343, -1.2987];
    expect(checkEquality(tab[0], x_table)).toBe(true)
    expect(checkEquality(tab[1], y_table)).toBe(true);
  });

  test("Testing case for composite function", () => {
    const fn = compile("e ^ (sin t)");
    const tab = Runge_Kutta(fn, 0, -1, 8, 1);
    const x_table = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const y_table = [-1, 0.6301, 3.2381, 5.0567, 5.7962, 6.1891, 6.7083,
      7.9824, 10.4555];
    expect(checkEquality(tab[0], x_table)).toBe(true);

    expect(checkEquality(tab[1], y_table)).toBe(true);
  });

  test("Testing case for composite function", () => {
    const fn = compile("t + sin y * e ^ (0 - t)");
    const tab = Runge_Kutta(fn, 0, 2, 8, 1);
    const x_table = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    const y_table = [2, 3.4755, 5.8197, 8.8834, 12.7047, 17.3727, 22.9562,
      29.4963, 37.0151];
    expect(checkEquality(tab[0], x_table)).toBe(true);
    expect(checkEquality(tab[1], y_table)).toBe(true);
  });
});