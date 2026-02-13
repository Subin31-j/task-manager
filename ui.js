const UI = {
    renderTasks(tasks) {
        const list = document.getElementById("taskList");
        list.innerHTML = "";

        tasks.forEach(task => {
            const li = document.createElement("li");
            li.className = task.completed ? "completed" : "";
            li.innerHTML = `
            <input type="checkbox" ${task.completed ? "checked" : ""}>
            <span>${task.text}</span>
            <button class="delete">Delete</button>
            `;

            li.querySelector("input").addEventListener("change", () => {
                task.completed = !task.completed;
                App.saveAndRender();
            });

            li.querySelector(".delete").addEventListener("click", () => {
                App.deleteTask(task.id);
            });
            list.appendChild(li);
        });
        UI.updateStats(tasks);
    },

    updateStats(tasks) {
        document.getElementById("totalTasks").textContent = tasks.length;
        document.getElementById("completedTasks").textContent = tasks.filter(t => t.completed).length;
        document.getElementById("activeTasks").textContent = tasks.filter(t => !t.completed).length;
    }
}