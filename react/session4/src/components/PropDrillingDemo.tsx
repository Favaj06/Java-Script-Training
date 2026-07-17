interface User {
  name: string
  isAdmin: boolean
}

// Grandchild — actually uses the user
function UserBadge({ user }: { user: User }) {
  return (
    <div>
      <p>Logged in as: {user.name}</p>
      {user.isAdmin && <span>Admin</span>}
    </div>
  )
}

// Middle component — receives user only to pass it down, never uses it
// This is prop drilling. The component doesn't use the user data itself;
// it only forwards it to UserBadge. If the User interface gets a new field,
// this component may also need to update its props even though it doesn't use that field.
function InternCard({ user }: { user: User }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '8px' }}>
      <p>Intern Card Content</p>
      <UserBadge user={user} />
    </div>
  )
}

// Parent — passes user down to InternCard
// This component also participates in prop drilling by passing the user
// through to child components without using it. As the User interface grows,
// every intermediate component must continue passing the updated object,
// making the code harder to maintain.
function InternList({ user }: { user: User }) {
  return (
    <div>
      <InternCard user={user} />
      <InternCard user={user} />
    </div>
  )
}

// Top level — owns the user
function PropDrillingDemo() {
  const user: User = { name: 'Rahul', isAdmin: true }
  return <InternList user={user} />
}

export default PropDrillingDemo