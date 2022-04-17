const addBtn = document.getElementById('add-btn');
const main = document.querySelector('.main');
const tab = document.querySelector('.tab');
const projectBox = document.querySelector('.project-box');
const tasksBox = document.querySelector('.task-box');
const displayTasks = document.getElementById('displayTask');
const displayProject = document.getElementById('displayProject');
const darkmode = document.getElementById('dark');
const lightmode = document.getElementById('light');

document.addEventListener('DOMContentLoaded', showAll('all'));

addBtn.addEventListener('click', modal);

lightmode.addEventListener('click', (e) => {
    lightmode.classList.remove('active');
    darkmode.classList.add('active');
    document.body.classList.remove('light');
    document.body.classList.add('dark');
});

darkmode.addEventListener('click', (e) => {
    darkmode.classList.remove('active');
    lightmode.classList.add('active');
    document.body.classList.remove('dark');
    document.body.classList.add('light');
});

tab.addEventListener('click', (e) => {
    if (e.target.id === 'all-btn') {
        removeActiveBtns();
        document.getElementById(e.target.id).classList.add('active');
        showAll('all');
        setTimer();
    };
    if (e.target.id === 'todo-btn') {
        removeActiveBtns();
        document.getElementById(e.target.id).classList.add('active');
        showAll('todo');
        setTimer();
    }
    if (e.target.id === 'completed-btn') {
        removeActiveBtns();
        document.getElementById(e.target.id).classList.add('active');
        showAll('completed');
        setTimer();
    };
});

function removeActiveBtns() {
    document.getElementById('all-btn').classList.remove('active');
    document.getElementById('todo-btn').classList.remove('active');
    document.getElementById('completed-btn').classList.remove('active');
};

displayTasks.addEventListener('click', () => {
    projectBox.classList.remove('active');
    tasksBox.classList.add('active');
    projectBox.innerHTML = '';
    showAll('all');
});

displayProject.addEventListener('click', () => {
    tasksBox.classList.remove('active');
    projectBox.classList.add('active');
    tasksBox.innerHTML = '';
    showAll('all');
    setTimer();
});

function modal() {
    if (document.querySelector('.modal')) main.removeChild(document.querySelector('.modal'));
    if (document.querySelector('.create')) return null;

    const elem = document.createElement('div');
    elem.classList.add('modal');
    elem.innerHTML = ` 
            <div class="modal__project" id="projectModal">
                <p>Project</p>
                <i class='bx bx-task'></i>
            </div>
            <div class="modal__task" id="taskModal">
                <p>Task</p>
                <i class='bx bx-spreadsheet'></i>
            </div>`;

    main.insertAdjacentElement('beforeend', elem);
    choose();

};

function choose() {
    const modal = document.querySelector('.modal');

    modal.addEventListener('click', (e) => {

        if (e.target.id === 'taskModal' || e.target.parentElement.id === 'taskModal') {
            main.removeChild(modal);
            const elem = document.createElement('div');
            elem.classList.add('create');
            elem.innerHTML = `                        
            <div>
                <p class="create__p">Add Task</p>
            </div>
            <form class="create-form">
                <input type="text" id="task-name" class="create__btn" placeholder="Task name">
                <input type="text" id="task-date" class="create__btn" placeholder="Deadline Date">
                <button class="create__btn-submit" id="task-btn" type="button">Create</button>
            </form>`;
            main.insertAdjacentElement('beforeend', elem);
            createTask()
        }

        if (e.target.id === 'projectModal' || e.target.parentElement.id === 'projectModal') {
            main.removeChild(modal);
            const elem = document.createElement('div');
            elem.classList.add('create');
            elem.innerHTML = `                        
            <div>
                <p class="create__p">Add Project</p>
            </div>
            <form class="create-form">
                <input type="text" id="project-name" class="create__btn" placeholder="Project name">
                <input type="datetime-local" id="project-date" class="create__btn">
                <button class="create__btn-submit" id="project-btn" type="button">Create Project</button>
            </form>`;
            main.insertAdjacentElement('beforeend', elem);

            createProject();
        };
    });
};

function createProject() {
    document.getElementById('project-btn').addEventListener('click', saveProject);

    function saveProject(e) {
        const name = document.getElementById('project-name').value;
        const date = document.getElementById('project-date').value;

        const project = {
            id: `${Math.floor(Math.random() * 1000)}`,
            name,
            date,
            status: 'todo',
        };

        if (!sessionStorage.getItem('projects')) {
            let projects = [];
            projects.push(project);
            sessionStorage.setItem('projects', JSON.stringify(projects));
        } else {
            let projects = JSON.parse(sessionStorage.getItem('projects'));
            projects.push(project);
            sessionStorage.setItem('projects', JSON.stringify(projects));
        };

        main.removeChild(document.querySelector('.create'));
        e.preventDefault();
        showAll('all');
    };
};

function createTask() {
    document.getElementById('task-btn').addEventListener('click', saveTask);

    function saveTask(e) {
        const name = document.getElementById('task-name').value;
        const date = document.getElementById('task-date').value;

        const task = {
            id: `${Math.floor(Math.random() * 1000)}`,
            name,
            date,
            status: 'todo',
        };

        if (!sessionStorage.getItem('tasks')) {
            let tasks = [];
            tasks.push(task);
            sessionStorage.setItem('tasks', JSON.stringify(tasks));
        } else {
            let tasks = JSON.parse(sessionStorage.getItem('tasks'));
            tasks.push(task);
            sessionStorage.setItem('tasks', JSON.stringify(tasks));
        };
        
        main.removeChild(document.querySelector('.create'));
        e.preventDefault();
        showAll('all');
    };
};

function showAll(status) {

    if (projectBox.classList.contains('active')) {
        if (!JSON.parse(sessionStorage.getItem('projects'))) return null;
        let projects = JSON.parse(sessionStorage.getItem('projects'));

        if (status === 'all') showProjects(projects);
        if (status === 'todo') showProjects(projects.filter(item => item.status === status));
        if (status === 'completed') showProjects(projects.filter(item => item.status === status));
    }

    if (tasksBox.classList.contains('active')) {
        if (!JSON.parse(sessionStorage.getItem('tasks'))) return null;
        let tasks = JSON.parse(sessionStorage.getItem('tasks'));

        if (status === 'all') showTasks(tasks);
        if (status === 'todo') showTasks(tasks.filter(item => item.status === status));
        if (status === 'completed') showTasks(tasks.filter(item => item.status === status));
    };
};

function showProjects(projects) {
    let elem = '';

    projects.forEach((item) => {
        elem += `
                <article class="project" data-id="${item.id}">
                    <div class="project-top">
                        <p class="project__title">${item.name}</p>
                        <div class="project__settings">
                            <i class='bx bx-dots-vertical-rounded'></i>
                        </div>
                    </div>
                    <div>
                        <p class="project__date">${item.date}</p>
                    </div>
                    <div class="project-date">
                        <div class="project-dateDetails">
                            <span>0 / 0</span>
                        </div>
                        <p class="project__leftime">0 days left</p>
                    </div>
                    <div class="progress">
                        <div class="progress-bar"></div>
                    </div>
                </article>
                `;
    });
    projectBox.innerHTML = elem;
};

function showTasks(tasks) {
    let elem = '';

    tasks.forEach((item) => {
        elem += `<article class="task" data-id="${item.id}">
                        <div class="task-text">
                            <p class="task__title">${item.name}</p>
                            <span class="task__date">${item.date}</span>
                        </div>
                        <div class="task-btn">
                            <div class="delete-btn" onclick="deleteTask(this)">
                                <i class='bx bxs-trash-alt'></i>
                            </div> 
                            <input type="checkbox" onclick="updateStatus(this)">
                        </div>
                    </article>`;
    });

    tasksBox.innerHTML = elem;
};

function deleteTask(selectedTask) {
    const id = selectedTask.parentElement.parentElement.dataset.id;
    let tasks = JSON.parse(sessionStorage.getItem('tasks'));

    for (i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks.splice(i, 1);
        };
    };

    sessionStorage.setItem('tasks', JSON.stringify(tasks));
    tasksBox.removeChild(selectedTask.parentElement.parentElement);
};

function updateStatus(selectedTask) {
    const id = selectedTask.parentElement.parentElement.dataset.id;
    let tasks = JSON.parse(sessionStorage.getItem('tasks'));

    for (i = 0; i < tasks.length; i++) {
        if (selectedTask.checked && tasks[i].id === id) {
            tasks[i].status = 'completed';
        }
        if (!selectedTask.checked && tasks[i].id === id) {
            tasks[i].status = 'todo';
        }
    };
    sessionStorage.setItem('tasks', JSON.stringify(tasks));
    tasksBox.removeChild(selectedTask.parentElement.parentElement);
};

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

const countdown = (deadline, progressBar, dateDetails, daysLeft) => {
    let totalTime = getRemainTime(deadline);

    let twentyPercent = (totalTime.remainTime * 20) / 100;
    let fourtyPercent = (totalTime.remainTime * 40) / 100;
    let sixtyPercent = (totalTime.remainTime * 60) / 100;
    let eightyPercent = (totalTime.remainTime * 80) / 100;
    let hundredtyPercent = (totalTime.remainTime * 100) / 100;

    const timerUpdate = setInterval(() => {
        let time = getRemainTime(deadline);

        dateDetails.textContent = `${time.remainDays} / ${totalTime.remainDays}`;
        daysLeft.textContent = `${time.remainDays} days left`;

        if (time.remainDays < 0) {
            dateDetails.textContent = '0 / 0';
            daysLeft.textContent = 'Completed';
            updateProjectStatus(daysLeft.parentElement.parentElement);
        }

        if (time.remainTime < hundredtyPercent) progressBar.style.width = `0%`;
        if (time.remainTime < eightyPercent) progressBar.style.width = `20%`;
        if (time.remainTime < sixtyPercent) progressBar.style.width = `40%`;
        if (time.remainTime < fourtyPercent) progressBar.style.width = `60%`;
        if (time.remainTime < twentyPercent) progressBar.style.width = `100%`;
        if (time.remainTime <= 1) {
            clearInterval(timerUpdate);
        };
    }, 1000);
};

function setTimer() {
    const projects = document.querySelectorAll('.project');

    projects.forEach(item => {

        const deadline = item.children[1].lastElementChild.textContent;
        const progressBar = item.children[3].lastElementChild;
        const dateDetails = item.children[2].firstElementChild.firstElementChild;
        const daysLeft = item.children[2].lastElementChild;

        countdown(deadline, progressBar, dateDetails, daysLeft);
    });
};

function updateProjectStatus(element) {
    const id = element.dataset.id;
    let projects = JSON.parse(sessionStorage.getItem('projects'));

    for (i = 0; i < projects.length; i++) {
        if (projects[i].id === id) projects[i].status = 'completed';
    };
    sessionStorage.setItem('projects', JSON.stringify(projects));
};

// Dar toques finales al css y js