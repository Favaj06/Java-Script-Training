/*interface Intern {
  id: number
  name: string
  score: number
  isPresent: boolean
  skills: string[]
}

interface InternProfileProps {
  intern: Intern
}

function InternProfile({ intern }: InternProfileProps) {
  return (
    <div className="card">
      <h2>{intern.name}</h2>
      <p>Score: {intern.score}</p>
      <p>{intern.isPresent ? "Present" : "Absent"}</p>

      <ul>
        {intern.skills.map((skill: string, index: number) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </div>
  )
}

export default InternProfile
*/
// Defining a separate Intern interface makes the data structure reusable.
// If multiple components need intern information, they can all use the same
// interface instead of repeating the property definitions, making the code
// easier to maintain.

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
          marginTop: "8px",
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
// labels and colors without rewriting the same <span> element.
// This reduces duplicate code, improves readability, and makes
// future changes easier since updates are made in one place.