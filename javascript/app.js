const taskBox = document.querySelector('.task-box');
const newTaskBtn = document.getElementById('add-btn');

newTaskBtn.addEventListener('click', () => {
    modal();
    createTask();
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
        </form>`

    document.body.insertAdjacentElement('beforeend', modal)
};

function createTask() {
    const createBtn = document.getElementById('create-btn');

    createBtn.addEventListener('click', () => {
        const task = getFormData();
        if (task) {
            storeTask(task);
            let elem = document.createElement('div');
            elem.classList.add('task');
            elem.innerHTML = `
            <div class="task-info">
                    <p class="task__name">${task.name}</p>
                    <p class="task__time">${task.date}</p>
                </div>
                <div class="task-btn">
                    <input type="checkbox" id="task-status" class="task__status">
                <div class="settings">
                    <i class='bx bx-dots-vertical-rounded'></i>
                </div>
            </div>`;

            taskBox.append(elem);
            document.body.removeChild(document.querySelector('.modal'));
        };
    });

    function getFormData() {
        const name = document.getElementById('name').value;
        const date = document.getElementById('date').value;

        if (name !== '' && date !== '') {
            return {
                id: Math.floor(Math.random() * 1000),
                name: name,
                date: date,
                status: 'todo',
            };
        };
    };

    function storeTask(task) {
        let taskStorage = JSON.parse(localStorage.getItem('tasks'));
        let obj = [];

        obj.push(task);

        if (taskStorage) {
            for (i = 0; i < taskStorage.length; i++) {
                obj.push({
                    id: taskStorage[i].id,
                    name: taskStorage[i].name,
                    date: taskStorage[i].date,
                    status: taskStorage[i].status,
                });
            };
        };
        
        console.log(obj);
        localStorage.setItem('tasks', JSON.stringify(obj));
    };
};