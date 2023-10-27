import { fetchAPI } from "./shared/fetch-api.js";

const result = await fetchAPI('tasks','GET');
console.log(result);

displayTasksTable(result);

class Task {
    constructor(title, description, completed, priority, tag, dueDate){
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.priority = priority;
        this.tag = tag;
        this.dueDate = dueDate;
    }
}

function mapAPIToTasks(data) {
    return data.map(item => {
        return new Task(
            item.title,
            item.description,
            item.completed,
            item.priority,
            item.tag,
            (new Date(item.dueDate)).toISOString().substring(0,10),
        );
    });
}

//#region Table

function displayTasksTable(tasks) {
    const tablaBody = document.getElementById('data-table-body');

    tasks.forEach(task => {
        console.log(task);
        const row = document.createElement('tr');
        row.innerHTML = `
        <td class="p-3">${task.id}</td>
        <td class="p-3">${task.title}</td>
        <td class="p-3">${task.decription}</td>
        <td class="p-3">${task.completed}</td>
        <td class="p-3">${task.proprity}</td>
        <td class="p-3">${task.tag}</td>
        <td class="p-3">${(new Date(task.dueDate)).toISOString().substring(0,10)}</td>
        <td class="p-3"><button data=id=${task.id} class="bg-blue-500 hover:bg-blue-600 transition ease-in-out text-white py-1 px-3 rounded-md" name="editar">
            Editar
        </button></td>
        <td class="p-3"><button data=id=${task.id} class="bg-red-500 hover:bg-red-600 transition ease-in-out text-white py-1 px-3 rounded-md" name="eliminar">
            Elimin
        ar</button></td>
      `;
        tablaBody.appendChild(row);
    });
    initEditTaskButtonHandler();
    initDeleteSaleButtonHandler();
}

//#region mensajes
function clearTable() {
    const tableBody = document.getElementById('data-table-body');
    tableBody.innerHTML = '';
}

function showLoadingMessage() {
    const message = document.getElementById('message');
    message.innerHTML = 'Cargando...';
    message.style.display = 'block';
}

function showNotFoundMessage() {
    const message = document.getElementById('message');
    message.innerHTML = 'No se encontraron Tareas/Task por realizar. ¡¿Bien hecho...?!';
    message.style.display = 'block';
}

function hideMessage() {
    const message = document.getElementById('message');
    message.style.display = 'none';
}
//#endregion mensajes

//#region show/hide new task



//#endregion show/hide new task

//#region Create NEW TASKS
function initAddSaleButtonsHandler() {

    document.getElementById('addSale').addEventListener('click', () => {
        openAddSaleModal()
    });

    document.getElementById('modal-background').addEventListener('click', () => {
        closeAddSaleModal();
    });

    document.getElementById('sale-form').addEventListener('submit', event => {
        event.preventDefault();
        processSubmitSale();
    });
}

function processCreateTask() {
    const title = document.getElementById('customer-name-field').value;
    const desription = document.getElementById('videogame-name').options[document.getElementById('videogame-name').selectedIndex].text.split(' - ')[0];
    const completed = document.getElementById('salesman-field').value;
    const priority = document.getElementById('salesman-field').value;
    const tag = document.getElementById('salesman-field').value;
    const dueDate = document.getElementById('sale-date-field').value;

    const taskToSave = new Task(
        title,
        desription,
        completed,
        priority,
        tag,
        dueDate,
    );

    console.log(taskToSave);
    createSale(taskToSave);
}
//#endregion Create NEW TASKS

//#region EDIT  tasks

//#endregion EDIT  tasks

//#region API's¿¿


//#endregion API's¿¿

//#region buttons
//#region edit button
function initEditTaskButtonHandler() {
    document.querySelectorAll('.btn-edit').forEach(button => {
        button.addEventListener('click', () => {
            const taskId = button.getAttribute('idTask'); // Obtenemos el ID de la venta
            console.log(taskId);
            
            //putTask(taskId); // Llamamos a la función para editar la venta
        });
    });
}

function putTask(taskId) {
    const confirm = window.confirm(`¿Estás seguro de que deseas editar la venta ${taskId}?`);
    if (confirm) {
        fetchAPI(`https://653485e2e1b6f4c59046c7c7.mockapi.io/api/users/219209037/${taskId}`, 'PUT')
            .then(() => {
                //resetSales(); //FALTA traerlo
                window.alert("Task editada.");
            });
    }
}
//#endregion edit button

//#region delete button
function initDeleteSaleButtonHandler() {
    document.querySelectorAll('.btn-delete').forEach(button => {
        button.addEventListener('click', () => {
            const taskId = button.getAttribute('idTask'); // Obtenemos el ID de la venta
            console.log(taskId);
            
            //deleteSale(taskId); // Llamamos a la función para eleminar la venta
        });
    });
}

function deleteSale(saleId) {
    const confirm = window.confirm(`¿Estás seguro de que deseas eliminar la Tarea/Task? ${saleId}?`);
    if (confirm) {
        fetchAPI(`https://653485e2e1b6f4c59046c7c7.mockapi.io/api/users/219209037/${saleId}`, 'DELETE')
            .then(() => {
               // resetSales(); //FALTA traerlo
                window.alert("Task eliminada.");
            });
    }
}
//#endregion delete button


//#endregion buttons