import { taskList } from '../constants'
export class Model {
    constructor(title) {
        this.title = title;
        this.completed = false;
    }
    createTemplate(task, index) {
        return `<div class="taskBlock">
                    <li class="title ${task.completed ? 'checked' : ''}">${task.title}</li>
                    <div class="optButt">
                        <input onclick="controller.completeTask(${index})" type="checkbox" class=checkButt ${task.completed ? 'checked' : ''}>
                        <button onclick="controller.editTask(${index})" class="penButt"><img src="./img/pen.png" alt="" width="20px"></button>
                        <button onclick="controller.deleteTask(${index})" class="trashButt"><img src="./img/trash.png" alt="" width="20px"></button>
                    </div>
                </div>`
    }
    updateLocal() {
        localStorage.setItem('taskList', JSON.stringify(taskList))
    }

}