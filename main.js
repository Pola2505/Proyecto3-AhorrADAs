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
const $editarNuevaOperacion= $('#editar-nueva-operacion')

const $menu = $('#menu');
const $categorias = $('#categorias-container');
const $reportes = $('#reportes-container');
const $balance = $('#balance-container');


const $crearNuevaOperacion = $('#crear-nueva-operacion');
const $operacionesCargadas = $('#operaciones-cargadas');
const $selectFiltroTipo = $('#select-filtro-tipo');

const $filtroCategoriasOperacion = $('#filtro-categorias');
const $selectFiltroCategorias = $('#select-filtro-categorias');

const $filtroDesde = $('#filtro-desde');
const $selectFiltroOrden = $('#select-filtro-orden');
const $columnasCategorias = $('#columnas-categorias');
const $seccionEditarOperacion = $('#seccion-editar-operacion');

const $ganancias = $('#ganancias');
const $gastos = $('#gastos');
const $total = $('#total');

const $resumenReportes = $("#reportes-resumen");  // Contenedor del resumen
const $imagenReportes = $("#imagen-reportes");  // Imagen que debe desaparecer

const $editOperacionInput = $('#edit-operacion-input');
const $editOperacionMonto = $('#edit-operacion-monto');
const $editOperacionTipo  = $('#edit-operacion-tipo');
const $editFiltroCategorias = $('#edit-filtro-categorias');
const $editFiltroDesde = $('#edit-filtro-desde');



const $crearNuevaCategoria = $('#crear-nueva-categoria');

const $inputCategoria = $('#categoria-input');
const $botonAgregarCategoria = $('#boton-agregar-categoria');
const $listaCategorias = $('#lista-categorias'); // Contenedor donde se mostrarán las categorías

const $categoriasReporte = $('#categorias-reporte');






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


////////////// SECCIÓN PINTAR NUEVA OPERACION //////////////////////7

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
  actualizarReportes();
  botonesDeEdicionOperacion();

}


//////////// EDITAR OPERACIÓN ///////////////////

const botonesDeEdicionOperacion = () => {

  const $$arrayEditarBoton = $$('.editar-boton');
  const $$arrayEliminarBoton = $$('.eliminar-boton');

  $$arrayEliminarBoton.forEach( boton => {
    boton.addEventListener('click', (e) => {
      const nuevasOperaciones = funciones.eliminarOperacion(e.target.id)
      pintarDatos(nuevasOperaciones)
    })
  });

  $$arrayEditarBoton.forEach((boton) => {
    boton.addEventListener('click', (e) => {
      mostrarElemento([$seccionEditarOperacion]);
      ocultarElemento([$balance]);

      const datos = funciones.obtenerDatos("operaciones");
      const operacionParaEditar = datos.find(elem => elem.id === e.target.id);

      $editOperacionInput.value = operacionParaEditar.descripcion;
      $editOperacionMonto.value = operacionParaEditar.monto;
      $editOperacionTipo.value = operacionParaEditar.tipo;
      $editFiltroCategorias.value = operacionParaEditar.categoria;
      $editFiltroDesde.value = operacionParaEditar.fecha;

      $editarNuevaOperacion.id = operacionParaEditar.id;
    })

  })

}

$editarNuevaOperacion.addEventListener("submit", (event) => {
  event.preventDefault();

  const datos = funciones.obtenerDatos("operaciones");
  const operacionParaEditar = datos.find(elem => elem.id === event.target.id);

  if (!operacionParaEditar) {
    console.error("No se encontró la operación a editar");
    return;
  }

  const nuevosDatos = {  
    descripcion: event.target[0].value,
    monto: Number(event.target[1].value),
    tipo: event.target[2].value,
    categoria: event.target[3].value,
    fecha: dayjs(event.target[4].value).format("YYYY-MM-DD")
  };

  const datosModificados = funciones.editarOperacion(operacionParaEditar.id, nuevosDatos);

  pintarDatos(datosModificados);
  ocultarElemento([$seccionEditarOperacion]);

});




//////////// SECCIÓN BALANCE /////////////////7

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



  

////////////// SECCIÓN REPORTES //////////////////

const actualizarReportes = () => {
  const datos = funciones.obtenerDatos("operaciones");

  if (datos.length > 0) {
    mostrarElemento([$resumenReportes]); // Muestra el resumen
    ocultarElemento([$imagenReportes]);  // Oculta la imagen
  } else {
    mostrarElemento([$imagenReportes]);  // Muestra la imagen
    ocultarElemento([$resumenReportes]); // Oculta el resumen
  }
};

const totalesCategoriasReporte = (array) => {
  const datos = funciones.obtenerDatos("operaciones");
  console.log(datos)
  
  for (const operacion of array) {
    $categoriasReporte.innerHTML += `<div class="flex flex-col justify-between items-center w-full bg-gray-100 p-3 rounded-lg shadow-md m-1">
      <span class="text-center bg-violet-200 text-violet-600 text-xs p-1 rounded m-1 w-1/6">${operacion.categoria}</span>

    </div>`
  };
}

/////////////// PROBANDO CREAR CATEGORIAS /////////////


/// Evento creación de una nueva categoria

// $crearNuevaCategoria.addEventListener("submit", (evento) => {
//   evento.preventDefault();

//   const nuevaCategoria = {
//     id: crypto.randomUUID(),
//     nombre: evento.target[0].value
//   }

//   funciones.agregarCategoria(nuevaCategoria)
//   pintarCategoria(array)


//   const datos = funciones.obtenerDatos("operaciones")
//   pintarDatos(datos)
//  })

// /// Función de pintar una nueva categoria

//  function pintarCategoria(array) {

//   $listaCategorias.innerHTML = "";
//   for (const categoria of array) {
//     $listaCategorias.innerHTML += `<div class="flex justify-between items-center w-full bg-gray-100 p-3 rounded-lg shadow-md m-1">

//         <span class="text-center bg-violet-200 text-violet-600 text-xs p-1 rounded m-1 w-1/6">${categoria.nombre}</span>

//         <div class="flex gap-4 text-xs text-pink-500 w-1/6 justify-end">
//           <button id="${categoria.id}" class="hover:underline editar-boton">Editar</button>
//           <button id="${categoria.id}" class="hover:underline eliminar-boton">Eliminar</button>
//         </div>
//       </div>`
//   }
// }



// Evento para agregar una nueva categoría
$crearNuevaCategoria.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nuevaCategoria = {
    id: crypto.randomUUID(),
    nombre: evento.target[0].value.trim()
  };

  if (nuevaCategoria.nombre === "") return; // Evitamos agregar categorías vacías

  // Agregar la categoría al almacenamiento
  funciones.agregarCategoria(nuevaCategoria);

  // Volver a cargar las categorías desde el almacenamiento
  const categoriasActualizadas = funciones.obtenerDatos("categorias");

  // Pintar las categorías en pantalla
  pintarCategoria(categoriasActualizadas);

  // Limpiar input después de agregar
  evento.target[0].value = "";
});

// Función para pintar las categorías
function pintarCategoria(array) {
  $listaCategorias.innerHTML = ""; // Limpiamos antes de volver a dibujar

  for (const categoria of array) {
    $listaCategorias.innerHTML += `
      <div class="flex justify-between py-3">
        <span class="bg-violet-200 text-violet-600 text-xs p-1 rounded">${categoria.nombre}</span>
        <div class="flex gap-4 text-xs text-pink-500">
          <button class="button-edit" data-id="${categoria.id}">Editar</button>
          <button class="button-delete" data-id="${categoria.id}">Eliminar</button>
        </div>
      </div>
    `
    $filtroCategoriasOperacion.innerHTML += ` 
      <option value="${categoria.nombre}">${categoria.nombre}</option>
    `;     // Agregamos la categoría al select de nueva operación

        $selectFiltroCategorias.innerHTML += `
        <option value="${categoria.nombre}">${categoria.nombre}</option>
      `;


  }
}


// //// agregar nueva categoria a select de filtros

// function agregarCategoria(nuevaCategoria) {
  
//   // Verificar si la categoría ya está en la lista
//   const existe = Array.from($selectFiltroCategorias.options).some(option => option.value === nuevaCategoria);
  
//   if (!existe) {
//       // Crear nueva opción
//       const nuevaOpcion = document.createElement("option");
//       nuevaOpcion.value = nuevaCategoria;
//       nuevaOpcion.textContent = nuevaCategoria;
      
//       // Agregar la nueva opción al <select>
//       $selectFiltroCategorias.appendChild(nuevaOpcion);
//   }
// }


// //// agregar nueva categoria a select de nueva operacion
// function agregarCategoriaOperacion(nuevaCategoriaOperacion) {
  
//   // Verificar si la categoría ya está en la lista
//   const existe = Array.from($filtroCategoriasOperacion.options).some(option => option.value === nuevaCategoriaOperacion);
  
//   if (!existe) {
//       // Crear nueva opción
//       const nuevaOpcion = document.createElement("option");
//       nuevaOpcion.value = nuevaCategoriaOperacion;
//       nuevaOpcion.textContent = nuevaCategoriaOperacion;
      
//       // Agregar la nueva opción al <select>
//       $filtroCategoriasOperacion.appendChild(nuevaOpcion);
//   }
// }



/////////////// PROBANDO SECCIÓN CATEGORIAS /////////////

// const categorias = []; // Array para almacenar las categorías

// $botonAgregarCategoria.addEventListener('click', () => {
//   const nombreCategoria = $inputCategoria.value.trim();

//   if (nombreCategoria !== '') {
//     categorias.push({ nombre: nombreCategoria }); // Agrega la nueva categoría al array
//     pintarCategorias();
//     $inputCategoria.value = ''; // Limpia el input después de agregar
//   }
// });


// // Función para pintar las categorías en el HTML
// function pintarCategorias() {
//   $listaCategorias.innerHTML = ''; // Limpia la lista antes de pintar nuevamente

//   for (const categoria of categorias) {
//     $listaCategorias.innerHTML += `
//       <div class="flex justify-between py-3">
//         <span class="bg-violet-200 text-violet-600 text-xs p-1 rounded">${categoria.nombre}</span>
//       </div>`;
//   }
// }



///////////// PROBANDO ELIMINAR Y EDITAR CATEGORÍA ///////////////


  // const $$arrayButtonsDelete = $$(".button-delete")
  // const $$arrayButtonsEdit = $$(".button-edit")

  // $$arrayButtonsDelete.forEach(button => {
  //   button.addEventListener("click", (e) => {
  //     console.log(HOLAAA)
//       const nuevoArray = funciones.quitarVenta(e.target.id)
//       pintarDatos(nuevoArray)
//     })
//   })

//   $$arrayButtonsEdit.forEach(button => {
//     button.addEventListener("click", (e) => {
//       hideElement([$sectionViewHome, $sectionViewReporte, $("#form-create")])
//       showElement([$sectionViewVenta, $formEdit])

//       const datos = funciones.obtenerDatos("ventas")
//       const ventaBuscada = datos.find(elem => elem.id === e.target.id)

//       $selectEditType.value = ventaBuscada.type
//       $inputEditValor.value = ventaBuscada.value
//       $inputEditFecha.value = ventaBuscada.date
//       $inputEditCantidad.value = ventaBuscada.quantity

//       $formEdit.id = ventaBuscada.id
  //    })
  //  })
 


window.onload = () => {
  const datos = funciones.obtenerDatos("operaciones")

  pintarDatos(datos);

  actualizarTotalBalance();
  actualizarReportes();
  botonesDeEdicionOperacion();
  totalesCategoriasReporte(datos);

  const categoriasGuardadas = funciones.obtenerDatos("categorias") || [];
  pintarCategoria(categoriasGuardadas);
  // agregarCategoria();
  // agregarCategoriaOperacion();


}