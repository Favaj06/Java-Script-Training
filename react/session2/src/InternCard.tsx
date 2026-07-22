/*interface InternCardProps {
  name: string
  score: number
  isPresent: boolean
}

function InternCard({ name, score, isPresent }: InternCardProps) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>Score: {score} / 100</p>
      <p>{isPresent ? "Present" : "Absent"}</p>
    </div>
  )
}

export default InternCard
*/
// Defining the interface separately improves readability, allows reuse,
// and keeps the component cleaner. If multiple components use the same
// props, the interface can be reused without rewriting the types.


//task 5:
import Avatar from "./Avatar";
import Badge from "./Badge";
import ScoreBar from "./ScoreBar";

interface InternCardProps {
  name: string;
  score: number;
  isPresent: boolean;
  role: string;
}

function InternCard({
  name,
  score,
  isPresent,
  role,
}: InternCardProps) {
  return (
    <div className="card">
      <Avatar name={name} />

      <h2>{name}</h2>

      <ScoreBar score={score} />

      <div
        style={{
          display: "flex",
          gap: "6px",
          marginTop: "10px",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Badge label={role} color="#4f46e5" />

        <Badge
          label={isPresent ? "Present" : "Absent"}
          color={isPresent ? "green" : "#e53e3e"}
        />

        {score >= 90 && (
          <Badge
            label="Top Performer"
            color="#d97706"
          />
        )}
      </div>
    </div>
  );
}

export default InternCard;

// The Badge component is reusable because it can display different
// labels and colors without repeating the same <span> element.
// This makes the code cleaner, easier to maintain, and reusable.