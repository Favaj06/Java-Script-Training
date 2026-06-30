/*interface Task {
    id: number;
    name: string;
    priority: "Low" | "Medium" | "High";
    dueDate: string;
    done: boolean;
}

let tasks: Task[] = [];

function addTask(
    name: string,
    priority: "Low" | "Medium" | "High",
    dueDate: string
): Task {

    const task: Task = {
        id: Date.now(),
        name: name,
        priority: priority,
        dueDate: dueDate,
        done: false
    };

    tasks.push(task);

    return task;
}

function toggleDone(id: number): void {

    const task = tasks.find(
        task => task.id === id
    );

    if (task) {
        task.done = !task.done;
    }
}
const task1 = addTask(
    "Complete Assignment",
    "High",
    "2026-07-01"
);

console.log(task1);

toggleDone(task1.id);

console.log(tasks);*/
export class TaskManager {
    constructor() {
        this.tasks = [];
        this.load();
    }
    add(data) {
        const task = {
            id: Date.now(),
            name: data.name,
            priority: data.priority,
            dueDate: data.dueDate,
            done: false
        };
        this.tasks.push(task);
        this.save();
        return task;
    }
    getAll() {
        return [...this.tasks];
    }
    toggle(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.done = !task.done;
            this.save();
        }
    }
    filter(status) {
        if (status === "done") {
            return this.tasks.filter(task => task.done);
        }
        if (status === "pending") {
            return this.tasks.filter(task => !task.done);
        }
        return [...this.tasks];
    }
    sortBy(field) {
        const sortedTasks = [...this.tasks];
        if (field === "priority") {
            const priorityOrder = {
                Low: 1,
                Medium: 2,
                High: 3
            };
            sortedTasks.sort((a, b) => priorityOrder[a.priority] -
                priorityOrder[b.priority]);
        }
        if (field === "dueDate") {
            sortedTasks.sort((a, b) => new Date(a.dueDate).getTime() -
                new Date(b.dueDate).getTime());
        }
        return sortedTasks;
    }
    save() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks));
    }
    load() {
        const savedTasks = localStorage.getItem("tasks");
        if (savedTasks) {
            this.tasks =
                JSON.parse(savedTasks);
        }
    }
}
/* Generic Function */
export function groupBy(items, key) {
    return items.reduce((groups, item) => {
        const groupKey = String(item[key]);
        if (!groups[groupKey]) {
            groups[groupKey] = [];
        }
        groups[groupKey].push(item);
        return groups;
    }, {});
}
