const form = document.getElementById('create-task-form');
const taskInput = document.getElementById('new-task-description');
const dueDateInput = document.getElementById('due-date');
const prioritySelect = document.getElementById('priority');
const taskList = document.getElementById('tasks');

// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to render tasks in the DOM
function renderTasks() {
    taskList.innerHTML = ''; // Clear existing tasks
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = `${task.description} (Due: ${task.dueDate})`;
        li.style.color = getColorByPriority(task.priority); // Set color based on priority
        
        // Create a delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTask(index);
        li.appendChild(deleteButton);
        
        // Create an edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editTask(index);
        li.appendChild(editButton);
        
        taskList.appendChild(li);
    });
}

// Function to get color based on priority
function getColorByPriority(priority) {
    switch (priority) {
        case 'high':
            return 'red';
        case 'medium':
            return 'orange';
        case 'low':
            return 'green';
        default:
            return 'black';
    }
}

// Function to add a task
function addTask(e) {
    e.preventDefault(); // Prevent default form submission

    const task = {
        description: taskInput.value,
        dueDate: dueDateInput.value,
        priority: prioritySelect.value,
    };
    
    tasks.push(task); // Add the task to the array
    saveTasks(); // Save tasks to local storage
    renderTasks(); // Render tasks

    // Clear input fields
    taskInput.value = '';
    dueDateInput.value = '';
    prioritySelect.value = 'low'; // Reset priority to low
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1); // Remove the task from the array
    saveTasks(); // Save updated tasks to local storage
    renderTasks(); // Re-render tasks
}

// Function to edit a task
function editTask(index) {
    const task = tasks[index];
    taskInput.value = task.description; // Populate input with task description
    dueDateInput.value = task.dueDate; // Populate input with due date
    prioritySelect.value = task.priority; // Populate input with priority

    // Remove the task for re-adding later
    deleteTask(index); 
    renderTasks(); // Re-render tasks
}

// Function to save tasks to local storage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Initial render
renderTasks();

// Event listener for form submission
form.addEventListener('submit', addTask);