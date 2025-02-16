function $(element) {
  return document.querySelector(element)
}

// Estos son todos mis elementos de HTML
const $botonFiltros = $("#boton-filtros")
const $filtros = $("#filtros-contenido")


// Función para mostrar y ocultar filtros
document.addEventListener("DOMContentLoaded", function () {
  
    $botonFiltros.addEventListener("click", function () {
      if ($filtros.classList.contains("hidden")) {
        $filtros.classList.remove("hidden");
        $botonFiltros.textContent = "Ocultar filtros";
      } else {
        $filtros.classList.add("hidden");
        $botonFiltros.textContent = "Mostrar filtros";
      }
    });
  });