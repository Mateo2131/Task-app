const addBtn = document.getElementById('add-btn');
const main = document.querySelector('.main');
const tab = document.querySelector('.tab');
const projectBox = document.querySelector('.project-box');
const tasksBox = document.querySelector('.task-box');
const displayTasks = document.getElementById('displayTask');
const displayProject = document.getElementById('displayProject');

addBtn.addEventListener('click', () => {
    modal();
});

tab.addEventListener('click', (e) => {
    if (e.target.id === 'all-btn') showAll('all');
    if (e.target.id === 'todo-btn') showAll('todo');
    if (e.target.id === 'completed-btn') showAll('completed');
});

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

        if (!localStorage.getItem('projects')) {
            let projects = [];
            projects.push(project);
            localStorage.setItem('projects', JSON.stringify(projects));
        } else {
            let projects = JSON.parse(localStorage.getItem('projects'));
            projects.push(project);
            localStorage.setItem('projects', JSON.stringify(projects));
        };

        main.removeChild(document.querySelector('.create'));
        e.preventDefault();
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

        if (!localStorage.getItem('tasks')) {
            let tasks = [];
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        } else {
            let tasks = JSON.parse(localStorage.getItem('tasks'));
            tasks.push(task);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        };

        main.removeChild(document.querySelector('.create'));
        e.preventDefault();
    };
};

function showAll(status) {

    if (projectBox.classList.contains('active')) {
        let projects = JSON.parse(localStorage.getItem('projects'));

        if (status === 'all') showProjects(projects);
        if (status === 'todo') showProjects(projects.filter(item => item.status === status));
        if (status === 'completed') showProjects(projects.filter(item => item.status === status));
    }

    if (tasksBox.classList.contains('active')) {
        let tasks = JSON.parse(localStorage.getItem('tasks'));

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
                            <span>70 / 90</span>
                        </div>
                        <p class="project__leftime">8 days left</p>
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
    let tasks = JSON.parse(localStorage.getItem('tasks'));

    for (i = 0; i < tasks.length; i++) {
        if (tasks[i].id === id) {
            tasks.splice(i, 1);
            console.log(tasks)
        };
    };
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateStatus(selectedTask) {
    const id = selectedTask.parentElement.parentElement.dataset.id;
    let tasks = JSON.parse(localStorage.getItem('tasks'));

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
    
    const timerUpdate = setInterval( () => {
        let time = getRemainTime(deadline);

        dateDetails.textContent = `${time.remainDays} / ${totalTime.remainDays}`;
        daysLeft.textContent = `${time.remainDays} days left`;
        
        if (time.remainDays < 0) {
            dateDetails.textContent = '0 / 0';
            daysLeft.textContent = 'Completed';
            updateProjectStatus(daysLeft.parentElement.parentElement);
        }

        if (time.remainTime < hundredtyPercent) progressBar.style.width = `20%`;
        if (time.remainTime < eightyPercent) progressBar.style.width = `40%`;
        if (time.remainTime < sixtyPercent) progressBar.style.width = `60%`;
        if (time.remainTime < fourtyPercent) progressBar.style.width = `80%`;
        if (time.remainTime < twentyPercent) progressBar.style.width = `100%`;
        if (time.remainTime <= 1) {
            clearInterval(timerUpdate);
        };
    },1000);
};

function setTimer() {
    const projects = document.querySelectorAll('.project');

    projects.forEach( item => {
        
        const deadline = item.children[1].lastElementChild.textContent;
        const progressBar = item.children[3].lastElementChild;
        const dateDetails = item.children[2].firstElementChild.firstElementChild;
        const daysLeft = item.children[2].lastElementChild;
        
        countdown(deadline,progressBar,dateDetails,daysLeft);
    });
};

function updateProjectStatus(element) {
    const id = element.dataset.id;
    let projects = JSON.parse(localStorage.getItem('projects'));

    for (i = 0; i < projects.length; i++) {
        if (projects[i].id === id) projects[i].status = 'completed';
    };
    localStorage.setItem('projects', JSON.stringify(projects));
};

// Agregar un padding a las secciones asi no queda bajo el nav
// Borrar tarea y editar su estado (lo mismo con proyectos)
// funcionalidades del proyecto
// agregar el darkmode
// Dar toques finales al css y js
// Al no existir tareas los botones no funcionan (evitar que tiren alertas)