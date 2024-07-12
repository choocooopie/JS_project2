let userInput = document.querySelector(".task-input");
let addButton = document.querySelector(".button-add");
let tabs = document.querySelectorAll(".tab-type div");
let underLine = document.getElementById("tab-underline");
let taskList = [];
let mode = "all";
let filterList = [];

addButton.addEventListener("mousedown", addTask);
userInput.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    addTask(event);
  }
});
for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

function addTask() {
  let taskValue = userInput.value;
  if (taskValue === "") return alert("오늘의 할일을 입력해주세요");
  let task = {
    content: taskValue,
    isComplete: false,
    id: randomIDGenerator(),
    isInProgress: false // 새로운 속성 추가
  };

  taskList.push(task);
  userInput.value = "";
  render();
}

function render() {
  let result = "";
  let list = [];
  if (mode === "all") {
    list = taskList;
  } else {
    list = filterList;
  }

  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete) {
      result += `<div class="task task-done" id="${list[i].id}">
            <span>${list[i].content}</span>
            <div class="button-box">
            <button onclick="toggleDone('${list[i].id}')"><i class="fas fa-undo-alt"></i></button>
            <button onclick="toggleInProgress('${list[i].id}')"><i class="fa fa-play"></i></button>
            <button onclick="deleteTask('${list[i].id}')"><i class="fa fa-trash"></i></button>
            </div>
        </div>`;
    } else if (list[i].isInProgress) {
      result += `<div class="task task-in-progress" id="${list[i].id}">
            <span>${list[i].content}</span>
            <div class="button-box">
            <button onclick="toggleDone('${list[i].id}')"><i class="fa fa-check"></i></button>
            <button onclick="toggleInProgress('${list[i].id}')"><i class="fa fa-pause"></i></button>
            <button onclick="deleteTask('${list[i].id}')"><i class="fa fa-trash"></i></button>
            </div>
        </div>`;
    } else {
      result += `<div class="task" id="${list[i].id}" >
            <span>${list[i].content}</span>
            <div class="button-box">
            <button onclick="toggleDone('${list[i].id}')"><i class="fa fa-check"></i></button>
            <button onclick="toggleInProgress('${list[i].id}')"><i class="fa fa-play"></i></button>
            <button onclick="deleteTask('${list[i].id}')"><i class="fa fa-trash"></i></button>
            </div>
        </div>`;
    } 
  }

  document.getElementById("task-board").innerHTML = result;
}

function toggleDone(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      taskList[i].isInProgress = false; // 완료 시 진행 중 상태 해제
      break;
    }
  }
  filter();
}

function toggleInProgress(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList[i].isInProgress = !taskList[i].isInProgress;
      if (taskList[i].isInProgress) {
        taskList[i].isComplete = false; // 진행 중일 때 완료 상태 해제
      }
      break;
    }
  }
  filter();
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList.splice(i, 1);
      break;
    }
  }
  filter();
}

function filter(e) {
  if (e) {
    mode = e.target.id;
    underLine.style.width = e.target.offsetWidth + "px";
    underLine.style.left = e.target.offsetLeft + "px";
    underLine.style.top = e.target.offsetTop + (e.target.offsetHeight - 4) + "px";
  }

  filterList = [];
  if (mode === "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (!taskList[i].isComplete && taskList[i].isInProgress) {
        filterList.push(taskList[i]);
      }
    }
  } else if (mode === "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete) {
        filterList.push(taskList[i]);
      }
    }
  } else if (mode === "inProgress") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isInProgress) {
        filterList.push(taskList[i]);
      }
    }
  } else {
    filterList = taskList;
  }
  render();
}

function randomIDGenerator() {
  return "_" + Math.random().toString(36).substr(2, 9);
}


