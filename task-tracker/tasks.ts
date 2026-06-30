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

export interface Task {
    id: number;
    name: string;
    priority: "Low" | "Medium" | "High";
    dueDate: string;
    done: boolean;
}

export class TaskManager {

    private tasks: Task[] = [];

    constructor() {
        this.load();
    }

    add(data: Omit<Task, "id" | "done">): Task {

        const task: Task = {
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

    getAll(): Task[] {
        return [...this.tasks];
    }

    toggle(id: number): void {

        const task = this.tasks.find(
            task => task.id === id
        );

        if (task) {
            task.done = !task.done;
            this.save();
        }
    }

    filter(
        status: "all" | "done" | "pending"
    ): Task[] {

        if (status === "done") {
            return this.tasks.filter(
                task => task.done
            );
        }

        if (status === "pending") {
            return this.tasks.filter(
                task => !task.done
            );
        }

        return [...this.tasks];
    }

    sortBy(
        field: keyof Pick<Task, "priority" | "dueDate">
    ): Task[] {

        const sortedTasks = [...this.tasks];

        if (field === "priority") {

            const priorityOrder = {
                Low: 1,
                Medium: 2,
                High: 3
            };

            sortedTasks.sort(
                (a, b) =>
                priorityOrder[a.priority] -
                priorityOrder[b.priority]
            );
        }

        if (field === "dueDate") {

            sortedTasks.sort(
                (a, b) =>
                new Date(a.dueDate).getTime() -
                new Date(b.dueDate).getTime()
            );
        }

        return sortedTasks;
    }

    private save(): void {

        localStorage.setItem(
            "tasks",
            JSON.stringify(this.tasks)
        );
    }

    load(): void {

        const savedTasks =
            localStorage.getItem("tasks");

        if (savedTasks) {

            this.tasks =
                JSON.parse(savedTasks);
        }
    }
}

/* Generic Function */

export function groupBy<T>(
    items: T[],
    key: keyof T
): Record<string, T[]> {

    return items.reduce(
        (groups, item) => {

            const groupKey =
                String(item[key]);

            if (!groups[groupKey]) {
                groups[groupKey] = [];
            }

            groups[groupKey].push(item);

            return groups;

        },
        {} as Record<string, T[]>
    );
}