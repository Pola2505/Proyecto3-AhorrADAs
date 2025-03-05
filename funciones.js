// --------------------------------------------------------------- Funciones de LOCAL STORAGE -----------------------------------------------------------

function obtenerDatos(key) {
  const datos = JSON.parse(localStorage.getItem(key))
  return datos ? datos : [];
}

function guardarDatos(key, data) {
  localStorage.setItem(key, JSON.stringify(data))
}

//  --------------------------------------------------------------- Funciones de agregar OPERACION y CATEGORIA  -----------------------------------------------------------

function agregarOperacion(objetoNuevaOperacion) {
  const datos = obtenerDatos("operaciones")
  guardarDatos("operaciones", [...datos, objetoNuevaOperacion])
}

function agregarCategoria(objetoNuevaCategoria) {
  const datos = obtenerDatos("categoria") || []; // Obtenemos categorías o creamos un array vacío
  guardarDatos("categoria", [...datos, objetoNuevaCategoria]); // Guardamos las nuevas categorías
}

//  --------------------------------------------------------------- Funciones PARA FILTRAR  -------------------------------------------------------------------------------


function filtrarPorTipo(tipo) {
  const datos = obtenerDatos("operaciones");
  return datos.filter(elem => elem.tipo === tipo);
}

function filtrarPorCategoria(categoria) {
const datos = obtenerDatos("operaciones")
return datos.filter(elem => elem.categoria === categoria)
}

function filtrarPorFecha(fecha) {
const datos = obtenerDatos("operaciones")
return datos.filter(elem => elem.fecha === fecha)
}

function ordenarDatos(criterio) {
let datos = obtenerDatos("operaciones");

if (!Array.isArray(datos)) {
  return [];
}

return datos.sort((a, b) => {
  switch (criterio) {
    case "masReciente":
      return new Date(b.fecha) - new Date(a.fecha);
    case "menosReciente":
      return new Date(a.fecha) - new Date(b.fecha);
    case "mayorMonto":
      return b.monto - a.monto;
    case "menorMonto":
      return a.monto - b.monto;
    case "az":
      return a.descripcion.localeCompare(b.descripcion);
    case "za":
      return b.descripcion.localeCompare(a.descripcion);
    default:
      return 0;
  }
});
}

//  --------------------------------------------------------------- Funciones de eliminar y editar OPERACION -----------------------------------------------------------

const eliminarOperacion = (idOperacion) => {
  const datos = obtenerDatos("operaciones");
  const operacionEliminada = datos.filter(operacion => operacion.id !== idOperacion)

  guardarDatos("operaciones", operacionEliminada)

  return operacionEliminada;
}

function editarOperacion(idOperacion, nuevosDatos) {
  const datos = obtenerDatos("operaciones")
  const indiceBuscado = datos.findIndex((operacion) => operacion.id == idOperacion)

  datos.splice(indiceBuscado, 1, {...nuevosDatos, id: idOperacion});

  guardarDatos("operaciones", datos)

  return datos
}

 //  --------------------------------------------------------------- Funciones de eliminar y editar las CATEGORIAS -----------------------------------------------------------

 const eliminarCategoria = (idCategoria) => {
   const datos = obtenerDatos("categoria") || []; 
   const categoriaEliminada = datos.filter(categoria => categoria.id !== idCategoria)

   guardarDatos("categoria", categoriaEliminada)

   return categoriaEliminada;
 }

 function editarCategoria(idCategoria, nuevosDatos) {
  const datos = obtenerDatos("categoria")
  const indiceBuscado = datos.findIndex((categoria) => categoria.id == idCategoria)

  datos.splice(indiceBuscado, 1, {...nuevosDatos, id: idCategoria});

  guardarDatos("categoria", datos)

  return datos
}



export default {
  obtenerDatos,
  guardarDatos,
  agregarOperacion,
  agregarCategoria,
  filtrarPorTipo,
  filtrarPorCategoria,
  filtrarPorFecha,
  ordenarDatos,
  eliminarOperacion,
  editarOperacion,
  agregarCategoria,
  eliminarCategoria,
  editarCategoria
}