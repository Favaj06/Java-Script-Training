/*
import Navbar from './components/Navbar'
import CounterDemo from './components/CounterDemo'
import AddInternForm from './components/AddInternForm'
import InternSearch from './components/InternSearch'
import ScoreStats from './components/ScoreStats'
import InternListWithCallback from './components/InternListWithCallback'

import { useInterns } from './contexts/intern-context'

function App() {
  const { isLoading } = useInterns()

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  return (
    <div>
      <Navbar />

      <div style={{ padding: '20px' }}>
        <CounterDemo />

        <hr />

        <ScoreStats />

        <hr />

        <AddInternForm />

        <hr />

        <InternSearch />

        <hr />

        <InternListWithCallback />
      </div>
    </div>
  )
}

export default App
*/

import Navbar from './components/Navbar'
import ScoreStats from './components/ScoreStats'
import AddInternForm from './components/AddInternForm'
import InternSearch from './components/InternSearch'
import InternListWithCallback from './components/InternListWithCallback'

import { useInterns } from './contexts/intern-context'

function App() {
  const { isLoading } = useInterns()

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  return (
    <div>
      <Navbar />

      <div style={{ padding: '16px' }}>
        <ScoreStats />

        <AddInternForm />

        <InternSearch />

        <InternListWithCallback />
      </div>
    </div>
  )
}

export default App
// Application Layers:
//
// Contexts:
// Store and share global state such as theme and intern data.
//
// Hooks:
// Reuse stateful logic like counter, form handling, and search functionality.
//
// Components:
// Build the user interface by displaying data and handling user interactions.