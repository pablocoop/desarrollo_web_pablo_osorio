// Diccionario de mensajes de validación (Al estilo Laravel)
let validationErrors = {
  "Región": "Región: este campo es obligatorio",
  "Comuna": "Comuna: este campo es obligatorio",
  "Sector": "Sector: máximo 100 caracteres",
  "Nombre": "Nombre: mínimo 3, máximo 200 caracteres",
  "Correo": "Correo: formato inválido o largo mayor a 100",
  "Teléfono": "Número de Celular: debe tener formato +569.12345678",
  "Contactar por": "Contactar por: mínimo 4, máximo 50 caracteres por ID/URL, máximo 5 formas de contacto",
  "Tipo": "Tipo: obligatorio",
  "Cantidad": "Cantidad: mínimo 1",
  "Edad": "Edad: mínimo 1",
  "Unidad edad": "Unidad edad: obligatorio",
  "Fecha entrega": "Fecha entrega: al menos 3 horas en el futuro",
  "Fotos": "Fotos: 1 a 5 imágenes requeridas"
};


//  Funciones de validación 

const validateTextMinMax = (text, min, max) => {
  if (!text) return false;
  const length = text.trim().length;
  return length >= min && length <= max;
};

const validateEmail = (email) => {
  if (!email) return false;
  if (email.length > 100) return false;
  let re = /^[\w.]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  return re.test(email);
};

const validatePhone = (phone) => {
  if (!phone) return true; // opcional
  let re = /^\+\d{3}\.\d{8}$/; // formato +569.12345678
  return re.test(phone);
};

const validateSelect = (value) => {
  return value !== "";
};

const validateNumberMin = (value, min) => {
  let number = Number(value);
  return !isNaN(number) && Number.isInteger(number) && number >= min;
};

const validateDateTimeAfterNowPlusHours = (datetimeStr, hours = 3) => {
  if (!datetimeStr) return false;
  let inputDate = new Date(datetimeStr);
  let now = new Date();
  now.setHours(now.getHours() + hours);
  return inputDate >= now;
};

const validateMultipleFileInputs = (form, name, max = 5) => {
  let inputs = form.querySelectorAll(`input[name="${name}"]`);
  let total = 0;
  let typeValid = true;

  inputs.forEach(input => {
    let files = input.files;
    if (files.length > 0) {
      total += files.length;
      for (let file of files) {
        if (!file.type.startsWith("image/")) {
          typeValid = false;
        }
      }
    }
  });

  return total >= 1 && total <= max && typeValid;
};

//  Validación del form

const validateForm = () => {
  let form = document.getElementById("form-aviso");
  // Obtener valores
  let region = form["region"].value;
  let comuna = form["comuna"].value;
  let sector = form["sector"].value;

  let nombre = form["nombre"].value;
  let email = form["email"].value;
  let telefono = form["telefono"].value;
  let contactarPor = form["contactar_por"].value;
  let contactoId = form["contacto_id"].value;

  let tipo = form["especie"].value;
  let cantidad = form["cantidad"].value;
  let edad = form["edad"].value;
  let unidad = form["unidad_edad"].value;
  let fecha = form["fecha_entrega"].value;

  // variables auxiliares de validación y función.
  let invalidInputs = [];
  let isValid = true;
  const setInvalidInput = (inputName) => {
    invalidInputs.push(inputName);
    isValid &&= false;
  };

  // Lógica de validación
  if (!validateSelect(region)) {
    setInvalidInput("Región");
  }
  if (!validateSelect(comuna)) {
    setInvalidInput("Comuna");
  }
  if (sector && sector.length > 100) {
    setInvalidInput("Sector");
  }

  if (!validateTextMinMax(nombre, 3, 200)) {
    setInvalidInput("Nombre");
  }
  if (!validateEmail(email)) {
    setInvalidInput("Correo");
  }
  if (!validatePhone(telefono)) {
    setInvalidInput("Teléfono");
  }
  
  // Validación de contacto por red social
  if (contactarPor && !validateTextMinMax(contactoId, 4, 50)) {
    setInvalidInput("Contactar por");
  }

  if (!validateSelect(tipo)) {
    setInvalidInput("Tipo");
  }
  if (!validateNumberMin(cantidad, 1)) {
    setInvalidInput("Cantidad");
  }
  if (!validateNumberMin(edad, 1)) {
    setInvalidInput("Edad");
  }
  if (!validateSelect(unidad)) {
    setInvalidInput("Unidad edad");
  }
  if (!validateDateTimeAfterNowPlusHours(fecha)) {
    setInvalidInput("Fecha entrega");
  }
  if (!validateMultipleFileInputs(form, "fotos", MAX_FOTOS)) {
    setInvalidInput("Fotos");
  }

  // Mostrar resultado
  let validationBox = document.getElementById("validation-box");
  let validationMessageElem = document.getElementById("validation-message");
  let validationListElem = document.getElementById("validation-list");

  if (!isValid) {
    validationListElem.textContent = "";
    for (input of invalidInputs) {
      let listElement = document.createElement("li");
      listElement.innerText = validationErrors[input] || input; // Buscamos en el diccionario
      validationListElem.append(listElement);
    }
    // Mensaje general
    validationMessageElem.innerText = "Los siguientes campos son inválidos:";
    // Aplicamos estilos de error
    validationBox.style.backgroundColor = "#ffdddd";
    validationBox.style.borderLeftColor = "#f44336";
    // Hacemos visible el mensaje de validación
    validationBox.hidden = false;
  } else { // Éxito
    // Ocultamos el formulario y mostramos mensaje de confirmación
    form.style.display = "none";
    validationMessageElem.innerText = "¿Está seguro que desea agregar este aviso de adopción?";
    validationListElem.textContent = "";

    validationBox.style.backgroundColor = "#ddffdd";
    validationBox.style.borderLeftColor = "#4CAF50";

    let confirmButton = document.createElement("button");
    confirmButton.innerText = "Sí, estoy seguro";
    confirmButton.type = "button";
    // Aplicar estilos en el código para mantener consistencia con el CSS (Solo es lo mismo que sale en el style.css)
    confirmButton.style.padding = "12px 20px";
    confirmButton.style.backgroundColor = "#4CAF50";
    confirmButton.style.color = "white";
    confirmButton.style.border = "none";
    confirmButton.style.fontSize = "16px";
    confirmButton.style.borderRadius = "6px";
    confirmButton.style.cursor = "pointer";
    confirmButton.style.marginRight = "10px";
    confirmButton.addEventListener("mouseover", function() {
      this.style.backgroundColor = "#45a049";
    });
    confirmButton.addEventListener("mouseout", function() {
      this.style.backgroundColor = "#4CAF50";
    });
    // Ahora el listener del botón de confirmación
    confirmButton.addEventListener("click", () => {
      // Como no hay backend, solo mostramos mensaje de éxito
      validationMessageElem.innerText = "Hemos recibido la información de adopción, muchas gracias y suerte!";
      validationListElem.textContent = "";
      const volver = document.createElement("button");
      volver.type = "button";
      volver.innerText = "Volver a la portada";
      // Aplicar estilos en el código igual que antes
      volver.style.padding = "12px 20px";
      volver.style.backgroundColor = "#4CAF50";
      volver.style.color = "white";
      volver.style.border = "none";
      volver.style.fontSize = "16px";
      volver.style.borderRadius = "6px";
      volver.style.cursor = "pointer";
      volver.addEventListener("mouseover", function() {
        this.style.backgroundColor = "#45a049";
      });
      volver.addEventListener("mouseout", function() {
        this.style.backgroundColor = "#4CAF50";
      });
      volver.addEventListener("click", () => {
        location.href = "index.html";
      });
      validationListElem.appendChild(volver);
    });
    // Agregamos botón de No, no estoy seguro ...
    let negateButton = document.createElement("button");
    negateButton.innerText = "No, no estoy seguro, quiero volver al formulario";
    // Aplicar estilos en el código igual que antes
    negateButton.style.padding = "12px 20px";
    negateButton.style.backgroundColor = "#4CAF50";
    negateButton.style.color = "white";
    negateButton.style.border = "none";
    negateButton.style.fontSize = "16px";
    negateButton.style.borderRadius = "6px";
    negateButton.style.cursor = "pointer";
    negateButton.style.marginLeft = "10px";
    negateButton.addEventListener("mouseover", function() {
      this.style.backgroundColor = "#45a049";
    });
    negateButton.addEventListener("mouseout", function() {
      this.style.backgroundColor = "#4CAF50";
    });
    negateButton.addEventListener("click", () => {
      form.style.display = "block";
      validationBox.hidden = true;
    });

    validationListElem.appendChild(confirmButton);
    validationListElem.appendChild(negateButton);
    validationBox.hidden = false; // Hacemos visible el mensaje de validación
  };
};

// Implementación de código para agregar fotos dinámicamente
const MAX_FOTOS = 5;
const photoContainer = document.getElementById("photos-section");
const addPhotoButton = document.getElementById("agregar-foto-button");

// Función para contar inputs actuales de tipo "file"
const contarFotosActuales = () => {
  return photoContainer.querySelectorAll('input[type="file"]').length;
};

// Función para crear un nuevo input de foto
const crearInputFoto = () => {
  const input = document.createElement("input");
  input.type = "file";
  input.name = "fotos";
  input.accept = "image/*";
  return input;
};

// Evento para agregar foto
addPhotoButton.addEventListener("click", () => {
  const cantidadActual = contarFotosActuales();
  // Verificamos que no se exceda el máximo
  if (cantidadActual < MAX_FOTOS) {
    const nuevoInput = crearInputFoto();
    photoContainer.appendChild(nuevoInput);
  }
  // Si ya llegamos al máximo, deshabilitamos el botón
  if (contarFotosActuales() >= MAX_FOTOS) {
    addPhotoButton.disabled = true;
    addPhotoButton.innerText = "Máximo 5 fotos alcanzado";
  }
});

// Botón principal

let submitBtn = document.getElementById("enviar-form");
submitBtn.addEventListener("click", function() {
  // Desplazar automáticamente al inicio del formulario
  const form = document.getElementById("form-aviso");
  form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  // Ejecutar la validación
  validateForm();
});

//  Lógica simple de contacto por red social 
function selectContactoInput() {
  const contactarPorSelector = document.getElementById("contactar_por");
  const inputContacto = document.getElementById("contacto_id");
  
  if (contactarPorSelector.value) {
    inputContacto.style.display = "block";
  } else {
    inputContacto.style.display = "none";
    inputContacto.value = "";
  }
}

let contactarPorSelector = document.getElementById("contactar_por");
contactarPorSelector.addEventListener("change", selectContactoInput);

//  Establecer fecha por defecto (fecha actual + 3 horas) 
function setDefaultDateTime() {
  const fechaEntregaInput = document.getElementById("fecha_entrega");
  const now = new Date();
  now.setHours(now.getHours() + 3); // Agregar 3 horas
  
  // Formatear fecha para datetime-local (año-mes-día hora:minuto)
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  
  const defaultDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
  fechaEntregaInput.value = defaultDateTime;
}

// Llamar la función al cargar la página
setDefaultDateTime();