/* playwright activity 1
import { useInterns } from '../contexts/intern-context'
import useInternSearch from '../hooks/useInternSearch'

function InternSearch() {
  const { interns } = useInterns()

  const {
    search,
    setSearch,
    filtered,
    stats,
  } = useInternSearch(interns)

  return (
    <div>

      <h2>Search Intern</h2>

      <input
        type="text"
        placeholder="Search interns..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <hr />

      <h3>Statistics</h3>

      <p>Total Interns : {stats.total}</p>

      <p>Present : {stats.present}</p>

      <p>Average Score : {stats.avg}</p>

      <hr />

      <h3>Filtered Interns</h3>

      {filtered.length === 0 ? (
        <p>No Intern Found</p>
      ) : (
        filtered.map((intern) => (
          <div
            key={intern.id}
            style={{
              border: '1px solid gray',
              margin: '10px',
              padding: '10px',
            }}
          >
            <h4>{intern.name}</h4>

            <p>Role : {intern.role}</p>

            <p>Score : {intern.score}</p>

            <p>
              Status : {intern.isPresent ? 'Present' : 'Absent'}
            </p>
          </div>
        ))
      )}

    </div>
  )
}

export default InternSearch
*/
import { useInterns } from '../contexts/intern-context'
import useInternSearch from '../hooks/useInternSearch'

function InternSearch() {
  const { interns } = useInterns()

  const {
    search,
    setSearch,
    filtered,
    stats,
  } = useInternSearch(interns)

  return (
    <div>

      <h2>Search Intern</h2>

      <label>
        Search
        <input
          type="text"
          placeholder="Search interns..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </label>

      <hr />

      <h3>Statistics</h3>

      <p>Total Interns : {stats.total}</p>

      <p>Present : {stats.present}</p>

      <p>Average Score : {stats.avg}</p>

      <hr />

      <h3>Filtered Interns</h3>

      {filtered.length === 0 ? (
        <p>No Intern Found</p>
      ) : (
        filtered.map((intern) => (
          <div
            key={intern.id}
            style={{
              border: '1px solid gray',
              margin: '10px',
              padding: '10px',
            }}
          >
            <h4>{intern.name}</h4>

            <p>Role : {intern.role}</p>

            <p>Score : {intern.score}</p>

            <p>
              Status : {intern.isPresent ? 'Present' : 'Absent'}
            </p>
          </div>
        ))
      )}

    </div>
  )
}

export default InternSearch
