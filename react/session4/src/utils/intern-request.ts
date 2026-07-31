export interface InternPayloadInput {
  name: string
  score: number
  role: string
  isPresent: boolean
}

export function prepareInternPayload(intern: InternPayloadInput): {
  method: string
  body: string
} {
  return {
    method: 'POST',
    body: JSON.stringify(intern),
  }
}
