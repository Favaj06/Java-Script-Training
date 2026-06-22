interface Person {
  firstName: string;
  lastName: string;
  email: string;
}

interface Employee extends Person {
  readonly employeeId: string;
  department: string;
  startDate: Date;
}

interface Manager extends Employee {
  teamSize: number;
  directReports: string[];
}

function getFullName(person: Person): string {
  return `${person.firstName} ${person.lastName}`;
}

function introduceEmployee(employee: Employee): string {
  return `Hi, I am ${getFullName(employee)} from ${
    employee.department
  }, joined on ${employee.startDate.toLocaleDateString()}`;
}

const person: Person = {
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com"
};

const employee: Employee = {
  firstName: "Alice",
  lastName: "Johnson",
  email: "alice@example.com",
  employeeId: "EMP001",
  department: "Engineering",
  startDate: new Date("2024-01-01")
};

const manager: Manager = {
  firstName: "Sarah",
  lastName: "Smith",
  email: "sarah@example.com",
  employeeId: "EMP002",
  department: "Engineering",
  startDate: new Date("2023-05-01"),
  teamSize: 5,
  directReports: ["EMP003", "EMP004"]
};

console.log(getFullName(person));
console.log(getFullName(employee));
console.log(getFullName(manager));

console.log(introduceEmployee(employee));
export {};
// Employee extends Person.
// Manager extends Employee.
// Therefore both contain all properties required by Person.