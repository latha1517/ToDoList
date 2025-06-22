document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  createTaskElement(taskText);
  saveTask(taskText);
  taskInput.value = '';
}

function createTaskElement(taskText, isCompleted = false) {
  const taskList = document.getElementById('taskList');

  const li = document.createElement('li');
  li.textContent = taskText;
  if (isCompleted) li.classList.add('completed');

  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    updateStorage();
  });

  const delBtn = document.createElement('button');
  delBtn.textContent = 'Delete';
  delBtn.className = 'delete-btn';
  delBtn.onclick = (e) => {
    e.stopPropagation();
    li.remove();
    updateStorage();
  };

  li.appendChild(delBtn);
  taskList.appendChild(li);
}

function saveTask(taskText) {
  const tasks = getStoredTasks();
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getStoredTasks() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

function updateStorage() {
  const tasks = [];
  document.querySelectorAll('#taskList li').forEach(li => {
    const text = li.firstChild.textContent;
    const completed = li.classList.contains('completed');
    tasks.push({ text, completed });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = getStoredTasks();
  tasks.forEach(task => createTaskElement(task.text, task.completed));
}