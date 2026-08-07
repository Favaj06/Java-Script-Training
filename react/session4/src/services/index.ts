/*
Section 4.2 — Barrel File

Re-export only the public members that callers outside the services
module need.

Do NOT re-export internal helper functions from utils.ts.
*/

export {
  createIntern,
  validateInternForm,
  calculateAverageScore,
  getScoreLabel,
  filterInterns,
} from "./intern-service";