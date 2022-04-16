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
                <input type="text" id="project-date" class="create__btn" placeholder="Deadline Date">
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
                <article class="project">
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
                            <span id="actualDate">70</span>
                            /
                            <span id="deadlineDate">90</span>
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
        elem += `<article class="task">
                        <div class="task-text">
                            <p class="task__title">${item.name}</p>
                            <span class="task__date">${item.date}</span>
                        </div>
                        <div class="task-btn">
                            <input type="checkbox">
                        </div>
                    </article>`;
    });

    tasksBox.innerHTML = elem;
};