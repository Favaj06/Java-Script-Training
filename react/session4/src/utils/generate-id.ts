export function generateInternId(
  generateNumber: () => number = () => Date.now(),
  generateSuffix: () => number = () => Math.random()
): string {
  return `intern-${generateNumber()}-${generateSuffix()}`
}
