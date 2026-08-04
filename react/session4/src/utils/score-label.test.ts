import { describe, it, expect } from "vitest";
import { getScoreLabel } from "./score-label";

describe("getScoreLabel", () => {
  it("returns 'Fail' when score is 45", () => {
    expect(getScoreLabel(45)).toBe("Fail");
  });

  it("returns 'Pass' when score is 92", () => {
    expect(getScoreLabel(92)).toBe("Pass");
  });
});