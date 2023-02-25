// Variables

const contenedor = document.querySelector(".contenedor");
const listaAutos = document.querySelector("#resultado");
const selectMarca = document.querySelector("#marca");
const selectYear = document.querySelector("#year");
const selectMinimo = document.querySelector("#minimo");
const selectMaximo = document.querySelector("#maximo");
const selectPuertas = document.querySelector("#puertas");
const selectTransmision = document.querySelector("#transmision");
const selectColor = document.querySelector("#color");

const max = new Date().getFullYear();
const min = max - 10;

const datosBusqueda = {
  marca: "",
  year: "",
  minimo: "",
  maximo: "",
  puertas: "",
  transmision: "",
  color: "",
};

// Eventos

document.addEventListener("DOMContentLoaded", () => {
  cargarAutos(autos);
  llenarSelect();

  selectMarca.addEventListener("change", (e) => {
    datosBusqueda.marca = e.target.value;
    filtrarAutos();
  });

  selectYear.addEventListener("change", (e) => {
    datosBusqueda.year = e.target.value;
    filtrarAutos();
  });

  selectMinimo.addEventListener("change", (e) => {
    datosBusqueda.minimo = e.target.value;
    filtrarAutos();
  });

  selectMaximo.addEventListener("change", (e) => {
    datosBusqueda.maximo = e.target.value;
    filtrarAutos();
  });

  selectPuertas.addEventListener("change", (e) => {
    datosBusqueda.puertas = e.target.value;
    filtrarAutos();
  });

  selectTransmision.addEventListener("change", (e) => {
    datosBusqueda.transmision = e.target.value;
    filtrarAutos();
  });

  selectColor.addEventListener("change", (e) => {
    datosBusqueda.color = e.target.value;
    filtrarAutos();
  });
});

// Funciones

function cargarAutos(autosList) {
  limpiarHTML();
  autosList.forEach((auto) => {
    const { marca, modelo, year, puertas, precio, color } = auto;
    let { transmision } = auto;
    const autoDiv = document.createElement("DIV");
    const modeloCompleto = document.createElement("P");
    const caracteristicas = document.createElement("P");
    const precioAuto = document.createElement("P");
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });

    if (transmision === "automatico") {
      transmision = "automático";
    }

    modeloCompleto.textContent = `${marca} ${modelo} - ${year}`;
    caracteristicas.textContent = `${puertas} puertas, ${transmision}, color ${color}`;
    precioAuto.textContent = `${formatter.format(precio)} USD`;

    modeloCompleto.classList.add("modelo-completo");
    caracteristicas.classList.add("caracteristicas");
    precioAuto.classList.add("precio-auto");

    autoDiv.appendChild(modeloCompleto);
    autoDiv.appendChild(caracteristicas);
    autoDiv.appendChild(precioAuto);
    listaAutos.appendChild(autoDiv);
  });
}

function limpiarHTML() {
  while (listaAutos.firstChild) {
    listaAutos.removeChild(listaAutos.firstChild);
  }
}

function llenarSelect() {
  for (let y = max; y >= min; y--) {
    const optionYear = document.createElement("OPTION");
    optionYear.textContent = y;
    optionYear.value = y;

    selectYear.appendChild(optionYear);
  }
}

function filtrarAutos() {
  const filtro = autos
    .filter(filtrarMarca)
    .filter(filtrarYear)
    .filter(filtrarMin)
    .filter(filtrarMax)
    .filter(filtrarPuertas)
    .filter(filtrarTransmision)
    .filter(filtrarColor);
  cargarAutos(filtro);
  if (filtro.length === 0) {
    if (contenedor.lastChild.nodeName === "P") {
      return;
    }
    const mensaje = document.createElement("P");
    mensaje.textContent = "No hay resultados";
    mensaje.classList.add("alerta");
    contenedor.appendChild(mensaje);
  } else if (contenedor.lastChild.nodeName === "P") {
    contenedor.removeChild(contenedor.lastChild);
  }
}

function filtrarMarca(auto) {
  const { marca } = datosBusqueda;
  if (marca) {
    return auto.marca === marca;
  }
  return auto;
}

function filtrarYear(auto) {
  const { year } = datosBusqueda;
  if (year) {
    return auto.year === parseInt(year);
  }
  return auto;
}

function filtrarMin(auto) {
  const { minimo } = datosBusqueda;
  if (minimo) {
    return auto.precio >= parseInt(minimo);
  }
  return auto;
}

function filtrarMax(auto) {
  const { maximo } = datosBusqueda;
  if (maximo) {
    return auto.precio <= parseInt(maximo);
  }
  return auto;
}

function filtrarPuertas(auto) {
  const { puertas } = datosBusqueda;
  if (puertas) {
    return auto.puertas === parseInt(puertas);
  }
  return auto;
}

function filtrarTransmision(auto) {
  const { transmision } = datosBusqueda;
  if (transmision) {
    return auto.transmision === transmision;
  }
  return auto;
}

function filtrarColor(auto) {
  const { color } = datosBusqueda;
  if (color) {
    return auto.color === color;
  }
  return auto;
}
