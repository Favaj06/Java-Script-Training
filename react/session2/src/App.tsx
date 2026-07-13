/* task 1.1
import "./App.css"
import InternCard from "./InternCard"

function App() {
  return (
    <div>
      <InternCard name="Rahul" score={92} isPresent={true} />
      <InternCard name="Priya" score={78} isPresent={true} />
      <InternCard name="Amit" score={45} isPresent={false} />
    </div>
  )
}

export default App
*/

//task 2.1
/*
import "./App.css"
import InternCard from "./InternCard"

function App() {
  return (
    <div>
      <InternCard name="Rahul" score={92} isPresent={true} />
      <InternCard name="Priya" score={78} isPresent={true} />
      <InternCard name="Amit" score={45} isPresent={false} />
    </div>
  )
}

export default App
*/
//Task 2.1
/*
import "./App.css"
import InternCard from "./InternCard"
import ProfileCard from "./ProfileCard"

function App() {
  return (
    <div>
      <InternCard name="Rahul" score={92} isPresent={true} />
      <InternCard name="Priya" score={78} isPresent={true} />
      <InternCard name="Amit" score={45} isPresent={false} />

      <ProfileCard
        name="Rahul"
        role="Frontend"
        score={92}
        skills={["HTML", "CSS", "React", "TypeScript"]}
      />

      <ProfileCard name="Priya" />

      <ProfileCard />
    </div>
  )
}

export default App
*/

//task 2.2
/*import "./App.css"
import InternCard from "./InternCard"
import ProfileCard from "./ProfileCard"

function App() {
  return (
    <div>
      <InternCard name="Rahul" score={92} isPresent={true} />
      <InternCard name="Priya" score={78} isPresent={true} />
      <InternCard name="Amit" score={45} isPresent={false} />

      <ProfileCard
        name="Rahul"
        role="Frontend"
        score={92}
        skills={["HTML", "CSS", "React", "TypeScript"]}
      />

      <ProfileCard name="Priya" />

      <ProfileCard />
    </div>
  )
}

export default App
*/

//task 3.1
/*
import "./App.css";
import InternCard from "./InternCard";
import ProfileCard from "./ProfileCard";
import InternProfile from "./InternProfile";

function App() {
  const rahul = {
    id: 1,
    name: "Rahul",
    score: 92,
    isPresent: true,
    skills: ["HTML", "CSS", "TypeScript", "React"],
  };

  return (
    <div>

      // Task 1.1 - InternCard
      <InternCard name="Rahul" score={92} isPresent={true} />
      <InternCard name="Priya" score={78} isPresent={true} />
      <InternCard name="Amit" score={45} isPresent={false} />

      // Task 2.1 & 2.2 - ProfileCard
      <ProfileCard
        name="Rahul"
        role="Frontend"
        score={92}
        skills={["HTML", "CSS", "React", "TypeScript"]}
      />

      <ProfileCard name="Priya" />

      <ProfileCard />

      // Task 3.1 - InternProfile
      <InternProfile intern={rahul} />

    </div>
  );
}

export default App;
*/

//task 3.2
/*
import "./App.css";
import InternCard from "./InternCard";
import ProfileCard from "./ProfileCard";
import InternProfile from "./InternProfile";

function App() {
  const rahul = {
    id: 1,
    name: "Rahul",
    score: 92,
    isPresent: true,
    skills: ["HTML", "CSS", "TypeScript", "React"],
  };

  const priya = {
    id: 2,
    name: "Priya",
    score: 78,
    isPresent: true,
    skills: ["Node.js", "TypeScript"],
  };

  return (
    <div>

      // Task 1 - InternCard
      <InternCard name="Rahul" score={92} isPresent={true} />
      <InternCard name="Priya" score={78} isPresent={true} />
      <InternCard name="Amit" score={45} isPresent={false} />

      // Task 2 - ProfileCard
      <ProfileCard
        name="Rahul"
        role="Frontend"
        score={92}
        skills={["HTML", "CSS", "React", "TypeScript"]}
      />

      <ProfileCard name="Priya" />

      <ProfileCard />

      // Task 3.1
      <InternProfile intern={rahul} />

      // Task 3.2
      <InternProfile intern={priya} />

      // Same object passed using the spread operator
      <InternProfile intern={{ ...priya }} />

    </div>
  );
}

export default App;
*/

// The spread operator (...priya) creates a shallow copy of the object.
// It is useful when you want to copy an object or modify some properties
// without changing the original object.
//
// Example:
// <InternProfile intern={{ ...priya, score: 85 }} />
//
// If no changes are needed, passing 'priya' directly is simpler and
// easier to read than creating a copy with the spread operator.
/*
task 4.1:

import "./App.css";
import InternCard from "./InternCard";
import ProfileCard from "./ProfileCard";
import InternProfile from "./InternProfile";
import Card from "./Card";

function App() {
  const rahul = {
    id: 1,
    name: "Rahul",
    score: 92,
    isPresent: true,
    skills: ["HTML", "CSS", "TypeScript", "React"],
  };

  return (
    <div>

      <InternCard name="Rahul" score={92} isPresent={true} />
      <InternCard name="Priya" score={78} isPresent={true} />
      <InternCard name="Amit" score={45} isPresent={false} />

      <ProfileCard
        name="Rahul"
        role="Frontend"
        score={92}
        skills={["HTML", "CSS", "React", "TypeScript"]}
      />

      <ProfileCard name="Priya" />

      <ProfileCard />

      <InternProfile intern={rahul} />


      <Card title="Rahul">
        <p>Score: 92</p>
        <p>Status: Present</p>
        <button>View Profile</button>
      </Card>

      <Card title="Announcements">
        <ul>
          <li>Session 3 tomorrow at 10am</li>
          <li>Submit PRs by EOD</li>
        </ul>
      </Card>
    </div>
  );
}

export default App;
*/

/*task 4.2:
import "./App.css";
import InternCard from "./InternCard";
import ProfileCard from "./ProfileCard";
import InternProfile from "./InternProfile";
import Card from "./Card";

function App() {
  const rahul = {
    id: 1,
    name: "Rahul",
    score: 92,
    isPresent: true,
    skills: ["HTML", "CSS", "TypeScript", "React"],
  };

  return (
    <div>
      <InternCard name="Rahul" score={92} isPresent={true} />
      <InternCard name="Priya" score={78} isPresent={true} />
      <InternCard name="Amit" score={45} isPresent={false} />

      <ProfileCard
        name="Rahul"
        role="Frontend"
        score={92}
        skills={["HTML", "CSS", "React", "TypeScript"]}
      />
      <ProfileCard name="Priya" />
      <ProfileCard />

      <InternProfile intern={rahul} />

      <Card title="Rahul">
        <p>Score: 92</p>
        <p>Status: Present</p>
        <button>View Profile</button>
      </Card>

      <Card title="Announcements">
        <ul>
          <li>Session 3 tomorrow at 10am</li>
          <li>Submit PRs by EOD</li>
        </ul>
      </Card>

      <Card title="Empty Card" />
    </div>
  );
}

export default App;
*/
//task 5:
/*
import "./App.css";
import InternCard from "./InternCard";
import ProfileCard from "./ProfileCard";
import InternProfile from "./InternProfile";
import Card from "./Card";

function App() {
  const rahul = {
    id: 1,
    name: "Rahul",
    score: 92,
    isPresent: true,
    skills: ["HTML", "CSS", "TypeScript", "React"],
  };

  return (
    <div>
      <InternCard
        name="Rahul"
        score={92}
        isPresent={true}
        role="Frontend"
      />

      <InternCard
        name="Priya"
        score={78}
        isPresent={true}
        role="Backend"
      />

      <InternCard
        name="Amit"
        score={45}
        isPresent={false}
        role="Full Stack"
      />

      <ProfileCard
        name="Rahul"
        role="Frontend"
        score={92}
        skills={["HTML", "CSS", "React", "TypeScript"]}
      />

      <ProfileCard name="Priya" />

      <ProfileCard />

      <InternProfile intern={rahul} />

      <Card title="Rahul">
        <p>Score: 92</p>
        <p>Status: Present</p>
        <button>View Profile</button>
      </Card>

      <Card title="Announcements">
        <ul>
          <li>Session 3 tomorrow at 10am</li>
          <li>Submit PRs by EOD</li>
        </ul>
      </Card>

      <Card title="Empty Card" />
    </div>
  );
}

export default App;
*/

//task 6.1:

import "./App.css";
import Dashboard from "./Dashboard";

function App() {
  return (
    <div>
      <Dashboard />
    </div>
  );
}

export default App;