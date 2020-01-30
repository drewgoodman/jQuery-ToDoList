
var taskPrimaryList = [
    "Program a completed To-Do List",
    "Become a jQuery master"
];
var taskCompletedList = [
    "Learn basic jQuery",
    "Start an HTML page",
    "Create variables"
];

function buildTaskItem(taskString, taskID, completed = false) {
    var taskAdded = document.createElement("div");
    let updateIcon = document.createElement("i");
    let trashIcon = document.createElement("i");
    trashIcon.className = "fas fa-trash-alt trash-icon icon";
    completed ? (
        updateIcon.className = "fas fa-undo undo-icon icon"
    ) : (
            updateIcon.className = "fas fa-check-square complete-icon icon"
        );
    taskAdded.className = "task-todo task";
    taskAdded.append(taskString, updateIcon, trashIcon)
    taskAdded.taskID = taskID;

    return taskAdded;
}

function initTaskData() {
    for (task in taskPrimaryList) {
        $("#todo-priority").append(buildTaskItem(taskPrimaryList[task], task));
    };
    for (task in taskCompletedList) {
        $("#todo-completed").append(buildTaskItem(taskCompletedList[task], task, true));
    };
    updateTaskCount();
}

function updateTaskCount() {
    $("#primary-count").text(`Primary Tasks (${taskPrimaryList.length})`);
    $("#completed-count").text(`Completed Tasks (${taskCompletedList.length})`);
}

$(document).ready(function () {

    $("#todo-form").submit(function (event) {
        event.preventDefault();
        newTaskText = $("#todo-input-text").val();
        taskPrimaryList.unshift(newTaskText);
        $("#todo-priority").first().append(buildTaskItem(newTaskText, taskPrimaryList.length - 1));
        updateTaskCount();
        $("#todo-input-text").val("");
    })

    initTaskData();

})

$(document).on('click', '.complete-icon', function () {
    alert("Complete this!");
})


$(document).on('click', '.trash-icon', function () {
    alert("Delete this!");
})


$(document).on('click', '.undo-icon', function () {
    alert("Undo this!");
})