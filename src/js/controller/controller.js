import { Model } from '../model/model';
const model = new Model();
import { View } from '../view/view';
const view = new View
import { DOM } from '../dom';
//import { taskList, itemsElem } from '../constants'
export let taskList = [{ title: 'sjgdhisjgjn', completed: false }];
export class Controller {
    constructor() {
        this.model = new Model
    }
    fillTask() {
        if (DOM.textArea.value === "") {
            return
        }
        taskList.push(new Model(DOM.textArea.value));
        model.updateLocal();
        console.log(this.model)
        view.displayTask();
        DOM.textArea.value = "";
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