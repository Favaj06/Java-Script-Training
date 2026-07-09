//Task 1.1

// A React component is a reusable piece of UI that returns TSX to display on the screen.
/*function App() {
  return (
    <div>
      <h1>Hello React</h1>
      <p>My first React component</p>
    </div>
  )
}

export default App */

//task 1.2

/*import Greeting from './Greeting'

// A React component is a reusable piece of UI that returns TSX to display on the screen.
function App() {
  return (
    <div>
      <h1>Hello React</h1>

      <Greeting />
      <Greeting />
      <Greeting />
    </div>
  )
}

// Reusing components avoids duplicate code and makes the application easier to maintain.

export default App */

//task 1.3
/*import Greeting from './Greeting'

// A React component is a reusable piece of UI that returns TSX to display on the screen.
function App() {
  return (
    <>
      <h1>Hello React</h1>
      <Greeting />
    </>
  )
}

/*
A Fragment (<>...</>) groups multiple elements without creating
an extra HTML element in the DOM.

A <div> creates a real HTML element, while a Fragment does not.
Use a Fragment when you only need to group elements together.
*/

//export default App 

//task 2.1

/*import TsxRules from "./TsxRules"

function App() {
  return (
    <>
      <h1>TSX Rules</h1>
      <TsxRules />
    </>
  )
}

export default App
*/
//task 2.2
/*import StyledCard from "./StyledCard"

function App() {
  return (
    <>
      <h1>Styled Card Example</h1>
      <StyledCard />
    </>
  )
}

export default App
*/

//task 3.1

/*import Profile from "./Profile"

function App() {
  return (
    <>
      <Profile />
    </>
  )
}

export default App
*/

//task 3.2 
/*
import Profile from "./Profile"
import SkillList from "./SkillList"

function App() {
  return (
    <>
      <Profile />
      <SkillList />
    </>
  )
}

export default App
*/
// If the key prop is removed, React shows the warning:
// "Each child in a list should have a unique 'key' prop."
// Keys help React efficiently identify and update list items.


//task 4.1
/*import ScoreCard from "./ScoreCard"

// Use a ternary operator when you need to choose between two outputs.
// It is used instead of if statements because TSX accepts expressions inside {}.
function App() {
  return (
    <>
      <ScoreCard />
    </>
  )
}

export default App
*/

//task 4.2
/*import StatusBadge from "./StatusBadge"

function App() {
  return (
    <>
      <StatusBadge />
    </>
  )
}

export default App
*/

//task 4.3

/*import InternCard from "./InternCard"

function App() {
  return (
    <>
      <InternCard />
    </>
  )
}

export default App
*/
// self learning:
import Dashboard from "./Dashboard"
import SelfLearning from "./SelfLearning"

function App() {
  return (
    <>
      <Dashboard />
      <hr />
      <SelfLearning />
    </>
  )
}

export default App