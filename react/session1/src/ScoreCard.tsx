function ScoreCard() {
  const name: string = "Priya"
  const score: number = 90

  return (
    <div>
      <h2>{name}</h2>

      {/* Render different text */}
      <p>{score >= 50 ? "Pass" : "Fail"}</p>

      {/* Render different styles */}
      <p
        style={{
          color: score >= 50 ? "green" : "red",
        }}
      >
        Score: {score}
      </p>

      {/* Render different elements */}
      {score >= 90 ? (
        <span>Top Performer</span>
      ) : (
        <span>Keep it up!</span>
      )}
    </div>
  )
}

export default ScoreCard