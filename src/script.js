import { fetchAPI } from "./shared/fetch-api.js";

const tablaBody = document.getElementById('data-table-body');
const result = await fetchAPI('tasks', 'GET');
const formulario = document.getElementById('add-form');
console.log(result);

displayTasksTable(result);

class Task {
    constructor(title, description, completed, priority, tag, dueDate) {
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.priority = priority;
        this.tag = tag;
        this.dueDate = dueDate;
    }
}

// Botones

const guardar = document.getElementById('addTask');

// listeners

tablaBody.addEventListener('click', async (e) => {
    const name = e.target.name;
    const id = e.target.getAttribute('data-id');
    if (name === 'eliminar') {
        await deleteTask(id);
    }
    if (name==='editar') {
        const result = await fetchAPI('tasks/'+id,'GET');
        document.getElementById('editar').value = 'editar';
        document.getElementById('id').value = id;
        document.getElementById('taskTitle').value = result.title;
        document.getElementById('taskDetail').value = result.description;
        document.getElementById('addState').value = (result.completed)?'Finalizada':'Pendiente';
        document.getElementById('addPrioridad').value = result.priority;
        document.getElementById('addTag').value = result.tag;
        document.getElementById('addLimitDate').value = result.dueDate;
    }
});

guardar.addEventListener('click', (e) => {
    e.preventDefault();
    const id = document.getElementById('id');
    const editar = document.getElementById('editar').value;
    if (editar === 'editar') {
        document.getElementById('editar').value = '';
        processUpdateTask();
        formulario.reset();
        return;
    }
    processCreateTask();
    formulario.reset();
});

//#region Table

function message(color, message) {
    let mensaje = document.getElementById('message');
    mensaje.getElementsByTagName('p')[0].innerHTML = message;
    let messageClassList = mensaje.className.split(' ');
    messageClassList.pop();
    messageClassList.push(color);
    mensaje.className = messageClassList.join(' ');
    console.log(mensaje.className);
    mensaje.classList.replace('top-[-5rem]', 'top-[5rem]');
    setTimeout(() => {
        mensaje.classList.replace('top-[5rem]', 'top-[-5rem]')
    }, 3000);
}

function displayTasksTable(tasks) {

    tasks.forEach(task => {
        inyect(task);
    });
}

function inyect(task) {
    console.log(task);
    const row = document.createElement('tr');
    row.className = 'hover:bg-slate-100 bg-slate-50 transition-all';
    row.innerHTML = `
    <td class="p-3">${task.id}</td>
    <td class="p-3">${task.title}</td>
    <td class="p-3">${task.description}</td>
    <td class="p-3">${(task.completed) ? 'Finalizada' : 'Pendiente'}</td>
    <td class="p-3">${task.priority}</td>
    <td class="p-3">${task.tag}</td>
    <td class="p-3">${(new Date(task.dueDate)).toISOString().substring(0, 10)}</td>
    <td class="p-3"><button data-id=${task.id} class="bg-blue-500 hover:bg-blue-600 transition ease-in-out text-white py-1 px-3 rounded-md" name="editar">
        Editar
    </button></td>
    <td class="p-3"><button data-id=${task.id} class="bg-red-500 hover:bg-red-600 transition ease-in-out text-white py-1 px-3 rounded-md" name="eliminar">
        Eliminar    
    </button></td>
  `;
    tablaBody.appendChild(row);
}

function clearTable() {
    const tableBody = document.getElementById('data-table-body');
    tableBody.innerHTML = '';
}

function processCreateTask() {
    const title = document.getElementById('taskTitle').value;
    const desription = document.getElementById('taskDetail').value;
    const completed = document.getElementById('addState').value;
    const priority = document.getElementById('addPrioridad').value;
    const tag = document.getElementById('addTag').value;
    const dueDate = document.getElementById('addLimitDate').value;

    if (
        title !== '' ||
        desription !== '' ||
        completed !== '' ||
        priority !== '' ||
        tag !== '' ||
        dueDate !== '') {
        const taskToSave = new Task(
            title,
            desription,
            ((completed === 'Pendiente') ? false : true),
            priority,
            tag,
            dueDate,
        );
        message('bg-green-500', 'Tarea creada correctamente');
        console.log(taskToSave);
        createTask(taskToSave);
        return;
    }
    message('bg-red-500', 'Llena los campos requeridos');
}
//#endregion Create NEW TASKS
function processUpdateTask() {
    const id = document.getElementById('id').value;
    const title = document.getElementById('taskTitle').value;
    const desription = document.getElementById('taskDetail').value;
    const completed = document.getElementById('addState').value;
    const priority = document.getElementById('addPrioridad').value;
    const tag = document.getElementById('addTag').value;
    const dueDate = document.getElementById('addLimitDate').value;

    if (
        title !== '' ||
        desription !== '' ||
        completed !== '' ||
        priority !== '' ||
        tag !== '' ||
        dueDate !== '') {
        const taskToSave = new Task(
            title,
            desription,
            ((completed === 'Pendiente') ? false : true),
            priority,
            tag,
            dueDate,
        );
        message('bg-green-500', 'Tarea actualizada correctamente');
        console.log(taskToSave);
        putTask(id,taskToSave);
        return;
    }
    message('bg-red-500', 'Llena los campos requeridos');
}

async function createTask(task) {
    const result = await fetchAPI('tasks', 'POST', task);
    inyect(result);
}

async function deleteTask(id) {
    await fetchAPI('tasks/' + id, 'DELETE');
    clearTable();
    const result = await fetchAPI('tasks', 'GET');
    displayTasksTable(result);
    message('bg-green-500','Tarea eliminada correctamente');
}

async function putTask(id,task){
    await fetchAPI('tasks/'+id, 'PUT', task);
    clearTable();
    const result = await fetchAPI('tasks','GET');
    displayTasksTable(result);
}

