export interface InternLike {
  name: string
  role: string
}

export function filterInterns<T extends InternLike>(
  interns: T[],
  searchTerm: string
): T[] {
  const normalizedTerm = searchTerm.trim().toLowerCase()

  if (!normalizedTerm) {
    return interns
  }

  return interns.filter((intern) => {
    const name = intern.name.toLowerCase()
    const role = intern.role.toLowerCase()

    return name.includes(normalizedTerm) || role.includes(normalizedTerm)
  })
}
