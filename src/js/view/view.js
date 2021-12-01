import { Model } from '../model/model'
import { DOM } from '../dom'
import { taskList } from '../controller/controller'
export class View {
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
console.log(taskList.length)