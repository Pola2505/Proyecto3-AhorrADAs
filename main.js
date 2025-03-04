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
const $editarNuevaOperacion = $('#editar-nueva-operacion')

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
const $editOperacionTipo = $('#edit-operacion-tipo');
const $editFiltroCategorias = $('#edit-filtro-categorias');
const $editFiltroDesde = $('#edit-filtro-desde');

const $seccionEditarCategoria = $('#seccion-editar-categorias');




const $crearNuevaCategoria = $('#crear-nueva-categoria');

const $inputCategoria = $('#categoria-input');
const $botonAgregarCategoria = $('#boton-agregar-categoria');
const $listaCategorias = $('#lista-categorias'); // Contenedor donde se mostrarán las categorías

const $categoriasReporte = $('#categorias-reporte');
const $totalesMesReporte = $('#totales-mes-reporte');
const $categoriaMayorGanancia = $('#categoria-mayor-ganancia');
const $categoriaMayorGasto = $('#categoria-mayor-gasto');
const $mesMayorGanancia = $('#mes-mayor-ganancia');
const $mesMayorGasto = $('#mes-mayor-gasto');

const $editarCategoria = $('#editar-categoria');





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

  if (e.target.value !== "all") {
    const tipoFiltrado = datos.filter(elem => elem.tipo === e.target.value)
    pintarDatos(tipoFiltrado)
  } else {
    pintarDatos(datos)
  }
})


/* Filtro por categorias*/

$selectFiltroCategorias.addEventListener("input", (e) => {
  const datos = funciones.obtenerDatos("operaciones")
  if (e.target.value !== "all") {
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

  if (array.length === 0) {
    ocultarElemento([$columnasCategorias]);
    $operacionesCargadas.innerHTML = `
    <div class="flex flex-col grow justify-center items-center">
    <img src="./imagenes/wallet.svg" alt="Ilustración de billetera" class="w-40 sm:w-60">
    <p class="text-2xl text-textPrimary mt-4 mb-2">Sin resultados</p>
    <p class="text-1xl text-textPrimary mb-6"> Cambia los filtros o agrega operaciones </p>
    </div>
    `
  } else {
    $operacionesCargadas.innerHTML = array.map(operacion => {

      const colorMonto = operacion.tipo === "ganancias" ? "text-green-500" : "text-red-500";
      const signoMonto = operacion.tipo === "ganancias" ? `+` : `-`;

      return `
        <div class="flex justify-between items-center w-full bg-gray-100 p-3 rounded-lg shadow-md m-1">
          <span class="text-left font-semibold w-1/4">${operacion.descripcion}</span>
          <span class="text-center bg-violet-200 text-violet-600 text-xs p-1 rounded m-1 w-1/6">${operacion.categoria}</span>
          <span class="text-center text-sm w-1/6">${operacion.fecha}</span>
          <span class="text-center font-semibold w-1/6 ${colorMonto}">${signoMonto}$${operacion.monto}</span> 
          <div class="flex gap-4 text-xs text-pink-500 w-1/6 justify-end">
            <button id="${operacion.id}" class="hover:underline editar-boton">Editar</button>
            <button id="${operacion.id}" class="hover:underline eliminar-boton">Eliminar</button>
          </div>
        </div>`;
    }).join('');
    mostrarElemento([$columnasCategorias]);
  }




  mostrarElemento([$balance]);
  ocultarElemento([$seccionNuevaOperacion]);

  actualizarTotalBalance();
  actualizarReportes();
  botonesDeEdicionOperacion();

  mostrarResumen(array);
  mostrarResumenPorMes(array);
  mostrarCategoriaMayorGanancia(array);
  mostrarCategoriaMayorGasto(array);
  mostrarMesMayorGanancia(array);
  mostrarMesMayorGasto(array);

}





//////////// EDITAR OPERACIÓN ///////////////////

const botonesDeEdicionOperacion = () => {

  const $$arrayEditarBoton = $$('.editar-boton');
  const $$arrayEliminarBoton = $$('.eliminar-boton');

  $$arrayEliminarBoton.forEach(boton => {
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

  if (totalBalance < 0) {
    $total.classList.add("text-red-500");
    $total.classList.remove("text-green-500");
  } else {
    $total.classList.add("text-green-500");
    $total.classList.remove("text-red-500");
  }

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

// ------------------------   Funcion de calcular totales por categoria 

function calcularResumen(datos) {
  const resumenPorCategoria = {};

  datos.forEach(({ categoria, monto, tipo }) => {
    if (!resumenPorCategoria[categoria]) {
      resumenPorCategoria[categoria] = { ganancias: 0, gasto: 0, balance: 0 };
    }

    if (tipo === "ganancias") {
      resumenPorCategoria[categoria].ganancias += monto;
    } else {
      resumenPorCategoria[categoria].gasto += monto;
    }

    resumenPorCategoria[categoria].balance =
      resumenPorCategoria[categoria].ganancias - resumenPorCategoria[categoria].gasto;
  });

  return resumenPorCategoria;
}

function mostrarResumen(datos) {
  const resumen = calcularResumen(datos);


  $categoriasReporte.innerHTML = Object.entries(resumen).map(([categoria, datos]) => `
  <div class="flex justify-between items-end w-full bg-gray-100 p-3 rounded-lg shadow-md m-1 categoria-box">
    <span class="w-1/6 categoria-nombre text-center bg-violet-200 text-violet-600 text-xs px-1 rounded m-1">${categoria}</span>
    <span class="w-1/4 text-right text-[9px] sm:text-sm md:text-md lg:text-lg categoria-dato text-green-500 font-semibold">$${datos.ganancias}</span>
    <span class="w-1/4 text-right text-[9px] sm:text-sm md:text-md lg:text-lg categoria-dato text-red-500 font-semibold">$ -${datos.gasto}</span>
    <span class="w-1/4 text-right text-[9px] sm:text-sm md:text-md lg:text-lg categoria-dato font-semibold">$${datos.balance}</span>
  </div>
`).join("");

}

// ------------------------   Funcion de calcular totales por fecha 

function calcularResumenPorMes(datos) {
  const resumenPorMes = {};

  datos.forEach(({ fecha, monto, tipo }) => {
    const mes = fecha.slice(0, 7);

    if (!resumenPorMes[mes]) {
      resumenPorMes[mes] = { ganancias: 0, gasto: 0, balance: 0 };
    }

    if (tipo === "ganancias") {
      resumenPorMes[mes].ganancias += monto;
    } else {
      resumenPorMes[mes].gasto += monto;
    }

    resumenPorMes[mes].balance =
      resumenPorMes[mes].ganancias - resumenPorMes[mes].gasto;
  });

  return resumenPorMes;
}

function mostrarResumenPorMes(datos) {
  const resumen = calcularResumenPorMes(datos);

  $totalesMesReporte.innerHTML = Object.entries(resumen).map(([mes, datos]) => `
    <div class="mes-box flex justify-between items-center w-full bg-gray-100 p-3 rounded-lg shadow-md m-1">
      <span class="w-1/8 text-left text-[9px] sm:text-sm md:text-md lg:text-lg mes-titulo">${mes}</span>
      <span class="w-1/4 text-right text-[9px] sm:text-sm md:text-md lg:text-lg mes-dato text-green-500 font-semibold">$${datos.ganancias}</span>
      <span class="w-1/4 text-right text-[9px] sm:text-sm md:text-md lg:text-lg mes-dato text-red-500 font-semibold">$ -${datos.gasto}</span>
      <span class="w-1/4 text-right text-[9px] sm:text-sm md:text-md lg:text-lg mes-dato font-semibold">$${datos.balance}</span>
    </div>
  `).join("");
}

// ------------------------------- Funcion de categoria de mayor ganancia 

function categoriaMayorGanancia(datos) {
  const gananciasPorCategoria = datos
    .filter(op => op.tipo === "ganancias") // Filtramos solo ingresos
    .reduce((acc, { categoria, monto }) => {
      acc[categoria] = (acc[categoria] || 0) + monto;
      return acc;
    }, {});


  return Object.entries(gananciasPorCategoria)
    .reduce((max, [categoria, ganancias]) =>
      ganancias > max.ganancias ? { categoria, ganancias } : max,
      { categoria: null, ganancias: 0 }
    );
}

function mostrarCategoriaMayorGanancia(datos) {
  const resultado = categoriaMayorGanancia(datos);

  $categoriaMayorGanancia.innerHTML =
    `<div class="ganancia-box flex justify-between md:w-48 flex-col md:flex-row items-center">
        <span class="ganancia-dato text-center bg-violet-200 text-violet-600 text-xs p-1 rounded">${resultado.categoria}</span>
        <span class="text-[9px] sm:text-sm md:text-md lg:text-lg ganancia-dato text-green-500 font-semibold">$  ${resultado.ganancias}</span>
      </div>`
    ;
}

// ---------------------------- Funcion de categoria de mayor gasto

function categoriaMayorGasto(datos) {
  const gastosPorCategoria = datos
    .filter(op => op.tipo === "gasto")
    .reduce((acc, { categoria, monto }) => {
      acc[categoria] = (acc[categoria] || 0) + monto;
      return acc;
    }, {});


  return Object.entries(gastosPorCategoria)
    .reduce((max, [categoria, gasto]) =>
      gasto > max.gasto ? { categoria, gasto } : max,
      { categoria: null, gasto: 0 }
    );
}

function mostrarCategoriaMayorGasto(datos) {
  const resultado = categoriaMayorGasto(datos);

  $categoriaMayorGasto.innerHTML =
    `<div class="ganancia-box flex flex-col md:flex-row justify-between md:w-48 items-center">
        <span class="ganancia-dato text-center bg-violet-200 text-violet-600 text-xs p-1 rounded">${resultado.categoria}</span>
        <span class="text-[9px] sm:text-sm md:text-md lg:text-lg ganancia-dato text-red-500 font-semibold">$ -${resultado.gasto}</span>
      </div>`
    ;
}

// ------------------------------ Funcion del mes con mayor ganancia

function mesMayorGanancia(datos) {
  const gananciasPorMes = datos
    .filter(op => op.tipo === "ganancias")
    .reduce((acc, { fecha, monto }) => {
      const mes = fecha.slice(0, 7);
      acc[mes] = (acc[mes] || 0) + monto;
      return acc;
    }, {});


  return Object.entries(gananciasPorMes)
    .reduce((max, [mes, ganancias]) =>
      ganancias > max.ganancias ? { mes, ganancias } : max,
      { mes: null, ganancias: 0 }
    );
}

function mostrarMesMayorGanancia(datos) {
  const resultado = mesMayorGanancia(datos);

  $mesMayorGanancia.innerHTML =
    `<div class="ganancia-box flex flex-col md:flex-row justify-between md:w-48 items-center">
        <span class="text-center text-[8px] sm:text-sm md:text-md lg:text-lg">${resultado.mes}</span>
        <span class="text-[8px] sm:text-sm md:text-md lg:text-lg ganancia-dato text-green-500 font-semibold">$  ${resultado.ganancias}</span>
      </div>`
    ;
}

// ------------------------------ Funcion del mes con mayor gasto

function mesMayorGasto(datos) {
  const gastoPorMes = datos
    .filter(op => op.tipo === "gasto")
    .reduce((acc, { fecha, monto }) => {
      const mes = fecha.slice(0, 7);
      acc[mes] = (acc[mes] || 0) + monto;
      return acc;
    }, {});


  return Object.entries(gastoPorMes)
    .reduce((max, [mes, gasto]) =>
      gasto > max.gasto ? { mes, gasto } : max,
      { mes: null, gasto: 0 }
    );
}

function mostrarMesMayorGasto(datos) {
  const resultado = mesMayorGasto(datos);

  $mesMayorGasto.innerHTML =
    `<div class="ganancia-box flex flex-col md:flex-row justify-between md:w-48 items-center">
        <span class="text-center text-[9px] sm:text-sm md:text-md lg:text-lg">${resultado.mes}</span>
        <span class="text-[9px] sm:text-sm md:text-md lg:text-lg ganancia-dato text-red-500 font-semibold">$ -${resultado.gasto}</span>
      </div>`
    ;
}

window.onload = () => {
  const datos = funciones.obtenerDatos("operaciones")

  pintarDatos(datos);

  actualizarTotalBalance();
  actualizarReportes();
  botonesDeEdicionOperacion();
  totalesCategoriasReporte(datos);
}