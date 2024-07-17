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

describe("Test cases for Euler approximation", () => {
  test("Testing case with integer step-size", () => {

  });
});