// Variables

const form = document.querySelector("#cotizar-seguro");
const spinner = document.querySelector("#spinner");
const resultado = document.querySelector("#resultado");
const cargando = document.querySelector("#cargando");
const cotizarSeguroBtn = document.querySelector(".cotizar-seguro");

// Constructores

function Seguro(marca, year, tipo) {
  this.marca = marca;
  this.year = year;
  this.tipo = tipo;
}

Seguro.prototype.cotizarSeguro = function () {
  let cantidad;
  const base = 2000;
  const diferenciaYear = new Date().getFullYear() - this.year;
  switch (this.marca) {
    case "1":
      cantidad = base * 1.15;
      break;
    case "2":
      cantidad = base * 1.05;
      break;
    case "3":
      cantidad = base * 1.35;
      break;
    default:
      break;
  }
  cantidad -= (diferenciaYear * 3 * cantidad) / 100;

  if (this.tipo === "basico") {
    cantidad *= 1.3;
  } else {
    cantidad *= 1.5;
  }

  return Math.round(cantidad);
};

function UI() {}

UI.prototype.llenarYears = () => {
  const max = new Date().getFullYear();
  const min = max - 20;
  const selectYear = document.querySelector("#year");

  for (let y = max; y >= min; y--) {
    let option = document.createElement("OPTION");
    option.value = y;
    option.textContent = y;
    selectYear.appendChild(option);
  }
};

UI.prototype.mostrarMensaje = (mensaje, control) => {
  const p = document.createElement("P");
  if (resultado.previousElementSibling.nodeName === "P") {
    resultado.previousElementSibling.remove();
  }
  if (control) {
    cargando.style.display = "block";
    p.textContent = mensaje;
    p.classList.add("correcto", "mt-10");
  } else {
    p.textContent = mensaje;
    p.classList.add("error", "mt-10");
  }
  form.insertBefore(p, resultado);
  setTimeout(() => {
    cargando.style.display = "none";
    if (resultado.previousElementSibling.nodeName === "P") {
      resultado.previousElementSibling.remove();
    }
    cotizarSeguroBtn.disabled = false;
    cotizarSeguroBtn.classList.remove("disabled");
  }, 3000);
};

UI.prototype.resumen = function (marca, year, tipo, total) {
  const resumenContainer = document.createElement("DIV");
  const marca_ =
    marca === "1"
      ? "Americano"
      : marca === "2"
      ? "Asiático"
      : marca === "3"
      ? "Europeo"
      : "";
  const tipo_ = tipo === "basico" ? "básico" : "completo";
  const formatter = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  });
  resumenContainer.classList.add("mt-10");
  resumenContainer.innerHTML = `
        <p class="header">Resumen: </p>
        <p class="font-bold">Marca: <span class="font-normal">${marca_}</span></p>
        <p class="font-bold">Año: <span class="font-normal">${year}</span></p>
        <p class="font-bold">Tipo: <span class="font-normal capitalize">${tipo_}</span></p>
        <p class="font-bold">Total: <span class="font-normal">${formatter.format(
          total
        )} MXN</span></p>
    `;
  resultado.appendChild(resumenContainer);
};

const ui = new UI(); // Instanciando UI

// Eventos

document.addEventListener("DOMContentLoaded", () => {
  ui.llenarYears();
});

form.addEventListener("submit", validarSeguro);

// Funciones

function validarSeguro(e) {
  e.preventDefault();

  if (resultado.hasChildNodes()) {
    resultado.removeChild(resultado.firstElementChild);
  }

  cotizarSeguroBtn.disabled = true;
  cotizarSeguroBtn.classList.add("disabled");

  // Lectura de marca
  const marca = document.querySelector("#marca").value;

  // Lectura de año
  const year = document.querySelector("#year").value;

  // Lecutra de tipo
  const tipo = document.querySelector('input[name="tipo"]:checked').value;

  if (marca === "" || year === "" || tipo === "") {
    ui.mostrarMensaje(
      "Faltan datos, revisa el formulario y prueba de nuevo",
      false
    );
    return;
  }

  ui.mostrarMensaje("Cotizando", true);
  const seguro = new Seguro(marca, year, tipo);
  const total = seguro.cotizarSeguro();
  setTimeout(() => {
    ui.resumen(marca, year, tipo, total);
  }, 3000);
}
