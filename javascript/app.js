const taskBox = document.querySelector('.task-box');
const newTaskBtn = document.getElementById('add-btn');
const btnsTab = document.querySelector('.btns-tab');
let tasks = JSON.parse(localStorage.getItem('tasks'));

newTaskBtn.addEventListener('click', () => {
    modal();
    createTask();
});

btnsTab.addEventListener('click', (e) => {
    if (e.target.id === 'all-btn') taskBox.innerHTML = showTodo('all');
    if (e.target.id === 'todo-btn') taskBox.innerHTML = showTodo('todo');
    if (e.target.id === 'completed-btn') taskBox.innerHTML = showTodo('completed');
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
    document.body.insertAdjacentElement('beforeend', modal);
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
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        };

        document.body.removeChild(document.querySelector('.modal'));

        taskBox.innerHTML = showTodo('all');
        e.preventDefault();
    };
};

function updateStatus(selectedTask) {
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
    const id = selectedTask.parentElement.parentElement.dataset.id;

    for (i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks.splice(i, 1);
            console.log(tasks)
        };
    };
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

function showTodo(status) {
    elem = '';

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
        return elem;
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
        return elem;
    };
};

const progress = document.querySelector('.progress');

const getRemainTime = deadline => {
    let now = new Date();
    let remainTime = (new Date(deadline) - now + 1000) / 1000;
    let remainSeconds = ('0' + Math.floor(remainTime % 60)).slice(-2);
    let remainMinutes = ('0' + Math.floor(remainTime / 60 % 60)).slice(-2);
    let remainHours = ('0' + Math.floor(remainTime / 3600 % 24)).slice(-2);
    let remainDays = Math.floor(remainTime / (3600 * 24));

    return {
        remainTime,
        remainSeconds,
        remainMinutes,
        remainHours,
        remainDays,
    };
};

const countdown = (deadline, element) => {
    const elem = document.getElementById(element);
    let totalTime = getRemainTime(deadline);
    console.log(totalTime.remainDays);
    let twentyPercent = (totalTime.remainTime * 20) / 100;
    let fourtyPercent = (totalTime.remainTime * 40) / 100;
    let sixtyPercent = (totalTime.remainTime * 60) / 100;
    let eightyPercent = (totalTime.remainTime * 80) / 100;
    let hundredtyPercent = (totalTime.remainTime * 100) / 100;
    
    console.log(twentyPercent,fourtyPercent,sixtyPercent,eightyPercent,hundredtyPercent,totalTime);

    const timerUpdate = setInterval( () => {
        let time = getRemainTime(deadline);
    
        if (time.remainTime < hundredtyPercent) progress.style.width = `20%`;
        if (time.remainTime < eightyPercent) progress.style.width = `40%`;
        if (time.remainTime < sixtyPercent) progress.style.width = `60%`;
        if (time.remainTime < fourtyPercent) progress.style.width = `80%`;
        if (time.remainTime < twentyPercent) progress.style.width = `100%`;
        if (time.remainTime <= 1) {
            clearInterval(timerUpdate);
        };
    },1000);
};

// Modal para crear una tarea o un proyecto
// integrar un localstorage para los proyectos 
// integrar los timer
// integrar las settings del proyecto
// corregir el problema de botones al filtrar en Home y Project (posible solucion que los botones se agregen desde el js con un id especifico que diga estoy en Home o project)
// arreglar el problema de estilos en el timer (z-index) 