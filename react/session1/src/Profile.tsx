// TSX expressions inside {} are evaluated and rendered.
// Statements like if and for cannot be used directly because TSX expects an expression that returns a value.
function Profile() {
  const name: string = 'Rahul'
  const role: string = 'Intern'
  const score: number = 92
  const joinDate: string = '2026-06-30'

  // Expressions in TSX attributes
  const avatarUrl: string = 'https://i.pravatar.cc/100'
  const altText: string = `Avatar of ${name}`

  return (
    <div>
      <img src={avatarUrl} alt={altText} width={100} />

      <h2>{name}</h2>

      <p>Role: {role}</p>

      <p>Score: {score} / 100</p>

      <p>Name uppercase: {name.toUpperCase()}</p>

      <p>Score doubled: {score * 2}</p>

      <p>Joined: {new Date(joinDate).toDateString()}</p>

      {/* width={100} passes a number, while width="100" passes a string.
          Use {} when passing JavaScript values such as numbers, variables, or expressions. */}
    </div>
  )
}

export default Profile

{/* width={100} passes a number, while width="100" passes a string.
    Curly braces {} allow JavaScript values such as numbers,
    variables, and expressions to be passed as props. */}