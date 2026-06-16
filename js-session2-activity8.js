// Activity 8 - Task 1: Promise.all

const getUserAndPosts = async () => {
  try {
    const [userResponse, postsResponse] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/users/1"),
      fetch("https://jsonplaceholder.typicode.com/posts?userId=1")
    ]);
    const user = await userResponse.json();
    const posts = await postsResponse.json();
    console.log(`${user.name} has ${posts.length} posts`);
  } catch (error) {
    console.log(error);
  }
};
getUserAndPosts();

// Activity 8 - Task 2, 3, 4

const loadBtn = document.getElementById("load-btn");
const cancelBtn = document.getElementById("cancel-btn");
const status = document.getElementById("status");
const usersContainer = document.getElementById("users-container");
const search = document.getElementById("search");
let usersData = [];
let controller;

// Task 2 - createElement()

function renderUsers(users) {
  usersContainer.innerHTML = "";
  users.forEach(user => {
    const userDiv = document.createElement("div");
    const name = document.createElement("h3");
    name.textContent = user.name;
    const email = document.createElement("p");
    email.textContent = `Email: ${user.email}`;
    const city = document.createElement("p");
    city.textContent = `City: ${user.address.city}`;
    const hr = document.createElement("hr");
    userDiv.appendChild(name);
    userDiv.appendChild(email);
    userDiv.appendChild(city);
    userDiv.appendChild(hr);
    usersContainer.appendChild(userDiv);
  });
}

// Task 3 & 4

loadBtn.addEventListener("click", async () => {
  controller = new AbortController();
  try {
    status.textContent = "Loading...";
    usersContainer.innerHTML = "";
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users",
      {
        signal: controller.signal
      }
    );
    if (!response.ok) {
      throw new Error("Failed to load users");
    }
    usersData = await response.json();

    // Task 3 - Save to localStorage
    localStorage.setItem("users", JSON.stringify(usersData));
    renderUsers(usersData);
    status.textContent = `${usersData.length} users loaded`;
  } catch (error) {
    if (error.name === "AbortError") {
      status.textContent = "Fetch cancelled";
    } else {
      status.textContent = "Failed to load users. Try again.";
    }
  }
});

// Task 4 - Cancel Fetch
cancelBtn.addEventListener("click", () => {
  if (controller) {
    controller.abort();
  }
});

// Search Users

search.addEventListener("input", () => {
  const searchText = search.value.toLowerCase();
  const filteredUsers = usersData.filter(user =>
    user.name.toLowerCase().includes(searchText)
  );
  renderUsers(filteredUsers);
});

// Task 3 - Load from localStorage on refresh

window.addEventListener("load", () => {
  const savedUsers = localStorage.getItem("users");
  if (savedUsers) {
    usersData = JSON.parse(savedUsers);
    renderUsers(usersData);
    status.textContent =
      `${usersData.length} users loaded from localStorage`;
  }
});