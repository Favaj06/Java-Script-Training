import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ScoreBadge from "./ScoreBadge";

describe("ScoreBadge", () => {
  it("renders 'Pass' when score is 92", () => {
    render(<ScoreBadge score={92} />);
    expect(screen.getByText("Pass")).toBeInTheDocument();
  });

  it("renders 'Fail' when score is 45", () => {
    render(<ScoreBadge score={45} />);
    expect(screen.getByText("Fail")).toBeInTheDocument();
  });
});