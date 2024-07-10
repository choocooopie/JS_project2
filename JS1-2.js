let taskinput = document.getElementById("task-input")
let addbutton = document.getElementById("add-button")
let tabs = document.querySelectorAll("task-taks div")
let tasklist = []
addbutton.addEventListener("click", addtask)

function addtask() {
    let task = {
        id:randomidgenerate(),
        taskcontent: taskinput.value,
        iscomplete:false,
    }
    tasklist.push(task)
    console.log(tasklist)
    render()
}

function render() {
    let resultHTML = ""
    for(let i=0;i<tasklist.length;i++) {
        if(tasklist[i].iscomplete == true) {
            resultHTML += `<div class="task">
                    <div class="task-done">${tasklist[i].taskcontent}</div>
                    <div>
                        <button onclick="togglecomplete('${tasklist[i].id}')">Check</button>
                        <button onclick="deletetask('${tasklist[i].id}')">Delete</button>
                    </div>
                </div>`
        }else {
            resultHTML += `<div class="task">
                    <div>${tasklist[i].taskcontent}</div>
                    <div>
                        <button onclick="togglecomplete('${tasklist[i].id}')">Check</button>
                        <button onclick="deletetask('${tasklist[i].id}')">Delete</button>
                    </div>
                </div>`
        }
    }


    document.getElementById("task-board").innerHTML = resultHTML
}

function togglecomplete(id) {
    for(let i=0;i<tasklist.length;i++)
        if(tasklist[i].id == id){
            tasklist[i].iscomplete = !tasklist[i].iscomplete
            break
        }
    render()
}

function deletetask(id) {
    for(let i=0;i<tasklist.length;i++) {
        if(tasklist[i].id == id) {
            tasklist.splice(i,1)
            break
        }
    }
    render()
}

function randomidgenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}