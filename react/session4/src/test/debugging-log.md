## Bug 1 — Validation rejects valid score

**Reproduce:**
Enter a valid intern with name `Rahul`, score `85`, and role `Frontend`.
The form rejects the intern and displays the validation error
`Score must be 0–100`.

**Isolate:**
The bug is in `src/utils/intern-validation.ts`, inside the score
validation function.

**Root cause:**
The score upper-limit condition was incorrectly changed from
`score > 100` to `score > 10`. Therefore, valid scores greater than
10 are rejected.

**Fix:**
Change the upper limit back from `10` to `100`.

**Verify:**
Restore the condition to `score > 100`, submit an intern with score
`85`, and confirm that the intern is accepted and appears in the list.
Also test an invalid score above 100 to confirm validation still works.

## Expected vs Actual — Add Intern Form

Scenario 1 (working):
  Input:    name='Rahul', score=85, role='Frontend'
  Expected: intern is added successfully and appears in the list with
            the role label 'Frontend'
  Actual:   The intern is added successfully and appears in the list
            with the role label 'Frontend'.

Scenario 2 (hypothetical bug):
  Input:    name='', score=85
  Expected: validation error 'Name is required'
  Actual:   If this validation failed, the form might submit the intern
            with an empty name instead of showing the validation error.

**Comment:**
Writing the expected-vs-actual statement forced me to define the exact
input, expected validation behaviour, and visible result. It made me
understand the feature more precisely instead of only checking whether
the form appeared to work.

## Section 2:
## Bug 2 — Stack Trace Reading

## Task 2.1:
**Error type and message:**
TypeError: Cannot read properties of undefined (reading 'value')

**First YOUR-code line in the trace (file and line number):**
src/contexts/intern-context.tsx:[ACTUAL LINE NUMBER]

**What that line does:**
It maps over the interns array and tries to access
`intern.nonExistentNested.value`. The `nonExistentNested` property
does not exist on the intern object.

**The caller (next YOUR-code line):**
[ACTUAL CALLER FILE AND LINE NUMBER FROM THE STACK TRACE]

**Root cause (one sentence):**
The code tries to access `.value` from `intern.nonExistentNested`,
but that property is undefined because it does not exist on the
intern object.

**Did you need to add any console.log to find this? Why or why not?**
No. The stack trace already shows the TypeError and points directly
to the line in my code where the invalid property access occurs.

## Task 2.2 — Root cause without running code

**What does the stack trace error say if this throws?**
TypeError: Cannot read properties of undefined (reading 'name')

**Under what exact condition does it throw?**
It throws when the `interns` array is empty. In that case,
`sorted[0]` is undefined, so `top.name` tries to access `name`
on undefined.

**Which line is the root cause line?**
`return top.name.toUpperCase()`

**Fix (one line):**
`return top?.name?.toUpperCase() ?? ''`


## Section 3:
## Task 3.1 — Console panel

**Error message shown:**
TypeError: Cannot read properties of undefined (reading 'value')

**File and line number from the clickable link:**
[Paste the actual file path and line number shown in DevTools]

**Did the line match what you expected from reading the stack trace?**
Yes. The clickable file and line link pointed to the same line where
the invalid property access occurred.

## Task 3.2 — Network panel

**Successful request URL and status:**
[Actual URL] — [Actual status code]

**Response (first item or summary):**
[Actual response first item / short summary]

**Failed URL and status:**
[Typo URL] — [Actual status code]

**What the Console shows when the fetch fails:**
[Actual Console error/message]

## Task 3.3 — Elements panel

**Element inspected:**
Intern card / row displaying an intern's information.

**CSS class applied:**
[Paste the actual class from Elements panel]

**Property changed and what happened:**
Changed [actual CSS property] temporarily.
The appearance of the intern card/row changed immediately in the browser.

**Did the source file change? Why not?**
No. The change was made directly to the live DOM/style through
DevTools, so it only affected the current browser session and did
not modify the source file.

## Section 4:

## Task 4.1 — Line breakpoint

**File and line where breakpoint was set:**
[actual file:line]

**Variables in scope at pause:**
[actual variables]

**Value of search term:**
[actual search term]

**Number of interns in the array:**
[actual count]

**What changed after two Step Overs:**
After two Step Overs, the execution moved through the next two
statements and the relevant variable values were updated/evaluated.
[Add the actual change you observed.]

## Task 4.2 — Conditional breakpoint

**Condition used:**
intern.name === 'Rahul'

**How many times did the breakpoint fire?**
[actual number]

**How many times would a line breakpoint have fired?**
[actual number]

**Why is a conditional breakpoint better for this scenario?**
A conditional breakpoint pauses execution only when the specified
condition is true. This avoids stopping for every intern and makes it
easier to focus on the specific case being investigated.

## Task 4.3 — Step controls

**Line where you started (file:line):**
[actual file:line]

**Function you stepped into:**
[actual function name]

**What did you see inside the function (variables, logic):**
I could see the function parameters, local variables, and the
validation/filtering logic being executed step by step.

**After Step Out — where did execution return to:**
Execution returned to the original caller line after the function call.

## Task 4.4 — Watch expressions

**Expressions added:**
- interns.length
- form.name.trim()
- score >= 0 && score <= 100

**Values at pause:**
- interns.length = [actual value]
- form.name.trim() = [actual value]
- score >= 0 && score <= 100 = [true/false]

**Did any expression change value as you stepped? Which one and how:**
[Describe the actual change you observed while stepping.]

**When is a watch expression more useful than hovering over a variable:**
A watch expression is more useful when I want to continuously monitor
a calculated value or condition while stepping through multiple lines,
instead of checking it manually each time.

---

# Section 5 — VS Code Debugger

## Task 5.1 — VS Code debugger

**launch.json URL used:**

`http://localhost:5173`

**File and line where you set the breakpoint:**

[ACTUAL FILE AND LINE NUMBER]

**What inline values appeared when paused:**

[ACTUAL VALUES SHOWN BY THE VS CODE DEBUGGER]

**One thing the VS Code debugger shows that console.log cannot:**

The VS Code debugger pauses execution at a specific line and allows
me to inspect variables and the current execution state interactively
without modifying the code with console.log statements.

## Section 6:
## Task 6.1 — console.log audit

| File | Current log | Labelled? | Action |
|------|-------------|-----------|--------|
| src/hooks/useInternForm.ts | console.log(form) | No | Add label: `form:` |
| src/hooks/useInternForm.ts | console.log(validation) | No | Add label: `validation:` |

All unlabelled console.log statements were reviewed and improved with
meaningful labels. Unnecessary debugging logs should be removed.

---

## Task 6.2 — Grouped logging

**Where you added it:**

Added development-only grouped logging inside the form submission
handler in `useInternForm.ts`.

**What the Console output looks like:**

The Console shows a collapsed `submit()` group containing the current
form values and the validation result.

**Is the guard important? What would happen without it in production?**

Yes. The `import.meta.env.DEV` guard ensures that debugging logs are
only executed during development. Without the guard, debugging
information would also appear in production and could expose internal
application state and create unnecessary console output.