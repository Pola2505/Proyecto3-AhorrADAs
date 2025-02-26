import funciones from "./funciones.js"

function $(element) {
  return document.querySelector(element)
}

// Estos son todos mis elementos de HTML
const $botonFiltros = $("#boton-filtros")
const $filtros = $("#filtros-contenido")

const $seccionBalance = $('#seccion-balance')
const $seccionFiltros = $('#seccion-filtros')
const $seccionOperaciones = $('#seccion-operaciones')
const $botonNuevaOperacion = $('#boton-nueva-operacion')
const $seccionNuevaOperacion = $('#seccion-nueva-operacion')

const $menu = $('#menu');
const $categorias = $('#categorias-container');
const $reportes = $('#reportes-container');
const $balance = $('#balance-container');


const $crearNuevaOperacion = $('#crear-nueva-operacion');
const $operacionesCargadas = $('#operaciones-cargadas');

const $selectFiltroTipo = $('#select-filtro-tipo');
const $selectFiltroCategorias = $('#select-filtro-categorias');




// Función para mostrar y ocultar filtros

    $botonFiltros.addEventListener("click", function () {
      if ($filtros.classList.contains("hidden")) {
        $filtros.classList.remove("hidden");
        $botonFiltros.textContent = "Ocultar filtros";
      } else {
        $filtros.classList.add("hidden");
        $botonFiltros.textContent = "Mostrar filtros";
      }
    });



// Funciones para buscar los elementos del DOM

const $$ = (element) => document.querySelectorAll(element);

// Elementos del DOM




// El menu mobile icono 

$('#menu-icono').addEventListener('click', () => {
    $menu.classList.toggle('hidden');
})

// Vistas - navegacion

$('#nav-categorias').addEventListener('click', (event) => {
    event.preventDefault();
    mostrarElemento([$categorias]);
    ocultarElemento([$reportes, $balance, $seccionNuevaOperacion]);
})

$('#nav-reportes').addEventListener('click', (event) => {
    event.preventDefault();
    mostrarElemento([$reportes]);
    ocultarElemento([$categorias, $balance, $seccionNuevaOperacion]);
})

$('#nav-balance').addEventListener('click', (event) => {
    event.preventDefault();
    mostrarElemento([$balance]);
    ocultarElemento([$reportes, $categorias, $seccionNuevaOperacion]);
})

$('#logo').addEventListener('click', () => {
    mostrarElemento([$balance]);
    ocultarElemento([$reportes, $categorias, $seccionNuevaOperacion]);
})

$('#boton-nueva-operacion').addEventListener('click', (event) => {
  event.preventDefault();
  mostrarElemento([$seccionNuevaOperacion]);
  ocultarElemento([$balance, $reportes, $categorias]);
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




//  Funcion de creacion de una nueva operacion

$crearNuevaOperacion.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nuevaOperacion = {
    id: crypto.randomUUID(),
    descripcion: evento.target[0].value,
    monto: Number(evento.target[1].value),
    tipo: evento.target[2].value,
    categoria: evento.target[3].value,
    fecha: dayjs(evento.target[4].value).format("YYYY-MM-DD")
  }

  funciones.agregarOperacion(nuevaOperacion)

  const datos = funciones.obtenerDatos("operaciones")
  pintarDatos(datos)
})


/* FILTROS */
$selectFilterType.addEventListener("input", (e) => {
  const datos = obtenerDatos("ventas")
  if(e.target.value !== "all") {
    const ventasFiltradas = datos.filter(elem => elem.type === e.target.value)
    pintarDatos(ventasFiltradas)
  } else {
    pintarDatos(datos)
  }
})


/* Filtro por tipo de gasto o ganancia*/

$selectFiltroTipo.addEventListener("input", (e) => {
  const datos = obtenerDatos("operaciones")
  if(e.target.value !== "all") {
    const tipoFiltrado = datos.filter(elem => elem.type === e.target.value)
    pintarDatos(tipoFiltrado)
  } else {
    pintarDatos(datos)
  }
})





/* Funcion que mostrara los datos en pantalla */
function pintarDatos(array) {

  $operacionesCargadas.innerHTML = "";
  for (const operacion of array) {
    $operacionesCargadas.innerHTML += `<div class="flex w-full">
      <p> ${operacion.descripcion} </p>
      <p> ${operacion.categoria} </p>
      <p>${operacion.fecha} </p>
      <p>${operacion.monto}</p>

      <button>Agregar</button>
      <button>Eliminar</button>
    </div>`
  }

  mostrarElemento([$balance]);
  ocultarElemento([$seccionNuevaOperacion]);

}


window.onload = () => {
  const datos = funciones.obtenerDatos("operaciones")

  pintarDatos(datos);
} 