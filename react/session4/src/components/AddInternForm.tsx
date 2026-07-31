import useInternForm from '../hooks/useInternForm'
import { useInterns } from '../contexts/intern-context'

function AddInternForm() {
  const { interns, addIntern } = useInterns()

  const {
    form,
    error,
    handleChange,
    handleReset,
    handleSubmit: handleFormSubmit,
  } = useInternForm({
    addIntern,
    generateId: () => interns.length + 1,
  })

  function handleSubmit(): void {
    handleFormSubmit()
  }

  return (
    <div>

      <h2>Add Intern</h2>

      {error && (
        <p style={{ color: 'red' }}>
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