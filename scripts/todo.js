
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

    function buildTaskItem(taskString) {
        var taskAdded = document.createElement("div");
        taskAdded.className = "task-todo task";
        taskAdded.innerHTML = taskString;
        return taskAdded;
    }

    function initTaskData() {
        for (task in taskPrimaryList) {
            $("#todo-priority").append(buildTaskItem(taskPrimaryList[task]));
        };
        for (task in taskCompletedList) {
            $("#todo-completed").append(buildTaskItem(taskCompletedList[task]));
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