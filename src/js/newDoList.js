const textArea = document.querySelector('.textArea');
const addTask = document.querySelector('.addTask');
const task = document.querySelector('.task');
const checkButt = document.querySelector('.checkButt');
const penButt = document.querySelector('.penButt');
const trashButt = document.querySelector('.trashButt');



let taskList;
!localStorage.taskList ? taskList = [] : taskList = JSON.parse(localStorage.getItem('task'));

let itemsElem = []

function Tasks(title) {
    this.title = title;
    this.completed = false;
}

const createTemplate = (task, index) => {
    return `<div class="taskBlock">
                <li class="title ${task.completed ? 'checked' : ''}">${task.title}</li>
                <div class="optButt">
                    <input onclick="completeTask(${index})" type="checkbox" class=checkButt ${task.completed ? 'checked' : ''}>
                    <button onclick="editTask(${index})" class="penButt"><img src="./img/pen.png" alt="" width="20px"></button>
                    <button onclick="deleteTask(${index})" class="trashButt"><img src="./img/trash.png" alt="" width="20px"></button>
                </div>
            </div>`
}

const displayTask = () => {
    task.innerHTML = "";
    if (taskList.length > 0) {
        taskList.forEach((item, index) => {
            task.innerHTML += createTemplate(item, index);
        })
        itemsElem = document.querySelectorAll('.title');
    }
}

displayTask();

const updateLocal = () => {
    localStorage.setItem('task', JSON.stringify(taskList))
}

const completeTask = index => {
    taskList[index].completed = !taskList[index].completed;
    if (taskList[index].completed) {
        itemsElem[index].classList.add('checked')
    }
    else {
        itemsElem[index].classList.remove('checked')
    }
    updateLocal();
    displayTask();
}

addTask.addEventListener('click', () => {
    if (textArea.value === "") {
        return
    }
    taskList.push(new Tasks(textArea.value));
    updateLocal();
    displayTask();
    textArea.value = "";
})

const deleteTask = index => {
    taskList.splice(index, 1);
    updateLocal();
    displayTask();
}

const editTask = index => {
    textArea.value = taskList[index].title;
    deleteTask();
    updateLocal();
    displayTask();
}