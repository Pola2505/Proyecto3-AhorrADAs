function obtenerDatos(key) {
    const datos = JSON.parse(localStorage.getItem(key))
    return datos ? datos : [];
  }
  
  function guardarDatos(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
  }


  function agregarOperacion(objetoNuevaOperacion) {
    const datos = obtenerDatos("operaciones")
    guardarDatos("operaciones", [...datos, objetoNuevaOperacion])
  }


 function filtrarPorTipo(tipo) {
    const datos = obtenerDatos("operaciones")
    return datos.filter(elem => elem.tipo === tipo)
 }

 function filtrarPorCategoria(categoria) {
  const datos = obtenerDatos("operaciones")
  return datos.filter(elem => elem.categoria === categoria)
}

function filtrarPorFecha(fecha) {
  const datos = obtenerDatos("operaciones")
  return datos.filter(elem => elem.fecha === fecha)
}

  export default {
    obtenerDatos,
    guardarDatos,
    agregarOperacion,
    filtrarPorTipo,
    filtrarPorCategoria,
    filtrarPorFecha,

  }