const App = {
    tasks: Storage.load(),
    currentFilter: "all",

    init() {
        this.bindEvents();
        this.saveAndRender();
    },

    bindEvents() {
        document.getElementById("taskForm").addEventListener("submit", e => {
            e.preventDefault();
            const input = document.getElementById("taskInput");

            if (input.value.trim() === "") {
                alert("Task can't be empty!");
                return;
            }

            this.addTask(input.value);
            input.value = "";
        });

        document.querySelectorAll(".filters button").forEach(btn => {
            btn.addEventListener("click", () => {
                this.currentFilter = btn.dataset.filter;
                this.saveAndRender();
            })
        })
        document.getElementById("toggleTheme").addEventListener("click", () => {
            document.body.classList.toggle("dark");
        })
    },
    addTask(text) {
        this.tasks.push({
            id: Date.now(),
            text,
            completed: false
        });
        this.saveAndRender();
    },

    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.saveAndRender();
    },

    getFilteredTasks() {
        if (this.currentFilter === "active") 
            return this.tasks.filter(t => !t.completed);
        if (this.currentFilter === "completed") 
            return this.tasks.filter(t => t.completed)
        return this.tasks;
    },

    saveAndRender() {
        Storage.save(this.tasks);
        UI.renderTasks(this.getFilteredTasks());
    }
};
App.init();