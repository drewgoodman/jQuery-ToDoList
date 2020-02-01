
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
    var taskAdded = $("<div></div>",
        {
            "class": completed ? "task-complete task" : "task-todo task",
            "status": completed ? "complete" : "active",
            "taskID": taskID
        });
    let taskText = $("<div></div>", { "class": "task-text" }).text(taskList[taskID]);
    let updateIcon = $("<i></i>", { "class": completed ? "fas fa-undo undo-icon icon" : "fas fa-check-square complete-icon icon" })
    let trashIcon = $("<i></i>", { "class": "fas fa-trash-alt trash-icon icon" })
    taskAdded.append(taskText, updateIcon, trashIcon)

    return taskAdded;
}

function initTaskData() {
    for (task in taskPrimaryList) {
        $("#todo-priority").append(buildTaskItem(taskPrimaryList, task));
    };
    for (task in taskCompletedList) {
        $("#todo-completed").append(buildTaskItem(taskCompletedList, task, completed = true));
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
        var newTask = $(buildTaskItem(taskPrimaryList, 0)).hide();
        $("#todo-priority").children().first().after(newTask);
        newTask.show(300);

        updateTaskCount();

        $("#todo-input-text").val("");
    })

    function deleteTask(taskRef) {
        // MUST grab attribute BEFORE being hidden
        let status = taskRef.parent().attr("status");
        let taskID = taskRef.parent().index() - 1;
        console.log(taskID);

        taskRef.parent().hide(300, function () {
            if (status === "active") {
                taskPrimaryList.splice(taskID, 1);
            } else {
                taskCompletedList.splice(taskID, 1);
            }
            ($(this)).remove();
            updateTaskCount();
            console.log(taskPrimaryList);
            console.log(taskCompletedList);
        });

    }

    $(document).on('click', '.trash-icon', function () {
        deleteTask($(this));
    })


    initTaskData();

})


$(document).on('click', '.complete-icon', function () {
    alert("Complete this!");
})


$(document).on('click', '.undo-icon', function () {
    alert("Undo this!");
})