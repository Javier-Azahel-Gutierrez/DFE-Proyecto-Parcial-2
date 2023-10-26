class Task {
    constructor(id, titulo, tarea, state, prioridad, tag, limitDate){
        this.id = id;
        this.titulo = titulo;
        this.tarea = tarea;
        this.state = state;
        this.prioridad = prioridad;
        this.tag = tag;
        this.limitDate = limitDate;
    }
}

function mapAPIToTasks(data) {
    return data.map(item => {
        return new Task(
            item.id,
            item.titulo,
            item.tarea,
            item.state,
            item.prioridad,
            item.tag,
            new Date(item.limitDate),
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
        <td>${task.id}</td>
        <td>${task.titulo}</td>
        <td>${task.tarea}</td>
        <td>${task.state}</td>
        <td>${task.prioridad}</td>
        <td>${task.tag}</td>
        <td>${new Date(task.limitDate).toISOString().substring(0,10)}</td>
        <td>
          <button class="btn-edit" idTask="${task.id}">Eliminar</button>
        </td>
        <td>
          <button class="btn-delete" idTask="${task.id}">Eliminar</button>
        </td>
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

const showFilter = document.getElementById('newTask');
showFilter.addEventListener("click", () => {
    document.getElementById('add-section').style.display = "flex";
    showFilter.style.display = "none";
})

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
    const idTarea = document.getElementById('videogame-name').value;
    console.log(idVideoGame);
    const titulo = document.getElementById('customer-name-field').value;
    const tarea = document.getElementById('videogame-name').options[document.getElementById('videogame-name').selectedIndex].text.split(' - ')[0];
    const state = document.getElementById('salesman-field').value;
    const prioridad = document.getElementById('salesman-field').value;
    const tag = document.getElementById('salesman-field').value;
    const limitdate = document.getElementById('sale-date-field').value;

    const taskToSave = new Task(
        idTarea,
        titulo,
        tarea,
        state,
        prioridad,
        tag,
        limitdate,
    );

    console.log(saleToSave);
    createSale(saleToSave);
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