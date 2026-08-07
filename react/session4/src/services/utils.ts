/*
Section 4.1 — Audit utils.ts

Internal helper functions are used only within the services module.
They should not be exported because callers outside services do not
need access to them.
*/

function formatDate(date: Date): string {
  return date.toISOString();
}

function validateScore(score: number): boolean {
  return score >= 0 && score <= 100;
}

function buildApiUrl(path: string): string {
  return `/api/${path}`;
}