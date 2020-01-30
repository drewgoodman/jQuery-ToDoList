
var taskPrimaryList = [
    "Program a completed To-Do List",
    "Become a jQuery master"
];
var taskCompletedList = [
    "Learn basic jQuery",
    "Start an HTML page",
    "Create variables"
];

function buildTaskItem(taskList, taskID, completed = false) {
    var taskAdded = document.createElement("div");
    let updateIcon = document.createElement("i");
    let trashIcon = document.createElement("i");
    trashIcon.className = "fas fa-trash-alt trash-icon icon";
    if (completed) {
        updateIcon.className = "fas fa-undo undo-icon icon"
        taskAdded.setAttribute("status", "complete");
    } else {
        updateIcon.className = "fas fa-check-square complete-icon icon"
        taskAdded.setAttribute("status", "active");
    }

    taskAdded.className = "task-todo task";
    taskAdded.append(taskList[taskID], updateIcon, trashIcon)
    taskAdded.setAttribute("taskID", taskID);

    return taskAdded;
}

function initTaskData() {
    for (task in taskPrimaryList) {
        $("#todo-priority").append(buildTaskItem(taskPrimaryList, task)).show(300);
    };
    for (task in taskCompletedList) {
        $("#todo-completed").append(buildTaskItem(taskCompletedList, task, true));
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
        $("#todo-priority").children().first().after(buildTaskItem(taskPrimaryList, 0));
        console.log(taskPrimaryList);
        updateTaskCount();
        $("#todo-input-text").val("");
    })

    $(document).on('click', '.trash-icon', function () {
        // MUST grab attribute BEFORE being hidden
        let status = $(this).parent().attr("status");
        let taskID = $(this).parent().index() - 1;
        $(this).parent().hide(300, function () {
            if(status==="active") {
                taskPrimaryList.splice(taskID,1);
            } else {
                taskCompletedList.splice(taskID,1);
            }
            $(this).remove();
            updateTaskCount();
            console.log(taskPrimaryList);
            console.log(taskCompletedList);
        });

    })


    initTaskData();

})


$(document).on('click', '.complete-icon', function () {
    alert("Complete this!");
})


$(document).on('click', '.undo-icon', function () {
    alert("Undo this!");
})