/* Playwright activity 1: 
import useInternForm from '../hooks/useInternForm'
import { useInterns } from '../contexts/intern-context'

function AddInternForm() {
  const {
    form,
    error,
    handleChange,
    handleReset,
    isValid,
  } = useInternForm()

  const {
    interns,
    addIntern,
  } = useInterns()

  function handleSubmit(): void {
    if (!isValid()) return

    addIntern({
      id: interns.length + 1,
      ...form,
    })

    handleReset()
  }

  return (
    <div>

      <h2>Add Intern</h2>

      {error && (
        <p className="error" style={{ color: 'red' }}>
          {error}
        </p>
      )}

      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
      />

      <br /><br />

      <input
        type="number"
        name="score"
        placeholder="Score"
        value={form.score}
        onChange={handleChange}
      />

      <br /><br />

      <label>
        <input
          type="checkbox"
          name="isPresent"
          checked={form.isPresent}
          onChange={handleChange}
        />
        Present
      </label>

      <br /><br />

      <select
        name="role"
        value={form.role}
        onChange={handleChange}
      >
        <option value="Frontend">Frontend</option>
        <option value="Backend">Backend</option>
        <option value="Fullstack">Fullstack</option>
      </select>

      <br /><br />

      <button onClick={handleSubmit}>
        Add Intern
      </button>

      <button onClick={handleReset}>
        Reset
      </button>

    </div>
  )
}

export default AddInternForm
*/

import useInternForm from '../hooks/useInternForm'
import { useInterns } from '../contexts/intern-context'

function AddInternForm() {
  const {
    form,
    error,
    handleChange,
    handleReset,
    isValid,
  } = useInternForm()

  const {
    interns,
    addIntern,
  } = useInterns()

  function handleSubmit(
    event?: React.FormEvent<HTMLFormElement>
  ): void {
    event?.preventDefault()

    if (!isValid()) return

    if (form.score === '') return

    addIntern({
      id: interns.length + 1,
      ...form,
      score: form.score,
    })

    handleReset()
  }

  return (
    <form
      aria-label="Add Intern"
      onSubmit={handleSubmit}
    >

      <h2>Add Intern</h2>

      {error && (
        <p
          role="alert"
          className="error"
          style={{ color: 'red' }}
        >
          {error}
        </p>
      )}

      <label>
        Name
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
        />
      </label>

      <br /><br />

      <label>
        Score
        <input
          type="number"
          name="score"
          placeholder="Score"
          value={form.score}
          onChange={handleChange}
        />
      </label>

      <br /><br />

      <label>
        <input
          type="checkbox"
          name="isPresent"
          checked={form.isPresent}
          onChange={handleChange}
        />
        Present
      </label>

      <br /><br />

      <label>
        Role
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Fullstack">Fullstack</option>
        </select>
      </label>

      <br /><br />

      <button
        type="submit"
      >
        Add Intern
      </button>

      <button
        type="button"
        onClick={handleReset}
      >
        Reset
      </button>

    </form>
  )
}

export default AddInternForm
