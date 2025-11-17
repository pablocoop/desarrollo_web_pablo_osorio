function initComments(avisoId) {
  const lista = document.getElementById("lista-comentarios");
  const form = document.getElementById("form-comentario");
  const erroresBox = document.getElementById("errores-comentario");
  const exitoBox = document.getElementById("mensaje-exito");
  
  function renderComentarios(comentarios) {
    lista.innerHTML = "";

    if (!comentarios || comentarios.length === 0) {
      const p = document.createElement("p");
      p.textContent = "No hay comentarios aún. ¡Sé el primero en comentar!";
      lista.appendChild(p);
      return;
    }

    comentarios.forEach(c => {
      const item = document.createElement("div");
      item.classList.add("comentario-item");

      const header = document.createElement("p");
      const nombre = document.createElement("strong");
      nombre.textContent = c.nombre;
      const fecha = document.createElement("span");
      fecha.textContent = `    ${c.fecha}`;
      fecha.style.color = "gray";

      header.appendChild(nombre);
      header.appendChild(fecha);

      const cuerpo = document.createElement("p");
      cuerpo.textContent = c.texto;

      item.appendChild(header);
      item.appendChild(cuerpo);
      lista.appendChild(item);
    });
  }

  // Validación local
  function validarComentario(nombre, texto) {
    const errores = [];
    if (nombre.length < 3 || nombre.length > 80)
      errores.push("El nombre debe tener entre 3 y 80 caracteres.");
    if (texto.length < 5)
      errores.push("El comentario debe tener al menos 5 caracteres.");
    return errores;
  }

  // Cargar comentarios existentes
  fetch(`/api/comentarios/${avisoId}`)
    .then(res => res.json())
    .then(data => renderComentarios(data))
    .catch(() => {
      lista.textContent = "No se pudieron cargar los comentarios.";
    });

  //  Envío del formulario 
  form.addEventListener("submit", e => {
    e.preventDefault(); // Prevenir envío automático
    
    // Limpiar mensajes previos
    erroresBox.style.display = "none";
    erroresBox.innerHTML = "";
    exitoBox.style.display = "none";

    const nombre = document.getElementById("nombre").value.trim();
    const texto = document.getElementById("texto").value.trim();

    const errores = validarComentario(nombre, texto);
    if (errores.length > 0) {
      erroresBox.style.display = "block";
      errores.forEach(msg => {
        const li = document.createElement("li");
        li.textContent = msg;
        erroresBox.appendChild(li);
      });
      return; // Detener ejecución si hay errores
    }

    // Si pasa validación, enviar al servidor
    fetch("/api/comentarios", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, texto, aviso_id: avisoId })
    })
      .then(async res => {
        const data = await res.json();
        if (!res.ok) {
          erroresBox.style.display = "block";
          (data.errores || ["Error al enviar el comentario."]).forEach(msg => {
            const li = document.createElement("li");
            li.textContent = msg;
            erroresBox.appendChild(li);
          });
          throw new Error("Error al guardar comentario");
        }
        // Éxito: limpiar formulario y mostrar mensaje
        form.reset();
        exitoBox.textContent = "Comentario agregado correctamente.";
        exitoBox.style.display = "block";

        // Ocultar mensaje después de 3 segundos
        setTimeout(() => {
          exitoBox.style.display = "none";
        }, 3000);
        
        return fetch(`/api/comentarios/${avisoId}`);
      })
      .then(res => res.json())
      .then(data => renderComentarios(data))
      .catch(console.error);
  });
}
