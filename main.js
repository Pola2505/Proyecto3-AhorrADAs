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
const $filtroDesde = $('#filtro-desde');
const $selectFiltroOrden = $('#select-filtro-orden');
const $columnasCategorias = $('#columnas-categorias');

const $ganancias = $('#ganancias');
const $gastos = $('#gastos');
const $total = $('#total');


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





/* Filtro por tipo de gasto o ganancia*/

$selectFiltroTipo.addEventListener("input", (e) => {
  const datos = funciones.obtenerDatos("operaciones")

  if(e.target.value !== "all") {
    const tipoFiltrado = datos.filter(elem => elem.tipo === e.target.value)
    pintarDatos(tipoFiltrado)
  } else {
    pintarDatos(datos)
  }
})


/* Filtro por categorias*/

$selectFiltroCategorias.addEventListener("input", (e) => {
  const datos = funciones.obtenerDatos("operaciones")
  if(e.target.value !== "all") {
    const categoriaFiltrada = datos.filter(elem => elem.categoria === e.target.value)
    pintarDatos(categoriaFiltrada)
  } else {
    pintarDatos(datos)
  }
})


/* Filtro por fecha*/

$filtroDesde.addEventListener("input", (e) => {
  const datos = funciones.obtenerDatos("operaciones"); // Obtener todas las operaciones
  const fechaSeleccionada = e.target.value;

  if (fechaSeleccionada) {
    // Filtrar por fecha
    const datosFiltrados = datos.filter(operacion => operacion.fecha >= fechaSeleccionada);
    pintarDatos(datosFiltrados);
  } else {
    // Si no hay fecha seleccionada, mostrar todos los datos
    pintarDatos(datos);
  }
});





// 2️⃣ Agregar el evento después de definir ordenarDatos

$selectFiltroOrden.addEventListener("input", (e) => {
  const datosOrdenados = funciones.ordenarDatos(e.target.value);
  pintarDatos(datosOrdenados);
});

function pintarDatos(array) {

  $operacionesCargadas.innerHTML = "";
  for (const operacion of array) {
    $operacionesCargadas.innerHTML += `<div class="flex justify-between items-center w-full bg-gray-100 p-3 rounded-lg shadow-md m-1">
        <span class="text-left font-semibold w-1/4">${operacion.descripcion}</span>
        <span class="text-center bg-violet-200 text-violet-600 text-xs p-1 rounded m-1 w-1/6">${operacion.categoria}</span>
        <span class="text-center text-sm w-1/6">${operacion.fecha}</span>
        <span class="text-center text-red-500 font-semibold w-1/6">$${operacion.monto}</span>
        <div class="flex gap-4 text-xs text-pink-500 w-1/6 justify-end">
          <button id="${operacion.id}" class="hover:underline editar-boton">Editar</button>
          <button id="${operacion.id}" class="hover:underline eliminar-boton">Eliminar</button>
        </div>
      </div>`
  }

  mostrarElemento([$columnasCategorias]);
  mostrarElemento([$balance]);
  ocultarElemento([$seccionNuevaOperacion]);

  actualizarTotalBalance();
  botonesDeEdicionOperacion();

}

const botonesDeEdicionOperacion = () => {

  const $$arrayEditarBoton = $$('.editar-boton');
  const $$arrayEliminarBoton = $$('.eliminar-boton');

  $$arrayEliminarBoton.forEach( boton => {
    boton.addEventListener('click', (e) => {
      const nuevasOperaciones = funciones.eliminarOperacion(e.target.id)
      pintarDatos(nuevasOperaciones)
    })
  })

}

const actualizarTotalBalance = () => {
  const datos = funciones.obtenerDatos("operaciones");
 

  const datosGanancias = funciones.filtrarPorTipo("ganancias");
  const totalDatosGanancias = datosGanancias.reduce((acc, curr) => acc + curr.monto, 0);

  const datosGastos = funciones.filtrarPorTipo("gasto");
  const totalDatosGastos = datosGastos.reduce((acc, curr) => acc + curr.monto, 0);


  //  El total es: GANANCIAS - GASTOS
  const totalBalance = totalDatosGanancias - totalDatosGastos;

  $ganancias.innerText = `$+ ${totalDatosGanancias}`;
  $gastos.innerText = `$- ${totalDatosGastos}`;
  $total.innerText = `$ ${totalBalance}`; 
};



window.onload = () => {
  const datos = funciones.obtenerDatos("operaciones")

  pintarDatos(datos);

  actualizarTotalBalance();
  botonesDeEdicionOperacion();
}