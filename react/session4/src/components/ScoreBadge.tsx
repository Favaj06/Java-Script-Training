import { getScoreLabel } from "../utils/score-label";

interface ScoreBadgeProps {
  score: number;
}

export default function ScoreBadge({ score }: ScoreBadgeProps) {
  const label = getScoreLabel(score);

  return (
    <span
      style={{
        marginLeft: "10px",
        padding: "2px 8px",
        borderRadius: "6px",
        backgroundColor: label === "Pass" ? "green" : "red",
        color: "white",
        fontWeight: "bold",
      }}
    >
      {label}
    </span>
  );
}