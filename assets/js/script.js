var formEl = document.querySelector("#task-form")
var taskToDoEl = document.querySelector("#tasks-to-do");

var createTaskHandler = function (event){
    
    event.preventDefault();

    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new task.";
    taskToDoEl.appendChild(listItemEl);
    console.log(event)
    
};
formEl.addEventListener("submit",  createTaskHandler)