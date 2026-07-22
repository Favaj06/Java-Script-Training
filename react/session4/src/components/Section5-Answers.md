/*
Task 5.1

Coverage Report

Statements : 87.80%
Branches   : 82.35%
Functions  : 85.00%
Lines       : 89.04%

The lowest coverage is Branch Coverage (82.35%).
This indicates that some conditional paths in the code have not
been executed during testing.
*/

/*
Task 5.2

The file with partial (yellow) branch coverage is
intern-context.tsx.

The uncovered branch is:

if (!context)

This condition is never tested because every test
uses InternProvider.

To execute the missing branch, call useInterns()
without wrapping it inside InternProvider.
This causes the hook to throw the expected error.
*/

/*
Task 5.3

After adding the test, the branch coverage increased because
the previously uncovered error branch in useInterns() was executed.

The change mainly affected intern-context.tsx.
Other files did not change because the new test only covered
this specific branch.
*/

