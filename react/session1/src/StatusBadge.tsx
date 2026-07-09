function StatusBadge() {
  const isAdmin: boolean = true
  const hasWarning: boolean = false
  const isVerified: boolean = true
  const messages: string[] = ['Assignment submitted', 'PR created']

  return (
    <div>
      {/* Show only if admin */}
      {isAdmin && <span>Admin</span>}

      <br />

      {/* Show only if warning */}
      {hasWarning && (
        <p style={{ color: 'orange' }}>
          Warning: incomplete tasks
        </p>
      )}

      {/* Show only if verified */}
      {isVerified && <span>Verified</span>}

      {/* Show empty state only when no messages */}
      {messages.length === 0 && <p>No messages yet</p>}

      {/* Show list only when messages exist */}
      {messages.length > 0 && (
        <ul>
          {messages.map((msg: string, i: number) => (
            <li key={i}>{msg}</li>
          ))}
        </ul>
      )}

      {/*
        If we use {messages.length && ...} and the array is empty,
        React renders 0 because messages.length is 0.
        Using messages.length > 0 prevents 0 from appearing.
      */}
    </div>
  )
}

export default StatusBadge