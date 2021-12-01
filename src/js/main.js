import '../css/duListLight.css'
import { DOM } from './dom'
const logo = require('../img/logo.png')
const check = require('../img/check.png')
const pen = require('../img/pen.png')
const trash = require('../img/trash.png')

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
                        <img id="${index}" class="penButt" src="./img/pen.png" alt="" width="20px">
                        <img id="${index}" class="trashButt" src="./img/trash.png" alt="" width="20px">
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
        DOM.task.innerHTML = "";
        if (taskList.length > 0) {
            taskList.forEach((item, index) => {
                DOM.task.innerHTML += model.createTemplate(item, index);
            })
            itemsElem = document.querySelectorAll('.title');
        }
    }
}
const view = new View();
view.displayTask();

class Controller {
    constructor() {

    }
    fillTask() {
        if (DOM.textArea.value === "") {
            return
        }
        taskList.push(new Model(DOM.textArea.value));
        model.updateLocal();
        view.displayTask();
        DOM.textArea.value = "";
    }
    checkClass(e) {
        if (e.target.className === 'penButt') {
            controller.editTask(e.target.id)
        }
        else if (e.target.className === 'checkButt') {
            controller.completeTask(e.target.id)
        }
        else if (e.target.className === 'trashButt') {
            controller.deleteTask(e.target.id)
        }
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
        DOM.textArea.value = taskList[index].title;
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
DOM.addTask.addEventListener('click', controller.fillTask);
DOM.task.addEventListener('click', controller.checkClass)
