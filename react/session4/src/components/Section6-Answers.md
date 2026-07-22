# Section 6 – FIRST Principles Audit

## FIRST Principles Audit

| File | Fast? | Independent? | Repeatable? | Self-validating? | Timely? |
|------|:-----:|:------------:|:-----------:|:----------------:|:-------:|
| useInternForm.test.ts | Yes | Yes | Yes | Yes | Yes |
| InternCard.test.tsx | N/A (Not available in this project) | N/A | N/A | N/A | N/A |
| ScoreStats.test.tsx (used instead of SummaryBar.test.ts) | Yes | Yes | Yes | Yes | Yes |

## Task 6.1

The original ScoreStats test verified one long string containing
the highest, lowest, and average scores. This made the test
fragile because a small formatting change could cause it to fail.

The improved version checks the important behaviour using
separate assertions. This makes the test easier to understand,
maintain, and debug.

The FIRST principle that was partially improved is
Self-validating because the assertions are clearer and
more focused.