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

// Funciones para buscar los elementos del DOM

const $$ = (element) => document.querySelectorAll(element);

// Elementos del DOM

const $menu = $('#menu');
const $categorias = $('#categorias-container');
const $reportes = $('#reportes-container');
const $balance = $('#balance-container');

// El menu mobile icono 

$('#menu-icono').addEventListener('click', () => {
    $menu.classList.toggle('hidden');
})

// Vistas - navegacion

$('#nav-categorias').addEventListener('click', (event) => {
    event.preventDefault();
    mostrarElemento([$categorias]);
    ocultarElemento([$reportes, $balance]);
})

$('#nav-reportes').addEventListener('click', (event) => {
    event.preventDefault();
    mostrarElemento([$reportes]);
    ocultarElemento([$categorias, $balance]);
})

$('#nav-balance').addEventListener('click', (event) => {
    event.preventDefault();
    mostrarElemento([$balance]);
    ocultarElemento([$reportes, $categorias]);
})

$('#logo').addEventListener('click', () => {
    mostrarElemento([$balance]);
    ocultarElemento([$reportes, $categorias]);
})



//  Funciones auxiliares o generales 

const mostrarElemento = (selectors) => {
    for (const selector of selectors) {
      selector.classList.remove('hidden');
    }
};

const ocultarElemento = (selectors) => {
    for (const selector of selectors) {
      selector.classList.add('hidden');
    }
};