var formEl = document.querySelector("#task-form")
var taskToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");
var taskInProgressEl = document.querySelector("#tasks-in-progress");
var taskCompletedEl = document.querySelector("#tasks-completed");

var taskFormHandler = function (event){
    
    event.preventDefault();
    var taskNAmeInput = document.querySelector("input[name = 'task-name'] ").value;
    var taskTypeInput = document.querySelector("select[name= 'task-type']").value;
   

     //check if input values are empty strings

   if (!taskNAmeInput || !taskTypeInput){
    alert("you need to fill out the task form !")

    return false
    
   }

   formEl.reset();
   var isEdit = formEl.hasAttribute("data-task-id");

   // has data attribute, so get task id and call function to complete process
   if(isEdit){
    var taskId = formEl.getAttribute("data-task-id");
    completeEditTask(taskNAmeInput, taskTypeInput, taskId)
   }

   // no data attribute so create object as normal and pass to creeate taskel function 

   else {
    var taskDataObj = {
        name : taskNAmeInput,
        type : taskTypeInput
    };

    createTaskEl(taskDataObj);
   }

   // package up data as an object
   var taskDataObj = {
    name : taskNAmeInput,
    type : taskTypeInput
   };

  
   //send it as an argument to createtaskel

    
    
};

var createTaskEl = function(taskDataObj){

    // create list item
var listItemEl = document.createElement("li");
listItemEl.className = "task-item";

// add task id as a custom attribute
listItemEl.setAttribute("data-task-id" , taskIdCounter)
// create div to hold a task info and add to list item

var taskInfoEl = document.createElement("div")

// give class name
taskInfoEl.className = "task-info";

//add HTML content to de div

taskInfoEl.innerHTML = "<h3 class= 'task-name'>" + taskDataObj.name + "</h3> <span class = 'task-type'>" + taskDataObj.type + "</span>";

listItemEl.appendChild(taskInfoEl)
// add entire list item to list
var taskActionEl = createTaskActions(taskIdCounter);
listItemEl.appendChild(taskActionEl)

taskToDoEl.appendChild(listItemEl);

// increase task counter for next unique id

taskIdCounter++;
}
var createTaskActions = function(taskId){
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // create edit button 
    var editButtonEL = document.createElement("button");
    editButtonEL.textContent="Edit";
    editButtonEL.className = "btn edit-btn";
    editButtonEL.setAttribute ("data-task-id", taskId)

    actionContainerEl.appendChild(editButtonEL);

    // create delete button 
    
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl)

    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status"
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId)

    actionContainerEl.appendChild(statusSelectEl)

    var statusChoices = ["To do","In Progress", "completed"];

    for (var i = 0; i < statusChoices.length; i++){
        //create option element 
        var statusOptionEl = document.createElement("option")
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i])

        // apend to select
        statusSelectEl.appendChild(statusOptionEl)
    }

    return actionContainerEl;
}


var taskButtonHandler = function(event){
   var targetEl = event.target;

   // edit button was clicked
   if (targetEl.matches(".edit-btn")){
    console.log("edit", targetEl)
    var taskId = targetEl.getAttribute("data-task-id")
    editTask(taskId);
   }

   // delete button was clicked 
    else if (event.target.matches(".delete-btn")){
        console.log("delete", targetEl)
       // get elements task id 
       var taskId = event.target.getAttribute("data-task-id")
       deleteTask(taskId)
    }
};

var deleteTask = function(taskId){
    console.log(taskId)

    // find task list elemt with task id value and remove it 
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "'] ")
        taskSelected.remove();
 
};

var taskStatusChangeHandler = function(event){
    console.log(event.target.value);

    // find task list item based on event.target's data-task-id attribute
    var taskId = event.target.getAttribute("data-task-id");
  
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  
    // convert value to lower case
    var statusValue = event.target.value.toLowerCase();
  
    if (statusValue === "to do") {
      taskToDoEl.appendChild(taskSelected);
    } else if (statusValue === "in progress") {
      taskInProgressEl.appendChild(taskSelected);
    } else if (statusValue === "completed") {
      taskCompletedEl.appendChild(taskSelected);
    }

};

var editTask = function(taskId){
console.log(taskId)
    // get task list item element

    var taskSelected = document.querySelector(".task-item[data-task-id= '" + taskId + "']");

    // get content from task name and type 
    var taskName = taskSelected.querySelector("h3.task-name").textContent

    var taskType = document.querySelector("span.task-type").textContent;

// write values of taskname and tasktype to form to be edited
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;

    // set data atribute to the form with a value of the task id 
    formEl.setAttribute("data-task-id", taskId);
}

var completeEditTask = function(taskname , tasktype, taskId){
    // find the matching task list item 

    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "'] ");

    //set new values
    taskSelected.querySelector("h3.task-name").textContent = "taskName"
    taskSelected.querySelector("span.task-type").textContent = "tasktype";

    alert("Task has been updated")

    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "add-task"
};




pageContentEl.addEventListener ("change", taskStatusChangeHandler)
formEl.addEventListener("submit",  taskFormHandler);

pageContentEl.addEventListener("click", taskButtonHandler);