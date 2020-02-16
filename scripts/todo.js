var taskPrimaryList = [
    "Program a completed To-Do List",
    "Become a jQuery master"
];
var taskCompletedList = [,
    "Add function for other flash messages",
    "Add flash notifications for input errors",
    "Add a background image",
    "Create a scroll to top button",
    "Deploy live version",
    "Create media queries for a mobile look",
    "Build completion and undo functions",
    "Test and debug task list changes",
    "Build a form to add tasks",
    "Create variables",
    "Start an HTML page",
    "Learn basic jQuery"
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

    function insertTask(completed = false) {
        var newTask = $(buildTaskItem(completed ? taskCompletedList: taskPrimaryList, 0, completed)).hide();
        var taskDiv = completed? $('#todo-completed') : $("#todo-priority")
        taskDiv.children().first().after(newTask);
        newTask.show(300);
    }


    function deleteTask(taskRef) {
        let status = taskRef.parent().attr("status");
        let taskID = taskRef.parent().index() - 1;

        taskRef.parent().hide(300, function () {
            // TODO: Maybe change the system to use child index instead of hardcoding task ID values?
            // console.log("Index is: ",$(this).index() - 1);

            if (status === "active") {
                taskPrimaryList.splice(taskID, 1);
            } else {
                taskCompletedList.splice(taskID, 1);
            }
            ($(this)).remove();
            updateTaskCount();
        });
    }


    function shiftTask(taskRef, complete) {
        insertTask(complete);
        deleteTask(taskRef);
        updateTaskCount();
    }


    function showFlashMessage(flashText, flashType) {
        $('#todo-flash').removeClass('flash-success flash-warning').hide();
        $('#todo-flash-msg').text(flashText)
        $('#todo-flash').addClass(`flash-${flashType}`).fadeIn(500);
    }


    $("#todo-form").submit(function (event) {
        event.preventDefault();

        if($("#todo-input-text").val().length > 4) {
            newTaskText = $("#todo-input-text").val();
            taskPrimaryList.unshift(newTaskText);
    
            insertTask();
            updateTaskCount();
            showFlashMessage("Task successfully added.", "success");
    
            $("#todo-input-text").val("");

        } else {
            showFlashMessage("Task must be at least 4 characters long.", "warning");
        }
    })


    $(document).on('click', '.trash-icon', function () {
        deleteTask($(this));
        showFlashMessage("Task successfully deleted.", "success");
    })


    $(document).on('click', '.complete-icon', function () {
        let completedTaskText = taskPrimaryList[$(this).parent().index() - 1];
        taskCompletedList.unshift(completedTaskText);
        shiftTask($(this), true);
        showFlashMessage("Task completed.", "success");
    })


    $(document).on('click', '.undo-icon', function () {
        let updatedTaskText = taskCompletedList[$(this).parent().index() -1];
        taskPrimaryList.unshift(updatedTaskText);
        shiftTask($(this), false);
        showFlashMessage("Task successfully re-added.", "success");
    })


    $(window).scroll(function(){
        if($(this).scrollTop() > 80) {
            $('.scroll-to-top').fadeIn();
        } else {
            $('.scroll-to-top').fadeOut();
        }
    })

    $('.scroll-to-top').click(function() {
        $('html, body').animate({scrollTop: 0}, 600);
        return false;
    })

    $('#todo-flash-close').click(function() {
        $('#todo-flash').fadeOut(500);
        return false;
    })


    $('#todo-flash').hide();
    initTaskData();

})


