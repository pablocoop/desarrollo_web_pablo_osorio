// Funciones para la galería de fotos

function abrirFoto(thumbnail) {
  const modal = document.getElementById('modal-foto');
  const fotoAmpliada = document.getElementById('foto-ampliada');
  
  modal.style.display = 'flex';
  fotoAmpliada.src = thumbnail.src;
  fotoAmpliada.alt = thumbnail.alt;
  
  // Prevenir scroll del body
  document.body.style.overflow = 'hidden';
}

function cerrarFoto() {
  const modal = document.getElementById('modal-foto');
  modal.style.display = 'none';
  
  // Restaurar scroll del body
  document.body.style.overflow = 'auto';
}

// Cerrar modal con tecla ESC
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    cerrarFoto();
  }
});