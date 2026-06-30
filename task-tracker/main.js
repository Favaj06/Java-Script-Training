import { TaskManager, groupBy } from "./tasks.js";

const form = document.querySelector("#task-form");
const taskList = document.querySelector("#task-list");
const clearAllBtn = document.querySelector("#clear-all");

const allBtn = document.querySelector("#all-btn");
const pendingBtn = document.querySelector("#pending-btn");
const doneBtn = document.querySelector("#done-btn");

const sortSelect = document.querySelector("#sort-select");
const counter = document.querySelector("#counter");
const summaryBody = document.querySelector("#summary-body");

const manager = new TaskManager();

let currentFilter = "all";
let currentSort = "";

/* Summary Table */
function updateSummaryTable() {

    summaryBody.innerHTML = "";

    const groupedTasks =
        groupBy(manager.getAll(), "priority");

    for (const priority in groupedTasks) {

        const row =
            document.createElement("tr");

        row.innerHTML = `
            <td>${priority}</td>
            <td>${groupedTasks[priority].length}</td>
            <td>-</td>
            <td>-</td>
        `;

        summaryBody.appendChild(row);
    }
}

/* Render Tasks */
function renderTasks() {

    let filteredTasks =
        manager.filter(currentFilter);

    /* Sort */
    if (currentSort === "priority") {

        filteredTasks =
            manager.sortBy("priority");
    }

    if (currentSort === "dueDate") {

        filteredTasks =
            manager.sortBy("dueDate");
    }

    /* Apply filter again after sort */
    if (currentFilter === "pending") {

        filteredTasks =
            filteredTasks.filter(
                task => !task.done
            );
    }

    if (currentFilter === "done") {

        filteredTasks =
            filteredTasks.filter(
                task => task.done
            );
    }

    taskList.innerHTML = "";

    filteredTasks.forEach(task => {

        const li =
            document.createElement("li");

        li.innerHTML =
            `${task.name} | ${task.priority} | ${task.dueDate}`;

        const doneButton =
            document.createElement("button");

        doneButton.textContent = "Done";

        doneButton.addEventListener(
            "click",
            () => {

                manager.toggle(task.id);

                renderTasks();
            }
        );

        if (task.done) {
            li.classList.add("done");
        }

        const today =
            new Date()
            .toISOString()
            .split("T")[0];

        if (task.dueDate <= today) {
            li.classList.add("overdue");
        }

        li.appendChild(doneButton);

        taskList.appendChild(li);
    });

    counter.textContent =
        `Showing ${filteredTasks.length} of ${manager.getAll().length} tasks`;

    updateSummaryTable();
}

/* Add Task */
form.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const taskName =
            document.querySelector("#task-name").value.trim();

        const priority =
            document.querySelector("#priority").value;

        const dueDate =
            document.querySelector("#due-date").value;

        if (!taskName) {
            return;
        }

        manager.add({
            name: taskName,
            priority: priority,
            dueDate: dueDate
        });

        renderTasks();

        form.reset();
    }
);

/* Clear All */
clearAllBtn.addEventListener(
    "click",
    () => {

        localStorage.removeItem("tasks");

        location.reload();
    }
);

/* Filters */
allBtn.addEventListener(
    "click",
    () => {

        currentFilter = "all";

        renderTasks();
    }
);

pendingBtn.addEventListener(
    "click",
    () => {

        currentFilter = "pending";

        renderTasks();
    }
);

doneBtn.addEventListener(
    "click",
    () => {

        currentFilter = "done";

        renderTasks();
    }
);

/* Sorting */
sortSelect.addEventListener(
    "change",
    function() {

        currentSort = this.value;

        renderTasks();
    }
);

/* Initial Render */
renderTasks();