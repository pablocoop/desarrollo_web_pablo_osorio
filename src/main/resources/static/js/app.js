document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById("modal-evaluar");
    const btnGuardar = document.getElementById("btn-guardar-nota");
    const btnCancelar = document.getElementById("btn-cancelar-nota");
    const botonesNota = document.querySelectorAll(".btn-nota");

    let avisoActual = null;
    let filaActual = null;
    let notaSeleccionada = null;

    // Abrir modal de evaluación (selector de notas)
    document.querySelectorAll(".btn-evaluar").forEach(btn => {
        btn.addEventListener("click", () => {
            avisoActual = btn.getAttribute("data-id");
            filaActual = btn.closest("tr");
            // Limpiamos selección previa
            notaSeleccionada = null;
            botonesNota.forEach(b => b.classList.remove("selected"));
            modal.style.display = "flex";
        });
    });

    // Seleccionar nota
    botonesNota.forEach(btn => {
        btn.addEventListener("click", () => {
            // Limpiamos selección previa
            botonesNota.forEach(b => b.classList.remove("selected"));
            // Marcamos la actual
            btn.classList.add("selected");
            notaSeleccionada = parseInt(btn.getAttribute("data-value"));
        });
    });
    btnCancelar.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Guardar nota
    btnGuardar.addEventListener("click", async () => {
        if (!notaSeleccionada) {
            alert("Debe seleccionar una nota entre 1 y 7.");
            return;
        }
        try {
            const resp = await fetch("/api/notas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    avisoId: avisoActual,
                    nota: notaSeleccionada
                })
            });
            const data = await resp.json();
            if (!data.ok) {
                alert("Error: " + data.mensaje);
                return;
            }
            // Actualizar promedio
            const celdaPromedio = filaActual.querySelector(".promedio");
            celdaPromedio.textContent = Number(data.promedio).toFixed(2);
            modal.style.display = "none";
            alert("Nota registrada correctamente.");

        } catch (error) {
            console.error(error);
            alert("Error al registrar la nota.");
        }
    });

});
