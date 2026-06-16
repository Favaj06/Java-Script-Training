//Activity 1: Understanding Async Behaviour

console.log("1");
setTimeout(() => console.log("2"), 1000);
console.log("3");
console.log("1");
setTimeout(() => console.log("2"), 0);
console.log("3");
console.log("Fetching data...");
setTimeout(() => {
    console.log("Data received!");
}, 2000);

//Activity 2: Promises

const getData = new Promise((resolve, reject) => {
  const success = Math.random() > 0.5;
  setTimeout(() => {
    if (success) resolve("Data loaded!");
    else reject("Something went wrong");
  }, 1000);
});
getData
  .then((message) => {
    console.log(message);
  })
  .catch((error) => {
    console.log(error);
  });
const startValue = new Promise((resolve) => resolve(5));
startValue
  .then((value) => value * 2)
  .then((value) => value + 10)
  .then((result) => {
    console.log(result);
  });
const promise1 = new Promise((resolve) =>
  setTimeout(() => resolve("User loaded"), 1000)
);
const promise2 = new Promise((resolve) =>
  setTimeout(() => resolve("Orders loaded"), 1500)
);
Promise.all([promise1, promise2])
  .then((results) => {
    console.log(results);
  })
  .catch((error) => {
    console.log(error);
  });

//Activity 3: async / await

const getUser = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
    const user = await response.json();
    console.log(user.name);
  } catch (error) {
    console.log(error);
  }
};
getUser();
const getUserById = async (id) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const user = await response.json();
  return {
    name: user.name,
    email: user.email
  };
};
getUserById(3).then(result => console.log(result));
const getAllUsers = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await response.json();
  return users.map(user => ({
    name: user.name,
    email: user.email
  }));
};
getAllUsers().then(result => console.log(result));

//Activity 4 — Error Handling

const fetchUser = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log("Caught:", error.message);
  }
};
fetchUser();
const fetchMissing = async () => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users/99999");
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log("Caught:", error.message);
  }
};
fetchMissing();
const fetch1 = fetch("https://jsonplaceholder.typicode.com/users/1")
  .then(response => response.json());
const fetch2 = fetch("https://invalid-url-example.com")
  .then(response => response.json());
Promise.allSettled([fetch1, fetch2])
  .then(results => {
    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        console.log(`Fetch ${index + 1} succeeded:`, result.value);
      } else {
        console.log(`Fetch ${index + 1} failed:`, result.reason);
      }
    });
  });

  //Activity 5: DOM: Select & Update

  const title = document.getElementById("title");
title.textContent = "Hello, Intern!";
const subtitle = document.getElementById("subtitle");
subtitle.style.color = "blue";
const counter = document.getElementById("counter");
counter.textContent = Number(counter.textContent) + 1;
const names = ["Alice", "Bob", "Carol"];
const userList = document.getElementById("user-list");
names.forEach(name => {
  const li = document.createElement("li");
  li.textContent = name;
  userList.appendChild(li);
});
function toggleTitleClass() {
  title.classList.toggle("highlight");
}
toggleTitleClass();

//Activity 6 — Events

const greetBtn = document.getElementById("greet-btn");
const addBtn = document.getElementById("add-btn");
const resetBtn = document.getElementById("reset-btn");
const nameInput = document.getElementById("name-input");
const greeting = document.getElementById("greeting");
const clickCount = document.getElementById("click-count");
let count = 0;
function greetUser() {
  const name = nameInput.value.trim();
  if (name === "") {
    greeting.textContent = "Please enter a name";
  } else {
    greeting.textContent = `Hello, ${name}!`;
  }
}
greetBtn.addEventListener("click", greetUser);
addBtn.addEventListener("click", () => {
  count++;
  clickCount.textContent = `Clicks: ${count}`;
});
resetBtn.addEventListener("click", () => {
  count = 0;
  clickCount.textContent = `Clicks: ${count}`;
});
nameInput.addEventListener("input", () => {
  const name = nameInput.value.trim();
  if (name === "") {
    greeting.textContent = "";
  } else {
    greeting.textContent = `Hello, ${name}!`;
  }
});
nameInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    greetUser();
  }
});

//Activity 7: Fetch + DOM (Full Flow)

const loadBtn = document.getElementById("load-btn");
const status = document.getElementById("status");
const usersContainer = document.getElementById("users-container");
const search = document.getElementById("search");
let usersData = [];
function renderUsers(users) {
  usersContainer.innerHTML = "";
  users.forEach(user => {
    const userDiv = document.createElement("div");
    userDiv.innerHTML = `
      <h3>${user.name}</h3>
      <p>Email: ${user.email}</p>
      <p>City: ${user.address.city}</p>
      <hr>
    `;
    usersContainer.appendChild(userDiv);
  });
}
loadBtn.addEventListener("click", async () => {
  try {
    status.textContent = "Loading...";
    usersContainer.innerHTML = "";

    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );

    if (!response.ok) {
      throw new Error("Failed to load users");
    }

    usersData = await response.json();

    localStorage.setItem("users", JSON.stringify(usersData));

    renderUsers(usersData);

    status.textContent = `${usersData.length} users loaded`;

  } catch (error) {
    status.textContent = "Failed to load users. Try again.";
    usersContainer.innerHTML = "";
  }
});
search.addEventListener("input", () => {
  const searchText = search.value.toLowerCase();
  const filteredUsers = usersData.filter(user =>
    user.name.toLowerCase().includes(searchText)
  );
  renderUsers(filteredUsers);
});
