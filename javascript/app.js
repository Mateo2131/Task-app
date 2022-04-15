const taskBox = document.querySelector('.task-box');
const newTaskBtn = document.getElementById('add-btn');
const todoBtn = document.getElementById('todo-btn');
const completedBtn = document.getElementById('completed-btn');
const allBtn = document.getElementById('all-btn');

newTaskBtn.addEventListener('click', () => {
    modal();
    createTask();
});

todoBtn.addEventListener('click', () => {
    const tasks = showTasks('todo');
    taskBox.innerHTML = tasks;
});

completedBtn.addEventListener('click', () => {
    const tasks = showTasks('completed');
    taskBox.innerHTML = tasks;
});

allBtn.addEventListener('click', () => {
    const tasks = showTasks('all');
    taskBox.innerHTML = tasks;
});

function modal() {
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal__title">
            <p>Add New Task</p>
        </div>
        <form class="modal__form">
            <input type="text" class="modal__btn" id="name" placeholder="Task name">
            <input type="date" class="modal__btn" id="date">
            <button type="button" class="modal__button" id="create-btn">Create</button>
        </form>`;
    document.body.insertAdjacentElement('beforeend', modal)
};

function createTask() {

    document.getElementById('create-btn').addEventListener('click', saveTask);

    function saveTask(e) {
        const name = document.getElementById('name').value;
        const date = document.getElementById('date').value;

        const task = {
            id: `${Math.floor(Math.random() * 1000)}`,
            name,
            date,
            status: 'todo'
        };

        if (!localStorage.getItem('tasks')) {
            let tasks = [];
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        } else {
            let tasks = JSON.parse(localStorage.getItem('tasks'));
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        };

        document.body.removeChild(document.querySelector('.modal'));

        getTasks();
        e.preventDefault();
    };

    function getTasks() {
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        let elem = '';

        tasks.forEach((task) => {
            elem += `
            <div class="task" data-id="${task.id}">
            <div class="task-info">
                <p class="task__name">${task.name}</p>
                <p class="task__time">${task.date}</p>
            </div>
            <div class="task-btn">
                <input onclick="updateStatus(this)" type="checkbox" id="task-status" class="task__status">
                <div class="settings" onclick="deleteTask(this)">
                    <i class='bx bxs-trash-alt' ></i>
                </div>
            </div>
        </div>`;
        });

        taskBox.innerHTML = elem;
    };
};

function updateStatus(selectedTask) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    const id = selectedTask.parentElement.parentElement.dataset.id;

    for (i = 0; i < tasks.length; i++) {
        if (selectedTask.checked && tasks[i].id === id) {
            tasks[i].status = 'completed';
        }
        if (!selectedTask.checked && tasks[i].id === id) {
            tasks[i].status = 'todo';
        }
    };
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

function deleteTask(selectedTask) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    const id = selectedTask.parentElement.parentElement.dataset.id;

    for (i = 0; i < tasks.length; i++) {

        if (tasks[i].id === id) {
            tasks.splice(i,1);
            console.log(tasks)
        };
    };
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

function showTasks(status) {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let elem = '';

    if (status === 'all') {
        tasks.forEach((item) => {
            elem += `<div class="task" data-id="${item.id}">
                <div class="task-info">
                    <p class="task__name">${item.name}</p>
                    <p class="task__time">${item.date}</p>
                </div>
                <div class="task-btn">
                    <input onclick="updateStatus(this)" type="checkbox" id="task-status" class="task__status">
                    <div class="settings" onclick="deleteTask(this)">
                        <i class='bx bxs-trash-alt' ></i>
                    </div>
                </div>
            </div>`
        });
    } else {
        const array = tasks.filter(item => item.status === status);
        array.forEach((item) => {
            elem += `<div class="task" data-id="${item.id}">
            <div class="task-info">
                <p class="task__name">${item.name}</p>
                <p class="task__time">${item.date}</p>
            </div>
            <div class="task-btn">
                <input onclick="updateStatus(this)" type="checkbox" id="task-status" class="task__status">
                <div class="settings" onclick="deleteTask(this)">
                    <i class='bx bxs-trash-alt' ></i>
                </div>
            </div>
        </div>`
        });
    };
    return elem;
};