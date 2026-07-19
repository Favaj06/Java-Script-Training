/*
Explore 1

The verbose reporter displays the name and result of every
individual test.

Compared to the default npm test output, it provides more
detailed information about each test, making it easier to
identify which specific test passed or failed.
*/

/*
Explore 2

The branch coverage threshold was set to 80%.

If branch coverage falls below this value, Vitest reports a
coverage threshold failure.

In this project, the branch coverage is 84.31%, which is above
the configured threshold, so the coverage check passes.
*/

/*
Explore 3

When expect.hasAssertions() is used without any executed
expect() statements, Vitest throws an error stating that at
least one assertion was expected but none were executed.

This helps identify tests that accidentally perform no
meaningful verification.
*/

/*
Explore 4

In the HTML coverage report, hovering over a red line displays
information about why that line was not executed during testing.

This helps identify missing test cases and makes it easier to
improve code coverage by targeting the uncovered statements or
branches.
*/