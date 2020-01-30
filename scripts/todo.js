
var taskPrimaryList = [
    "Program a completed To-Do List",
    "Become a jQuery master"
];
var taskCompletedList = [
    "Learn basic jQuery",
    "Start an HTML page",
    "Create variables"
];

$(document).ready(function() {

    function buildTaskItem(taskString, complete=false) {
        var taskAdded = document.createElement("div");

        let updateIcon = document.createElement("i");
        let trashIcon = document.createElement("i");
        trashIcon.className="fas fa-trash-alt red-icon icon";
        complete ? (
            updateIcon.className="fas fa-undo undo-icon icon"
        ) : (
            updateIcon.className="fas fa-check-square green-icon icon"
        );

        taskAdded.className = "task-todo task";

        taskAdded.innerHTML = taskString;
        taskAdded.append(taskString, updateIcon, trashIcon)
        return taskAdded;
    }

    function initTaskData() {
        for (task in taskPrimaryList) {
            $("#todo-priority").append(buildTaskItem(taskPrimaryList[task]));
        };
        for (task in taskCompletedList) {
            $("#todo-completed").append(buildTaskItem(taskCompletedList[task],true));
        };
        updateTaskCount();
    }

    function updateTaskCount() {
        $("#primary-count").text(`Primary Tasks (${taskPrimaryList.length})`);
        $("#completed-count").text(`Completed Tasks (${taskCompletedList.length})`);
    }

    $("#todo-form").submit(function(event) {
        event.preventDefault();
        newTaskText = $("#todo-input-text").val();
        taskPrimaryList.unshift(newTaskText);
        $("#todo-priority").first().append(buildTaskItem(newTaskText));
        updateTaskCount();
        $("#todo-input-text").val("");
    })

    initTaskData();

})