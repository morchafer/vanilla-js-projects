document.addEventListener("DOMContentLoaded", function () {
  const correo = {
    email: "",
    cc: {
      estado: false,
      valor: "",
    },
    asunto: "",
    mensaje: "",
  };

  const inputEmail = document.querySelector("#email");
  const inputAsunto = document.querySelector("#asunto");
  const inputMensaje = document.querySelector("#mensaje");
  const formulario = document.querySelector("#formulario");
  const submit = formulario.querySelector('button[type="submit"]');
  const reset = formulario.querySelector('button[type="reset"]');
  const spinner = document.querySelector("#spinner");
  const emailCC = document.querySelector("#cc");

  inputEmail.addEventListener("input", validar);
  inputAsunto.addEventListener("input", validar);
  inputMensaje.addEventListener("input", validar);
  reset.addEventListener("click", (e) => {
    e.preventDefault();
    correo.email = "";
    correo.asunto = "";
    correo.mensaje = "";
    correo.cc = {
      estado: false,
      valor: "",
    };
    validarSubmit();
    formulario.querySelectorAll(".border-yellow-600").forEach((i) => {
      i.classList.replace("border-yellow-600", "border-gray-300");
    });
    formulario.querySelectorAll(".border-red-600").forEach((i) => {
      i.classList.replace("border-red-600", "border-gray-300");
    });
    if (formulario.lastElementChild.nodeName === "P") {
      formulario.lastElementChild.remove();
    }
    formulario.reset();
  });
  formulario.addEventListener("submit", enviarEmail);
  emailCC.addEventListener("input", validar);

  function mostrarMensajeEnviado() {
    let mensajeEnviado = document.createElement("P");
    mensajeEnviado.textContent = "Mensaje enviado exitosamente";
    mensajeEnviado.classList.add(
      "bg-green-600",
      "text-white",
      "p-2",
      "text-center"
    );
    formulario.appendChild(mensajeEnviado);
    setTimeout(() => {
      formulario.lastElementChild.remove();
    }, 3000);
  }

  function enviarEmail(e) {
    e.preventDefault();
    spinner.classList.replace("hidden", "flex");
    correo.email = "";
    correo.asunto = "";
    correo.mensaje = "";
    correo.cc = {
      estado: false,
      valor: "",
    };
    validarSubmit();
    setTimeout(() => {
      spinner.classList.replace("flex", "hidden");
      formulario.reset();
      mostrarMensajeEnviado();
    }, 3000);
  }

  function validar(e) {
    if (e.target.value.trim() === "" && e.target.id !== "cc") {
      correo[e.target.id] = "";
      validarSubmit();
      alertar(`El campo ${e.target.id} es inválido`, e.target);
      return;
    }

    if (e.target.id === "email" && !validarEmail(e.target.value, e.target.id)) {
      correo[e.target.id] = "";
      validarSubmit();
      alertar(`El campo ${e.target.id} es inválido`, e.target);
      return;
    }

    if (e.target.id === "cc" && !validarEmail(e.target.value, e.target.id)) {
      correo[e.target.id].estado = true;
      correo[e.target.id].valor = e.target.value;
      validarSubmit();
      alertar(
        `Añade un correo ${e.target.id} válido, de lo contrario deja el espacio en blanco`,
        e.target
      );
      return;
    }

    normalizar(e.target, true);
    if (e.target.id !== "cc") {
      correo[e.target.id] = e.target.value.trim().toLowerCase();
    } else if (correo[e.target.id].estado) {
      correo[e.target.id].valor = e.target.value.trim().toLowerCase();
    }
    validarSubmit();
  }

  function alertar(mensaje, eTarget) {
    const alerta = document.createElement("P");
    alerta.textContent = mensaje;
    normalizar(eTarget);
    if (eTarget.id === "cc") {
      eTarget.classList.replace("border-gray-300", "border-yellow-600");
      alerta.classList.add(
        "bg-yellow-600",
        "text-black",
        "p-2",
        "text-center",
        "font-bold"
      );
      formulario.appendChild(alerta);
    } else {
      eTarget.classList.replace("border-gray-300", "border-red-600");
      alerta.classList.add(
        "bg-red-600",
        "text-white",
        "p-2",
        "text-center",
        "font-bold"
      );
      formulario.appendChild(alerta);
    }
  }

  function normalizar(eTarget, control = false) {
    if (formulario.lastElementChild.nodeName === "P") {
      formulario.lastElementChild.remove();
    }

    if (control) {
      if (eTarget.id === "cc") {
        eTarget.classList.replace("border-yellow-600", "border-gray-300");
      } else {
        eTarget.classList.replace("border-red-600", "border-gray-300");
      }
    }
  }

  function validarEmail(email, id = "") {
    const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = regex.test(email);
    if (id === "cc" && email === "") {
      correo.cc.estado = false;
      return true;
    }
    return resultado;
  }

  function validarSubmit() {
    const vals = Object.values(correo).filter((v) => v === "");
    const { estado, valor } = correo.cc;
    if (vals.length >= 1 || (estado && !validarEmail(valor))) {
      submit.classList.add("opacity-50");
      submit.disabled = true;
      return;
    }
    submit.classList.remove("opacity-50");
    submit.disabled = false;
  }
});
