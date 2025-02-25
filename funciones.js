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


  






  export default {
    obtenerDatos,
    guardarDatos,
    agregarOperacion
  }