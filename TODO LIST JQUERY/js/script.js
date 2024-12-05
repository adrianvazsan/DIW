// Referencias al DOM: obtenemos los elementos del documento HTML que vamos a utilizar
const nuevaTarea = document.getElementById('nuevaTarea'); // Campo de entrada para nueva tarea
const botonAñadir = document.getElementById('botonAñadir'); // Botón para añadir nueva tarea
const listaTareas = document.getElementById('listaTareas'); // Lista donde se mostrarán las tareas
const botonFiltrar = document.querySelectorAll('[filtrarDatos]'); // Botones para filtrar tareas

// Estado de las tareas: aquí almacenamos las tareas
let tareas = [];

// Función para renderizar tareas en la lista
function cargarTabla(filtro = 'Todos') {
  listaTareas.innerHTML = ''; // Limpiar la lista de tareas antes de cargar nuevas

  // Filtrar las tareas según el filtro seleccionado
  const filtroTareas = tareas.filter(task => {
    if (filtro === 'Todos') return true; // Mostrar todas las tareas
    if (filtro === 'Completados') return task.Completados; // Mostrar solo tareas completadas
    if (filtro === 'Pendientes') return !task.Completados; // Mostrar solo tareas pendientes
  });

  // Iterar sobre las tareas filtradas y crear elementos de lista
  filtroTareas.forEach((task, index) => {
    const elementosLista = document.createElement('li'); // Crear un nuevo elemento de lista
    elementosLista.className = `list-group-item d-flex justify-content-between align-items-center ${
      task.Completados ? 'list-group-item-success' : '' // Añadir clase si la tarea está completada
    }`;
    elementosLista.innerHTML = `
      <span class="${task.Completados ? 'text-decoration-line-through' : ''}">${task.text}</span>
      <div>
        <button class="btn btn-sm btn-success me-2" onclick="completarTarea(${index})">Completar</button>
        <button class="btn btn-sm btn-warning me-2" onclick="editarTarea(${index})">Editar</button>
        <button class="btn btn-sm btn-danger" onclick="eliminarTarea(${index})">Eliminar</button>
      </div>
    `;
    listaTareas.appendChild(elementosLista); // Añadir el elemento de lista a la lista de tareas
  });
}

// Añadir una nueva tarea cuando se hace clic en el botón
botonAñadir.addEventListener('click', () => {
  const tareaNueva = nuevaTarea.value.trim(); // Obtener el valor de la nueva tarea y eliminar espacios
  if (tareaNueva === '') return; // Evitar que se añadan tareas vacías
  tareas.push({ text: tareaNueva, Completados: false }); // Añadir la nueva tarea al array
  nuevaTarea.value = ''; // Limpiar el campo de entrada
  cargarTabla(); // Volver a cargar la tabla para mostrar la nueva tarea
});

// Completar tarea: cambia el estado de completado de la tarea
function completarTarea(index) {
  tareas[index].Completados = !tareas[index].Completados; // Cambiar el estado de completado
  cargarTabla(); // Volver a cargar la tabla para reflejar el cambio
}

// Editar tarea: permite editar el texto de una tarea existente
function editarTarea(index) {
  const newtareaNueva = prompt('Editar tarea:', tareas[index].text); // Pedir nuevo texto
  if (newtareaNueva) {
    tareas[index].text = newtareaNueva.trim(); // Actualizar el texto de la tarea
    cargarTabla(); // Volver a cargar la tabla
  }
}

// Eliminar tarea: elimina una tarea del array
function eliminarTarea(index) {
  tareas.splice(index, 1); // Eliminar la tarea del array
  cargarTabla(); // Volver a cargar la tabla
}

// Filtrar tareas: añade eventos a los botones de filtro
botonFiltrar.forEach(button => {
  button.addEventListener('click', () => {
    botonFiltrar.forEach(btn => btn.classList.remove('active')); // Quitar clase activa de todos los botones
    button.classList.add('active'); // Añadir clase activa al botón clicado
    cargarTabla(button.getAttribute('filtrarDatos')); // Cargar la tabla con el filtro seleccionado
  });
});

// Render inicial: cargar la tabla por primera vez
cargarTabla();