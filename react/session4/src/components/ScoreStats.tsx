import { useMemo } from 'react'
import { useInterns, type Intern } from '../contexts/intern-context'

interface ScoreStatsData {
  highest: number
  lowest: number
  average: number
  passing: number
}

interface ScoreStatsViewProps extends ScoreStatsData {
  total: number
}

export function calculateScoreStats(
  interns: Pick<Intern, 'score'>[]
): ScoreStatsData {
  const scores = interns.map((intern) => intern.score)

  return {
    highest: scores.length > 0 ? Math.max(...scores) : 0,

    lowest: scores.length > 0 ? Math.min(...scores) : 0,

    average:
      scores.length > 0
        ? Math.round(
            scores.reduce((sum, score) => sum + score, 0) /
              scores.length
          )
        : 0,

    passing: interns.filter((intern) => intern.score >= 50).length,
  }
}

export function ScoreStatsView({
  highest,
  lowest,
  average,
  passing,
  total,
}: ScoreStatsViewProps) {
  return (
    <div
      style={{
        padding: '12px',
        background: '#f9f9f9',
        marginBottom: '12px',
      }}
    >
      <h2>Score Statistics</h2>

      <p>
        Highest: {highest} | Lowest: {lowest} | Average: {average}
      </p>

      <p>
        Passing: {passing} of {total}
      </p>
    </div>
  )
}

function ScoreStats() {
  const { interns } = useInterns()

  // Without useMemo, these calculations would run on every render,
  // even when the interns data hasn't changed. This is wasteful because
  // expensive calculations are repeated unnecessarily. useMemo caches
  // the result and recalculates only when the interns array changes.
  const stats = useMemo(() => {
    console.log('Recalculating stats...')

    return calculateScoreStats(interns)
  }, [interns])

  return (
    <ScoreStatsView
      highest={stats.highest}
      lowest={stats.lowest}
      average={stats.average}
      passing={stats.passing}
      total={interns.length}
    />
  )
}

export default ScoreStats

// Container/presentational finding:
// ScoreStats is the container because it reads context with useInterns().
// ScoreStatsView is presentational because every value it renders arrives
// through props, making it simple to test without mocking the provider.
