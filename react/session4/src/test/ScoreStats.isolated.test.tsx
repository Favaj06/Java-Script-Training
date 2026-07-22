test('just to hit the line', () => {
  const form = {
    name: '',
    score: 0,
    isPresent: true,
    role: 'Frontend',
  }

  JSON.stringify(form)

  expect(true).toBe(true)
})

/*
Task 5.4

The temporary test may increase coverage because it executes
a line of code.

However, it does not improve software quality because it
does not verify any real behaviour.

The assertion always passes and cannot detect bugs.

Good unit tests should validate expected outcomes rather
than simply execute code.
*/