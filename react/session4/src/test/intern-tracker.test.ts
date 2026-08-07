import { beforeEach, describe, expect, it } from "vitest";
import { InternTracker } from "../services/intern-tracker";

describe("InternTracker.updateScore", () => {
  let tracker: InternTracker;

  beforeEach(() => {
    tracker = new InternTracker();
  });

  it("throws RangeError if score is out of 0–100 range", () => {
    expect(() => tracker.updateScore(1, -1)).toThrow(RangeError);
    expect(() => tracker.updateScore(1, 101)).toThrow(RangeError);
  });

  it("throws if the intern does not exist", () => {
    expect(() => tracker.updateScore(999, 80)).toThrow(
      "Intern not found"
    );
  });

  it("updates the score without exposing internal state", () => {
    tracker.updateScore(1, 95);

    const intern = tracker.getById(1);

    expect(intern?.score).toBe(95);
  });
});

/*
Section 3 Notes

The updateScore() method validates the score before updating.
It throws a RangeError for invalid scores and an Error if the intern
does not exist.

The tests use only the public interface:
- updateScore()
- getById()
- getAll()

The private #interns field is never accessed directly,
so encapsulation is preserved.
*/