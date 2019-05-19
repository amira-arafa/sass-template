var formSubmit = document.querySelector("form"),
    task = 0,
    allTasks = [],
    // allTasks,
    action;
formSubmit.onsubmit = function (e) {

    e.preventDefault();
    // allTasks.push(allTasks)
    var inputValue = e.target[0].value;
    if (inputValue == "") {
        alert("Enter Task")
    }
    else {
        action = true;
        task=allTasks.length+1;
        var taskStatus = {};
        var Progress = document.querySelector(".Progress");
        var divValue = document.createElement("p");
        divValue.appendChild(document.createTextNode(inputValue));
        Progress.appendChild(divValue);
        divValue.setAttribute("id", "newpagragh" + task);
        divValue.setAttribute("draggable", "true");
        divValue.setAttribute("ondragstart", "dragstart(event)");
        divValue.setAttribute("ondragover", "dragOverP(event)");
        console.log(divValue);
        taskStatus.task = task;//id
        taskStatus.title = inputValue;//value of input
        taskStatus.taskElementId = divValue.id;//Id of element contain input value
        taskStatus.operation = divValue.parentElement.id;//Method equal to Progress 
        console.log(divValue.parentElement.id);
        allTasks.push(taskStatus);//contain all task in one array (array of object)
        localStorage.setItem("allTasks", JSON.stringify(allTasks));
        localStorage.setItem("action", action);
        // console.log(e.target[0].value ,typeof(e.target[0].value))
        // console.log(inputValue);
        // console.log(divValue,taskStatus.title)
        console.log(allTasks);
    }
}

function dragstart(event) {
    // console.log("dragstart")
    // console.log(event.target.id,event.target )
    event.dataTransfer.setData("p", event.target.id)
    // console.log(event.target.id)
}
function drop(event) {
    var getElement = event.dataTransfer.getData("p");
    var elem = event.target.id//id of operation
    allTasks = JSON.parse(localStorage.getItem("allTasks"));
    document.querySelector("#" + elem).appendChild(document.querySelector("#" + getElement))
    console.log("drop     ", getElement)
    allTasks.map(function (elementdrop) {
        if (elementdrop.taskElementId == getElement) {
            elementdrop.operation = elem;
            localStorage.setItem("allTasks", JSON.stringify(allTasks));
        } else {
            elementdrop.operation = elementdrop.operation;
        }
        console.log(elementdrop)

    })

}
function dragover(event) {
    event.preventDefault();
    console.log("drag over")
}
function dragOverP(event) {
    event.stopPropagation();
}
window.onload = function () {
    if (localStorage.getItem("action") === "true") {
        allTasks = JSON.parse(localStorage.getItem("allTasks"));
        allTasks.map(function (elem, index) {
            console.log(elem, index)
            var divValue = document.createElement("p");
            var operation = document.getElementById(elem.operation)
            divValue.appendChild(document.createTextNode(elem.title));
            operation.appendChild(divValue);
            divValue.setAttribute("id", "newpagragh" + elem.task);
            divValue.setAttribute("draggable", "true");
            divValue.setAttribute("ondragstart", "dragstart(event)");
            divValue.setAttribute("ondragover", "dragOverP(event)");
        })
        // console.log(allTasks,typeof(allTasks))
    } else {
        console.log("Dont have any task")
    }
}