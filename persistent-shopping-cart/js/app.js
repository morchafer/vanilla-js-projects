// Variables
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");

cargarEventListeners();
function cargarEventListeners() {
  document.addEventListener("DOMContentLoaded", () => {
    let dataLS = localStorage.getItem("courseData");
    dataLS = JSON.parse(dataLS);
    dataLS.forEach((curso) => {
      cargarDatosCurso(curso);
    });
  });
  listaCursos.addEventListener("click", agregarCurso);
  carrito.addEventListener("click", borrarCurso);
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
}

// Funciones
function vaciarCarrito() {
  const cursosActuales = document.querySelectorAll("tbody tr");
  cursosActuales.forEach((curso) => curso.remove());
  sincronizarLocalStorage();
}

function borrarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    e.target.parentElement.parentElement.remove();
    sincronizarLocalStorage();
  }
}

function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    leerDatosCurso(e.target);
  }
}

function leerDatosCurso(eTarget) {
  const datosCurso = eTarget.parentElement.parentElement;
  const imagenCurso = datosCurso.children[0].src;
  const tituloCurso = datosCurso.children[1].querySelector("h4").textContent;
  const precioCurso =
    datosCurso.children[1].querySelector(".precio span").textContent;
  const idCurso = datosCurso.querySelector("a").getAttribute("data-id");
  const infoCurso = {
    imagen: imagenCurso,
    nombre: tituloCurso,
    precio: precioCurso,
    cantidad: 1,
    id: idCurso,
  };
  cargarDatosCurso(infoCurso);
}

function cargarDatosCurso(iCurso) {
  const { imagen, nombre, precio, cantidad, id } = iCurso;

  const filaInfoCurso = document.createElement("TR");
  const celdaImagen = document.createElement("TD");
  const celdaNombre = document.createElement("TD");
  const celdaPrecio = document.createElement("TD");
  const celdaCantidad = document.createElement("TD");
  const celdaBorrar = document.createElement("TD");
  const imgCurso = document.createElement("IMG");
  const borrarCursoBtn = document.createElement("A");

  imgCurso.src = imagen;
  imgCurso.width = "100";
  celdaImagen.appendChild(imgCurso);
  celdaNombre.textContent = nombre;
  celdaPrecio.textContent = precio;
  borrarCursoBtn.href = "#";
  borrarCursoBtn.classList.add("borrar-curso");
  borrarCursoBtn.setAttribute("data-id", id);
  borrarCursoBtn.textContent = "X";
  celdaCantidad.textContent = cantidad;
  celdaBorrar.appendChild(borrarCursoBtn);
  filaInfoCurso.appendChild(celdaImagen);
  filaInfoCurso.appendChild(celdaNombre);
  filaInfoCurso.appendChild(celdaPrecio);
  filaInfoCurso.appendChild(celdaCantidad);
  filaInfoCurso.appendChild(celdaBorrar);

  let idActual = borrarCursoBtn.getAttribute("data-id");
  renderizarInfoCurso(idActual, filaInfoCurso);
}

function renderizarInfoCurso(idAct, filaCurso) {
  let contenedorCarritoActual = contenedorCarrito.querySelectorAll("a");
  for (let a of contenedorCarritoActual) {
    let idIterando = a.getAttribute("data-id");
    let cantidadActual = parseInt(
      a.parentElement.previousElementSibling.textContent
    );
    if (idAct === idIterando) {
      a.parentElement.previousElementSibling.textContent = cantidadActual + 1;
      sincronizarLocalStorage();
      return;
    }
  }
  contenedorCarrito.appendChild(filaCurso);
  sincronizarLocalStorage();
}

function sincronizarLocalStorage() {
  const arrCursos = [];
  const dataCursos = carrito.querySelector("tbody").children;
  for (let tr of dataCursos) {
    let infoTr = {};
    let i = -1;
    infoTr.imagen = tr.children[++i].firstElementChild.src;
    infoTr.nombre = tr.children[++i].textContent;
    infoTr.precio = tr.children[++i].textContent;
    infoTr.cantidad = tr.children[++i].textContent;
    infoTr.id = tr.children[++i].firstElementChild.dataset.id;
    arrCursos.push(infoTr);
  }
  localStorage.setItem("courseData", JSON.stringify(arrCursos));
}
