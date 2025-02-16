// Funciones para buscar los elementos del DOM

const $ = (element) => document.querySelector(element);
const $$ = (element) => document.querySelectorAll(element);

// Elementos del DOM

const $menu = $('#menu');
const $menuIcono = $('#menu-icono');
const $navCategorias = $('#nav-categorias');
const $categorias = $('#categorias-container');

$menuIcono.addEventListener('click', () => {
    $menu.classList.toggle('hidden');
})

$navCategorias.addEventListener('click', (event) => {
    event.preventDefault();
    $categorias.classList.toggle('hidden');
})

