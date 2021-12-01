import '../css/duListLight.css'
const textArea = document.querySelector('.textArea');
const addTask = document.querySelector('.addTask');
const task = document.querySelector('.task');
const checkButt = document.querySelector('.checkButt')

let taskList;
!localStorage.taskList ? taskList = [] : taskList = JSON.parse(localStorage.getItem('taskList'));
let itemsElem = [];

class Model {
    constructor(title) {
        this.title = title;
        this.completed = false;
    }
    createTemplate(task, index) {
        return `<div class="taskBlock">
                    <li class="title ${task.completed ? 'checked' : ''}">${task.title}</li>
                    <div class="optButt">
                        <input id="${index}" type="checkbox" class=checkButt ${task.completed ? 'checked' : ''}>
                        <button onclick="controller.editTask(${index})" class="penButt"><img src="./img/pen.png" alt="" width="20px"></button>
                        <button onclick="controller.deleteTask(${index})" class="trashButt"><img src="./img/trash.png" alt="" width="20px"></button>
                    </div>
                </div>`
    }
    updateLocal() {
        localStorage.setItem('taskList', JSON.stringify(taskList))
    }

}
const model = new Model();

class View {
    constructor() {
        this.model = new Model()
    }
    displayTask() {
        task.innerHTML = "";
        if (taskList.length > 0) {
            taskList.forEach((item, index) => {
                task.innerHTML += model.createTemplate(item, index);
            })
            itemsElem = document.querySelectorAll('.title');
        }
    }
}
const view = new View();
view.displayTask();

class Controller {
    fillTask() {
        if (textArea.value === "") {
            return
        }
        taskList.push(new Model(textArea.value));
        model.updateLocal();
        console.log(this.model)
        view.displayTask();
        textArea.value = "";
    }
    completeTask(index) {
        taskList[index].completed = !taskList[index].completed;
        if (taskList[index].completed) {
            itemsElem[index].classList.add('checked')
        }
        else {
            itemsElem[index].classList.remove('checked')
        }
        model.updateLocal();
        view.displayTask();
    }
    editTask(index) {
        textArea.value = taskList[index].title;
        this.deleteTask();
        model.updateLocal();
        view.displayTask();
    }
    deleteTask(index) {
        taskList.splice(index, 1);
        model.updateLocal();
        view.displayTask();
    }
}
const controller = new Controller();
addTask.addEventListener('click', controller.fillTask);
checkButt.addEventListener('click', controller.completeTask.bind(null, checkButt.id))