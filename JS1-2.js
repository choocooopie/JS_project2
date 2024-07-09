let taskinput = document.getElementById("task-input")
let addbutton = document.getElementById("add-button")
let tasklist = []
addbutton.addEventListener("click", addtask)

function addtask() {
    let taskcontent = taskinput.value
    tasklist.push(taskcontent)
    console.log(tasklist)
    render()
}

function render() {
    let resultHTML = ''
    for(let i=0;i<tasklist.length;i++) {
        resultHTML += `<div class="task">
                    <div>${tasklist[i]}</div>
                    <div>
                        <button>Check</button>
                        <button>Delete</button>
                    </div>
                </div>`;
    }


    document.getElementById("task-board").innerHTML = resultHTML
}