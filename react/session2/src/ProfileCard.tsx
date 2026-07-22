/*
interface ProfileCardProps {
  name?: string
  role?: string
  score?: number
}

function ProfileCard({
  name = "Unknown",
  role = "Intern",
  score = 0,
}: ProfileCardProps) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>Role: {role}</p>
      <p>Score: {score}</p>
    </div>
  )
}

export default ProfileCard
*/
// The '?' makes a prop optional, meaning it doesn't have to be passed.
// If an optional prop is not provided, the default parameter value
// is used instead. This prevents undefined values and keeps the component safe.


// task 2.1
/*
interface ProfileCardProps {
  name?: string
  role?: string
  score?: number
  skills?: string[]
}

function ProfileCard({
  name = "Unknown",
  role = "Intern",
  score = 0,
  skills = [],
}: ProfileCardProps) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>Role: {role}</p>
      <p>Score: {score}</p>

      {skills.length > 0 && (
        <ul>
          {skills.map((skill: string, index: number) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ProfileCard
*/
// If the default value 'skills = []' is removed, TypeScript reports:
// "Object is possibly 'undefined'."
// This happens because skills is optional and may not exist.
// Providing an empty array as the default ensures it is always safe
// to use array methods like .length and .map().

//task 2.2
interface ProfileCardProps {
  name?: string
  role?: string
  score?: number
  skills?: string[]
}

function ProfileCard({
  name = "Unknown",
  role = "Intern",
  score = 0,
  skills = [],
}: ProfileCardProps) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>Role: {role}</p>
      <p>Score: {score}</p>

      {skills.length > 0 && (
        <ul>
          {skills.map((skill: string, index: number) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default ProfileCard

// If the default value 'skills = []' is removed, TypeScript reports:
// "Object is possibly 'undefined'."
// This happens because skills is optional and may not exist.
// Providing an empty array as the default ensures it is always safe
// to use array methods like .length and .map().