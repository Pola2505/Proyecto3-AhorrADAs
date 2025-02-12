// Funciones para buscar los elementos del DOM

const $ = (element) => document.querySelector(element);
const $$ = (element) => document.querySelectorAll(element);

// Elementos del DOM

const $menu = $('#menu');
const $menuIcono = $('#menu-icono');

$menuIcono.addEventListener('click', () => {
    $menu.classList.toggle('hidden');
})