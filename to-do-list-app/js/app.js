// Variables

const listaTareas = document.querySelector("#lista-tareas");
const contenido = document.querySelector("#contenido");
const crearTarea = document.querySelector(".crear-tarea");
const tareas = document.querySelector(".tareas");
const keys = [];

// Eventos

cargarEventos();

function cargarEventos() {
  document.addEventListener("DOMContentLoaded", () => {
    for (let k of Object.keys(localStorage)) {
      keys.push(k);
    }
    keys.sort((a, b) => a - b);
    keys.forEach((k) => agregarTarea(k));
    comprobarTareas();
  });

  listaTareas.addEventListener("click", (e) => {
    if (e.target.classList.contains("borrar-tarea")) {
      e.target.parentElement.remove();
      actualizarLocalStorage();
    }
  });

  crearTarea.addEventListener("click", crearTareaNueva);
}

// Funciones

function crearTareaNueva() {
  const li = document.createElement("LI");
  const aceptar = document.createElement("IMG");
  const nuevaTarea = document.createElement("INPUT");

  crearTarea.classList.add("display-none");

  aceptar.src = "./img/aceptar.png";
  aceptar.alt = "aceptar";
  aceptar.classList.add("aceptar");
  aceptar.onclick = validarTarea;
  nuevaTarea.type = "text";
  nuevaTarea.placeholder = "Escribe aquí tu tarea";
  nuevaTarea.classList.add("nueva-tarea");
  li.id = "nueva-tarea";

  li.appendChild(nuevaTarea);
  li.appendChild(aceptar);
  listaTareas.appendChild(li);
}

function comprobarTareas() {
  if (listaTareas.children.length === 0) {
    const caption = document.createElement("P");
    caption.textContent = "No tienes tareas pendientes, comienza creando una!";
    caption.classList.add("caption");
    tareas.insertBefore(caption, crearTarea);
  } else if (document.querySelector(".caption")) {
    tareas.removeChild(document.querySelector(".caption"));
  }
}

function actualizarLocalStorage() {
  localStorage.clear();
  for (let li of listaTareas.children) {
    if (li.id === "nueva-tarea") {
      continue;
    }
    const id = li.getAttribute("data-tarea-id").toString();
    const text = li.textContent;
    localStorage.setItem(id, text);
  }
  comprobarTareas();
}

function validarTarea() {
  const nuevaTarea = document.querySelector(".nueva-tarea");
  if (nuevaTarea.value.trim() === "") {
    mensajeError();
  } else {
    agregarTarea();
    crearTarea.classList.remove("display-none");
  }
}

function agregarTarea(k = "") {
  const nuevaTarea = document.querySelector(".nueva-tarea");
  const tarea = document.createElement("LI");
  const borrarTarea = document.createElement("IMG");
  const idNuevo = Date.now();

  if (document.querySelector("#nueva-tarea")) {
    listaTareas.removeChild(document.querySelector("#nueva-tarea"));
  }

  if (k) {
    tarea.setAttribute("data-tarea-id", parseInt(k));
    borrarTarea.src = "./img/borrar.png";
    borrarTarea.alt = "borrar tarea";
    borrarTarea.classList.add("borrar-tarea");
    tarea.textContent = localStorage.getItem(k);
    tarea.appendChild(borrarTarea);
    listaTareas.appendChild(tarea);
  } else {
    tarea.setAttribute("data-tarea-id", idNuevo);
    borrarTarea.src = "./img/borrar.png";
    borrarTarea.alt = "borrar tarea";
    borrarTarea.classList.add("borrar-tarea");
    tarea.textContent = nuevaTarea.value;
    tarea.appendChild(borrarTarea);
    listaTareas.appendChild(tarea);
    actualizarLocalStorage();
  }
}

function mensajeError() {
  borrarMensajeError();
  const mensaje = document.createElement("P");
  mensaje.textContent = "Error: no puedes agregar una tarea vacía.";
  mensaje.classList.add("error");
  contenido.appendChild(mensaje);
  setTimeout(() => {
    borrarMensajeError();
  }, 3000);
}

function borrarMensajeError() {
  if (contenido.lastElementChild.nodeName === "P") {
    contenido.removeChild(contenido.lastChild);
  }
}
