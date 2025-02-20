// Funciones para buscar los elementos del DOM

const $ = (element) => document.querySelector(element);
const $$ = (element) => document.querySelectorAll(element);

// Elementos del DOM

const $menu = $('#menu');
const $menuIcono = $('#menu-icono');
const $navCategorias = $('#nav-categorias');
const $navReportes = $('#nav-reportes');
const $categorias = $('#categorias-container');
const $reportes = $('#reportes-container');

// El menu mobile icono 

$menuIcono.addEventListener('click', () => {
    $menu.classList.toggle('hidden');
})

// Es necesario poner el evento preventDefault para todos los links del menu ya que el href hace que la pagina recarga !!! 

$navCategorias.addEventListener('click', (event) => {
    event.preventDefault();
    $categorias.classList.toggle('hidden');
    $reportes.classList.add('hidden');
})

$navReportes.addEventListener('click', (event) => {
    event.preventDefault();
    $categorias.classList.add('hidden');
    $reportes.classList.toggle('hidden');
})


